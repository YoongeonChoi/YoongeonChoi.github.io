# Yoongeon Choi PR Site

운영형 개인 PR 사이트를 위한 Next.js 16 기반 저장소입니다. 이 프로젝트는 단순 포트폴리오가 아니라 `검색 가능`, `운영 가능`, `복구 가능`, `측정 가능`한 개인 퍼블리싱 시스템을 목표로 합니다.

## Stack

- Next.js 16 App Router
- TypeScript strict
- Tailwind CSS v4
- Vercel Analytics / Speed Insights
- Supabase SSR + RLS
- Zod validation

## Local Development

```bash
npm install
npm run dev
```

기본 진입 경로는 [http://localhost:3000](http://localhost:3000)이며 루트는 `/ko`로 영구 리다이렉트됩니다.

## Required Environment Variables

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
PREVIEW_SECRET=
TURNSTILE_SECRET_KEY=
TURNSTILE_SITE_KEY=
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
NEXT_PUBLIC_ALLOWED_ORIGINS=http://localhost:3000
```

## Working Rules

- 공개 페이지는 모두 `/{locale}/...` 경로만 사용합니다.
- Preview는 Draft Mode를 표준으로 사용합니다.
- 관리자 write는 integer `version` 기반 optimistic locking을 강제합니다.
- `service_role`은 ops 전용 코드에서만 허용됩니다.
- 문서 세트를 먼저 수정한 뒤 기능을 확장합니다.

## Documentation Map

- `AGENTS.md`
- `docs/architecture/`
- `docs/ops/`
- `docs/ai/`
