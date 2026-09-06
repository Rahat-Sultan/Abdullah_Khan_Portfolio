"use client";

import { useEffect, useState } from "react";
import { profile } from "@/content/profile";

export function LoadingScreen() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = window.setTimeout(() => setDone(true), reduce ? 200 : 1400);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div className={`loader ${done ? "is-done" : ""}`} role="status" aria-live="polite">
      <div className="loader__mark">
        <div className="loader__pulse" />
        <p className="muted" style={{ margin: 0, letterSpacing: "0.28em", textTransform: "uppercase" }}>
          Loading
        </p>
        <h1 className="display" style={{ fontSize: "1.6rem", margin: "0.4rem 0 0" }}>
          {profile.name}
        </h1>
        <p className="muted" style={{ margin: "0.25rem 0 0" }}>
          {profile.title}
        </p>
      </div>
    </div>
  );
}
