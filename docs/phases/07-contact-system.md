# Phase 07 — Contact system

**Status:** `[x] Complete` — Kiro 2026-09-03

`POST /api/contact` accepts name, email, optional company, optional message.

## Kiro

- Insert into `contact_messages`
- Basic rate limit
- Admin marks read/unread
- Do not email unless a free path exists (skip paid Resend/SendGrid)
