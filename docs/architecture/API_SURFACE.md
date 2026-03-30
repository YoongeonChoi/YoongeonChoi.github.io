# API Surface

## Public

| Method | Path | Purpose | Validation |
|---|---|---|---|
| POST | `/api/contact` | inquiry submit | `contactSchema` |
| GET | `/api/preview` | validate signed preview + enable Draft Mode | query validation |
| GET | `/api/preview/exit` | disable Draft Mode | safe return path only |

## Admin

| Method | Path | Purpose | Min role |
|---|---|---|---|
| POST | `/api/admin/posts` | create draft post | editor |
| PATCH | `/api/admin/posts/:id` | update post draft | editor |
| POST | `/api/admin/posts/:id/publish` | publish post | owner |
| POST | `/api/admin/posts/:id/retire` | retire post | owner |
| POST | `/api/admin/posts/:id/archive` | archive post | owner |
| POST | `/api/admin/posts/:id/restore` | restore post to draft | owner |
| POST | `/api/admin/posts/:id/preview-token` | issue preview link | editor |
| DELETE | `/api/admin/posts/:id/preview-token/:tokenId` | revoke preview link | editor |
| POST | `/api/admin/projects` | create draft project | editor |
| PATCH | `/api/admin/projects/:id` | update project draft | editor |
| POST | `/api/admin/projects/:id/publish` | publish project | owner |
| POST | `/api/admin/media/upload-url` | issue signed upload URL | editor |
| POST | `/api/admin/media/attach` | attach uploaded asset | editor |
| DELETE | `/api/admin/media/:id` | request delete | owner |
| POST | `/api/admin/contact/:id/close` | close inquiry | editor |

## Shared Rules
- 모든 관리자 write 요청은 `version`을 포함해야 한다.
- 모든 관리자 write는 same-origin 또는 allowlisted origin만 허용한다.
- validation 실패는 `400`
- auth 실패는 `401`
- role 부족은 `403`
- version mismatch는 추후 `409`로 확장한다.
