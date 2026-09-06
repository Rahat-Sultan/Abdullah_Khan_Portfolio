# Session Progress — Abdullah Khan Portfolio

Last updated: 2026-09-07 (Phase 08 complete)

---

## Overall status

| Phase | Description | Status |
|-------|-------------|--------|
| 01 | Next.js scaffold + docs system | ✅ Complete (Cursor) |
| 02 | Design system — themes, fonts, CSS tokens | ✅ Complete (Cursor) |
| 03 | Public pages — Home, Services, Projects, Contact | ✅ Complete (Cursor) |
| 04 | Portfolio project cards + starfield | ✅ Complete (Cursor) |
| 05 | Supabase integration — schema, clients, data layer | ✅ Complete (Kiro) |
| 06 | Admin portal — login, Messages, Projects, Experience | ✅ Complete (Kiro) |
| 07 | Contact persistence + project redirect API | ✅ Complete (Kiro) |
| 08 | Polish, accessibility, SEO, admin Profile tab | ✅ Complete (Kiro) |
| 09 | Deployment to Vercel | 🔜 Next |

---

## Phase 08 — What was done

### ESLint
- Installed `@eslint/eslintrc@3.3.1`
- `eslint.config.mjs` already used `FlatCompat` — confirmed clean build

### Seed script
- Rewrote `supabase/seed.ts` to use `async main()` (removed top-level await — CJS compat)
- Installed `tsx@4.19.4` locally
- Fixed `npm run seed` → `tsx supabase/seed.ts`
- Successfully seeded: 1 profile, 1 experience row, 6 projects, 4 site_settings

### Footer & Header — live from Supabase
- Added `getSocialLinks()` and `getBrandName()` to `lib/data.ts`
- `Footer` is now a full async Server Component — reads `site_settings` for social links
- `Header` split into:
  - `components/layout/header.tsx` — async Server Component, fetches brand name
  - `components/layout/header-client.tsx` — Client Component with `usePathname` / `useState`
- Footer shows social links as real `<a>` tags when set, greyed-out placeholders when empty

### Admin — Profile tab
- New route: `/admin/profile`
- `ProfileForm` — edits name, title, location, email, phone, greeting, intro, about, all social links
- `AvatarUpload` — uploads to Supabase Storage `portfolio/avatars/{id}.{ext}`, updates `avatar_path`
- `upsertProfile` server action also syncs `site_settings` for social links immediately
- Added **Profile** tab to `AdminNav`

### Services page
- Full layout: service cards grid, platforms & tools skill groups, expertise list, strengths list, CTA panel
- Pulls directly from `content/profile.ts` (all resume-verified data)

### Custom 404 page
- `app/not-found.tsx` — galactic gradient "404" with glow, themed copy, links back home / contact

### SEO
- `app/robots.ts` — blocks `/admin` and `/api/`, declares sitemap URL
- `app/sitemap.ts` — static routes + dynamic project entries, revalidates every hour
- `app/og-image.png/route.tsx` — edge runtime, 1200×630 dark galactic `ImageResponse`
- `app/layout.tsx` — added full `openGraph` and `twitter` metadata blocks pointing to `/og-image.png`

### Accessibility
- `app/globals.css` — added `.sr-only` and `.skip-link` utilities
- `app/layout.tsx` — skip-to-content `<a href="#main-content">` before all content
- `components/layout/site-shell.tsx` — `<main id="main-content" tabIndex={-1}>`
- `components/layout/header-client.tsx` — ARIA roles (`menubar`, `menuitem`), `aria-expanded`, `aria-controls`, visible icon + sr-only label for hamburger
- `components/layout/footer.tsx` — `aria-label` on footer, `<nav>` wrapper for social links
- `components/contact/contact-form.tsx` — explicit `<label htmlFor>` + `id` on all inputs, `aria-required`, `role="alert"` on errors, `aria-live="polite"` on success, `aria-busy` on submit button

### Build result
```
✓ 0 errors, 0 warnings
18 routes generated

/                       dynamic  revalidate 60s
/services               dynamic
/projects               dynamic  revalidate 60s
/contact                dynamic
/not-found (404)        dynamic
/admin                  dynamic
/admin/login            dynamic
/admin/experience       dynamic
/admin/projects         dynamic
/admin/projects/[id]    dynamic
/admin/projects/new     dynamic
/admin/profile          dynamic  ← NEW
/api/auth/callback      dynamic
/api/contact            dynamic
/api/project-redirect/[slug]  dynamic
/og-image.png           dynamic  ← NEW (edge)
/robots.txt             static   ← NEW
/sitemap.xml            dynamic  ← NEW
```

---

## Phase 09 — Deployment checklist (do this next)

Everything is code-complete. These are the steps to go live on Vercel.

### 1 — Push to GitHub
```bash
git init                          # if not already a git repo
git add .
git commit -m "feat: complete portfolio build phases 01-08"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

> ⚠️ Make sure `.gitignore` includes `.env.local` — it already does.

### 2 — Deploy to Vercel
1. Go to [vercel.com](https://vercel.com) → **Add New Project** → import the GitHub repo
2. Framework preset: **Next.js** (auto-detected)
3. Add these **Environment Variables** in the Vercel dashboard:

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://yeaobswwrxqvhithqenj.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | *(your anon key from Supabase → Settings → API)* |
| `NEXT_PUBLIC_SITE_URL` | `https://your-vercel-domain.vercel.app` *(or custom domain)* |
| `SUPABASE_SERVICE_ROLE_KEY` | *(service role key — only needed if you re-run seed from Vercel)* |

4. Click **Deploy**

### 3 — Configure Supabase Auth for production
In Supabase Dashboard → **Authentication → URL Configuration**:
- **Site URL**: `https://your-vercel-domain.vercel.app`
- **Redirect URLs** (add both):
  - `https://your-vercel-domain.vercel.app/api/auth/callback`
  - `http://localhost:3000/api/auth/callback` *(keep for local dev)*

### 4 — Add social links via admin
Once deployed, visit `https://your-domain.vercel.app/admin/login`, sign in, go to **Profile tab** and fill in LinkedIn and Instagram URLs. They appear in the footer immediately (no redeploy needed).

### 5 — Upload profile photo
In the admin **Profile tab** → click **Upload photo** → choose a square image. It'll replace the "AK" initials on the home hero.

### 6 — Post-deploy verification checklist
- [ ] Home page loads and shows resume data
- [ ] Contact form submits → message appears in `/admin` Messages tab
- [ ] Project card "View campaign" button redirects via `/api/project-redirect/`
- [ ] Magic link login works end-to-end
- [ ] `/robots.txt` accessible
- [ ] `/sitemap.xml` accessible
- [ ] OG image visible at `/og-image.png`
- [ ] Theme toggle persists across pages
- [ ] Mobile: hamburger menu opens/closes, starfield responds to touch
- [ ] Skip-to-content link appears on Tab keypress

---

## Key files reference

| File | Purpose |
|------|---------|
| `content/profile.ts` | Resume data — seed source and dev fallback |
| `lib/data.ts` | Server-side fetch layer (Supabase + fallback) |
| `lib/supabase/client.ts` | Browser anon client |
| `lib/supabase/server.ts` | Cookie-based server client |
| `middleware.ts` | Session refresh + `/admin` auth guard |
| `supabase/migrations/001_initial.sql` | Full DB schema — run once in Supabase SQL editor |
| `supabase/seed.ts` | `npm run seed` — populates DB from profile.ts |
| `.env.example` | Copy to `.env.local` and fill in Supabase keys |
| `app/layout.tsx` | Root layout — fonts, skip link, OG metadata |
| `app/globals.css` | All CSS tokens + public + admin styles |
| `app/admin/profile/` | Edit bio, social links, upload avatar |
| `app/admin/projects/` | Projects CRUD + image upload |
| `app/admin/experience/` | Work history CRUD |
| `app/admin/page.tsx` | Messages inbox |

---

## Known gaps (intentional, not bugs)

| Item | Notes |
|------|-------|
| LinkedIn / Instagram URLs | Empty until Abdullah supplies them. Add via `/admin/profile`. |
| Profile photo | "AK" initials shown until photo uploaded via `/admin/profile`. |
| Project destination URLs | All empty — add via `/admin/projects/[id]` per project. |
| Per-project detail pages | Not in scope (single Projects page with cards is the design). |
| Email sending | Contact form stores to DB only. No outbound email (Resend / SendGrid = Phase 09 optional). |
