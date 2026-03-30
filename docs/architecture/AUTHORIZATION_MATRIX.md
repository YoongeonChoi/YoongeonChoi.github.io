# Authorization Matrix

## Roles
- `owner`
- `editor`
- `viewer`

## Matrix

| Actor | Resource | Action | Condition | Audit |
|---|---|---|---|---|
| owner | post/project | publish | `aal2 + recent_reauth` | yes |
| owner | post/project | retire | `aal2 + recent_reauth` | yes |
| owner | post/project | archive | `aal2 + recent_reauth` | yes |
| owner | post/project | restore | `aal2 + recent_reauth` | yes |
| owner | settings | update | `aal2 + recent_reauth` | yes |
| owner | roles | change role | cannot self-demote last owner | yes |
| editor | post/project | create draft | assigned or own draft | yes |
| editor | post/project | update draft/in_review | assigned or own draft | yes |
| editor | post/project | update published | forbidden, must branch to new draft | yes |
| viewer | admin data | read | authenticated admin only | no |
| owner/editor | preview | issue token | content in draft family | yes |
| owner/editor | preview | revoke token | owner all, editor own scope | yes |
| owner/editor | media | upload | authenticated admin only | yes |
| owner | media | attach to published/retired | only owner | yes |
| anonymous | preview | read | valid signed token + not expired | no |
| anonymous | contact | submit | Turnstile + rate limit + honeypot pass | yes |

## Admin Page Policy
- `/admin`는 authenticated + `admin_users` lookup이 통과해야 한다.
- 실패 시 `/ko/unauthorized`로 보낸다.

## Admin API Policy
- same-origin 기본
- explicit allowed origin만 예외
- role guard는 route handler마다 재검증한다.
