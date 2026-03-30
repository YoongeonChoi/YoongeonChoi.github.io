# Machine-Readable Constants

```ts
supported_locales = ["ko", "en"]
content_statuses = ["draft", "in_review", "scheduled", "published", "retired", "archived"]
contact_reasons = ["collaboration", "job", "speaking", "question", "other"]
media_types = ["hero", "cover", "inline", "og", "avatar", "gallery"]
redirect_status_codes = [308]
terminal_http_statuses = [410]
preview_token_default_ttl_hours = 48
preview_token_max_ttl_hours = 72
signed_upload_url_ttl_hours = 2
turnstile_token_ttl_seconds = 300
contact_rate_limit = { per_2min: 1, per_hour: 3, per_day: 10 }
max_upload_bytes = 10485760
max_upload_pixels = 20000000
max_images_per_content = 20
analytics_raw_retention_days = 90
analytics_aggregate_retention_months = 13
event_ingest_soft_cap_monthly = 250000
revision_hot_limit_per_content = 50
revision_snapshot_hard_cap_bytes_compressed = 524288
og_regeneration_global_daily_cap = 50
og_regeneration_per_content_hourly_cap = 3
410_min_retention_days = 30
```
