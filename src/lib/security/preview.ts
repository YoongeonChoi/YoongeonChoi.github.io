import { createHmac, timingSafeEqual } from "node:crypto";
import {
  PREVIEW_TOKEN_DEFAULT_TTL_HOURS,
  PREVIEW_TOKEN_MAX_TTL_HOURS,
  type Locale,
} from "@/lib/config/constants";

export type PreviewKind = "posts" | "projects";

export function getPreviewSecret() {
  return process.env.PREVIEW_SECRET || "local-preview-secret";
}

export function clampPreviewTtlHours(value?: number) {
  const requested = value ?? PREVIEW_TOKEN_DEFAULT_TTL_HOURS;
  return Math.max(1, Math.min(requested, PREVIEW_TOKEN_MAX_TTL_HOURS));
}

export function buildPreviewPath(locale: Locale, kind: PreviewKind, slug: string) {
  return kind === "posts" ? `/${locale}/writing/${slug}` : `/${locale}/projects/${slug}`;
}

function previewPayload(kind: PreviewKind, locale: Locale, slug: string, exp: number) {
  return `${kind}:${locale}:${slug}:${exp}`;
}

export function signPreviewPayload(kind: PreviewKind, locale: Locale, slug: string, exp: number) {
  return createHmac("sha256", getPreviewSecret())
    .update(previewPayload(kind, locale, slug, exp))
    .digest("hex");
}

export function verifyPreviewSignature(input: {
  kind: PreviewKind;
  locale: Locale;
  slug: string;
  exp: number;
  sig: string;
}) {
  const expected = Buffer.from(
    signPreviewPayload(input.kind, input.locale, input.slug, input.exp),
    "utf8",
  );
  const actual = Buffer.from(input.sig, "utf8");

  if (expected.length !== actual.length) {
    return false;
  }

  return timingSafeEqual(expected, actual);
}

export function isPreviewExpired(exp: number) {
  return Number.isNaN(exp) || Date.now() > exp * 1000;
}
