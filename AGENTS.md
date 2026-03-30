<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project Guardrails

This repository is an operations-first personal publishing system. Every AI agent must read the following before changing code:

1. `node_modules/next/dist/docs/app/api-reference/functions/draft-mode.md`
2. `node_modules/next/dist/docs/app/api-reference/functions/revalidatePath.md`
3. `node_modules/next/dist/docs/app/api-reference/functions/revalidateTag.md`
4. `docs/architecture/SITE_ARCHITECTURE.md`
5. `docs/architecture/DATA_MODEL.md`
6. `docs/architecture/CACHE_INVALIDATION.md`
7. `docs/architecture/REQUEST_SECURITY.md`

## Non-negotiable rules

- All public pages use locale-prefixed routes under `src/app/[locale]`.
- Root `/` is a redirector only and must remain non-canonical.
- Preview must use Next.js Draft Mode. Preview responses must be `noindex` and `no-store`.
- `revalidateTag` must use the Next 16 signature `revalidateTag(tag, "max")`.
- Server Actions are not implicitly trusted. Treat them as directly reachable POST endpoints.
- `service_role` usage is restricted to `src/lib/server/admin-jobs/` and ops-only code. It is forbidden in shared utils, route handlers, Server Components, and client code.
- Any schema change requires: migration, RLS updates, regenerated types when adopted, and document updates in `docs/architecture`.
- Any new route, entity, or state transition must update the relevant architecture docs first.
- Any SEO-impacting page must ship with metadata, alternates, and structured-data coverage where applicable.
- Any content write path must enforce integer `version` optimistic locking.

## Git Workflow

- `main` is the protected integration branch and must stay releasable.
- Before starting any new implementation work, sync with the latest `main`.
- Create or refresh a local `dev` branch from `main`, and do routine development work on `dev`.
- Validation happens on `dev` first. Merge back into `main` only after checks and review are complete.
- If a task begins on `main` for emergency stabilization, finish the minimum safe fix, then return to the normal `main -> dev -> main` workflow for follow-up development.
