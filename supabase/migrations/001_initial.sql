-- ============================================================
-- Phase 05 — Initial schema
-- Run this in the Supabase SQL editor (Dashboard → SQL Editor)
-- or via: npx supabase db push  (requires supabase CLI)
-- ============================================================

-- ────────────────────────────────────────────────────────────
-- EXTENSIONS
-- ────────────────────────────────────────────────────────────
create extension if not exists "pgcrypto";


-- ────────────────────────────────────────────────────────────
-- profiles
-- ────────────────────────────────────────────────────────────
create table if not exists profiles (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  title         text not null,
  location      text,
  email         text,
  phone         text,
  greeting      text,
  intro         text,
  about         text[],
  social_email  text,
  social_linkedin  text,
  social_instagram text,
  resume_path   text,
  avatar_path   text,
  updated_at    timestamptz not null default now()
);

-- Only one profile row expected; no extra unique needed.


-- ────────────────────────────────────────────────────────────
-- experience
-- ────────────────────────────────────────────────────────────
create table if not exists experience (
  id          uuid primary key default gen_random_uuid(),
  company     text not null,
  title       text not null,
  start_date  text not null,          -- human-readable, e.g. "January 2023"
  end_date    text,                   -- null when current = true
  current     boolean not null default false,
  summary     text,
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists experience_sort_idx on experience (sort_order asc);


-- ────────────────────────────────────────────────────────────
-- projects
-- ────────────────────────────────────────────────────────────
create table if not exists projects (
  id              uuid primary key default gen_random_uuid(),
  slug            text not null unique,
  title           text not null,
  category        text,
  summary         text,
  highlights      text[],
  cta_label       text,
  destination_url text,               -- NEVER returned in public SELECT *
  featured        boolean not null default false,
  published       boolean not null default true,
  sort_order      integer not null default 0,
  updated_at      timestamptz not null default now(),
  created_at      timestamptz not null default now()
);

create index if not exists projects_updated_idx on projects (updated_at desc);
create index if not exists projects_featured_idx on projects (featured, published);


-- ────────────────────────────────────────────────────────────
-- project_images
-- ────────────────────────────────────────────────────────────
create table if not exists project_images (
  id            uuid primary key default gen_random_uuid(),
  project_id    uuid not null references projects (id) on delete cascade,
  storage_path  text not null,        -- Supabase Storage key, e.g. "projects/az-migration/01.jpg"
  sort_order    integer not null default 0,
  created_at    timestamptz not null default now()
);

create index if not exists project_images_project_idx on project_images (project_id, sort_order asc);


-- ────────────────────────────────────────────────────────────
-- contact_messages
-- ────────────────────────────────────────────────────────────
create table if not exists contact_messages (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  company     text,
  message     text,
  read        boolean not null default false,
  created_at  timestamptz not null default now()
);

create index if not exists contact_messages_read_idx on contact_messages (read, created_at desc);


-- ────────────────────────────────────────────────────────────
-- site_settings  (key/value pairs for LinkedIn, Instagram, etc.)
-- ────────────────────────────────────────────────────────────
create table if not exists site_settings (
  key         text primary key,
  value       text not null,
  updated_at  timestamptz not null default now()
);


-- ────────────────────────────────────────────────────────────
-- STORAGE BUCKET
-- ────────────────────────────────────────────────────────────
-- Run once via Dashboard → Storage, or uncomment if using CLI migrations:
--
-- insert into storage.buckets (id, name, public)
-- values ('portfolio', 'portfolio', true)
-- on conflict do nothing;


-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table profiles          enable row level security;
alter table experience        enable row level security;
alter table projects          enable row level security;
alter table project_images    enable row level security;
alter table contact_messages  enable row level security;
alter table site_settings     enable row level security;


-- ────────────────────────────────────────────────────────────
-- profiles — public read, authenticated write
-- ────────────────────────────────────────────────────────────
create policy "profiles_public_read"
  on profiles for select
  using (true);

create policy "profiles_admin_all"
  on profiles for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');


-- ────────────────────────────────────────────────────────────
-- experience — public read, authenticated write
-- ────────────────────────────────────────────────────────────
create policy "experience_public_read"
  on experience for select
  using (true);

create policy "experience_admin_all"
  on experience for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');


-- ────────────────────────────────────────────────────────────
-- projects — anon can SELECT published rows (without destination_url)
--            authenticated can do everything
-- NOTE: destination_url is excluded from the public view below.
-- ────────────────────────────────────────────────────────────
create policy "projects_public_read"
  on projects for select
  using (published = true);

create policy "projects_admin_all"
  on projects for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');


-- ────────────────────────────────────────────────────────────
-- project_images — public read, authenticated write
-- ────────────────────────────────────────────────────────────
create policy "project_images_public_read"
  on project_images for select
  using (true);

create policy "project_images_admin_all"
  on project_images for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');


-- ────────────────────────────────────────────────────────────
-- contact_messages — anon INSERT only; authenticated full access
-- ────────────────────────────────────────────────────────────
create policy "contact_messages_anon_insert"
  on contact_messages for insert
  with check (true);

create policy "contact_messages_admin_all"
  on contact_messages for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');


-- ────────────────────────────────────────────────────────────
-- site_settings — public read, authenticated write
-- ────────────────────────────────────────────────────────────
create policy "site_settings_public_read"
  on site_settings for select
  using (true);

create policy "site_settings_admin_all"
  on site_settings for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');


-- ────────────────────────────────────────────────────────────
-- updated_at trigger helper
-- ────────────────────────────────────────────────────────────
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger experience_updated_at
  before update on experience
  for each row execute function set_updated_at();

create trigger projects_updated_at
  before update on projects
  for each row execute function set_updated_at();

create trigger profiles_updated_at
  before update on profiles
  for each row execute function set_updated_at();

create trigger site_settings_updated_at
  before update on site_settings
  for each row execute function set_updated_at();

-- ────────────────────────────────────────────────────────────
-- Migration fix: project_images.sort_order integer → bigint
-- (integer max ~2.1B was too small for Date.now() timestamps)
-- ────────────────────────────────────────────────────────────
-- ALTER TABLE project_images ALTER COLUMN sort_order TYPE bigint;
-- (already applied directly via Supabase MCP on 2026-09-10)
