import Link from "next/link";
import { Tag } from "@/components/ui/tag";

// Placeholder data — replace with actual content sources
const FEATURED_POSTS = [
  {
    slug: "hello-world",
    title: "Hello, world — stack overview and what's coming",
    date: "2026-04-30",
    summary: "First post on the new site. Stack overview and what's coming.",
    tags: ["meta"],
  },
];

const RECENT_TILS = [
  {
    slug: "duckdb-httpfs-pushdown",
    title: "DuckDB httpfs column pushdown over Parquet on S3",
    date: "2026-04-29",
  },
];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function HomePage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      {/* Hero */}
      <section className="animate-in">
        <h1
          style={{ color: "var(--fg)", fontFamily: "var(--font-mono)" }}
          className="text-2xl font-semibold tracking-tight"
        >
          Aleksandr{" "}
          <span style={{ color: "var(--accent)" }}>Andreev</span>
        </h1>
        <p
          style={{ color: "var(--fg-muted)", fontFamily: "var(--font-mono)" }}
          className="mt-1 text-sm"
        >
          Lead Data Engineer · Moscow · Russia
        </p>

        <p style={{ color: "var(--fg)" }} className="mt-6 leading-relaxed">
          9+ years building data platforms at scale — Spark, Kafka, Airflow,
          dbt, Apache Iceberg. Currently at AlfaStrakhovanie.{" "}
          <span style={{ color: "var(--fg-muted)" }}>
            Open to senior+ roles internationally (AU/NZ/EU/US).
          </span>
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          {[
            { href: "https://linkedin.com/in/TODO_YOUR_LINKEDIN", label: "LinkedIn" },
            { href: "https://github.com/alealandreev", label: "GitHub" },
            { href: "mailto:hire@persistentengineer.com", label: "Email" },
            { href: "/cv", label: "CV" },
          ].map(({ href, label }) => (
            <a
              key={href}
              href={href}
              style={{
                border: "1px solid var(--border)",
                color: "var(--fg-muted)",
                fontFamily: "var(--font-mono)",
                borderRadius: "4px",
                fontSize: "0.8rem",
              }}
              className="px-3 py-1.5 transition-colors hover:border-[--accent] hover:text-[--accent]"
            >
              {label}
            </a>
          ))}
        </div>
      </section>

      {/* Writing */}
      <section className="animate-in delay-100 mt-16">
        <div className="flex items-center justify-between">
          <h2
            style={{ color: "var(--fg)", fontFamily: "var(--font-mono)" }}
            className="text-sm font-semibold uppercase tracking-widest"
          >
            Writing
          </h2>
          <Link
            href="/writing"
            style={{
              color: "var(--fg-muted)",
              fontFamily: "var(--font-mono)",
            }}
            className="text-xs transition-colors hover:text-[--accent]"
          >
            all posts →
          </Link>
        </div>

        <div
          style={{ borderTop: "1px solid var(--border)" }}
          className="mt-4 divide-y"
        >
          {FEATURED_POSTS.map((post) => (
            <article key={post.slug} className="py-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Link
                    href={`/writing/${post.slug}`}
                    style={{ color: "var(--fg)" }}
                    className="font-medium leading-snug transition-colors hover:text-[--accent]"
                  >
                    {post.title}
                  </Link>
                  <p
                    style={{ color: "var(--fg-muted)" }}
                    className="mt-1 text-sm leading-relaxed"
                  >
                    {post.summary}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <Tag key={tag} tag={tag} />
                    ))}
                  </div>
                </div>
                <time
                  dateTime={post.date}
                  style={{
                    color: "var(--fg-muted)",
                    fontFamily: "var(--font-mono)",
                    flexShrink: 0,
                  }}
                  className="text-xs"
                >
                  {formatDate(post.date)}
                </time>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* TIL */}
      <section className="animate-in delay-200 mt-14">
        <div className="flex items-center justify-between">
          <h2
            style={{ color: "var(--fg)", fontFamily: "var(--font-mono)" }}
            className="text-sm font-semibold uppercase tracking-widest"
          >
            Today I Learned
          </h2>
          <Link
            href="/til"
            style={{ color: "var(--fg-muted)", fontFamily: "var(--font-mono)" }}
            className="text-xs transition-colors hover:text-[--accent]"
          >
            all →
          </Link>
        </div>

        <ul
          style={{ borderTop: "1px solid var(--border)" }}
          className="mt-4 space-y-0"
        >
          {RECENT_TILS.map((til) => (
            <li
              key={til.slug}
              style={{ borderBottom: "1px solid var(--border)" }}
              className="flex items-center justify-between py-3"
            >
              <Link
                href={`/til/${til.slug}`}
                style={{ color: "var(--fg)" }}
                className="text-sm transition-colors hover:text-[--accent]"
              >
                {til.title}
              </Link>
              <time
                dateTime={til.date}
                style={{ color: "var(--fg-muted)", fontFamily: "var(--font-mono)", flexShrink: 0 }}
                className="ml-4 text-xs"
              >
                {formatDate(til.date)}
              </time>
            </li>
          ))}
        </ul>
      </section>

      {/* Work auth signal */}
      <section className="animate-in delay-300 mt-14">
        <p
          style={{
            color: "var(--fg-muted)",
            fontFamily: "var(--font-mono)",
            borderLeft: "2px solid var(--accent)",
            paddingLeft: "1rem",
          }}
          className="text-xs leading-relaxed"
        >
          Russian citizen. Currently Moscow. Available for senior+ remote or
          relocation roles. Actively pursuing visa options for AU/NZ/EU/US.
        </p>
      </section>
    </div>
  );
}
