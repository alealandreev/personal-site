import Link from "next/link";
import { localePath, type Locale } from "@/lib/i18n";

const linksByLocale = {
  en: [
    { href: "/rss.xml", label: "RSS" },
    { href: "/sql", label: "SQL" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/now", label: "Now" },
    { href: "/uses", label: "Uses" },
    { href: "/colophon", label: "Colophon" },
    { href: "https://github.com/alealandreev/personal-site", label: "Source" },
  ],
  ru: [
    { href: "/rss.xml", label: "RSS" },
    { href: "/sql", label: "SQL" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/now", label: "Сейчас" },
    { href: "/uses", label: "Инструменты" },
    { href: "/colophon", label: "Colophon" },
    {
      href: "https://github.com/alealandreev/personal-site",
      label: "Исходники",
    },
  ],
} as const;

export function Footer({ locale }: { locale: Locale }) {
  const year = new Date().getFullYear();
  const links = linksByLocale[locale];
  const copy =
    locale === "en"
      ? {
          byline:
            "Built with Next.js, MDX and a bias toward clear engineering writing.",
        }
      : {
          byline:
            "Собрано на Next.js и MDX с упором на ясную инженерную подачу.",
        };

  return (
    <footer className="mt-24 border-t border-[--border] bg-[color-mix(in_srgb,var(--surface)_54%,transparent)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-[--fg-muted]">
            © {year} Aleksandr Andreev.
          </p>
          <p className="mt-3 max-w-md text-sm leading-7 text-[--fg-muted]">
            {copy.byline}
          </p>
        </div>

        <nav className="flex flex-wrap gap-2 text-xs font-mono text-[--fg-muted]">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href.startsWith("http") ? href : localePath(locale, href)}
              className="rounded-full border border-[--border] bg-[--surface] px-3 py-1.5 transition-colors hover:border-[--accent] hover:text-[--accent]"
              {...(href.startsWith("http")
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
