"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function upsertRole(
  id: string | null,
  _prev: { error: string | null },
  formData: FormData,
): Promise<{ error: string | null }> {
  const company = (formData.get("company") as string)?.trim();
  const title = (formData.get("title") as string)?.trim();
  const startDate = (formData.get("start_date") as string)?.trim();
  const endDate = (formData.get("end_date") as string)?.trim();
  const current = formData.get("current") === "on";
  const summary = (formData.get("summary") as string)?.trim();

  if (!company || !title || !startDate) {
    return { error: "Company, title, and start date are required." };
  }

  const supabase = await createClient();
  const payload = {
    company,
    title,
    start_date: startDate,
    end_date: current ? null : endDate || null,
    current,
    summary: summary || null,
  };

  if (id) {
    const { error } = await supabase.from("experience").update(payload).eq("id", id);
    if (error) return { error: error.message };
  } else {
    // Get current max sort_order
    const { data: last } = await supabase
      .from("experience")
      .select("sort_order")
      .order("sort_order", { ascending: false })
      .limit(1)
      .single();

    const { error } = await supabase.from("experience").insert({
      ...payload,
      sort_order: (last?.sort_order ?? -1) + 1,
    });
    if (error) return { error: error.message };
  }

  revalidatePath("/admin/experience");
  revalidatePath("/");
  redirect("/admin/experience");
}

export async function deleteRole(id: string) {
  const supabase = await createClient();
  await supabase.from("experience").delete().eq("id", id);
  revalidatePath("/admin/experience");
  revalidatePath("/");
}
