"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function upsertProject(
  id: string | null,
  _prev: { error: string | null },
  formData: FormData,
): Promise<{ error: string | null }> {
  const title = (formData.get("title") as string)?.trim();
  const category = (formData.get("category") as string)?.trim();
  const summary = (formData.get("summary") as string)?.trim();
  const highlightsRaw = (formData.get("highlights") as string)?.trim();
  const ctaLabel = (formData.get("cta_label") as string)?.trim();
  const destinationUrl = (formData.get("destination_url") as string)?.trim();
  const featured = formData.get("featured") === "on";
  const published = formData.get("published") === "on";

  if (!title) return { error: "Title is required." };

  const highlights = highlightsRaw
    ? highlightsRaw.split("\n").map((l) => l.trim()).filter(Boolean)
    : [];

  const supabase = await createClient();

  if (id) {
    const { error } = await supabase
      .from("projects")
      .update({
        title,
        category: category || null,
        summary: summary || null,
        highlights,
        cta_label: ctaLabel || null,
        destination_url: destinationUrl || null,
        featured,
        published,
      })
      .eq("id", id);

    if (error) return { error: error.message };
  } else {
    const slug = slugify(title);
    const { error } = await supabase.from("projects").insert({
      slug,
      title,
      category: category || null,
      summary: summary || null,
      highlights,
      cta_label: ctaLabel || null,
      destination_url: destinationUrl || null,
      featured,
      published,
      sort_order: 99,
    });

    if (error) return { error: error.message };
  }

  revalidatePath("/admin/projects");
  revalidatePath("/");
  revalidatePath("/projects");
  redirect("/admin/projects");
}

export async function deleteProject(id: string) {
  const supabase = await createClient();
  await supabase.from("projects").delete().eq("id", id);
  revalidatePath("/admin/projects");
  revalidatePath("/");
  revalidatePath("/projects");
}

export async function uploadProjectImage(projectId: string, formData: FormData) {
  const file = formData.get("image") as File | null;
  if (!file || file.size === 0) return { error: "No file selected." };
  if (!file.type.startsWith("image/")) return { error: "Only image files are allowed." };
  if (file.size > 5 * 1024 * 1024) return { error: "Image must be under 5 MB." };

  const supabase = await createClient();

  const ext = file.name.split(".").pop() ?? "jpg";
  const path = `projects/${projectId}/${Date.now()}.${ext}`;
  const buffer = await file.arrayBuffer();

  const { error: uploadError } = await supabase.storage
    .from("portfolio")
    .upload(path, buffer, { contentType: file.type, upsert: false });

  if (uploadError) return { error: uploadError.message };

  // Use count of existing images as sort_order so new images append in order
  const { count } = await supabase
    .from("project_images")
    .select("id", { count: "exact", head: true })
    .eq("project_id", projectId);

  const { error: insertError } = await supabase.from("project_images").insert({
    project_id: projectId,
    storage_path: path,
    sort_order: (count ?? 0) + 1,
  });

  if (insertError) return { error: insertError.message };

  revalidatePath("/admin/projects");
  revalidatePath("/");
  revalidatePath("/projects");
  return { error: null };
}

export async function deleteProjectImage(imageId: string, storagePath: string) {
  const supabase = await createClient();
  await supabase.storage.from("portfolio").remove([storagePath]);
  await supabase.from("project_images").delete().eq("id", imageId);
  revalidatePath("/admin/projects");
  revalidatePath("/");
  revalidatePath("/projects");
}

export async function reorderProjectImages(
  updates: { id: string; sort_order: number }[],
) {
  const supabase = await createClient();

  // Update each image's sort_order individually
  // (Supabase doesn't support bulk update with different values per row)
  await Promise.all(
    updates.map(({ id, sort_order }) =>
      supabase.from("project_images").update({ sort_order }).eq("id", id),
    ),
  );

  revalidatePath("/admin/projects");
  revalidatePath("/");
  revalidatePath("/projects");
}
