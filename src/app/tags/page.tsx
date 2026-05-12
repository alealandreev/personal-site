import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tags",
  description: "Browse writing by topic.",
};

// Aggregated from all content — replace with dynamic source
const ALL_TAGS: Record<string, { count: number; description?: string }> = {
  "data-engineering": { count: 1, description: "Data pipelines, platforms, and infrastructure" },
  "apache-iceberg": { count: 0, description: "Open lakehouse table format" },
  "apache-kafka": { count: 0, description: "Distributed streaming" },
  "apache-spark": { count: 0, description: "Large-scale batch processing" },
  dbt: { count: 0, description: "Transformation layer for analytics" },
  duckdb: { count: 1, description: "In-process analytical database" },
  llm: { count: 0, description: "Large language models in production" },
  parquet: { count: 1, description: "Columnar storage format" },
  meta: { count: 1, description: "About this site" },
  python: { count: 0 },
  scala: { count: 0 },
  s3: { count: 1 },
};

export default function TagsPage() {
  const sorted = Object.entries(ALL_TAGS).sort(([, a], [, b]) => b.count - a.count);

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1
        style={{ color: "var(--fg)", fontFamily: "var(--font-mono)" }}
        className="text-sm font-semibold uppercase tracking-widest"
      >
        Tags
      </h1>

      <ul
        style={{ borderTop: "1px solid var(--border)" }}
        className="mt-8 divide-y"
      >
        {sorted.map(([tag, { count, description }]) => (
          <li
            key={tag}
            style={{ borderBottom: "1px solid var(--border)" }}
            className="flex items-center justify-between py-3"
          >
            <div>
              <Link
                href={`/tags/${tag}`}
                style={{ color: "var(--fg)", fontFamily: "var(--font-mono)" }}
                className="text-sm transition-colors hover:text-[--accent]"
              >
                {tag}
              </Link>
              {description && (
                <p style={{ color: "var(--fg-muted)" }} className="text-xs mt-0.5">
                  {description}
                </p>
              )}
            </div>
            <span
              style={{ color: "var(--fg-muted)", fontFamily: "var(--font-mono)" }}
              className="text-xs"
            >
              {count}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
