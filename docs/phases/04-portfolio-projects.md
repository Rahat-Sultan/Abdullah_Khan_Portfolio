# Phase 04 — Portfolio project cards

**Status:** `[~] UI done; data still local`

## Behavior shipped

- Card hover glow/lift
- Fallback nebula slides rotate while viewed
- Reset to first slide on pointer leave, blur, off-screen, or end of cycle
- CTA opens URL in a new tab **without showing the URL**
- Home shows 3 most recent (`updatedAt`); `/projects` shows all

## Kiro

- Load from Supabase
- Real images from Storage
- Admin-controlled `updated_at` for “recent”
- Safe redirect helper if you prefer not to send `destination_url` to the client at all (e.g. `/api/projects/[id]/visit`)
