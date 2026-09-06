import { getSocialLinks, getProfile } from "@/lib/data";

export async function Footer() {
  const [social, profile] = await Promise.all([getSocialLinks(), getProfile()]);

  const links = [
    { label: "LinkedIn", href: social.linkedin },
    { label: "Instagram", href: social.instagram },
    { label: "Email", href: social.email },
  ];

  return (
    <footer className="site-footer" aria-label="Site footer">
      <div className="container" style={{ display: "grid", gap: "1rem", textAlign: "center", justifyItems: "center" }}>
        <p className="muted" style={{ margin: 0 }}>
          {profile.name} &middot; {profile.title} &middot; {profile.location}
        </p>
        <nav className="footer-links" aria-label="Social links">
          {links.map((item) =>
            item.href ? (
              <a
                key={item.label}
                className="btn"
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer noopener"
                aria-label={`${item.label} — opens in new tab`}
              >
                {item.label}
              </a>
            ) : (
              <span
                key={item.label}
                className="btn"
                aria-label={`${item.label} — URL not yet configured`}
                style={{ opacity: 0.45, cursor: "default" }}
              >
                {item.label}
              </span>
            ),
          )}
        </nav>
        <p className="muted" style={{ margin: 0, fontSize: "0.78rem" }}>
          &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
