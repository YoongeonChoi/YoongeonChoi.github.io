# Validation Rules

## Content
- title: `3-120`
- summary: `10-220`
- body: `20+`
- slug: `1-120`
- `seo_title`: 권장 `60`자 이내
- `seo_description`: 권장 `160`자 이내

## Contact
- email: valid email
- reason: enum only
- message: `30-2000`
- links: 최대 `2`
- honeypot: must remain empty
- Turnstile token: required, server-side verified

## Media
- mime: `image/webp`, `image/avif`, `image/png`, `image/jpeg`
- max bytes: `10MB`
- max dimensions: `5000x5000`
- max pixels: `20MP`
- max images per content: `20`

## Preview
- preview token default TTL: `48h`
- max TTL: `72h`
- signed upload URL TTL: `2h`

## URL Hygiene
- raw URL은 sanitize 후 저장
- `//` 또는 external return path는 preview exit에서 금지
