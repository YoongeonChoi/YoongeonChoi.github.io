# SEO Strategy

## URL Rules
- locale-adaptive rendering 금지
- 모든 공개 문서는 `/{locale}/...`
- `/`는 redirector only
- `x-default`는 `/ko`

## Alternates
- 공개된 `ko/en` 쌍만 hreflang alternate에 포함한다.
- translation incomplete 문서는 alternate와 sitemap에서 제외한다.

## Indexing Policy
- `published`: index
- `retired`: index 유지, superseding link 고정
- `archived`: replacement 있으면 `308`, 없으면 `410`
- `deleted`: noindex + no public access
- preview: `token + noindex + no-store`
- admin: auth required, noindex에 의존하지 않음

## Stale Translation Policy
- source 수정 즉시 `translation_needs_review = true`
- 14일 후 sitemap 제외
- 30일 후 `noindex`

## Structured Data
- home/about: `Person + ProfilePage`
- writing detail: `Article`
- hierarchy pages: `BreadcrumbList`

## Required Fields
- ProfilePage:
  - `Person.name`
  - canonical URL
  - `mainEntity`
- Article:
  - `headline`
  - `image`
  - `datePublished`
  - `dateModified`
  - `author`

## Redirect Policy
- slug change는 `308`
- historical slug는 reserved 상태로 남기고 재사용 금지
- `410`은 최소 30일 유지 후 `404`로 전환 가능

## Robots / Noindex / Auth
- robots.txt는 crawl control
- noindex는 indexing control
- auth는 access control
