# Database (planned — Kiro Phase 05)

Implement on **Supabase free tier** with RLS on every table. Until then, seed data lives in `content/profile.ts`.

## Tables

### `profiles`
Public bio fields: name, title, location, email, phone, about paragraphs, greeting, intro, social URLs, resume storage path, avatar path.

### `experience`
company, title, start, end, current (bool), summary, sort_order. Admin CRUD. Public read published rows.

### `projects`
title, slug, category, summary, highlights (jsonb), cta_label, destination_url (never selected into public JSON that is rendered as text — fetch only for redirect/CTA action), featured, published, updated_at, sort_order.

### `project_images`
project_id, storage_path, sort_order.

### `contact_messages`
name, email, company (nullable), message (nullable), created_at, read (bool).  
Public: insert only via server route (or locked insert policy). Public must not SELECT.

### `site_settings` (optional)
key/value for LinkedIn/Instagram once provided.

## RLS sketch

- `profiles`, `experience`, `projects` (published): `SELECT` for `anon`
- `projects.destination_url`: prefer serving via a server action so the HTML never prints the raw URL
- `contact_messages`: `INSERT` for server/anon with checks; `SELECT/UPDATE` authenticated admin only
- Storage: public read for published images; authenticated write

## Indexes

- `projects(updated_at desc)` for home “recent”
- `contact_messages(read, created_at desc)`
