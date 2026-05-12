import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMDXComponents } from "@/components/mdx/mdx-components";
import { Tag } from "@/components/ui/tag";
import { getEditOnGitHubUrl, getEntry } from "@/lib/content";
import { formatDate } from "@/lib/dates";
import { isLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";
import { detailCopy } from "@/lib/ui-copy";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};

  const entry = getEntry(locale, "post", slug);
  if (!entry) return {};

  return buildMetadata({
    locale,
    title: entry.title,
    description: entry.summary,
    path: `/writing/${slug}`,
    type: "article",
  });
}

export default async function WritingDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const entry = getEntry(locale, "post", slug);
  if (!entry) notFound();

  const Component = entry.Component;
  const text = detailCopy[locale];

  return (
    <div className="page-shell page-shell-narrow">
      <nav className="font-mono text-xs text-[--fg-muted]">
        <Link
          href={`/${locale}/writing`}
          className="transition-colors hover:text-[--accent]"
        >
          {text.writing}
        </Link>
        <span className="mx-2">/</span>
        <span>{slug}</span>
      </nav>

      <header className="detail-hero mt-8 p-7 sm:p-10">
        <p className="meta-line">
          {formatDate(locale, entry.date, "long")}
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.055em] sm:text-5xl">
          {entry.title}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-[--fg-muted]">
          {entry.summary}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {entry.tags.map((tag) => (
            <Tag key={tag} tag={tag} locale={locale} />
          ))}
        </div>
      </header>

      <article className="prose prose-custom detail-article mt-10 max-w-none p-6 sm:p-10">
        <Component components={getMDXComponents()} />
      </article>

      <footer className="detail-footer mt-8 flex flex-wrap items-center justify-between gap-4">
        <Link
          href={`/${locale}/writing`}
          className="arrow-link"
        >
          ← {text.allPosts}
        </Link>
        <a
          href={getEditOnGitHubUrl(entry)}
          target="_blank"
          rel="noopener noreferrer"
          className="arrow-link"
        >
          {text.editOnGitHub} ↗
        </a>
      </footer>
    </div>
  );
}
