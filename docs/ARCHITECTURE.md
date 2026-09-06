# Architecture

## Runtime

- **Next.js App Router** on Vercel
- **React Server Components** by default; Client Components only for theme, loader, starfield, nav, cards, forms
- **Node.js** route handlers under `app/api/`

## Data flow (target)

```
Resume PDF (admin upload)
  → extract/review (Kiro later)
  → Supabase tables
  → server data functions
  → pages/components
```

**Current (Cursor foundation):** `content/profile.ts` seeds the UI. Frontend must not parse the PDF on each request.

## Auth (planned)

Supabase Auth, cookie session, server checks on `/admin/*`. `/admin` is currently a public stub — treat as insecure until Phase 06.

## Storage (planned)

Supabase Storage buckets (free tier): `project-images`, `resume`, optional `profile`.

## Public routes

| Path | Purpose |
| --- | --- |
| `/` | Home: hero, about, skills, experience, recent projects, contact |
| `/services` | Service cards from resume expertise |
| `/projects` | Full project grid |
| `/contact` | Dedicated contact form |
| `/admin` | Stub |

## API

| Path | Purpose |
| --- | --- |
| `POST /api/contact` | Validates name/email; logs payload; Supabase insert in Phase 07 |

## Theme

`data-theme="dark" | "light"` on `<html>`. Default dark. Persisted in `localStorage` key `ak-theme`. Inline boot script in `app/layout.tsx` avoids a flash of the wrong theme.

## Background

Custom canvas starfield (`components/background/starfield.tsx`) instead of the full particles.js bundle — same idea (cursor/touch attraction), lower JS cost on the free Vercel plan.
