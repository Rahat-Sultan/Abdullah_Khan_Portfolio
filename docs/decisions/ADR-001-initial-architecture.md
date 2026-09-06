# ADR-001 — Initial architecture

## Decision

Next.js App Router + Tailwind tokens + custom canvas starfield + local `content/profile.ts` seed, with Supabase deferred to Kiro Phase 05.

## Why

- Client asked Cursor for foundation docs **and** a working frontend.
- Resume has no photo or social URLs; seeding avoids fake data.
- Full particles.js/tsParticles is heavier than a small canvas on free hosting.
- Public routes match the client brief (Home, Services, Projects, Contact), not the longer optional Notes/Work aliases in the master spec.

## Consequences

Kiro must not treat `content/profile.ts` as the forever source of truth for experience/projects/messages.
