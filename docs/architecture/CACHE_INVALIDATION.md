# Cache Invalidation

## Preview
- preview는 Draft Mode를 표준으로 사용한다.
- `/api/preview`에서 토큰 검증 후 Draft Mode cookie를 활성화한다.
- `/api/preview/exit`에서 Draft Mode를 종료한다.
- preview 응답은 항상 `noindex + no-store`다.

## Action Table

| action | revalidatePath | revalidateTag | extra |
|---|---|---|---|
| post publish | `/{locale}`, `/{locale}/writing`, `/{locale}/writing/[slug]`, `/sitemap.xml` | `locale:{locale}`, `collection:posts`, `post:{locale}:{slug}` | client refresh optional |
| post retire | same as publish | same as publish | keep indexable |
| post archive | same as publish | same as publish | remove from sitemap/listing |
| post restore | same as publish | same as publish | restore draft/public flow later |
| project publish | `/{locale}`, `/{locale}/projects`, `/{locale}/projects/[slug]`, `/sitemap.xml` | `locale:{locale}`, `collection:projects`, `project:{locale}:{slug}` | client refresh optional |
| slug change | old path, new path, listing, sitemap | content tag + locale tag | keep redirect live |
| locale stale | locale detail, sitemap | locale tag + content tag | alternates update |
| media replace | related detail path | content tag | update OG/media path |

## Revalidation Standard
- Next 16에서는 `revalidateTag(tag, "max")`를 사용한다.
- path invalidation은 path-level UI surface를 다시 그리기 위한 것.
- tag invalidation은 shared fetch result를 다시 계산하기 위한 것.
