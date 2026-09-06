import type { ProfileData } from "@/lib/data";

export function About({ about }: { about: ProfileData["about"] }) {
  return (
    <section className="section container" id="about">
      <h2 className="section-title">A bit about me</h2>
      <div className="panel" style={{ padding: "1.5rem" }}>
        {about.map((p, i) => (
          <p key={i} className="muted" style={{ marginTop: i === 0 ? 0 : undefined }}>
            {p}
          </p>
        ))}
      </div>
    </section>
  );
}
