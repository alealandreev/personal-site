import Link from "next/link";

const LINKS = [
  { href: "/rss.xml", label: "RSS" },
  { href: "/now", label: "Now" },
  { href: "/uses", label: "Uses" },
  { href: "/colophon", label: "Colophon" },
  { href: "https://github.com/alealandreev/personal-site", label: "Source" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        color: "var(--fg-muted)",
        fontFamily: "var(--font-mono)",
      }}
      className="mt-24"
    >
      <div className="mx-auto flex max-w-2xl flex-col gap-4 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs">© {year} Aleksandr Andreev.</p>
        <nav className="flex flex-wrap gap-4 text-xs">
          {LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
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
