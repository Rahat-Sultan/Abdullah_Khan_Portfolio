"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function upsertProfile(
  profileId: string | null,
  _prev: { error: string | null },
  formData: FormData,
): Promise<{ error: string | null }> {
  const name = (formData.get("name") as string)?.trim();
  const title = (formData.get("title") as string)?.trim();
  const location = (formData.get("location") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const phone = (formData.get("phone") as string)?.trim();
  const greeting = (formData.get("greeting") as string)?.trim();
  const intro = (formData.get("intro") as string)?.trim();
  const aboutRaw = (formData.get("about") as string)?.trim();
  const socialEmail = (formData.get("social_email") as string)?.trim();
  const socialLinkedin = (formData.get("social_linkedin") as string)?.trim();
  const socialInstagram = (formData.get("social_instagram") as string)?.trim();

  if (!name || !title) return { error: "Name and title are required." };

  const about = aboutRaw
    ? aboutRaw.split("\n\n").map((p) => p.trim()).filter(Boolean)
    : [];

  const payload = {
    name,
    title,
    location: location || null,
    email: email || null,
    phone: phone || null,
    greeting: greeting || null,
    intro: intro || null,
    about,
    social_email: socialEmail || null,
    social_linkedin: socialLinkedin || null,
    social_instagram: socialInstagram || null,
  };

  const supabase = await createClient();

  if (profileId) {
    const { error } = await supabase.from("profiles").update(payload).eq("id", profileId);
    if (error) return { error: error.message };
  } else {
    const { error } = await supabase.from("profiles").insert(payload);
    if (error) return { error: error.message };
  }

  // Keep site_settings in sync so footer reads the latest social links instantly
  await supabase.from("site_settings").upsert(
    [
      { key: "social_email", value: socialEmail || "" },
      { key: "social_linkedin", value: socialLinkedin || "" },
      { key: "social_instagram", value: socialInstagram || "" },
    ],
    { onConflict: "key" },
  );

  revalidatePath("/admin/profile");
  revalidatePath("/");
  revalidatePath("/contact");
  return { error: null };
}

export async function uploadAvatar(profileId: string, formData: FormData) {
  const file = formData.get("avatar") as File | null;
  if (!file || file.size === 0) return { error: "No file selected." };
  if (!file.type.startsWith("image/")) return { error: "Only image files are allowed." };
  if (file.size > 3 * 1024 * 1024) return { error: "Avatar must be under 3 MB." };

  const supabase = await createClient();
  const ext = file.name.split(".").pop() ?? "jpg";
  const path = `avatars/${profileId}.${ext}`;
  const buffer = await file.arrayBuffer();

  const { error: uploadError } = await supabase.storage
    .from("portfolio")
    .upload(path, buffer, { contentType: file.type, upsert: true });

  if (uploadError) return { error: uploadError.message };

  const { error: updateError } = await supabase
    .from("profiles")
    .update({ avatar_path: path })
    .eq("id", profileId);

  if (updateError) return { error: updateError.message };

  revalidatePath("/admin/profile");
  revalidatePath("/");
  return { error: null };
}
