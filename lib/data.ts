/**
 * Server-side data fetching layer — Phase 05
 *
 * All functions try Supabase first; if env vars are missing (local dev without
 * Supabase configured) they fall back to content/profile.ts so the site keeps
 * working during development.
 *
 * Import ONLY in Server Components, Route Handlers, or Server Actions.
 * destination_url is intentionally excluded from every public query.
 */

import {
  profile as localProfile,
  skillGroups as localSkillGroups,
  experience as localExperience,
  projects as localProjects,
  featuredProjects as localFeaturedProjects,
} from "@/content/profile";
import type { ExperienceRow, PublicProject } from "@/lib/supabase/types";

// ─── helpers ──────────────────────────────────────────────────────────────────

function hasSupabase() {
  return (
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  );
}

async function getServerClient() {
  const { createClient } = await import("@/lib/supabase/server");
  return createClient();
}

/** Resolves a storage path to a public URL using the Supabase storage URL */
function storageUrl(path: string): string {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!base || !path) return "";
  return `${base}/storage/v1/object/public/portfolio/${path}`;
}

// ─── Profile ──────────────────────────────────────────────────────────────────

export type ProfileData = {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  greeting: string;
  intro: string;
  about: string[];
  social: { email: string; linkedin: string; instagram: string };
  resumePath: string;
  avatarUrl: string | null;
};

export async function getProfile(): Promise<ProfileData> {
  if (!hasSupabase()) return localToProfileData();

  const supabase = await getServerClient();
  const { data, error } = await supabase
    .from("profiles")
    .select(
      "name, title, location, email, phone, greeting, intro, about, social_email, social_linkedin, social_instagram, resume_path, avatar_path",
    )
    .limit(1)
    .single();

  if (error || !data) return localToProfileData();

  return {
    name: data.name,
    title: data.title,
    location: data.location ?? "",
    email: data.email ?? "",
    phone: data.phone ?? "",
    greeting: data.greeting ?? data.name,
    intro: data.intro ?? "",
    about: data.about ?? [],
    social: {
      email: data.social_email ?? "",
      linkedin: data.social_linkedin ?? "",
      instagram: data.social_instagram ?? "",
    },
    resumePath: data.resume_path ?? "/Abdullah-Khan-Resume.pdf",
    avatarUrl: data.avatar_path ? storageUrl(data.avatar_path) : null,
  };
}

function localToProfileData(): ProfileData {
  return {
    name: localProfile.name,
    title: localProfile.title,
    location: localProfile.location,
    email: localProfile.email,
    phone: localProfile.phone,
    greeting: localProfile.greeting,
    intro: localProfile.intro,
    about: [...localProfile.about],
    social: { ...localProfile.social },
    resumePath: localProfile.resumePath,
    avatarUrl: null,
  };
}

// ─── Skills ───────────────────────────────────────────────────────────────────

export type SkillGroup = { title: string; items: string[] };

export async function getSkillGroups(): Promise<SkillGroup[]> {
  if (!hasSupabase()) return localSkillGroups;

  const supabase = await getServerClient();
  const { data } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", "skill_groups")
    .single();

  if (!data?.value) return localSkillGroups;

  try {
    return JSON.parse(data.value) as SkillGroup[];
  } catch {
    return localSkillGroups;
  }
}

// ─── Experience ───────────────────────────────────────────────────────────────

export type ExperienceItem = {
  id: string;
  company: string;
  title: string;
  start: string;
  end: string;
  current: boolean;
  summary: string;
};

export async function getExperience(): Promise<ExperienceItem[]> {
  if (!hasSupabase()) return localExperience;

  const supabase = await getServerClient();
  const { data, error } = await supabase
    .from("experience")
    .select("id, company, title, start_date, end_date, current, summary")
    .order("sort_order", { ascending: true });

  if (error || !data?.length) return localExperience;

  return (data as ExperienceRow[]).map((row) => ({
    id: row.id,
    company: row.company,
    title: row.title,
    start: row.start_date,
    end: row.end_date ?? "Present",
    current: row.current,
    summary: row.summary ?? "",
  }));
}

// ─── Social links (for footer, pulled from site_settings) ────────────────────

export type SocialLinks = { email: string; linkedin: string; instagram: string };

export async function getSocialLinks(): Promise<SocialLinks> {
  if (!hasSupabase()) {
    return {
      email: localProfile.social.email,
      linkedin: localProfile.social.linkedin,
      instagram: localProfile.social.instagram,
    };
  }

  const supabase = await getServerClient();
  const { data } = await supabase
    .from("site_settings")
    .select("key, value")
    .in("key", ["social_email", "social_linkedin", "social_instagram"]);

  const map: Record<string, string> = {};
  for (const row of data ?? []) map[row.key] = row.value;

  return {
    email: map["social_email"] ?? localProfile.social.email,
    linkedin: map["social_linkedin"] ?? "",
    instagram: map["social_instagram"] ?? "",
  };
}

// ─── Brand name (for header) ──────────────────────────────────────────────────

export async function getBrandName(): Promise<string> {
  if (!hasSupabase()) return localProfile.name;

  const supabase = await getServerClient();
  const { data } = await supabase
    .from("profiles")
    .select("name")
    .limit(1)
    .single();

  return data?.name ?? localProfile.name;
}

// ─── Projects ─────────────────────────────────────────────────────────────────

/** Fetches all published projects — destination_url is never included */
export async function getProjects(): Promise<PublicProject[]> {
  if (!hasSupabase()) return localProjects.map(localToPublicProject);

  const supabase = await getServerClient();
  const { data: projectRows, error } = await supabase
    .from("projects")
    .select(
      // destination_url is deliberately omitted
      "id, slug, title, category, summary, highlights, cta_label, featured, published, sort_order, updated_at, created_at",
    )
    .eq("published", true)
    .order("updated_at", { ascending: false });

  if (error || !projectRows?.length) return localProjects.map(localToPublicProject);

  // Fetch images for all returned projects in one query
  const ids = projectRows.map((p) => p.id);
  const { data: imageRows } = await supabase
    .from("project_images")
    .select("project_id, storage_path, sort_order")
    .in("project_id", ids)
    .order("sort_order", { ascending: true });

  const imageMap: Record<string, string[]> = {};
  for (const img of imageRows ?? []) {
    if (!imageMap[img.project_id]) imageMap[img.project_id] = [];
    imageMap[img.project_id]!.push(storageUrl(img.storage_path));
  }

  return projectRows.map((p) => ({
    ...p,
    images: imageMap[p.id] ?? [],
  })) as PublicProject[];
}

/** Fetches the N most recently updated featured projects for the home page */
export async function getFeaturedProjects(limit = 3): Promise<PublicProject[]> {
  if (!hasSupabase()) return localFeaturedProjects(limit).map(localToPublicProject);

  const supabase = await getServerClient();
  const { data: projectRows, error } = await supabase
    .from("projects")
    .select(
      "id, slug, title, category, summary, highlights, cta_label, featured, published, sort_order, updated_at, created_at",
    )
    .eq("published", true)
    .order("updated_at", { ascending: false })
    .limit(limit);

  if (error || !projectRows?.length) return localFeaturedProjects(limit).map(localToPublicProject);

  const ids = projectRows.map((p) => p.id);
  const { data: imageRows } = await supabase
    .from("project_images")
    .select("project_id, storage_path, sort_order")
    .in("project_id", ids)
    .order("sort_order", { ascending: true });

  const imageMap: Record<string, string[]> = {};
  for (const img of imageRows ?? []) {
    if (!imageMap[img.project_id]) imageMap[img.project_id] = [];
    imageMap[img.project_id]!.push(storageUrl(img.storage_path));
  }

  return projectRows.map((p) => ({
    ...p,
    images: imageMap[p.id] ?? [],
  })) as PublicProject[];
}

function localToPublicProject(p: (typeof localProjects)[number]): PublicProject {
  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    category: p.category,
    summary: p.summary,
    highlights: p.highlights,
    cta_label: p.ctaLabel,
    featured: p.featured,
    published: true,
    sort_order: 0,
    updated_at: p.updatedAt,
    created_at: p.updatedAt,
    images: p.images,
  };
}
