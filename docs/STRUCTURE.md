# STRUCTURE.md (living)

Update this file whenever files, folders, routes, or data sources change.

Last updated: 2026-09-07 (Kiro — Phase 08 complete)

## Implementation status

- [x] Next.js app scaffold
- [x] Docs + phase files for Kiro
- [x] Resume extraction → `content/profile.ts`
- [x] Dark (red galactic) / light (glitter) themes + spreading toggle
- [x] Cursor/touch starfield
- [x] Loading screen
- [x] Home / Services / Projects / Contact
- [x] Project cards (hover glow, slideshow reset)
- [x] Contact form UI + API validation
- [x] Supabase client/server helpers + middleware auth guard
- [x] SQL migration + RLS policies (`supabase/migrations/001_initial.sql`)
- [x] Seed script (`npm run seed`)
- [x] Server-side data fetching with local fallback (`lib/data.ts`)
- [x] `/api/project-redirect/[slug]` — destination URL never rendered in HTML
- [x] Contact API persists to `contact_messages` with rate limiting
- [x] Admin portal: `/admin/login` magic link, protected layout, tab nav
- [x] Admin: Messages tab (read/unread toggle, delete, expand body)
- [x] Admin: Projects tab (CRUD, image upload/delete via Supabase Storage)
- [x] Admin: Experience tab (add/edit/delete roles, mark current)
- [x] Phase 08 — Polish & accessibility
- [x] ESLint clean build, seed script fixed
- [x] Footer / Header live from Supabase
- [x] Admin Profile tab (bio, social links, avatar upload)
- [x] Services page full layout
- [x] Custom 404 with galactic theme
- [x] robots.txt + sitemap.xml
- [x] Open Graph + Twitter card + OG image route
- [x] Accessibility: skip link, sr-only, ARIA on header/footer/form
- [ ] Phase 09 — Deployment to Vercel
- [!] Profile photo missing (initials placeholder until admin uploads one)
- [!] LinkedIn / Instagram URLs missing from resume — add via Supabase `site_settings`

## Project tree

```text
Abdullah portfolio/
├── ABDULLAH CV (1).pdf
├── Abdullah_Khan_Portfolio_PROJECT_SPEC.md
├── README.md
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
├── eslint.config.mjs
├── middleware.ts                         ← auth session refresh + /admin guard
├── .env.example
├── .gitignore
├── .kiro/
│   └── steering/
│       ├── product.md
│       ├── tech.md
│       └── structure.md
├── app/
│   ├── globals.css                       ← public + admin styles
│   ├── layout.tsx
│   ├── page.tsx                          ← server, revalidate=60
│   ├── admin/
│   │   ├── layout.tsx                    ← session-gated, injects AdminNav
│   │   ├── page.tsx                      ← Messages tab
│   │   ├── login/
│   │   │   ├── page.tsx
│   │   │   └── actions.ts                ← sendMagicLink, signOut
│   │   ├── messages/
│   │   │   └── actions.ts                ← toggleRead, deleteMessage
│   │   ├── profile/
│   │   │   ├── page.tsx                  ← NEW: bio, social links, avatar
│   │   │   └── actions.ts                ← upsertProfile, uploadAvatar
│   │   ├── projects/
│   │   │   ├── page.tsx
│   │   │   ├── actions.ts                ← upsertProject, deleteProject, uploadProjectImage
│   │   │   ├── new/page.tsx
│   │   │   └── [id]/page.tsx
│   │   └── experience/
│   │       ├── page.tsx
│   │       └── actions.ts                ← upsertRole, deleteRole
│   ├── api/
│   │   ├── auth/callback/route.ts        ← magic-link exchange
│   │   ├── contact/route.ts              ← rate-limited, persists to Supabase
│   │   └── project-redirect/[slug]/route.ts ← server-side URL redirect
│   ├── og-image.png/
│   │   └── route.tsx                     ← NEW: edge ImageResponse 1200×630
│   ├── not-found.tsx                     ← NEW: custom 404 galactic theme
│   ├── robots.ts                         ← NEW: blocks /admin /api/, declares sitemap
│   ├── sitemap.ts                        ← NEW: static + dynamic project routes
│   ├── contact/page.tsx
│   ├── projects/page.tsx                 ← server, revalidate=60
│   └── services/page.tsx                 ← NEW: full layout (services, skills, CTA)
├── components/
│   ├── admin/
│   │   ├── admin-nav.tsx                 ← sticky tab nav + sign-out (4 tabs now)
│   │   ├── login-form.tsx
│   │   ├── messages-table.tsx
│   │   ├── projects-table.tsx
│   │   ├── project-form.tsx
│   │   ├── image-manager.tsx
│   │   ├── experience-list.tsx
│   │   ├── experience-form.tsx
│   │   ├── profile-form.tsx              ← NEW: bio + social links form
│   │   └── avatar-upload.tsx             ← NEW: upload photo to Storage
│   ├── background/starfield.tsx
│   ├── contact/contact-form.tsx
│   ├── home/
│   │   ├── about.tsx                     ← accepts props (ProfileData)
│   │   ├── contact-section.tsx           ← accepts name/email props
│   │   ├── experience.tsx                ← accepts ExperienceItem[] prop
│   │   ├── featured-projects.tsx         ← accepts PublicProject[] prop
│   │   ├── hero.tsx                      ← accepts ProfileData prop
│   │   └── skills.tsx                    ← accepts SkillGroup[] prop
│   ├── layout/
│   │   ├── footer.tsx                    ← async Server Component, social from Supabase
│   │   ├── header.tsx                    ← async Server Component wrapper
│   │   ├── header-client.tsx             ← NEW: Client Component (nav, menu, theme)
│   │   ├── loading-screen.tsx
│   │   └── site-shell.tsx                ← main#main-content for skip link
│   ├── portfolio/project-card.tsx        ← PublicProject type, redirect via API
│   ├── providers/app-providers.tsx
│   └── theme/
│       ├── theme-provider.tsx
│       └── theme-toggle.tsx
├── content/
│   └── profile.ts                        ← seed / fallback data (no DB needed in dev)
├── lib/
│   ├── data.ts                           ← server-side fetch layer (Supabase + fallback)
│   └── supabase/
│       ├── client.ts                     ← browser anon client
│       ├── middleware.ts                 ← session refresh helper
│       ├── server.ts                     ← cookie-based server client
│       └── types.ts                      ← hand-written DB types
├── supabase/
│   ├── migrations/
│   │   └── 001_initial.sql              ← run in Supabase SQL editor
│   └── seed.ts                          ← `npm run seed` after configuring .env.local
├── docs/
│   ├── README.md
│   ├── KIRO.md
│   ├── STRUCTURE.md
│   ├── ARCHITECTURE.md
│   ├── DESIGN_SYSTEM.md
│   ├── DATABASE.md
│   ├── SECURITY.md
│   ├── PERFORMANCE.md
│   ├── DEPLOYMENT.md
│   ├── RESUME_DATA.md
│   ├── phases/01–09
│   └── decisions/ADR-001-initial-architecture.md
└── public/
    └── Abdullah-Khan-Resume.pdf
```

## File responsibilities

| Path | Responsibility |
| --- | --- |
| `middleware.ts` | Session refresh on every request; redirect unauthenticated to `/admin/login` |
| `lib/data.ts` | Server-side data fetch layer — Supabase with content/profile.ts fallback |
| `lib/supabase/client.ts` | Browser anon Supabase client (Client Components only) |
| `lib/supabase/server.ts` | Cookie-based server Supabase client (Server Components, Route Handlers) |
| `lib/supabase/middleware.ts` | updateSession() used by middleware.ts |
| `lib/supabase/types.ts` | Hand-written Database type definitions |
| `content/profile.ts` | Resume-backed copy — seed source and dev fallback |
| `app/page.tsx` | Home composition — parallel server fetches, revalidate=60 |
| `app/globals.css` | Theme tokens + public layout + admin styles |
| `app/admin/layout.tsx` | Session-gated admin chrome |
| `app/admin/page.tsx` | Messages tab |
| `app/admin/projects/` | Projects CRUD + image management |
| `app/admin/experience/` | Work history CRUD |
| `app/api/auth/callback/route.ts` | Magic-link session exchange |
| `app/api/contact/route.ts` | Rate-limited contact form persistence |
| `app/api/project-redirect/[slug]/route.ts` | Server-side destination URL redirect |
| `components/background/starfield.tsx` | Pointer/touch galactic canvas |
| `components/theme/theme-toggle.tsx` | Spreading dark/light control |
| `components/portfolio/project-card.tsx` | Glow + slideshow + redirect via API |
| `supabase/migrations/001_initial.sql` | Full schema + RLS — run once in Supabase |
| `supabase/seed.ts` | Populate DB from profile.ts (`npm run seed`) |
| `docs/STRUCTURE.md` | This map |

## Recent changes

- 2026-09-03: Cursor — initialized Next.js, documentation system, and public galactic frontend.
- 2026-09-03: Kiro — Phase 05/06/07: Supabase integration, server data layer, admin portal (login + Messages + Projects + Experience tabs), project redirect API, contact persistence with rate limiting.
- 2026-09-07: Kiro — Phase 08: ESLint fixed, seed script fixed, footer/header live from Supabase, admin Profile tab, Services page full layout, custom 404, robots.txt, sitemap.xml, OG image, full accessibility pass.
