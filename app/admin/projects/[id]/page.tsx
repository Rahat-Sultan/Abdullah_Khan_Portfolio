import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ProjectForm } from "@/components/admin/project-form";
import { ImageManager } from "@/components/admin/image-manager";

export const metadata: Metadata = { title: "Admin — Edit Project" };
export const dynamic = "force-dynamic";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: project } = await supabase
    .from("projects")
    .select(
      "id, slug, title, category, summary, highlights, cta_label, destination_url, featured, published, sort_order",
    )
    .eq("id", id)
    .single();

  if (!project) notFound();

  const { data: images } = await supabase
    .from("project_images")
    .select("id, storage_path, sort_order")
    .eq("project_id", id)
    .order("sort_order", { ascending: true });

  return (
    <section className="admin-section">
      <h1 className="admin-page-title">Edit Project</h1>
      <ProjectForm project={project} />
      <hr className="admin-divider" />
      <h2 style={{ fontSize: "1.1rem", margin: "1.5rem 0 0.75rem" }}>Images</h2>
      <ImageManager projectId={id} images={images ?? []} />
    </section>
  );
}
