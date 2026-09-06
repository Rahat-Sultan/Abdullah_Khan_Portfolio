# Deployment (Vercel free)

## App

1. Push to GitHub (free)
2. Import project in Vercel
3. Root directory: repository root
4. Build: `next build` (default)
5. Env: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_SITE_URL` (production origin). Service role: **server env only**.

## Supabase

Create a free project. Run SQL from Phase 05. Never enable RLS-off “for convenience”.

## Domain

Optional Vercel subdomain on the free plan.

## Checklist before first production deploy

- [ ] `npm run build` locally
- [ ] No secrets in client bundles
- [ ] Resume PDF present at `/Abdullah-Khan-Resume.pdf`
- [ ] Real profile photo if the client supplied one
- [ ] Admin auth enabled (do not ship the stub as “secure”)
