import { TURNSTILE_TOKEN_TTL_SECONDS } from "@/lib/config/constants";
import { contactSchema } from "@/lib/validation/schemas";

type TurnstileResponse = {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  action?: string;
  "error-codes"?: string[];
};

export async function verifyTurnstile(token: string, expectedAction = "contact_submit") {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    return {
      ok: false,
      error: "Turnstile is not configured.",
    };
  }

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      secret,
      response: token,
    }),
    cache: "no-store",
  });

  const data = (await response.json()) as TurnstileResponse;

  if (!data.success) {
    return {
      ok: false,
      error: data["error-codes"]?.[0] || "turnstile_failed",
    };
  }

  if (data.action && data.action !== expectedAction) {
    return { ok: false, error: "turnstile_action_mismatch" };
  }

  if (data.challenge_ts) {
    const ageInSeconds = Math.floor(
      (Date.now() - new Date(data.challenge_ts).getTime()) / 1000,
    );
    if (ageInSeconds > TURNSTILE_TOKEN_TTL_SECONDS) {
      return { ok: false, error: "turnstile_expired" };
    }
  }

  return { ok: true, data };
}

export function validateContactPayload(input: unknown) {
  return contactSchema.safeParse(input);
}
