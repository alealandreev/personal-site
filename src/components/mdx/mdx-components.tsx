import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { getDatasetCatalog } from "@/lib/dataset-catalog";
import { localePath, type Locale } from "@/lib/i18n";

function DatasetPreview({ locale = "en" }: { locale?: Locale }) {
  const catalog = getDatasetCatalog();
  if (!catalog) return null;

  return (
    <div className="not-prose my-8 rounded-3xl border border-[--border] bg-[--surface-strong] p-5">
      <p className="eyebrow">public dataset</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {catalog.tables.map((table) => (
          <div key={table.name} className="rounded-2xl border border-[--border] bg-[--surface] p-4">
            <p className="font-mono text-sm text-[--accent]">{table.name}</p>
            <p className="mt-2 text-sm text-[--fg-muted]">
              {table.row_count} rows · {table.columns.length} columns
            </p>
          </div>
        ))}
      </div>
      <Link href={localePath(locale, "/sql")} className="button-secondary mt-5">
        Query with SQL
      </Link>
    </div>
  );
}

function SQLSnippet({
  query,
  title = "Open in SQL workbench",
  locale = "en",
}: {
  query: string;
  title?: string;
  locale?: Locale;
}) {
  const encoded = Buffer.from(query, "utf8").toString("base64url");

  return (
    <div className="not-prose my-8 rounded-3xl border border-[--border] bg-[--code-bg] p-5">
      <p className="eyebrow">{title}</p>
      <pre className="mt-4 overflow-x-auto font-mono text-xs leading-6 text-[--fg-muted]">
        {query}
      </pre>
      <Link
        href={`${localePath(locale, "/sql")}#q=${encoded}`}
        className="button-secondary mt-5"
      >
        Run this query
      </Link>
    </div>
  );
}

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    // Override anchor to use Next.js Link for internal links
    a: ({ href, children, ...props }) => {
      if (href?.startsWith("/") || href?.startsWith("#")) {
        return (
          <Link href={href} {...props}>
            {children}
          </Link>
        );
      }
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
          {children}
        </a>
      );
    },

    // Responsive images
    img: ({ src, alt, ...props }) => (
      <figure className="my-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt || ""}
          className="w-full rounded-[28px] border border-[--border] shadow-[var(--shadow-card)]"
          {...props}
        />
        {alt && (
          <figcaption className="mt-2 text-center font-mono text-xs text-[--fg-muted]">
            {alt}
          </figcaption>
        )}
      </figure>
    ),

    // Callout / blockquote
    blockquote: ({ children }) => (
      <blockquote className="my-8 rounded-3xl border border-[--border] bg-[--surface-strong] px-5 py-4 text-[--fg-muted]">
        {children}
      </blockquote>
    ),

    DatasetPreview,
    SQLSnippet,

    // Merge with custom components
    ...components,
  };
}
