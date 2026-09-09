# Session Progress — Abdullah Khan Portfolio

Last updated: 2026-09-10 — ALL PHASES COMPLETE ✅

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
| 09 | Deployment, mobile fixes, storage, image reorder | ✅ Complete (Kiro) |

**Live URL:** https://abdullahkhan-two.vercel.app
**GitHub:** https://github.com/Rahat-Sultan/Abdullah_Khan_Portfolio

---

## Git commit history

| Commit | Description |
|--------|-------------|
| `38f41f5` | feat: complete portfolio phases 01-08 (initial push) |
| `3643c48` | chore: set production site URL |
| `0f5903d` | fix: mobile header, theme toggle tap-to-open, Supabase storage bucket |
| `7658841` | fix: project_images sort_order integer overflow → bigint |
| `f0345b4` | docs: mark all phases complete, live verification checklist |
| `0b59557` | feat: drag-and-drop image reordering in admin |
| `9c85b63` | feat: show profile photo in admin nav header |
| `3695940` | feat: add dynamic profile photo as favicon and admin nav avatar |

---

## Post-deployment changes (Phase 09)

### Mobile header fix — `0f5903d`
**Problem:** On phones/tablets, the nav links, theme buttons, and hamburger were all crammed in one row causing overflow.

**Fix:**
- `components/layout/header-client.tsx` — Brand stays left, theme orb + hamburger grouped on the right. Desktop nav hidden on mobile via CSS.
- New `.mobile-nav` full-width dropdown with Home/Services/Projects/Contact and ✕ close button.
- `app/globals.css` — Added `.site-header__right`, `.site-header__desktop-nav`, `.mobile-nav`, `.mobile-nav__link` styles. Media query hides desktop nav below 720px.

### Theme toggle — touch vs desktop — `0f5903d`
**Problem:** On mobile the Dark/Light buttons were always visible, causing header overflow and no way to dismiss them.

**Fix:**
- `components/theme/theme-toggle.tsx` — Detects touch capability on mount via `navigator.maxTouchPoints`. Two completely separate render paths:
  - **Touch (phone/tablet):** Tap orb → vertical dropdown opens below with 🌑 Dark / ✨ Light options. Tap outside closes it.
  - **Desktop:** Hover spreads buttons sideways (original behaviour, unchanged).
- `app/globals.css` — Added `.theme-toggle--touch` and `.theme-toggle__dropdown` styles with `dropdown-in` animation.

### Supabase storage bucket — `0f5903d`
**Problem:** Uploading images in admin showed "Bucket not found".

**Fix:** Created `portfolio` storage bucket via Supabase MCP:
- Public bucket, 5 MB limit, allows jpg/png/webp/gif
- Added 4 RLS policies: `storage_public_read` (SELECT), `storage_admin_insert`, `storage_admin_update`, `storage_admin_delete` (all require `authenticated` role)

### sort_order integer overflow — `7658841`
**Problem:** Uploading an image gave error `value "1788985543888" is out of range for type integer`. The `sort_order` column was `integer` (max ~2.1B) but code used `Date.now()` (13-digit timestamp).

**Fix:**
- Supabase: `ALTER TABLE project_images ALTER COLUMN sort_order TYPE bigint`
- `app/admin/projects/actions.ts` — replaced `Date.now()` with count-based sort order (counts existing images, appends +1)

### Drag-and-drop image reordering — `0b59557`
**Problem:** No way to control the order images appear in the project card slideshow.

**Fix:**
- `components/admin/image-manager.tsx` — Full rewrite with HTML5 drag API (no extra packages):
  - Number badge on each image (1, 2, 3...) shows current order
  - Drag an image to a new position — drop target highlights in accent colour
  - Dragged item fades to 45% opacity while dragging
  - On drop: local state updates optimistically, saves to Supabase, shows "Order saved ✓" for 2 seconds
- `app/admin/projects/actions.ts` — Added `reorderProjectImages()` server action: takes array of `{id, sort_order}` and bulk-updates via `Promise.all`

### Profile photo as favicon — `3695940`
**Enhancement:** Show Abdullah's profile photo as the browser tab icon instead of a generic favicon.

**Implementation:**
- `app/layout.tsx` — Added `generateMetadata()` async function that fetches avatar path from Supabase profiles table and constructs full storage URL
- Dynamic metadata generation sets `icons: { icon: avatarUrl, shortcut: avatarUrl, apple: avatarUrl }` 
- Falls back to `/favicon.ico` if Supabase fetch fails
- `components/admin/admin-nav.tsx` — Shows 32px round profile photo in admin header next to email (already implemented previously)

---

## Live verification (all passed ✅)

| Check | Result |
|-------|--------|
| Home page loads with Supabase data | ✅ |
| Services page — 6 cards + skills + CTA | ✅ |
| Projects page — 6 cards from Supabase | ✅ |
| Contact page — form renders correctly | ✅ |
| 404 "Lost in the galaxy" | ✅ |
| `/robots.txt` — blocks /admin and /api/ | ✅ |
| `/sitemap.xml` — all routes listed | ✅ |
| `/og-image.png` — 1200×630 galactic image | ✅ |
| Mobile header — no overflow, single line | ✅ |
| Mobile theme toggle — tap dropdown, closes outside | ✅ |
| Mobile hamburger — full-width nav, ✕ closes | ✅ |
| Zero console errors / warnings | ✅ |

---

## Content tasks remaining (manual — no code needed)

| Task | Where in admin |
|------|---------------|
| Upload profile photo | `/admin/profile` → Avatar → Upload photo |
| Add LinkedIn URL | `/admin/profile` → Social links → LinkedIn URL |
| Add Instagram URL | `/admin/profile` → Social links → Instagram URL |
| Add destination URLs for projects | `/admin/projects` → Edit project → Destination URL |
| Upload project images | `/admin/projects` → Edit project → Images section |
| Reorder images after upload | `/admin/projects` → Edit project → drag images |

---

## Key files reference

| File | Purpose |
|------|---------|
| `content/profile.ts` | Resume data — seed source and dev fallback |
| `lib/data.ts` | Server-side fetch layer (Supabase + fallback) |
| `lib/supabase/client.ts` | Browser anon Supabase client |
| `lib/supabase/server.ts` | Cookie-based server Supabase client |
| `middleware.ts` | Session refresh + `/admin` auth guard |
| `supabase/migrations/001_initial.sql` | Full DB schema + bigint fix note |
| `supabase/seed.ts` | `npm run seed` — repopulate DB from profile.ts |
| `.env.local` | Local env vars (gitignored) |
| `.env.example` | Template — copy to `.env.local` |
| `app/globals.css` | All CSS — tokens, public layout, admin, mobile |
| `components/admin/image-manager.tsx` | Image upload + drag-to-reorder |
| `components/theme/theme-toggle.tsx` | Touch dropdown / desktop hover spread |
| `components/layout/header-client.tsx` | Mobile-safe header with hamburger |
