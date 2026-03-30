import type { NextRequest } from "next/server";

export function getAllowedOrigins() {
  return (process.env.NEXT_PUBLIC_ALLOWED_ORIGINS || "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
}

export function noStoreHeaders() {
  return {
    "Cache-Control": "private, no-store, max-age=0, must-revalidate",
    "X-Robots-Tag": "noindex, nofollow, noarchive",
  };
}

export function assertAdminOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");

  if (!origin || !host) {
    throw new Error("Missing Origin or Host header.");
  }

  const normalizedOrigin = new URL(origin);
  const sameOriginHost = normalizedOrigin.host === host;
  const explicitlyAllowed = getAllowedOrigins().some((entry) => {
    try {
      return new URL(entry).host === normalizedOrigin.host;
    } catch {
      return entry === normalizedOrigin.host;
    }
  });

  if (!sameOriginHost && !explicitlyAllowed) {
    throw new Error("Origin is not allowed for admin write operations.");
  }
}
