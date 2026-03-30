# Editor Workflow

## Authoring Format
- `Markdown + frontmatter + allowlisted MDX components`
- 허용:
  - `Image`
  - `Callout`
  - `CodeGroup`
  - `GitHubEmbed`
  - `YouTubeEmbed`
- 금지:
  - raw HTML
  - arbitrary iframe
  - custom script
  - block editor
  - collaborative editing

## Lifecycle
1. Create draft
2. Autosave and manual save
3. Submit for review
4. Schedule or publish
5. Retire or archive
6. Restore to draft when necessary

## Autosave
- 유효한 draft 상태에서 `20초 idle`
- autosave와 manual save 모두 동일한 `version` 정책 사용

## Dirty State
- route change 전 경고
- browser unload 전 경고

## Publish Checklist
- title
- summary
- body
- cover
- alt text
- `seo_title`
- `seo_description`
- valid slug
- translation completeness
- internal links
- structured data eligibility

## Collision Rules
- slug 충돌 시 draft 저장은 허용
- publish는 금지

## Translation Stale Flow
- source 수정 시 translated record는 `translation_needs_review = true`
- stale badge 노출
- stale 기간이 길어지면 sitemap 제외 및 `noindex` 전환

## Scheduled Edit Rule
- `scheduled` 수정 시 `scheduled_at = null`
- state는 `in_review`
- 이전 예약 이력은 audit log에 기록
