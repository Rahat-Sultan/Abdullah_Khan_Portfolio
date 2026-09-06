/**
 * /admin/experience — manage work history
 */
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { ExperienceList } from "@/components/admin/experience-list";
import { ExperienceForm } from "@/components/admin/experience-form";

export const metadata: Metadata = { title: "Admin — Experience" };
export const dynamic = "force-dynamic";

export default async function AdminExperiencePage() {
  const supabase = await createClient();
  const { data: roles, error } = await supabase
    .from("experience")
    .select("id, company, title, start_date, end_date, current, summary, sort_order")
    .order("sort_order", { ascending: true });

  if (error) {
    return (
      <section className="admin-section">
        <h1 className="admin-page-title">Experience</h1>
        <p className="muted">Could not load experience: {error.message}</p>
      </section>
    );
  }

  return (
    <section className="admin-section">
      <h1 className="admin-page-title">Experience</h1>
      <ExperienceList roles={roles ?? []} />
      <hr className="admin-divider" />
      <h2 style={{ fontSize: "1.1rem", margin: "1.5rem 0 0.75rem" }}>Add new role</h2>
      <ExperienceForm role={null} />
    </section>
  );
}
