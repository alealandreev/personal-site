"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const NAV = [
  { href: "/writing", label: "Writing" },
  { href: "/til", label: "TIL" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header
      style={{
        borderBottom: "1px solid var(--border)",
        backgroundColor: "var(--bg)",
      }}
      className="sticky top-0 z-40 backdrop-blur-sm"
    >
      <nav className="mx-auto flex max-w-2xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          style={{ color: "var(--fg)", fontFamily: "var(--font-mono)" }}
          className="text-sm font-medium tracking-tight transition-opacity hover:opacity-70"
        >
          persistentengineer.com
        </Link>

        <div className="flex items-center gap-5">
          {NAV.map(({ href, label }) => {
            const active = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                style={{
                  color: active ? "var(--accent)" : "var(--fg-muted)",
                  fontFamily: "var(--font-mono)",
                }}
                className="text-sm transition-colors hover:text-[--accent]"
              >
                {label}
              </Link>
            );
          })}
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
