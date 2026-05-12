import Link from "next/link";
import { localePath, type Locale } from "@/lib/i18n";

const linksByLocale = {
  en: [
    { href: "/rss.xml", label: "RSS" },
    { href: "/now", label: "Now" },
    { href: "/uses", label: "Uses" },
    { href: "/colophon", label: "Colophon" },
    { href: "https://github.com/alealandreev/personal-site", label: "Source" },
  ],
  ru: [
    { href: "/rss.xml", label: "RSS" },
    { href: "/now", label: "Сейчас" },
    { href: "/uses", label: "Инструменты" },
    { href: "/colophon", label: "Colophon" },
    { href: "https://github.com/alealandreev/personal-site", label: "Исходники" },
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
    <footer className="mt-24 border-t border-[--border]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-xs text-[--fg-muted]">
            © {year} Aleksandr Andreev.
          </p>
          <p className="mt-2 max-w-md text-sm text-[--fg-muted]">{copy.byline}</p>
        </div>

        <nav className="flex flex-wrap gap-4 text-xs font-mono text-[--fg-muted]">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href.startsWith("http") ? href : localePath(locale, href)}
              className="transition-colors hover:text-[--accent]"
              {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
