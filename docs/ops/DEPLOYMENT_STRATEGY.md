# Deployment Strategy

## Environments
- local
- preview
- production

## Promotion Rule
- preview verifies feature branches
- production only from main

## Migration Order
1. expand schema
2. deploy compatible app
3. contract old fields later

## Secrets
- environment-scoped
- never committed
- rotate quarterly

## Rollback
- deployment rollback for app regressions
- content restore from revisions
- destructive schema rollback avoided unless isolated migration plan exists
