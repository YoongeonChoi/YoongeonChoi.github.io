import { draftMode } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { isLocale } from "@/lib/config/constants";
import {
  buildPreviewPath,
  isPreviewExpired,
  type PreviewKind,
  verifyPreviewSignature,
} from "@/lib/security/preview";
import { noStoreHeaders } from "@/lib/security/request-security";

function previewRedirect(request: NextRequest, path: string) {
  const url = new URL(path, request.url);
  const response = NextResponse.redirect(url);

  Object.entries(noStoreHeaders()).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}

export async function GET(request: NextRequest) {
  const locale = request.nextUrl.searchParams.get("locale") || "ko";
  const kind = request.nextUrl.searchParams.get("kind") as PreviewKind | null;
  const slug = request.nextUrl.searchParams.get("slug") || "";
  const exp = Number(request.nextUrl.searchParams.get("exp"));
  const sig = request.nextUrl.searchParams.get("sig") || "";

  if (!isLocale(locale) || (kind !== "posts" && kind !== "projects")) {
    return previewRedirect(request, "/ko/preview-expired");
  }

  if (isPreviewExpired(exp)) {
    return previewRedirect(request, `/${locale}/preview-expired`);
  }

  const valid = verifyPreviewSignature({
    kind,
    locale,
    slug,
    exp,
    sig,
  });

  if (!valid) {
    return previewRedirect(request, `/${locale}/preview-expired`);
  }

  const draft = await draftMode();
  draft.enable();

  return previewRedirect(request, buildPreviewPath(locale, kind, slug));
}
