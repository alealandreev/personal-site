import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Colophon",
  description: "How this site is built.",
};

const STACK = [
  { label: "Framework", value: "Next.js 15 (App Router, React 19)" },
  { label: "Language", value: "TypeScript (strict)" },
  { label: "Styling", value: "Tailwind CSS v4" },
  { label: "Content", value: "MDX via fumadocs-mdx" },
  { label: "Syntax", value: "rehype-pretty-code + Shiki" },
  { label: "Fonts", value: "Geist Sans + Geist Mono (Vercel)" },
  { label: "Hosting", value: "Vercel (Hobby tier)" },
  { label: "CDN / DNS", value: "Cloudflare (orange-cloud proxy)" },
  { label: "Database", value: "Neon Postgres (Drizzle ORM)" },
  { label: "Newsletter", value: "Buttondown" },
  { label: "Analytics", value: "Plausible (privacy-first)" },
  { label: "Source", value: "GitHub (public repo)" },
  { label: "Monthly cost", value: "$1 (domain only)" },
];

export default function ColophonPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1
        style={{ color: "var(--fg)", fontFamily: "var(--font-mono)" }}
        className="text-sm font-semibold uppercase tracking-widest"
      >
        Colophon
      </h1>

      <p style={{ color: "var(--fg-muted)" }} className="mt-4 text-sm leading-relaxed">
        An open description of how this site is built and why each technology
        was chosen. The site itself is a portfolio piece — the stack signals
        engineering taste.
      </p>

      <table className="mt-10 w-full border-collapse text-sm">
        <tbody>
          {STACK.map(({ label, value }) => (
            <tr
              key={label}
              style={{ borderBottom: "1px solid var(--border)" }}
            >
              <td
                style={{ color: "var(--fg-muted)", fontFamily: "var(--font-mono)" }}
                className="py-3 pr-6 text-xs"
              >
                {label}
              </td>
              <td style={{ color: "var(--fg)" }} className="py-3">
                {value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-10 space-y-4 text-sm leading-relaxed">
        <h2
          style={{ color: "var(--fg)", fontFamily: "var(--font-mono)" }}
          className="text-xs font-semibold uppercase tracking-widest"
        >
          Why this stack
        </h2>

        <p style={{ color: "var(--fg)" }}>
          Next.js over Astro or Hugo: the site needs to grow into moonshot
          features (interactive distributed systems essays, live SQL playground,
          RAG chat). RSC + Server Actions make this possible without introducing
          a separate backend.
        </p>

        <p style={{ color: "var(--fg)" }}>
          Cloudflare over Netlify: the zero-egress-cost R2 storage is critical
          for hosting Parquet datasets that power the SQL playground. Cloudflare
          Email Routing also replaces a paid email service.
        </p>

        <p style={{ color: "var(--fg)" }}>
          Plausible over Google Analytics: I don&apos;t want to track visitors.
          Plausible is privacy-first, cookieless, and the public dashboard
          signals that openly.
        </p>

        <p style={{ color: "var(--fg)" }}>
          Neon over Supabase: branching support is useful for schema migrations.
          The serverless driver works on Vercel Edge without connection pooling
          overhead.
        </p>
      </div>
    </div>
  );
}
