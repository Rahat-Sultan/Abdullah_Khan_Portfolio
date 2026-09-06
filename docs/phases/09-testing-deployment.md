# Phase 09 — Testing & Deployment

**Status:** `[ ] Ready to execute` — all code complete, awaiting deployment

## Pre-deployment steps (manual)

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "feat: complete portfolio phases 01-08"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### 2. Create Vercel project
- [vercel.com](https://vercel.com) → Add New Project → import repo
- Framework: **Next.js** (auto-detected)
- Root directory: `/` (default)

### 3. Set environment variables in Vercel
| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key |
| `NEXT_PUBLIC_SITE_URL` | `https://your-domain.vercel.app` |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key |

### 4. Configure Supabase Auth redirect URLs
Dashboard → Authentication → URL Configuration:
- Site URL: `https://your-domain.vercel.app`
- Redirect URLs:
  - `https://your-domain.vercel.app/api/auth/callback`
  - `http://localhost:3000/api/auth/callback`

### 5. First-time admin setup after deploy
1. Visit `/admin/login` → enter your email → click magic link
2. Go to **Profile tab** → add LinkedIn + Instagram URLs → Save
3. Go to **Projects tab** → edit each project → add destination URLs if available
4. Go to **Profile tab** → upload profile photo

## Post-deploy verification checklist

- [ ] Home page loads with correct resume data (from Supabase, not fallback)
- [ ] Theme toggle persists (localStorage) across page navigations
- [ ] Starfield canvas renders; moves with mouse; responds to touch on mobile
- [ ] Loading screen appears then fades on first visit
- [ ] Contact form submits → message appears in `/admin` Messages tab with unread badge
- [ ] Mark message as read → badge count decreases
- [ ] Delete message → row removed
- [ ] Create new project in admin → appears on `/projects` page (within 60s revalidate)
- [ ] Upload image to project → appears in card slideshow
- [ ] Set destination URL → clicking CTA button redirects correctly
- [ ] Add experience entry → appears on home page Experience section
- [ ] Magic link login works end-to-end in production
- [ ] `/robots.txt` returns correct content
- [ ] `/sitemap.xml` lists all public routes
- [ ] `/og-image.png` renders the galactic OG image
- [ ] Social share preview shows correct OG title + image (use [opengraph.xyz](https://www.opengraph.xyz))
- [ ] Custom 404 page appears for unknown routes
- [ ] Skip-to-content link appears on Tab keypress at top of page
- [ ] No console errors in production build
- [ ] Lighthouse mobile score ≥ 90 performance

## Optional Phase 09 additions (not yet built)

- [ ] Outbound email notification for new contact messages (Resend — free tier 100 emails/day)
- [ ] Individual project detail pages (`/projects/[slug]`)
- [ ] Admin: drag-to-reorder project sort order
- [ ] Analytics: Vercel Analytics (free, zero-config — add `<Analytics />` component)
