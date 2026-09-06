import type { ProfileData } from "@/lib/data";

export function Hero({ profile }: { profile: ProfileData }) {
  return (
    <section className="container hero">
      <div
        className="avatar"
        aria-label={`Profile placeholder for ${profile.name}`}
        style={
          profile.avatarUrl
            ? {
                backgroundImage: `url(${profile.avatarUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : undefined
        }
      >
        {!profile.avatarUrl && "AK"}
      </div>
      <div>
        <p
          className="muted"
          style={{ margin: 0, letterSpacing: "0.18em", textTransform: "uppercase" }}
        >
          {profile.location}
        </p>
        <h1 style={{ fontSize: "clamp(1.7rem, 3vw, 2.6rem)", margin: "0.4rem 0 0.8rem" }}>
          {profile.greeting}
        </h1>
        <p className="muted" style={{ maxWidth: "42rem" }}>
          {profile.intro}
        </p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="#projects">
            Show my work
          </a>
          <a className="btn" href="#contact">
            Get in touch
          </a>
          <a className="btn" href={profile.resumePath} download>
            Download Resume
          </a>
        </div>
      </div>
    </section>
  );
}
