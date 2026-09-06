import type { Metadata } from "next";
import { services, expertise, strengths, skillGroups } from "@/content/profile";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Digital marketing services from Abdullah Khan — social media strategy, Meta Ads, WordPress, content creation, and analytics.",
};

export default function ServicesPage() {
  return (
    <>
      {/* ── Hero intro ────────────────────────────────────────── */}
      <section className="section container" aria-labelledby="services-heading">
        <h1 id="services-heading" className="section-title">
          Services
        </h1>
        <p className="muted" style={{ maxWidth: "42rem", marginTop: 0 }}>
          Every service below is drawn directly from Abdullah&apos;s hands-on client experience —
          nothing invented, nothing padded.
        </p>

        <div className="grid-3" style={{ marginTop: "1.75rem" }}>
          {services.map((service) => (
            <article
              key={service.id}
              className="panel"
              style={{ padding: "1.4rem" }}
              aria-label={service.title}
            >
              <h2 style={{ fontSize: "1rem", margin: "0 0 0.6rem" }}>{service.title}</h2>
              <p className="muted" style={{ margin: 0 }}>
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* ── Skills breakdown ──────────────────────────────────── */}
      <section className="section container" aria-labelledby="platforms-heading">
        <h2 id="platforms-heading" className="section-title">
          Platforms &amp; Tools
        </h2>
        <div className="grid-4">
          {skillGroups.map((group) => (
            <article key={group.title} className="panel" style={{ padding: "1.2rem" }}>
              <h3 style={{ margin: "0 0 0.6rem", fontSize: "0.95rem" }}>{group.title}</h3>
              <ul
                className="muted"
                style={{ paddingLeft: "1.1rem", margin: 0 }}
                aria-label={`${group.title} tools`}
              >
                {group.items.map((item) => (
                  <li key={item} style={{ marginBottom: "0.25rem" }}>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* ── Expertise + Strengths ────────────────────────────── */}
      <section className="section container">
        <div style={{ display: "grid", gap: "2rem", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
          <div>
            <h2 className="section-title" id="expertise-heading">
              Areas of Expertise
            </h2>
            <ul
              className="muted"
              style={{ paddingLeft: "1.2rem", margin: 0 }}
              aria-labelledby="expertise-heading"
            >
              {expertise.map((item) => (
                <li key={item} style={{ marginBottom: "0.4rem" }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="section-title" id="strengths-heading">
              Core Strengths
            </h2>
            <ul
              className="muted"
              style={{ paddingLeft: "1.2rem", margin: 0 }}
              aria-labelledby="strengths-heading"
            >
              {strengths.map((item) => (
                <li key={item} style={{ marginBottom: "0.4rem" }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="section container" style={{ paddingTop: 0 }}>
        <div
          className="panel"
          style={{ padding: "2rem", textAlign: "center", maxWidth: "560px", margin: "0 auto" }}
        >
          <h2 style={{ margin: "0 0 0.6rem" }}>Ready to grow your brand?</h2>
          <p className="muted" style={{ margin: "0 0 1.25rem" }}>
            Let&apos;s talk about your goals and see how we can build results together.
          </p>
          <a href="/contact" className="btn btn-primary">
            Get in touch
          </a>
        </div>
      </section>
    </>
  );
}
