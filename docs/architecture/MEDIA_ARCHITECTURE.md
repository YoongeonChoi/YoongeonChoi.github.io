# Media Architecture

## Media Types
- hero
- cover
- inline
- og
- avatar
- gallery

## Allowed Formats
- webp
- avif
- png
- jpeg

## Limits
- max file size: 10MB
- max dimensions: 5000x5000
- max pixels: 20MP
- max images per content: 20
- signed upload URL TTL: 2h

## Lifecycle
- upload
- detached
- attached
- variant generation
- detach grace period
- cleanup candidate

## Authoritative Delete Rule
- source of truth는 join table recount다.
- cached `ref_count`는 보조값일 뿐이다.
- hard delete 전 authoritative recount 필수
- recount 실패 시 delete 금지
- published/retired에 연결된 asset은 detach만 허용

## Variant Regeneration
- 원본 교체
- focal point 변경
- pipeline version 변경
- OG template 변경

## Attach Validation
- bucket
- path
- mime
- bytes
- dimensions
- checksum

## Cleanup
- upload 후 attach되지 않은 자산은 `detached`
- 30일 유예 후 cleanup 후보
