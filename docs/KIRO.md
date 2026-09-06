# Kiro operating guide

Cursor built the **foundation + public frontend**. Kiro continues from **Phase 05** unless a listed `[!]` item in `STRUCTURE.md` must be fixed first.

## Before every phase

1. Read `docs/STRUCTURE.md`
2. Read only `docs/phases/NN-*.md` for the phase you are doing
3. Read supporting docs if the phase mentions them
4. Implement **that phase only**
5. Run `npm run lint` and `npm run build`
6. Update `docs/STRUCTURE.md` (tree, file responsibilities, status, changelog)
7. Mark the phase file status complete

## Rules

- Do not invent Abdullah’s data.
- Never put `SUPABASE_SERVICE_ROLE_KEY` in client code or `NEXT_PUBLIC_*`.
- Keep animations cheap; respect `prefers-reduced-motion`.
- Destination URLs on projects must never be visible as raw text in the public UI.
- Experience, projects, and messages must become admin-editable (do not leave them hardcoded after those phases).
- Prefer editing `content/profile.ts` only as a seed; production data lives in Supabase after Phase 05.

## Suggested Kiro sequence from here

| Phase | File | Status after Cursor |
| --- | --- | --- |
| 01 Foundation | `phases/01-foundation.md` | Done (Cursor) |
| 02 Design system | `phases/02-design-system.md` | Done enough to polish later |
| 03 Public pages | `phases/03-public-pages.md` | Public UI shipped |
| 04 Portfolio cards | `phases/04-portfolio-projects.md` | UI shipped; data still local |
| 05 Supabase | `phases/05-supabase.md` | **Kiro starts here** |
| 06 Admin portal | `phases/06-admin-portal.md` | Stub route only |
| 07 Contact | `phases/07-contact-system.md` | Form + API stub |
| 08 Polish | `phases/08-polish-accessibility.md` | Partial |
| 09 Deploy | `phases/09-testing-deployment.md` | Not started |

Steering copies also live in `.kiro/steering/` for the Kiro IDE.

## Sql commands that kiro gave me that I'll be using to set up database on Mysql

-- EXTENSIONS
create extension if not exists "pgcrypto";

-- ── profiles ─────────────────────────────────────────────────
create table if not exists profiles (
  id               uuid primary key default gen_random_uuid(),
  name             text not null,
  title            text not null,
  location         text,
  email            text,
  phone            text,
  greeting         text,
  intro            text,
  about            text[],
  social_email     text,
  social_linkedin  text,
  social_instagram text,
  resume_path      text,
  avatar_path      text,
  updated_at       timestamptz not null default now()
);

-- ── experience ───────────────────────────────────────────────
create table if not exists experience (
  id          uuid primary key default gen_random_uuid(),
  company     text not null,
  title       text not null,
  start_date  text not null,
  end_date    text,
  current     boolean not null default false,
  summary     text,
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create index if not exists experience_sort_idx on experience (sort_order asc);

-- ── projects ─────────────────────────────────────────────────
create table if not exists projects (
  id              uuid primary key default gen_random_uuid(),
  slug            text not null unique,
  title           text not null,
  category        text,
  summary         text,
  highlights      text[],
  cta_label       text,
  destination_url text,
  featured        boolean not null default false,
  published       boolean not null default true,
  sort_order      integer not null default 0,
  updated_at      timestamptz not null default now(),
  created_at      timestamptz not null default now()
);
create index if not exists projects_updated_idx on projects (updated_at desc);
create index if not exists projects_featured_idx on projects (featured, published);

-- ── project_images ───────────────────────────────────────────
create table if not exists project_images (
  id            uuid primary key default gen_random_uuid(),
  project_id    uuid not null references projects (id) on delete cascade,
  storage_path  text not null,
  sort_order    integer not null default 0,
  created_at    timestamptz not null default now()
);
create index if not exists project_images_project_idx on project_images (project_id, sort_order asc);

-- ── contact_messages ─────────────────────────────────────────
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

-- ── site_settings ────────────────────────────────────────────
create table if not exists site_settings (
  key        text primary key,
  value      text not null,
  updated_at timestamptz not null default now()
);

-- ── Row Level Security ───────────────────────────────────────
alter table profiles         enable row level security;
alter table experience       enable row level security;
alter table projects         enable row level security;
alter table project_images   enable row level security;
alter table contact_messages enable row level security;
alter table site_settings    enable row level security;

create policy "profiles_public_read"   on profiles for select using (true);
create policy "profiles_admin_all"     on profiles for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "experience_public_read" on experience for select using (true);
create policy "experience_admin_all"   on experience for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "projects_public_read"   on projects for select using (published = true);
create policy "projects_admin_all"     on projects for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "project_images_public_read" on project_images for select using (true);
create policy "project_images_admin_all"   on project_images for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "contact_messages_anon_insert" on contact_messages for insert with check (true);
create policy "contact_messages_admin_all"   on contact_messages for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "site_settings_public_read" on site_settings for select using (true);
create policy "site_settings_admin_all"   on site_settings for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- ── updated_at triggers ──────────────────────────────────────
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger experience_updated_at   before update on experience   for each row execute function set_updated_at();
create trigger projects_updated_at     before update on projects     for each row execute function set_updated_at();
create trigger profiles_updated_at     before update on profiles     for each row execute function set_updated_at();
create trigger site_settings_updated_at before update on site_settings for each row execute function set_updated_at();
