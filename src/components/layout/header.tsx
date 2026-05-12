"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LanguageSwitcher } from "@/components/site/language-switcher";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { localePath, type Locale } from "@/lib/i18n";

const navByLocale = {
  en: [
    { href: "/writing", label: "Writing" },
    { href: "/til", label: "TIL" },
    { href: "/projects", label: "Projects" },
    { href: "/about", label: "About" },
    { href: "/cv", label: "CV" },
  ],
  ru: [
    { href: "/writing", label: "Статьи" },
    { href: "/til", label: "TIL" },
    { href: "/projects", label: "Проекты" },
    { href: "/about", label: "Обо мне" },
    { href: "/cv", label: "CV" },
  ],
} as const;

const brandByLocale = {
  en: {
    title: "persistentengineer.com",
    subtitle: "Lead Data Engineer",
  },
  ru: {
    title: "persistentengineer.com",
    subtitle: "Data platforms and AI tooling",
  },
} as const;

export function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const nav = navByLocale[locale];
  const brand = brandByLocale[locale];

  return (
    <header className="sticky top-0 z-40 border-b border-[--border] bg-[color-mix(in_srgb,var(--bg)_88%,transparent)] backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <Link href={localePath(locale)} className="group flex w-fit flex-col">
          <span className="font-mono text-sm font-semibold tracking-tight text-[--fg] transition-colors group-hover:text-[--accent]">
            {brand.title}
          </span>
          <span className="mt-1 text-xs text-[--fg-muted]">
            {brand.subtitle}
          </span>
        </Link>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <div className="flex flex-wrap items-center gap-4 lg:justify-end">
            {nav.map(({ href, label }) => {
              const localizedHref = localePath(locale, href);
              const active =
                pathname === localizedHref ||
                pathname.startsWith(`${localizedHref}/`);

              return (
                <Link
                  key={href}
                  href={localizedHref}
                  className={`rounded-full px-3 py-1.5 font-mono text-sm transition-colors ${
                    active
                      ? "bg-[--accent-soft] text-[--accent]"
                      : "text-[--fg-muted] hover:bg-[--surface-strong] hover:text-[--accent]"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-3 lg:justify-end">
            <LanguageSwitcher locale={locale} />
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
}
