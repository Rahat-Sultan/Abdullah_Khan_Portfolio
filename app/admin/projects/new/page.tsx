import type { Metadata } from "next";
import { ProjectForm } from "@/components/admin/project-form";

export const metadata: Metadata = { title: "Admin — New Project" };

export default function NewProjectPage() {
  return (
    <section className="admin-section">
      <h1 className="admin-page-title">New Project</h1>
      <ProjectForm project={null} />
    </section>
  );
}
