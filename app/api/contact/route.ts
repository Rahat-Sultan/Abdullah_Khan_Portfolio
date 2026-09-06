/**
 * POST /api/contact
 *
 * Validates the contact form payload, rate-limits by IP (in-memory, resets on
 * cold start — sufficient for a free-tier portfolio), then persists to
 * contact_messages via the server Supabase client.
 *
 * RLS policy allows anon INSERT only; SELECT is authenticated-admin-only.
 */

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// ─── In-memory rate limiter (5 submissions per IP per 10 minutes) ─────────────
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_PER_WINDOW = 5;
const ipMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ipMap.get(ip);

  if (!entry || now > entry.resetAt) {
    ipMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  if (entry.count >= MAX_PER_WINDOW) return true;

  entry.count += 1;
  return false;
}

// ─── Email validation ─────────────────────────────────────────────────────────
function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

// ─── Route handler ────────────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  // Best-effort IP extraction (works on Vercel; falls back to "unknown")
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a few minutes before trying again." },
      { status: 429 },
    );
  }

  // ── Parse body ──────────────────────────────────────────────────────────────
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const record = body as {
    name?: unknown;
    email?: unknown;
    company?: unknown;
    message?: unknown;
  };

  const name = typeof record.name === "string" ? record.name.trim().slice(0, 200) : "";
  const email = typeof record.email === "string" ? record.email.trim().slice(0, 320) : "";
  const company =
    typeof record.company === "string" ? record.company.trim().slice(0, 200) : null;
  const message =
    typeof record.message === "string" ? record.message.trim().slice(0, 2000) : null;

  if (!name) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }
  if (!email || !isEmail(email)) {
    return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
  }

  // ── Persist ─────────────────────────────────────────────────────────────────
  if (
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();

    const { error } = await supabase.from("contact_messages").insert({
      name,
      email,
      company: company || null,
      message: message || null,
    });

    if (error) {
      console.error("[contact] Supabase insert error:", error.message);
      return NextResponse.json(
        { error: "Could not save your message. Please try again." },
        { status: 500 },
      );
    }
  } else {
    // Supabase not configured — log locally during development
    console.info("[contact] (no Supabase) received:", {
      name,
      email,
      company,
      hasMessage: Boolean(message),
    });
  }

  return NextResponse.json({ ok: true });
}
