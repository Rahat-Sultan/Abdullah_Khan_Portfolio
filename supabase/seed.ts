/**
 * Seed script — Phase 05
 *
 * Populates Supabase from content/profile.ts so you don't have to
 * type everything manually into the dashboard.
 *
 * Usage (after filling .env.local):
 *   npm run seed
 *
 * Requires SUPABASE_SERVICE_ROLE_KEY in .env.local (server-only, never NEXT_PUBLIC_).
 * Safe to re-run: uses upsert on all tables.
 */

import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import { resolve } from "path";

// Load .env.local from repo root
dotenv.config({ path: resolve(process.cwd(), ".env.local") });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local\n" +
      "Copy .env.example → .env.local and fill in your Supabase project credentials.",
  );
  process.exit(1);
}

// Use service-role key — this script NEVER runs in the browser
const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false },
});

// ─── Import seed data ─────────────────────────────────────────────────────
import {
  profile,
  skillGroups,
  experience as experienceData,
  projects as projectsData,
} from "../content/profile";

// ─── Seed functions ───────────────────────────────────────────────────────

async function seedProfiles(): Promise<void> {
  console.log("→ Seeding profiles…");
  const { error } = await supabase.from("profiles").upsert(
    {
      name: profile.name,
      title: profile.title,
      location: profile.location,
      email: profile.email,
      phone: profile.phone,
      greeting: profile.greeting,
      intro: profile.intro,
      about: [...profile.about],
      social_email: profile.social.email,
      social_linkedin: profile.social.linkedin || null,
      social_instagram: profile.social.instagram || null,
      resume_path: profile.resumePath,
      avatar_path: null,
    },
    { onConflict: "id", ignoreDuplicates: false },
  );
  if (error) throw new Error(`profiles: ${error.message}`);
  console.log("  ✓ profiles");
}

async function seedExperience(): Promise<void> {
  console.log("→ Seeding experience…");
  const rows = experienceData.map((e, i) => ({
    company: e.company,
    title: e.title,
    start_date: e.start,
    end_date: e.current ? null : e.end,
    current: e.current,
    summary: e.summary,
    sort_order: i,
  }));

  // Delete existing rows first so re-running stays clean
  await supabase.from("experience").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  const { error } = await supabase.from("experience").insert(rows);
  if (error) throw new Error(`experience: ${error.message}`);
  console.log(`  ✓ ${rows.length} experience row(s)`);
}

async function seedProjects(): Promise<void> {
  console.log("→ Seeding projects…");
  const rows = projectsData.map((p, i) => ({
    slug: p.slug,
    title: p.title,
    category: p.category,
    summary: p.summary,
    highlights: p.highlights,
    cta_label: p.ctaLabel,
    destination_url: p.destinationUrl || null,
    featured: p.featured,
    published: true,
    sort_order: i,
    updated_at: p.updatedAt ? new Date(p.updatedAt).toISOString() : new Date().toISOString(),
  }));

  const { error } = await supabase.from("projects").upsert(rows, {
    onConflict: "slug",
    ignoreDuplicates: false,
  });
  if (error) throw new Error(`projects: ${error.message}`);
  console.log(`  ✓ ${rows.length} project(s)`);
}

async function seedSiteSettings(): Promise<void> {
  console.log("→ Seeding site_settings…");
  const settings = [
    { key: "social_linkedin", value: profile.social.linkedin || "" },
    { key: "social_instagram", value: profile.social.instagram || "" },
    { key: "social_email", value: profile.social.email },
    { key: "skill_groups", value: JSON.stringify(skillGroups) },
  ];

  const { error } = await supabase.from("site_settings").upsert(settings, {
    onConflict: "key",
    ignoreDuplicates: false,
  });
  if (error) throw new Error(`site_settings: ${error.message}`);
  console.log(`  ✓ ${settings.length} setting(s)`);
}

// ─── Entry point ──────────────────────────────────────────────────────────

async function main(): Promise<void> {
  await seedProfiles();
  await seedExperience();
  await seedProjects();
  await seedSiteSettings();
  console.log("\n✅ Seed complete.");
}

main().catch((err) => {
  console.error("\n❌ Seed failed:", err);
  process.exit(1);
});
