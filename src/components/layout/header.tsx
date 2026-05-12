"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LanguageSwitcher } from "@/components/site/language-switcher";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { localePath, type Locale } from "@/lib/i18n";

const navByLocale = {
  en: [
    { href: "/sql", label: "SQL" },
    { href: "/writing", label: "Writing" },
    { href: "/til", label: "TIL" },
    { href: "/projects", label: "Projects" },
    { href: "/about", label: "About" },
    { href: "/cv", label: "CV" },
  ],
  ru: [
    { href: "/sql", label: "SQL" },
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
    <header className="sticky top-3 z-40 px-3">
      <nav className="mx-auto flex max-w-6xl flex-col gap-3 rounded-[28px] border border-[--border] bg-[color-mix(in_srgb,var(--surface)_88%,transparent)] px-4 py-3 shadow-[var(--shadow-card)] backdrop-blur-2xl sm:px-5 lg:flex-row lg:items-center lg:justify-between">
        <Link href={localePath(locale)} className="group flex w-fit flex-col">
          <span className="font-mono text-sm font-semibold tracking-[-0.02em] text-[--fg] transition-colors group-hover:text-[--accent] sm:text-base">
            {brand.title}
          </span>
          <span className="mt-0.5 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-[--fg-muted]">
            {brand.subtitle}
          </span>
        </Link>

        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="flex flex-wrap items-center gap-2 lg:justify-end">
            {nav.map(({ href, label }) => {
              const localizedHref = localePath(locale, href);
              const active =
                pathname === localizedHref ||
                pathname.startsWith(`${localizedHref}/`);

              return (
                <Link
                  key={href}
                  href={localizedHref}
                  className={`rounded-full px-3.5 py-2 font-mono text-xs transition-colors sm:text-sm ${
                    active
                      ? "bg-[--accent-soft] text-[--accent] shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--accent)_26%,transparent)]"
                      : "text-[--fg-muted] hover:bg-[--surface-strong] hover:text-[--fg]"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2 lg:justify-end">
            <LanguageSwitcher locale={locale} />
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
}
