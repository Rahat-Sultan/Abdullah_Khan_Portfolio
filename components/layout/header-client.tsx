"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "@/components/theme/theme-toggle";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export function HeaderClient({ brandName }: { brandName: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link href="/" className="brand" aria-label="Home">
          {brandName}
        </Link>

        <nav aria-label="Primary navigation">
          <button
            type="button"
            className="btn nav-toggle"
            aria-expanded={open}
            aria-controls="primary-nav-links"
            onClick={() => setOpen((v) => !v)}
          >
            <span aria-hidden="true">{open ? "✕" : "☰"}</span>
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          </button>
          <div
            id="primary-nav-links"
            className={`nav-links ${open ? "is-open" : ""}`}
            role="menubar"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                role="menuitem"
                aria-current={pathname === link.href ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>

        <ThemeToggle />
      </div>
    </header>
  );
}
