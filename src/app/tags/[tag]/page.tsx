import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Tag } from "@/components/ui/tag";

// In production: pull from MDX content source
const TAG_META: Record<string, { description: string }> = {
  "data-engineering": { description: "Data pipelines, platforms, and infrastructure at scale." },
  "apache-iceberg": { description: "Open table format for huge analytic datasets." },
  duckdb: { description: "In-process analytical SQL engine. Replaced pandas for most ad-hoc work." },
  parquet: { description: "Columnar storage format — the foundation of modern data lakes." },
  meta: { description: "Posts about this site itself." },
  llm: { description: "Large language models in production data systems." },
  s3: { description: "AWS S3 and object storage patterns." },
};

const TAG_POSTS: Record<string, Array<{ slug: string; title: string; date: string; type: "post" | "til" }>> = {
  duckdb: [
    { slug: "duckdb-httpfs-pushdown", title: "DuckDB httpfs column pushdown over Parquet on S3", date: "2026-04-29", type: "til" },
  ],
  meta: [
    { slug: "hello-world", title: "Hello, world — stack overview and what's coming", date: "2026-04-30", type: "post" },
  ],
  parquet: [
    { slug: "duckdb-httpfs-pushdown", title: "DuckDB httpfs column pushdown over Parquet on S3", date: "2026-04-29", type: "til" },
  ],
  s3: [
    { slug: "duckdb-httpfs-pushdown", title: "DuckDB httpfs column pushdown over Parquet on S3", date: "2026-04-29", type: "til" },
  ],
};

type Props = { params: Promise<{ tag: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  const meta = TAG_META[tag];
  if (!meta) return {};
  return { title: `#${tag}`, description: meta.description };
}

export async function generateStaticParams() {
  return Object.keys(TAG_META).map((tag) => ({ tag }));
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const meta = TAG_META[tag];
  if (!meta) notFound();

  const posts = TAG_POSTS[tag] ?? [];

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <nav
        style={{ color: "var(--fg-muted)", fontFamily: "var(--font-mono)" }}
        className="mb-8 text-xs"
      >
        <Link href="/tags" className="transition-colors hover:text-[--accent]">tags</Link>
        <span className="mx-2">/</span>
        <span>{tag}</span>
      </nav>

      <h1
        style={{ color: "var(--fg)", fontFamily: "var(--font-mono)" }}
        className="text-lg font-semibold"
      >
        #{tag}
      </h1>
      <p style={{ color: "var(--fg-muted)" }} className="mt-2 text-sm">
        {meta.description}
      </p>

      {posts.length > 0 ? (
        <ul
          style={{ borderTop: "1px solid var(--border)" }}
          className="mt-8 divide-y"
        >
          {posts.map((p) => {
            const href = p.type === "til" ? `/til/${p.slug}` : `/writing/${p.slug}`;
            return (
              <li
                key={p.slug}
                style={{ borderBottom: "1px solid var(--border)" }}
                className="flex items-center justify-between py-3"
              >
                <div className="flex items-center gap-3">
                  <span
                    style={{
                      color: "var(--fg-muted)",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.65rem",
                      border: "1px solid var(--border)",
                      borderRadius: "3px",
                    }}
                    className="px-1 py-0.5"
                  >
                    {p.type}
                  </span>
                  <Link
                    href={href}
                    style={{ color: "var(--fg)" }}
                    className="text-sm transition-colors hover:text-[--accent]"
                  >
                    {p.title}
                  </Link>
                </div>
                <time
                  dateTime={p.date}
                  style={{ color: "var(--fg-muted)", fontFamily: "var(--font-mono)", flexShrink: 0 }}
                  className="ml-4 text-xs"
                >
                  {p.date}
                </time>
              </li>
            );
          })}
        </ul>
      ) : (
        <p style={{ color: "var(--fg-muted)" }} className="mt-8 text-sm">
          No posts yet for this tag.
        </p>
      )}
    </div>
  );
}
