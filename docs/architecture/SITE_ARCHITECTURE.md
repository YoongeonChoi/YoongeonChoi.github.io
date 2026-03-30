# Site Architecture

## Goal
- 이 저장소는 단순 포트폴리오가 아니라 `검색 가능`, `운영 가능`, `복구 가능`한 개인 퍼블리싱 시스템이다.
- 공개 사이트는 정적/ISR 우선, 관리자 쓰기 경로는 보호된 서버 경로 우선으로 설계한다.

## Stack
- `Next.js 16 App Router`
- `TypeScript strict`
- `Tailwind CSS v4`
- `Supabase SSR + RLS`
- `Vercel Analytics / Speed Insights`
- `Sentry`

## Route Topology
- Root `/`는 canonical 문서가 아니라 `308 -> /ko` redirector다.
- 공개 콘텐츠는 모두 `/{locale}/...` 경로만 사용한다.
- Phase 1 공개 라우트:
  - `/{locale}`
  - `/{locale}/projects`
  - `/{locale}/projects/[slug]`
  - `/{locale}/writing`
  - `/{locale}/writing/[slug]`
  - `/{locale}/about`
  - `/{locale}/resume`
  - `/{locale}/contact`
  - `/{locale}/privacy`
  - `/{locale}/contact-policy`
- 상태 라우트:
  - `/{locale}/forbidden`
  - `/{locale}/unauthorized`
  - `/{locale}/preview-expired`
  - `/{locale}/translation-unavailable`
- 관리자 라우트:
  - `/admin`
  - `/admin/posts`
  - `/admin/projects`
  - `/admin/contact`

## Layers
- `src/app`
  - App Router route handlers와 페이지.
- `src/components`
  - 공개 UI와 관리자 UI 공용 컴포넌트.
- `src/lib/config`
  - 상수, 사이트 메타, URL 규칙.
- `src/lib/content`
  - 현재는 sample content source of truth.
  - 추후 Supabase-backed query layer로 대체 가능.
- `src/lib/security`
  - Origin 검증, preview signing, Turnstile, admin access, rate limit.
- `src/lib/cache`
  - `revalidatePath`, `revalidateTag` 규칙.
- `src/lib/supabase`
  - browser/server/adminJob 클라이언트 경계.
- `src/lib/server`
  - API 응답 헬퍼와 서버 전용 조합.
- `supabase/migrations`
  - DB schema, constraints, RLS.
- `docs`
  - 구현 전 계약 문서.

## Current Source Of Truth
- 현재 공개 콘텐츠는 `src/lib/content/site-content.ts`의 in-repo sample data다.
- 운영 DB는 Supabase schema로 준비하되, 공개 뼈대는 DB 없이도 빌드 가능하게 유지한다.
- `Phase 1`의 목표는 public surface + protected API contract + 문서 계약을 동시에 만드는 것이다.

## Security Boundaries
- admin page는 Supabase SSR auth와 `admin_users` role lookup으로 보호한다.
- admin API는 `Origin + Host` 검증과 role guard를 함께 적용한다.
- preview는 `Draft Mode + signed query + noindex + no-store`로 보호한다.
- `service_role`은 오직 ops/admin-job 코드에서만 허용한다.

## Performance And Accessibility Gates
- 모바일 p75 `LCP <= 2.5s`, `INP <= 200ms`, `CLS <= 0.1`
- keyboard-only admin
- visible focus
- focus not obscured
- reduced motion 대응
- form error announce

## Immediate Next Step
- public sample data를 Supabase content tables로 점진 이전하되, route contract와 docs를 먼저 유지한다.
