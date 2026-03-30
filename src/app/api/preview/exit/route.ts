import { draftMode } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { noStoreHeaders } from "@/lib/security/request-security";

function safeReturnPath(input: string | null) {
  if (!input || !input.startsWith("/") || input.startsWith("//")) {
    return "/ko";
  }
  return input;
}

export async function GET(request: NextRequest) {
  const draft = await draftMode();
  draft.disable();

  const response = NextResponse.redirect(new URL(safeReturnPath(request.nextUrl.searchParams.get("returnTo")), request.url));
  Object.entries(noStoreHeaders()).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}
