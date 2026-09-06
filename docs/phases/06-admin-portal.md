# Phase 06 — Admin portal

**Status:** `[x] Complete` — Kiro 2026-09-03

## Tabs (client brief)

1. **Messages** — unread/read
2. **Projects** — CRUD, multi image upload, destination URL (hidden on public site)
3. **Experience** — add/edit roles and dates, mark current role

## Also

- `/admin/login` via Supabase Auth (email magic link or password — free Auth)
- Session-gated layout
- Optional: resume replace + profile photo

## Security

Hiding `/admin` is not enough. Server-side session on every mutation.
