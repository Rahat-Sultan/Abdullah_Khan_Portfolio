# Phase 05 — Supabase

**Status:** `[x] Complete` — Kiro 2026-09-03

## Tasks

1. Create free Supabase project
2. Add env vars (see `.env.example`)
3. `lib/supabase/client.ts` (browser, anon key only)
4. `lib/supabase/server.ts` (server, cookies)
5. SQL migrations in `supabase/migrations/` matching `docs/DATABASE.md`
6. Enable RLS; write policies
7. Seed from `content/profile.ts` / `docs/RESUME_DATA.md`
8. Storage buckets
9. Swap public pages to server fetches
10. Update `STRUCTURE.md`

## Out of scope

Admin UI (Phase 06), message persistence polish (Phase 07) — but schema should include those tables now.
