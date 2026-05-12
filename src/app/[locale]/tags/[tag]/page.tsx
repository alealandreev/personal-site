import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Tag } from "@/components/ui/tag";
import { getContentHref, getEntriesByTag, getTagDescription } from "@/lib/content";
import { formatDate } from "@/lib/dates";
import { isLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";

type Props = {
  params: Promise<{ locale: string; tag: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, tag } = await params;
  if (!isLocale(locale)) return {};

  const description = getTagDescription(locale, tag);
  if (!description) return {};

  return buildMetadata({
    locale,
    title: `#${tag}`,
    description,
    path: `/tags/${tag}`,
  });
}

export default async function TagPage({ params }: Props) {
  const { locale, tag } = await params;
  if (!isLocale(locale)) notFound();

  const description = getTagDescription(locale, tag);
  const entries = getEntriesByTag(locale, tag);

  if (!description && entries.length === 0) {
    notFound();
  }

  return (
    <div className="page-shell page-shell-narrow">
      <nav className="font-mono text-xs text-[--fg-muted]">
        <Link
          href={`/${locale}/tags`}
          className="transition-colors hover:text-[--accent]"
        >
          tags
        </Link>
        <span className="mx-2">/</span>
        <span>{tag}</span>
      </nav>

      <header className="detail-hero mt-8 p-7 sm:p-10">
        <p className="eyebrow">topic</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.055em]">
          #{tag}
        </h1>
        {description ? (
          <p className="mt-4 text-base leading-8 text-[--fg-muted]">
            {description}
          </p>
        ) : null}
      </header>

      <div className="mt-8 grid gap-4">
        {entries.map((entry) => (
          <article
            key={`${entry.kind}-${entry.slug}`}
            className="surface-card p-6"
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <p className="meta-line">
                  {entry.kind} · {formatDate(locale, entry.date)}
                </p>
                <Link
                  href={getContentHref(entry)}
                  className="mt-3 inline-block text-xl font-semibold tracking-tight transition-colors hover:text-[--accent]"
                >
                  {entry.title}
                </Link>
                <p className="mt-3 text-sm leading-7 text-[--fg-muted]">
                  {entry.summary}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {entry.tags.map((value) => (
                    <Tag key={value} tag={value} locale={locale} />
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
