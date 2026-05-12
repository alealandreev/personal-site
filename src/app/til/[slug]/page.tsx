import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Tag } from "@/components/ui/tag";

// TODO: replace with fumadocs source
const TILS: Record<
  string,
  { title: string; date: string; tags: string[]; summary: string }
> = {
  "duckdb-httpfs-pushdown": {
    title: "DuckDB httpfs column pushdown over Parquet on S3",
    date: "2026-04-29",
    tags: ["duckdb", "parquet", "s3"],
    summary:
      "DuckDB pushes column projection and filter predicates to S3 HTTP range requests — but only if row group stats are present.",
  },
};

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const til = TILS[slug];
  if (!til) return {};
  return { title: til.title, description: til.summary };
}

export async function generateStaticParams() {
  return Object.keys(TILS).map((slug) => ({ slug }));
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function TilSlugPage({ params }: Props) {
  const { slug } = await params;
  const til = TILS[slug];
  if (!til) notFound();

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <nav
        style={{ color: "var(--fg-muted)", fontFamily: "var(--font-mono)" }}
        className="mb-8 text-xs"
      >
        <Link href="/til" className="transition-colors hover:text-[--accent]">
          til
        </Link>
        <span className="mx-2">/</span>
        <span>{slug}</span>
      </nav>

      <header className="mb-10">
        <h1
          style={{ color: "var(--fg)" }}
          className="text-xl font-semibold leading-snug"
        >
          {til.title}
        </h1>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <time
            dateTime={til.date}
            style={{ color: "var(--fg-muted)", fontFamily: "var(--font-mono)" }}
            className="text-xs"
          >
            {formatDate(til.date)}
          </time>
          {til.tags.map((tag) => (
            <Tag key={tag} tag={tag} />
          ))}
        </div>
      </header>

      {/* MDX body goes here once fumadocs source is wired */}
      <article
        className="prose max-w-none text-sm leading-relaxed"
        style={
          {
            "--tw-prose-body": "var(--fg)",
            "--tw-prose-headings": "var(--fg)",
            "--tw-prose-links": "var(--accent)",
            "--tw-prose-code": "var(--fg)",
            "--tw-prose-pre-bg": "var(--code-bg)",
          } as React.CSSProperties
        }
      >
        <p style={{ color: "var(--fg-muted)" }}>{til.summary}</p>
        <p>
          Full MDX content loads once{" "}
          <code>fumadocs-mdx</code> source is wired.
        </p>
      </article>

      <div
        style={{
          borderTop: "1px solid var(--border)",
          color: "var(--fg-muted)",
          fontFamily: "var(--font-mono)",
        }}
        className="mt-12 flex justify-between pt-4 text-xs"
      >
        <Link href="/til" className="transition-colors hover:text-[--accent]">
          ← All TIL
        </Link>
        <a
          href={`https://github.com/alealandreev/personal-site/blob/main/content/til/${slug}.mdx`}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-[--accent]"
        >
          Edit on GitHub ↗
        </a>
      </div>
    </div>
  );
}
