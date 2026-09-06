"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { PublicProject } from "@/lib/supabase/types";

const FALLBACK_SLIDES = ["nebula-a", "nebula-b", "nebula-c"] as const;

export function ProjectCard({ project }: { project: PublicProject }) {
  const slides = useMemo(
    () => (project.images.length > 0 ? project.images : [...FALLBACK_SLIDES]),
    [project.images],
  );
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const cardRef = useRef<HTMLElement>(null);

  // Reset slideshow when card leaves the viewport
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          setPlaying(false);
          setIndex(0);
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Auto-advance slides; reset to first when finished
  useEffect(() => {
    if (!playing || slides.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(() => {
      setIndex((i) => {
        if (i >= slides.length - 1) {
          setPlaying(false);
          return 0;
        }
        return i + 1;
      });
    }, 1600);

    return () => window.clearInterval(id);
  }, [playing, slides.length]);

  const reset = () => {
    setPlaying(false);
    setIndex(0);
  };

  /**
   * Redirect to the project's destination URL via the server-side route so the
   * raw URL is never printed in the HTML.
   */
  const go = () => {
    window.open(`/api/project-redirect/${encodeURIComponent(project.slug)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <article
      ref={cardRef}
      className="panel project-card"
      onMouseEnter={() => setPlaying(true)}
      onMouseLeave={reset}
      onFocus={() => setPlaying(true)}
      onBlur={reset}
      onTouchStart={() => setPlaying(true)}
    >
      <div className="project-card__media" aria-hidden="true">
        {slides.map((slide, i) => (
          <div
            key={slide}
            className={`project-slide ${i === index ? "is-active" : ""}`}
            style={{
              background:
                slide === "nebula-a"
                  ? "linear-gradient(135deg, #7f1d1d, #1e1b4b)"
                  : slide === "nebula-b"
                    ? "linear-gradient(135deg, #9d174d, #0f172a)"
                    : slide === "nebula-c"
                      ? "linear-gradient(135deg, #be123c, #4c1d95)"
                      : undefined,
              backgroundImage:
                slide !== "nebula-a" && slide !== "nebula-b" && slide !== "nebula-c"
                  ? `url(${slide})`
                  : undefined,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        ))}
      </div>
      <div className="project-card__body">
        <span className="badge">{project.category}</span>
        <h3 style={{ margin: "0.6rem 0 0.35rem" }}>{project.title}</h3>
        <p className="muted" style={{ margin: 0 }}>
          {project.summary}
        </p>
        {project.cta_label && (
          <button type="button" className="btn" style={{ marginTop: "0.9rem" }} onClick={go}>
            {project.cta_label}
          </button>
        )}
      </div>
    </article>
  );
}
