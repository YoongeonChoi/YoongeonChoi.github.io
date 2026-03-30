# Data Model

## Modeling Choice
- 공통 polymorphic `content` 테이블은 도입하지 않는다.
- `posts`, `post_translations`, `projects`, `project_translations`를 분리한다.
- root aggregate에만 `version`을 두고 optimistic locking의 source of truth로 사용한다.
- `updated_at`은 표시/정렬용이며 충돌 제어에 사용하지 않는다.

## Core Tables
- `posts`
- `post_translations`
- `projects`
- `project_translations`
- `content_revisions`
- `redirect_history`
- `reserved_slugs`
- `post_supersessions`
- `project_supersessions`
- `media_assets`
- `media_variants`
- `post_media_refs`
- `project_media_refs`
- `contact_submissions`
- `admin_users`
- `audit_logs`
- `analytics_events`
- `web_vitals_events`
- `site_settings`

## PK / FK / Unique
- `post_translations` PK: `(post_id, locale)`
- `project_translations` PK: `(project_id, locale)`
- `post_translations` unique: `(locale, slug) where deleted_at is null`
- `project_translations` unique: `(locale, slug) where deleted_at is null`
- `reserved_slugs` unique: `(content_type, locale, slug)`
- `redirect_history` unique: `(content_type, locale, from_slug) where active = true`
- `post_supersessions.from_post_id` unique
- `project_supersessions.from_project_id` unique
- `post_media_refs` unique: `(post_id, media_asset_id, usage_slot, locale)`
- `project_media_refs` unique: `(project_id, media_asset_id, usage_slot, locale)`

## Status Invariants

| status | published_at | scheduled_at | retired_at | archived_at | public |
|---|---|---|---|---|---|
| `draft` | null | null | null | null | no |
| `in_review` | null | null | null | null | no |
| `scheduled` | null | not null | null | null | no |
| `published` | not null | null | null | null | yes |
| `retired` | not null | null | not null | null | yes |
| `archived` | historical | null | historical | not null | no |

- `deleted_at is not null`이면 tombstone overlay가 다른 상태보다 우선한다.
- `deleted_at`이 있으면 public query, sitemap, search index, related 후보군, analytics denominator에서 제외한다.

## Public Query Rule
- 공개 조회는 `deleted_at is null`이고 `status in ('published', 'retired')`인 콘텐츠만 허용한다.

## Retired Vs Archived
- `retired`
  - 공개 유지
  - index 허용
  - 상단 notice + superseding link
- `archived`
  - 비공개
  - 직접 접근 시 replacement가 있으면 `308`, 없으면 `410`
  - listing, sitemap, search index, related 후보군 제외

## Historical Slugs
- 과거 slug는 `redirect_history`와 `reserved_slugs`에 남긴다.
- archived/deleted 이후에도 slug 재사용은 금지한다.

## Revisions
- 저장 방식은 `full snapshot`이다.
- hot retention은 콘텐츠당 최근 `50`개다.
- compressed snapshot hard cap은 `512KB`다.

## Supersession Integrity
- same-type relation only
- self reference 금지
- cycle 금지
- target은 `published` 또는 `retired`만 허용

## Contact Submission Rules
- PII 컬럼은 암호문을 저장한다.
- `email_ciphertext`, `name_ciphertext`, `message_ciphertext`
- `ip_hash`, `ua_hash`는 salted hash만 저장한다.
- retention:
  - 정상 문의 `180일`
  - spam/abuse `30일`

## Check Constraints To Implement
- status-specific timestamp consistency
- positive `version`
- valid locale enum
- positive pixel and byte limits for media metadata
