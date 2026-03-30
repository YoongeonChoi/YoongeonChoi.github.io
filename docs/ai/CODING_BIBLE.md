# Coding Bible

## Principles
- security first
- docs first
- versioned optimistic locking
- locale-prefixed public routes only
- server-side validation always

## Hard Rules
- `service_role` is ops-only
- admin writes must validate `Origin + Host`
- preview must use Draft Mode
- `revalidateTag(tag, "max")`
- route additions require doc updates first
- schema changes require migration + RLS + docs update
- no client-side direct database writes for admin mutations

## Quality Gates
- `npm run lint`
- `npm run typecheck`
- `npm run build`
- SEO metadata on public pages
- structured data where applicable

## Reuse
- before adding a component, check shared components first
- before adding a route, update architecture docs first
