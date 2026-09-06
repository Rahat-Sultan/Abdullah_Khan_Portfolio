import type { ExperienceItem } from "@/lib/data";

export function Experience({ roles }: { roles: ExperienceItem[] }) {
  return (
    <section className="section container" id="experience">
      <h2 className="section-title">Experience</h2>
      <div className="timeline">
        {roles.map((role) => (
          <article key={role.id} className="panel" style={{ padding: "1.25rem" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "1rem",
                flexWrap: "wrap",
              }}
            >
              <h3 style={{ margin: 0 }}>{role.title}</h3>
              {role.current ? <span className="badge">Currently working</span> : null}
            </div>
            <p style={{ margin: "0.35rem 0" }}>{role.company}</p>
            <p className="muted" style={{ margin: 0 }}>
              {role.start} — {role.current ? "Present" : role.end}
            </p>
            {role.summary ? <p className="muted">{role.summary}</p> : null}
          </article>
        ))}
      </div>
    </section>
  );
}
