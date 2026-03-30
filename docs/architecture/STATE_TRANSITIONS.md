# State Transitions

| from | to | actor | preconditions | side effects | SEO/cache | audit |
|---|---|---|---|---|---|---|
| draft | in_review | owner/editor | valid draft | mark review requested | none | yes |
| in_review | scheduled | owner | publish checklist pass | set `scheduled_at` | no public change | yes |
| in_review | published | owner | checklist pass + reauth gate | set `published_at`, clear `scheduled_at` | revalidate listing/detail/home/sitemap | yes |
| scheduled | published | owner/scheduler | time reached or manual override | clear `scheduled_at`, set `published_at` | revalidate listing/detail/home/sitemap | yes |
| published | retired | owner | reauth gate | set `retired_at`, keep `published_at` | revalidate detail/listing/home/sitemap | yes |
| retired | published | owner | reauth gate | clear `retired_at` | revalidate detail/listing/home/sitemap | yes |
| published | archived | owner | reauth gate | set `archived_at` | remove from listing/sitemap/search candidates | yes |
| retired | archived | owner | reauth gate | set `archived_at` | remove from listing/sitemap/search candidates | yes |
| archived | draft | owner | reauth gate | clear public exposure | revalidate if previously addressed | yes |
| any | deleted overlay | owner | reauth gate | set `deleted_at` | remove from all public surfaces and denominators | yes |

## Scheduled Edit Rule
- `scheduled` 콘텐츠를 수정하면 `scheduled_at`은 `null`로 reset된다.
- status는 `in_review`로 되돌아간다.
- 이전 예약 이력은 `audit_logs`에 남긴다.

## Editor Rule For Published Content
- editor는 `published` 콘텐츠를 직접 수정하지 않는다.
- 현재 공개본에서 새 draft revision을 생성한 뒤 수정한다.

## Cache Hooks
- `publish`, `retire`, `archive`, `restore`, `slug change`, `locale stale`, `media replace`는 `CACHE_INVALIDATION.md` 규칙을 따른다.
