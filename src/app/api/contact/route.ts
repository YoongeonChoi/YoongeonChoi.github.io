import { NextResponse, type NextRequest } from "next/server";
import { checkContactRateLimit } from "@/lib/security/rate-limit";
import { encryptValue, hashValue } from "@/lib/security/crypto";
import { validateContactPayload, verifyTurnstile } from "@/lib/security/turnstile";
import { getServerSupabaseClient } from "@/lib/supabase/server-client";

function readClientIp(request: NextRequest) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

function readUserAgent(request: NextRequest) {
  return request.headers.get("user-agent") || "unknown";
}

export async function POST(request: NextRequest) {
  const payload = await request.json().catch(() => null);
  const parsed = validateContactPayload(payload);

  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: parsed.error.issues[0]?.message || "Invalid contact request.",
      },
      { status: 400 },
    );
  }

  if (parsed.data.honeypot) {
    return NextResponse.json({
      ok: true,
      message: "Submission accepted.",
    });
  }

  const ipHash = hashValue(readClientIp(request));
  const userAgentHash = hashValue(readUserAgent(request));

  if (!checkContactRateLimit(ipHash)) {
    return NextResponse.json(
      {
        ok: false,
        error: "Rate limit exceeded for the contact channel.",
      },
      { status: 429 },
    );
  }

  const allowLocalBypass =
    process.env.NODE_ENV !== "production" &&
    !process.env.TURNSTILE_SECRET_KEY &&
    parsed.data.turnstileToken === "local-dev-token";

  if (!allowLocalBypass) {
    const turnstile = await verifyTurnstile(parsed.data.turnstileToken, "contact_submit");
    if (!turnstile.ok) {
      return NextResponse.json(
        {
          ok: false,
          error: turnstile.error,
        },
        { status: 400 },
      );
    }
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return NextResponse.json({
      ok: true,
      message: "Submission accepted in local scaffold mode.",
    });
  }

  try {
    const supabase = await getServerSupabaseClient();
    const { error } = await supabase.from("contact_submissions").insert({
      reason: parsed.data.reason,
      email_ciphertext: encryptValue(parsed.data.email),
      name_ciphertext: parsed.data.name ? encryptValue(parsed.data.name) : null,
      message_ciphertext: encryptValue(parsed.data.message),
      link_1: parsed.data.links[0] ?? null,
      link_2: parsed.data.links[1] ?? null,
      ip_hash: ipHash,
      ua_hash: userAgentHash,
      status: "open",
    });

    if (error) {
      throw error;
    }

    return NextResponse.json({
      ok: true,
      message: "Message received. I will respond within the stated contact window.",
    });
  } catch (error) {
    const isLocal = process.env.NODE_ENV !== "production";

    if (isLocal) {
      return NextResponse.json({
        ok: true,
        message: "Submission accepted locally. Supabase persistence is not ready in this environment.",
      });
    }

    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Contact storage failed.",
      },
      { status: 503 },
    );
  }
}
