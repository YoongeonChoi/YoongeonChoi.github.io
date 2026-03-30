# Error Handling

## Public States
- 404
- 410
- 500
- unauthorized
- forbidden
- preview expired
- translation unavailable

## UX Rules
- publish failure:
  - draft 유지
  - last successful save time 표시
  - retry 제공
  - conflict 여부 표시
- preview expired:
  - 만료 안내
  - 새 preview 발급 CTA
- contact failure:
  - 입력값 유지
  - retry 제공
  - 대체 연락 경로 안내
- image upload failure:
  - queue 유지
  - format/size 가이드 표시
  - retry/clear actions 제공

## Accessibility
- error message는 screen reader에 announce
- focus는 첫 번째 actionable recovery control로 이동

## Admin Diagnostics
- admin error는 사용자용 메시지와 내부 로그를 분리한다.
- 내부 원인과 stack trace는 public surface에 노출하지 않는다.
