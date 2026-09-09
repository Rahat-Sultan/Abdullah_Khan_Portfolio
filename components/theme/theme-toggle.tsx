"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/components/theme/theme-provider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Detect touch device once on mount
  useEffect(() => {
    const touch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0;
    setIsTouch(touch);
  }, []);

  // Close dropdown when tapping outside (touch devices only)
  useEffect(() => {
    if (!isTouch || !open) return;
    function handler(e: TouchEvent | MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("touchstart", handler);
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("touchstart", handler);
      document.removeEventListener("mousedown", handler);
    };
  }, [isTouch, open]);

  function pick(t: "dark" | "light") {
    setTheme(t);
    setOpen(false);
  }

  // ── Touch device: tap-to-open dropdown ──────────────────────
  if (isTouch) {
    return (
      <div ref={ref} className="theme-toggle theme-toggle--touch">
        <button
          type="button"
          className="theme-toggle__orb"
          aria-label={`Theme: ${theme}. Tap to switch.`}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {theme === "dark" ? "Dark" : "Light"}
        </button>

        {open && (
          <div
            className="theme-toggle__dropdown"
            role="group"
            aria-label="Choose theme"
          >
            <button
              type="button"
              className={theme === "dark" ? "is-active" : undefined}
              onClick={() => pick("dark")}
            >
              🌑 Dark
            </button>
            <button
              type="button"
              className={theme === "light" ? "is-active" : undefined}
              onClick={() => pick("light")}
            >
              ✨ Light
            </button>
          </div>
        )}
      </div>
    );
  }

  // ── Desktop: hover-to-spread ─────────────────────────────────
  return (
    <div className="theme-toggle" role="group" aria-label="Choose theme">
      <button
        type="button"
        className="theme-toggle__orb"
        aria-label={`Theme: ${theme}. Hover to switch.`}
      >
        {theme === "dark" ? "Dark" : "Light"}
      </button>
      <div className="theme-toggle__spread">
        <button
          type="button"
          className={theme === "dark" ? "is-active" : undefined}
          onClick={() => setTheme("dark")}
        >
          Dark
        </button>
        <button
          type="button"
          className={theme === "light" ? "is-active" : undefined}
          onClick={() => setTheme("light")}
        >
          Light
        </button>
      </div>
    </div>
  );
}
