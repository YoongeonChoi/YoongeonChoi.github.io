# Roadmap

## Phase 1 / Launch-Critical
- Public locale routes, root redirect, robots, sitemap
- Home, projects, project detail, writing, article detail, about, resume, contact, privacy, contact-policy
- Protected `/admin` shell
- Preview via Draft Mode
- Contact API with Turnstile, honeypot, rate limit, error UX
- Admin API contracts with version-based optimistic locking
- Supabase SSR boundaries and initial migration
- SEO metadata, alternates, structured data
- Core docs set

## Phase 1 Done Definition
- `featured project 3개`
- `published article 3편`
- `about`, `resume`, `contact`, `privacy`, `contact-policy`의 `ko/en` 버전
- `npm run lint`, `npm run typecheck`, `npm run build` 통과
- preview/cache rules implemented
- launch blockers documented

## Phase 2 / Operational Hardening
- `/{locale}/search`
- `/{locale}/tags/[slug]`
- `/{locale}/series/[slug]`
- `/{locale}/year/[yyyy]`
- `/{locale}/now`
- `/{locale}/uses`
- scheduled publish UI
- revision UI and rollback UI
- redirect history UI
- media variant automation
- no-result search measurement
- locale stale detection UI

## Phase 3 / Enhancement
- `ai_agent` role
- admin analytics dashboard
- admin search dashboard
- `/{locale}/press`
- `/{locale}/speaking`
- advanced related content
- translation-specific concurrency split if multi-editor pressure appears

## Explicitly Deferred
- block editor
- collaborative editing
- raw HTML authoring
- complex recommendation engine
- persistent preview-token revocation without DB token table
