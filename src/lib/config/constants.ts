export const LOCALES = ["ko", "en"] as const;
export const DEFAULT_LOCALE = "ko";

export const CONTENT_STATUSES = [
  "draft",
  "in_review",
  "scheduled",
  "published",
  "retired",
  "archived",
] as const;

export const CONTACT_REASONS = [
  "collaboration",
  "job",
  "speaking",
  "question",
  "other",
] as const;

export const MEDIA_TYPES = ["hero", "cover", "inline", "og", "avatar", "gallery"] as const;

export const REDIRECT_STATUS_CODES = [308] as const;
export const TERMINAL_HTTP_STATUSES = [410] as const;

export const PREVIEW_TOKEN_DEFAULT_TTL_HOURS = 48;
export const PREVIEW_TOKEN_MAX_TTL_HOURS = 72;
export const SIGNED_UPLOAD_URL_TTL_HOURS = 2;
export const TURNSTILE_TOKEN_TTL_SECONDS = 300;

export const CONTACT_RATE_LIMIT = {
  per2Min: 1,
  perHour: 3,
  perDay: 10,
} as const;

export const MAX_UPLOAD_BYTES = 10_485_760;
export const MAX_UPLOAD_PIXELS = 20_000_000;
export const MAX_IMAGES_PER_CONTENT = 20;

export const ANALYTICS_RAW_RETENTION_DAYS = 90;
export const ANALYTICS_AGGREGATE_RETENTION_MONTHS = 13;
export const EVENT_INGEST_SOFT_CAP_MONTHLY = 250_000;
export const REVISION_HOT_LIMIT_PER_CONTENT = 50;
export const REVISION_SNAPSHOT_HARD_CAP_BYTES_COMPRESSED = 524_288;
export const OG_REGENERATION_GLOBAL_DAILY_CAP = 50;
export const OG_REGENERATION_PER_CONTENT_HOURLY_CAP = 3;
export const HTTP_410_MIN_RETENTION_DAYS = 30;

export type Locale = (typeof LOCALES)[number];
export type ContentStatus = (typeof CONTENT_STATUSES)[number];
export type ContactReason = (typeof CONTACT_REASONS)[number];
export type MediaType = (typeof MEDIA_TYPES)[number];

export function isLocale(value: string): value is Locale {
  return LOCALES.includes(value as Locale);
}
