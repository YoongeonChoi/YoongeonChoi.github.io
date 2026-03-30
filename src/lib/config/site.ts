import { DEFAULT_LOCALE, type Locale } from "@/lib/config/constants";

export const SITE_NAME = "Yoongeon Choi";
export const SITE_TAGLINE = "Operating a personal publishing system, not a static portfolio.";
export const SITE_DESCRIPTION =
  "A bilingual PR site for computer engineering, design-minded implementation, and operations-first publishing discipline.";

export function getBaseUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || "https://yoongeonchoi.github.io").replace(/\/$/, "");
}

export function withLocale(locale: Locale, path = "") {
  const normalized = path.startsWith("/") || path.length === 0 ? path : `/${path}`;
  return `/${locale}${normalized}`;
}

export function getLocaleLabel(locale: Locale) {
  return locale === DEFAULT_LOCALE ? "한국어" : "English";
}

export function absoluteUrl(path: string) {
  return `${getBaseUrl()}${path.startsWith("/") ? path : `/${path}`}`;
}
