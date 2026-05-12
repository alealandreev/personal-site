import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMDXComponents } from "@/components/mdx/mdx-components";
import { Tag } from "@/components/ui/tag";
import { getEditOnGitHubUrl, getEntry } from "@/lib/content";
import { formatDate } from "@/lib/dates";
import { isLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";
import { detailCopy, formatProjectStatus } from "@/lib/ui-copy";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};

  const entry = getEntry(locale, "project", slug);
  if (!entry) return {};

  return buildMetadata({
    locale,
    title: entry.title,
    description: entry.summary,
    path: `/projects/${slug}`,
    type: "article",
  });
}

export default async function ProjectDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const entry = getEntry(locale, "project", slug);
  if (!entry) notFound();

  const Component = entry.Component;
  const text = detailCopy[locale];

  return (
    <div className="page-shell page-shell-narrow">
      <nav className="font-mono text-xs text-[--fg-muted]">
        <Link
          href={`/${locale}/projects`}
          className="transition-colors hover:text-[--accent]"
        >
          {text.projects}
        </Link>
        <span className="mx-2">/</span>
        <span>{slug}</span>
      </nav>

      <header className="mt-8 surface p-7 sm:p-10">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-[--fg-muted]">
          {formatDate(locale, entry.date, "long")}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <h1 className="text-4xl font-semibold tracking-tight">
            {entry.title}
          </h1>
          <span className="pill">
            {formatProjectStatus(locale, entry.status)}
          </span>
        </div>
        <p className="mt-4 max-w-3xl text-base leading-8 text-[--fg-muted]">
          {entry.summary}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {entry.tags.map((tag) => (
            <Tag key={tag} tag={tag} locale={locale} />
          ))}
        </div>
      </header>

      <article className="prose prose-custom mt-10 max-w-none rounded-[28px] border border-[--border] bg-[--surface] p-6 shadow-[var(--shadow-card)] sm:p-10">
        <Component components={getMDXComponents()} />
      </article>

      <footer className="mt-8 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[--fg-muted]">
        <Link
          href={`/${locale}/projects`}
          className="transition-colors hover:text-[--accent]"
        >
          ← {text.allProjects}
        </Link>
        <a
          href={getEditOnGitHubUrl(entry)}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-[--accent]"
        >
          {text.editOnGitHub} ↗
        </a>
      </footer>
    </div>
  );
}
