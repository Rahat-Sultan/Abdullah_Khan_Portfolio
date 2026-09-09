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

        {/* Brand — always left */}
        <Link href="/" className="brand" aria-label="Home">
          {brandName}
        </Link>

        {/* Desktop nav — hidden on mobile */}
        <nav className="site-header__desktop-nav" aria-label="Primary navigation">
          <div className="nav-links" role="menubar">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                role="menuitem"
                aria-current={pathname === link.href ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>

        {/* Right side: theme toggle + mobile menu button */}
        <div className="site-header__right">
          <ThemeToggle />

          {/* Mobile hamburger */}
          <button
            type="button"
            className="btn nav-toggle"
            aria-expanded={open}
            aria-controls="mobile-nav-links"
            onClick={() => setOpen((v) => !v)}
          >
            <span aria-hidden="true">{open ? "✕" : "☰"}</span>
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          </button>
        </div>

      </div>

      {/* Mobile dropdown nav — separate from header inner so it spans full width */}
      {open && (
        <nav
          id="mobile-nav-links"
          className="mobile-nav"
          aria-label="Mobile navigation"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="mobile-nav__link"
              aria-current={pathname === link.href ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
