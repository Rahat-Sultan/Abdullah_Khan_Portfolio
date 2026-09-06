import Link from "next/link";
import { ProjectCard } from "@/components/portfolio/project-card";
import type { PublicProject } from "@/lib/supabase/types";

export function FeaturedProjects({ projects }: { projects: PublicProject[] }) {
  return (
    <section className="section container" id="projects">
      <h2 className="section-title">
        <Link href="/projects">Projects</Link>
      </h2>
      <p className="muted">
        Recent client work — click the title above to see the full list.
      </p>
      <div className="grid-3" style={{ marginTop: "1.5rem" }}>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
