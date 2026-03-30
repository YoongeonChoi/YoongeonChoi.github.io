# Supabase Boundaries

## Clients
- `browserClient`
  - public read
  - browser session aware
- `serverClient`
  - `@supabase/ssr + cookie session`
  - route handlers, server components, server actions
- `adminJobClient`
  - `service_role`
  - cron, backup, maintenance only

## Forbidden
- `service_role` in:
  - shared utils
  - client bundle
  - Server Components for normal reads
  - general Route Handlers
  - Server Actions

## Folder Rule
- ops-only admin client code stays under `src/lib/server/admin-jobs/` or similarly isolated server-only boundaries.

## Auth Standard
- App Router SSR auth uses `@supabase/ssr`
- browser and server clients share the anon public config
- authorization happens through `admin_users` + RLS
