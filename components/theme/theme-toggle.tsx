"use client";

import { useTheme } from "@/components/theme/theme-provider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="theme-toggle">
      <button type="button" className="theme-toggle__orb" aria-label={`Theme: ${theme}. Open dark or light.`}>
        {theme === "dark" ? "Dark" : "Light"}
      </button>
      <div className="theme-toggle__spread" role="group" aria-label="Choose theme">
        <button type="button" className={theme === "dark" ? "is-active" : undefined} onClick={() => setTheme("dark")}>
          Dark
        </button>
        <button type="button" className={theme === "light" ? "is-active" : undefined} onClick={() => setTheme("light")}>
          Light
        </button>
      </div>
    </div>
  );
}
