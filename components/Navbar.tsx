"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCountry } from "@/lib/country";

const links = [
  { href: "/assessment", label: "Assessment" },
  { href: "/careers", label: "Careers" },
  { href: "/roadmap", label: "Roadmap" },
  { href: "/mentors", label: "Mentors" },
];

export function Navbar() {
  const pathname = usePathname();
  const { country } = useCountry();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-forest-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="font-display text-xl font-semibold text-forest-700">
            CareerPath
          </span>
          <span className="hidden text-xs text-ink-700 sm:inline">
            Ghana · Nigeria
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm ${
                pathname === link.href
                  ? "font-semibold text-forest-700"
                  : "text-ink-700 hover:text-forest-700"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {country ? (
            <span className="hidden rounded-full bg-forest-50 px-3 py-1 text-xs font-medium text-forest-700 sm:inline">
              {country.name}
            </span>
          ) : null}
          <Link
            href="/login"
            className="hidden text-sm text-ink-700 hover:text-forest-700 sm:inline"
          >
            Log in
          </Link>
          <Link
            href="/assessment"
            className="rounded-full bg-forest-600 px-4 py-2 text-sm font-semibold text-white hover:bg-forest-700"
          >
            Start
          </Link>
          <button
            type="button"
            className="md:hidden"
            aria-label="Open menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="block h-0.5 w-5 bg-ink-900" />
            <span className="mt-1 block h-0.5 w-5 bg-ink-900" />
            <span className="mt-1 block h-0.5 w-5 bg-ink-900" />
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-forest-100 px-4 py-3 md:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-2 text-sm text-ink-700"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/login"
            className="block py-2 text-sm text-ink-700"
            onClick={() => setOpen(false)}
          >
            Log in
          </Link>
        </div>
      ) : null}
    </header>
  );
}
