"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "@/app/admin/login/actions";

const tabs = [
  { href: "/admin", label: "Messages" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/experience", label: "Experience" },
  { href: "/admin/profile", label: "Profile" },
];

export function AdminNav({ email, avatarUrl }: { email: string; avatarUrl: string | null }) {
  const pathname = usePathname();

  return (
    <header className="admin-nav">
      <div className="admin-nav__inner">
        <span className="admin-nav__brand">Admin Portal</span>
        <nav className="admin-nav__tabs" aria-label="Admin sections">
          {tabs.map((tab) => {
            const active =
              tab.href === "/admin" ? pathname === "/admin" : pathname.startsWith(tab.href);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`admin-tab ${active ? "is-active" : ""}`}
                aria-current={active ? "page" : undefined}
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>
        <div className="admin-nav__right">
          {avatarUrl && (
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                border: "1px solid var(--border)",
                backgroundImage: `url(${avatarUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                flexShrink: 0,
              }}
              aria-label="Profile photo"
            />
          )}
          <span className="muted" style={{ fontSize: "0.82rem" }}>
            {email}
          </span>
          <form action={signOut}>
            <button type="submit" className="btn" style={{ padding: "0.3rem 0.75rem", fontSize: "0.82rem" }}>
              Sign out
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
