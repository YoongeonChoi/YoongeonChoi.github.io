# Observability

## Signals
- runtime errors
- server action and route handler failures
- auth failures
- image upload failures
- publish failures
- web vitals field data

## Severity
- `P0`: site down, admin auth broken, public content inaccessible
- `P1`: contact broken, publish broken, image delivery broken
- `P2`: analytics/search degraded
- `P3`: cosmetic or isolated issue

## Response Target
- `P0`: 15 minutes
- `P1`: 1 hour
- `P2`: business day
- `P3`: batched

## Alert Routing
- Sentry
- email

## Rollback Threshold
- immediate for P0
- P1 unresolved in 60 minutes
- 5xx spike
- draft leakage
- broken publish flow
