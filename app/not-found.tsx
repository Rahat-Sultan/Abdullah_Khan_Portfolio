import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 — Page not found",
};

export default function NotFound() {
  return (
    <section
      className="container"
      style={{
        minHeight: "70dvh",
        display: "grid",
        placeItems: "center",
        textAlign: "center",
        padding: "4rem 1rem",
      }}
    >
      <div>
        {/* Galactic glow number */}
        <p
          aria-hidden="true"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(5rem, 18vw, 10rem)",
            lineHeight: 1,
            margin: "0 0 0.25em",
            background: "linear-gradient(135deg, var(--accent), var(--accent-2))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: `drop-shadow(0 0 32px var(--glow))`,
          }}
        >
          404
        </p>

        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.2rem, 3vw, 1.8rem)",
            margin: "0 0 0.6rem",
          }}
        >
          Lost in the galaxy
        </h1>

        <p className="muted" style={{ maxWidth: "36rem", margin: "0 auto 2rem" }}>
          This page drifted off into deep space. Head back to mission control and we&apos;ll
          get you on course.
        </p>

        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/" className="btn btn-primary">
            Go home
          </Link>
          <Link href="/contact" className="btn">
            Contact Abdullah
          </Link>
        </div>
      </div>
    </section>
  );
}
