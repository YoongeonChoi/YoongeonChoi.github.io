# Request Security

## Core Principle
- Server Actions와 Route Handlers는 UI에서만 호출된다고 가정하지 않는다.

## Same-Origin Policy
- admin write는 same-origin이 기본이다.
- 예외는 `next.config.ts`의 `serverActions.allowedOrigins`와 `NEXT_PUBLIC_ALLOWED_ORIGINS`에 명시된 origin만 허용한다.
- `/api/admin/*`는 `Origin`과 `Host`를 함께 검증한다.

## Cookie Policy
- admin session cookie: `HttpOnly + Secure + SameSite=Lax`
- Draft Mode cookie: `HttpOnly + Secure + SameSite=Lax`

## Responsibility Split
- `robots.txt`: crawl control only
- `noindex`: index control
- auth: access control

## Route Classes
- `admin`: auth required
- `preview`: signed token + `noindex + no-store`
- `internal test`: auth 또는 `noindex`
