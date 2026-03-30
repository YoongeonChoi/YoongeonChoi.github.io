# Runbook

## OAuth Mismatch
- verify Supabase redirect URLs
- verify preview/production hostnames
- clear stale local cookies

## Preview Failure
- verify token expiry
- verify HMAC signature inputs
- verify Draft Mode route response has `no-store`

## Contact Failure
- verify Turnstile secret
- verify siteverify response
- verify rate limit path
- verify Supabase insert permissions

## Media Upload Failure
- verify signed upload URL TTL
- verify bucket/path
- verify attach-time metadata recheck

## Wrong Publish
- retire or archive content
- restore prior revision
- revalidate affected paths and sitemap

## RLS Failure
- confirm policy deployment
- confirm role lookup in `admin_users`
- temporarily disable affected write path rather than widening policy
