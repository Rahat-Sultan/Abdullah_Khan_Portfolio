/**
 * /admin/projects — CRUD for portfolio projects
 */
import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { ProjectsTable } from "@/components/admin/projects-table";

export const metadata: Metadata = { title: "Admin — Projects" };
export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const supabase = await createClient();
  const { data: projects, error } = await supabase
    .from("projects")
    .select(
      "id, slug, title, category, featured, published, updated_at, destination_url, cta_label, summary, highlights, sort_order",
    )
    .order("sort_order", { ascending: true });

  if (error) {
    return (
      <section className="admin-section">
        <h1 className="admin-page-title">Projects</h1>
        <p className="muted">Could not load projects: {error.message}</p>
      </section>
    );
  }

  return (
    <section className="admin-section">
      <div className="admin-section__header">
        <h1 className="admin-page-title">Projects</h1>
        <Link href="/admin/projects/new" className="btn btn-primary">
          + New project
        </Link>
      </div>
      <ProjectsTable projects={projects ?? []} />
    </section>
  );
}
