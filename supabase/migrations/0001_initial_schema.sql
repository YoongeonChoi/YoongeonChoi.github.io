create extension if not exists pgcrypto;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'content_status') then
    create type public.content_status as enum ('draft', 'in_review', 'scheduled', 'published', 'retired', 'archived');
  end if;
  if not exists (select 1 from pg_type where typname = 'translation_status') then
    create type public.translation_status as enum ('draft', 'published', 'stale');
  end if;
  if not exists (select 1 from pg_type where typname = 'admin_role') then
    create type public.admin_role as enum ('owner', 'editor', 'viewer');
  end if;
  if not exists (select 1 from pg_type where typname = 'content_type') then
    create type public.content_type as enum ('posts', 'projects');
  end if;
  if not exists (select 1 from pg_type where typname = 'contact_reason') then
    create type public.contact_reason as enum ('collaboration', 'job', 'speaking', 'question', 'other');
  end if;
end $$;

create or replace function public.current_admin_role()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select role::text
  from public.admin_users
  where user_id = auth.uid()
  limit 1
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.current_admin_role() is not null
$$;

create table if not exists public.admin_users (
  user_id uuid primary key,
  role public.admin_role not null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  status public.content_status not null default 'draft',
  version integer not null default 1 check (version > 0),
  source_locale text not null check (source_locale in ('ko', 'en')),
  author_id uuid,
  assigned_editor_id uuid,
  cover_asset_id uuid,
  og_image_asset_id uuid,
  published_at timestamptz,
  scheduled_at timestamptz,
  retired_at timestamptz,
  archived_at timestamptz,
  deleted_at timestamptz,
  deleted_by uuid,
  reviewed_by uuid,
  current_revision_number integer not null default 0 check (current_revision_number >= 0),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint posts_status_invariant check (
    (status in ('draft', 'in_review') and published_at is null and scheduled_at is null and retired_at is null and archived_at is null)
    or (status = 'scheduled' and published_at is null and scheduled_at is not null and retired_at is null and archived_at is null)
    or (status = 'published' and published_at is not null and scheduled_at is null and retired_at is null and archived_at is null)
    or (status = 'retired' and published_at is not null and scheduled_at is null and retired_at is not null and archived_at is null)
    or (status = 'archived' and archived_at is not null and scheduled_at is null)
  )
);

create table if not exists public.post_translations (
  post_id uuid not null references public.posts(id) on delete cascade,
  locale text not null check (locale in ('ko', 'en')),
  slug text not null,
  title text not null,
  summary text not null,
  body_mdx text not null default '',
  seo_title text not null,
  seo_description text not null,
  translation_status public.translation_status not null default 'draft',
  translation_updated_at timestamptz,
  translation_needs_review boolean not null default false,
  translation_completeness_score integer not null default 0 check (translation_completeness_score between 0 and 100),
  deprecated_note text,
  deleted_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  primary key (post_id, locale)
);

create unique index if not exists post_translations_locale_slug_unique
  on public.post_translations(locale, slug)
  where deleted_at is null;

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  status public.content_status not null default 'draft',
  version integer not null default 1 check (version > 0),
  source_locale text not null check (source_locale in ('ko', 'en')),
  author_id uuid,
  assigned_editor_id uuid,
  cover_asset_id uuid,
  og_image_asset_id uuid,
  published_at timestamptz,
  scheduled_at timestamptz,
  retired_at timestamptz,
  archived_at timestamptz,
  deleted_at timestamptz,
  deleted_by uuid,
  reviewed_by uuid,
  current_revision_number integer not null default 0 check (current_revision_number >= 0),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint projects_status_invariant check (
    (status in ('draft', 'in_review') and published_at is null and scheduled_at is null and retired_at is null and archived_at is null)
    or (status = 'scheduled' and published_at is null and scheduled_at is not null and retired_at is null and archived_at is null)
    or (status = 'published' and published_at is not null and scheduled_at is null and retired_at is null and archived_at is null)
    or (status = 'retired' and published_at is not null and scheduled_at is null and retired_at is not null and archived_at is null)
    or (status = 'archived' and archived_at is not null and scheduled_at is null)
  )
);

create table if not exists public.project_translations (
  project_id uuid not null references public.projects(id) on delete cascade,
  locale text not null check (locale in ('ko', 'en')),
  slug text not null,
  title text not null,
  summary text not null,
  body_mdx text not null default '',
  seo_title text not null,
  seo_description text not null,
  translation_status public.translation_status not null default 'draft',
  translation_updated_at timestamptz,
  translation_needs_review boolean not null default false,
  translation_completeness_score integer not null default 0 check (translation_completeness_score between 0 and 100),
  deprecated_note text,
  deleted_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  primary key (project_id, locale)
);

create unique index if not exists project_translations_locale_slug_unique
  on public.project_translations(locale, slug)
  where deleted_at is null;

create table if not exists public.content_revisions (
  id uuid primary key default gen_random_uuid(),
  content_type public.content_type not null,
  content_id uuid not null,
  locale text check (locale in ('ko', 'en')),
  revision_number integer not null check (revision_number > 0),
  snapshot_jsonb jsonb not null,
  snapshot_bytes integer not null check (snapshot_bytes >= 0),
  created_by uuid,
  change_summary text,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.redirect_history (
  id uuid primary key default gen_random_uuid(),
  content_type public.content_type not null,
  content_id uuid not null,
  locale text not null check (locale in ('ko', 'en')),
  from_slug text not null,
  to_slug text not null,
  redirect_status_code integer not null check (redirect_status_code in (308)),
  active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  expires_at timestamptz
);

create unique index if not exists redirect_history_active_unique
  on public.redirect_history(content_type, locale, from_slug)
  where active = true;

create table if not exists public.reserved_slugs (
  id uuid primary key default gen_random_uuid(),
  content_type public.content_type not null,
  locale text not null check (locale in ('ko', 'en')),
  slug text not null,
  reason text not null,
  reserved_at timestamptz not null default timezone('utc', now())
);

create unique index if not exists reserved_slugs_unique
  on public.reserved_slugs(content_type, locale, slug);

create table if not exists public.post_supersessions (
  from_post_id uuid primary key references public.posts(id) on delete cascade,
  to_post_id uuid not null references public.posts(id),
  created_at timestamptz not null default timezone('utc', now()),
  created_by uuid,
  constraint no_post_self_supersession check (from_post_id <> to_post_id)
);

create table if not exists public.project_supersessions (
  from_project_id uuid primary key references public.projects(id) on delete cascade,
  to_project_id uuid not null references public.projects(id),
  created_at timestamptz not null default timezone('utc', now()),
  created_by uuid,
  constraint no_project_self_supersession check (from_project_id <> to_project_id)
);

create table if not exists public.media_assets (
  id uuid primary key default gen_random_uuid(),
  bucket text not null,
  path text not null,
  mime text not null,
  bytes integer not null check (bytes > 0 and bytes <= 10485760),
  width integer check (width is null or width > 0),
  height integer check (height is null or height > 0),
  checksum text,
  focal_point_x numeric(5,2),
  focal_point_y numeric(5,2),
  status text not null default 'uploaded',
  uploaded_by uuid,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create unique index if not exists media_assets_bucket_path_unique
  on public.media_assets(bucket, path);

create table if not exists public.media_variants (
  id uuid primary key default gen_random_uuid(),
  media_asset_id uuid not null references public.media_assets(id) on delete cascade,
  variant_kind text not null,
  pipeline_version integer not null default 1,
  bucket text not null,
  path text not null,
  mime text not null,
  bytes integer not null check (bytes >= 0),
  width integer,
  height integer,
  status text not null default 'ready',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create unique index if not exists media_variants_unique
  on public.media_variants(media_asset_id, variant_kind, pipeline_version);

create table if not exists public.post_media_refs (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts(id) on delete cascade,
  media_asset_id uuid not null references public.media_assets(id) on delete restrict,
  usage_slot text not null,
  locale text check (locale in ('ko', 'en')),
  created_at timestamptz not null default timezone('utc', now())
);

create unique index if not exists post_media_refs_unique
  on public.post_media_refs(post_id, media_asset_id, usage_slot, coalesce(locale, 'all'));

create table if not exists public.project_media_refs (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  media_asset_id uuid not null references public.media_assets(id) on delete restrict,
  usage_slot text not null,
  locale text check (locale in ('ko', 'en')),
  created_at timestamptz not null default timezone('utc', now())
);

create unique index if not exists project_media_refs_unique
  on public.project_media_refs(project_id, media_asset_id, usage_slot, coalesce(locale, 'all'));

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  reason public.contact_reason not null,
  email_ciphertext text not null,
  name_ciphertext text,
  message_ciphertext text not null,
  link_1 text,
  link_2 text,
  ip_hash text not null,
  ua_hash text not null,
  status text not null default 'open',
  created_at timestamptz not null default timezone('utc', now()),
  closed_at timestamptz,
  deleted_at timestamptz,
  abuse_hold_until timestamptz
);

create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_user_id uuid,
  resource_type text not null,
  resource_id text not null,
  action text not null,
  before_jsonb jsonb,
  after_jsonb jsonb,
  metadata_jsonb jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  event_name text not null,
  event_schema_version integer not null default 1,
  locale text,
  route text not null,
  content_type text,
  content_id text,
  session_id text,
  referrer text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.web_vitals_events (
  id uuid primary key default gen_random_uuid(),
  metric_name text not null,
  metric_value numeric not null,
  route text not null,
  session_id text,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.site_settings (
  key text primary key,
  value_jsonb jsonb not null,
  updated_at timestamptz not null default timezone('utc', now()),
  updated_by uuid
);

alter table public.admin_users enable row level security;
alter table public.posts enable row level security;
alter table public.post_translations enable row level security;
alter table public.projects enable row level security;
alter table public.project_translations enable row level security;
alter table public.content_revisions enable row level security;
alter table public.redirect_history enable row level security;
alter table public.reserved_slugs enable row level security;
alter table public.post_supersessions enable row level security;
alter table public.project_supersessions enable row level security;
alter table public.media_assets enable row level security;
alter table public.media_variants enable row level security;
alter table public.post_media_refs enable row level security;
alter table public.project_media_refs enable row level security;
alter table public.contact_submissions enable row level security;
alter table public.audit_logs enable row level security;
alter table public.analytics_events enable row level security;
alter table public.web_vitals_events enable row level security;
alter table public.site_settings enable row level security;

create policy if not exists admin_users_self_select on public.admin_users
  for select using (user_id = auth.uid() or public.is_admin());

create policy if not exists posts_public_select on public.posts
  for select using (deleted_at is null and status in ('published', 'retired'));
create policy if not exists posts_admin_all on public.posts
  for all using (public.is_admin()) with check (public.is_admin());

create policy if not exists post_translations_public_select on public.post_translations
  for select using (
    deleted_at is null and exists (
      select 1 from public.posts
      where posts.id = post_translations.post_id
        and posts.deleted_at is null
        and posts.status in ('published', 'retired')
    )
  );
create policy if not exists post_translations_admin_all on public.post_translations
  for all using (public.is_admin()) with check (public.is_admin());

create policy if not exists projects_public_select on public.projects
  for select using (deleted_at is null and status in ('published', 'retired'));
create policy if not exists projects_admin_all on public.projects
  for all using (public.is_admin()) with check (public.is_admin());

create policy if not exists project_translations_public_select on public.project_translations
  for select using (
    deleted_at is null and exists (
      select 1 from public.projects
      where projects.id = project_translations.project_id
        and projects.deleted_at is null
        and projects.status in ('published', 'retired')
    )
  );
create policy if not exists project_translations_admin_all on public.project_translations
  for all using (public.is_admin()) with check (public.is_admin());

create policy if not exists admin_only_all_content_revisions on public.content_revisions
  for all using (public.is_admin()) with check (public.is_admin());
create policy if not exists admin_only_all_redirect_history on public.redirect_history
  for all using (public.is_admin()) with check (public.is_admin());
create policy if not exists admin_only_all_reserved_slugs on public.reserved_slugs
  for all using (public.is_admin()) with check (public.is_admin());
create policy if not exists admin_only_all_post_supersessions on public.post_supersessions
  for all using (public.is_admin()) with check (public.is_admin());
create policy if not exists admin_only_all_project_supersessions on public.project_supersessions
  for all using (public.is_admin()) with check (public.is_admin());
create policy if not exists admin_only_all_media_assets on public.media_assets
  for all using (public.is_admin()) with check (public.is_admin());
create policy if not exists admin_only_all_media_variants on public.media_variants
  for all using (public.is_admin()) with check (public.is_admin());
create policy if not exists admin_only_all_post_media_refs on public.post_media_refs
  for all using (public.is_admin()) with check (public.is_admin());
create policy if not exists admin_only_all_project_media_refs on public.project_media_refs
  for all using (public.is_admin()) with check (public.is_admin());
create policy if not exists admin_only_all_audit_logs on public.audit_logs
  for all using (public.is_admin()) with check (public.is_admin());
create policy if not exists admin_only_all_site_settings on public.site_settings
  for all using (public.is_admin()) with check (public.is_admin());

create policy if not exists contact_public_insert on public.contact_submissions
  for insert
  to anon, authenticated
  with check (true);
create policy if not exists contact_admin_select on public.contact_submissions
  for select using (public.is_admin());
create policy if not exists contact_admin_update on public.contact_submissions
  for update using (public.is_admin()) with check (public.is_admin());

create policy if not exists analytics_public_insert on public.analytics_events
  for insert to anon, authenticated
  with check (true);
create policy if not exists analytics_admin_select on public.analytics_events
  for select using (public.is_admin());

create policy if not exists web_vitals_public_insert on public.web_vitals_events
  for insert to anon, authenticated
  with check (true);
create policy if not exists web_vitals_admin_select on public.web_vitals_events
  for select using (public.is_admin());
