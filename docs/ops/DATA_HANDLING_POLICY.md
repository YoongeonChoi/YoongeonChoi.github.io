# Data Handling Policy

## Collected Fields
- contact: email, optional name, reason, message, optional links
- security: IP hash, UA hash
- analytics: pseudonymous session id, route, event metadata
- auth: Supabase session cookies

## Purpose
- contact response
- spam and abuse prevention
- operational logging
- performance measurement

## Retention
- contact normal: 180 days
- spam/abuse: 30 days
- security/audit logs: 90 days
- raw analytics: 90 days
- aggregate analytics: 13 months

## Legal Basis
- legitimate interest for site security and operation
- consent or user action where required for optional analytics/contact flows

## Deletion Procedure
- erase encrypted PII
- preserve abuse evidence only when policy exception applies
- remove session-level identifiers from long-term aggregates
