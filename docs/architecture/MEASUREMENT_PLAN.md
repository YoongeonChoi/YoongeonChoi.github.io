# Measurement Plan

## Core Events
- `hero_cta_click`
- `project_card_click`
- `project_outbound_click`
- `resume_download`
- `contact_submit`
- `locale_switch`
- `article_read_depth`

## Event Governance
- schema version: `1`
- route는 템플릿 경로로 정규화
- bot/internal traffic 제외
- preview/admin 제외
- outbound click dedupe: `session + target + 30s`
- locale switch dedupe: `5s`
- read depth: `25/50/75/90%` once

## Session
- `30분 inactivity` 또는 로컬 자정 이후 새 session
- localStorage 기반 cross-tab 공유
- cookie-less pseudonymous session
- DNT/GPC 존중

## Retention And Cost
- raw events: 90 days
- aggregates: 13 months
- 13개월 경과 후 세션 식별자 제거
- event ingest soft cap: `250,000 / month`

## Performance Acceptance
- final verdict는 field data 기반
- mobile p75:
  - `LCP <= 2.5s`
  - `INP <= 200ms`
  - `CLS <= 0.1`
- hero LCP candidate 1개
- JS soft budget:
  - home `170KB gz`
  - detail `140KB gz`
  - admin editor `250KB gz`

## KPI
- project detail CTR
- resume download rate
- contact conversion
- article to project assist rate
- locale split
