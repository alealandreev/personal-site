import type { Metadata } from "next";
import Link from "next/link";
import { Tag } from "@/components/ui/tag";

export const metadata: Metadata = {
  title: "TIL",
  description:
    "Today I Learned — short notes on things I discovered working with data systems.",
};

// TODO: replace with fumadocs source when wired up
const ALL_TILS = [
  {
    slug: "duckdb-httpfs-pushdown",
    title: "DuckDB httpfs column pushdown over Parquet on S3",
    date: "2026-04-29",
    tags: ["duckdb", "parquet", "s3"],
    summary:
      "DuckDB pushes column projection and filter predicates to S3 HTTP range requests — but only if row group stats are present.",
  },
];

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function TilPage() {
  const grouped = ALL_TILS.reduce<Record<string, typeof ALL_TILS>>(
    (acc, til) => {
      const year = til.date.slice(0, 4);
      (acc[year] ??= []).push(til);
      return acc;
    },
    {}
  );

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1
        style={{ color: "var(--fg)", fontFamily: "var(--font-mono)" }}
        className="text-sm font-semibold uppercase tracking-widest"
      >
        Today I Learned
      </h1>
      <p style={{ color: "var(--fg-muted)" }} className="mt-2 text-sm">
        Short notes on things I Google twice.{" "}
        <span style={{ fontFamily: "var(--font-mono)" }}>
          {ALL_TILS.length} entries.
        </span>
      </p>

      {Object.entries(grouped)
        .sort(([a], [b]) => Number(b) - Number(a))
        .map(([year, tils]) => (
          <section key={year} className="mt-12">
            <h2
              style={{
                color: "var(--fg-muted)",
                fontFamily: "var(--font-mono)",
                borderBottom: "1px solid var(--border)",
              }}
              className="pb-2 text-xs font-semibold uppercase tracking-widest"
            >
              {year}
            </h2>

            <ul className="mt-2 divide-y" style={{ "--tw-divide-opacity": "1" } as React.CSSProperties}>
              {tils.map((til) => (
                <li
                  key={til.slug}
                  style={{ borderBottom: "1px solid var(--border)" }}
                  className="py-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Link
                        href={`/til/${til.slug}`}
                        style={{ color: "var(--fg)" }}
                        className="text-sm font-medium transition-colors hover:text-[--accent]"
                      >
                        {til.title}
                      </Link>
                      <p
                        style={{ color: "var(--fg-muted)" }}
                        className="mt-1 text-xs leading-relaxed"
                      >
                        {til.summary}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {til.tags.map((tag) => (
                          <Tag key={tag} tag={tag} />
                        ))}
                      </div>
                    </div>
                    <time
                      dateTime={til.date}
                      style={{
                        color: "var(--fg-muted)",
                        fontFamily: "var(--font-mono)",
                        flexShrink: 0,
                      }}
                      className="text-xs"
                    >
                      {formatDate(til.date)}
                    </time>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
    </div>
  );
}
