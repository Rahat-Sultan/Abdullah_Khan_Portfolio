import type { Metadata } from "next";
import { ProjectCard } from "@/components/portfolio/project-card";
import { getProjects } from "@/lib/data";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Projects",
  description: "Client work Abdullah Khan has supported across social, ads, and WordPress.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <section className="section container">
      <h1 className="section-title">Projects</h1>
      <p className="muted">
        All client work from the resume. Destination URLs stay hidden until the admin adds them.
      </p>
      <div className="grid-3" style={{ marginTop: "1.5rem" }}>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
