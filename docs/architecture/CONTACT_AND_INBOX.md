# Contact And Inbox

## Input Contract
- email required
- reason enum required
- message required
- name optional
- links optional up to 2
- attachments disabled in Phase 1

## Anti-Spam
- Turnstile server verification
- honeypot
- IP hash rate limit
- abuse keyword checks

## Inbox Rules
- supported:
  - collaboration
  - job
  - speaking
  - structured question
- may close without reply:
  - cold sales
  - repeated spam
  - excessive personal data

## Status
- `open`
- `closed`
- `spam`

## Retention
- normal inquiries: 180 days
- spam/abuse: 30 days
- security logs: 90 days

## Triage
- owner/editor can close
- close action must leave audit log
- future inbox UI will expose resolution and retention clock
