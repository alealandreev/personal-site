import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell, SectionTitle } from "@/components/site/primitives";
import { Tag } from "@/components/ui/tag";
import { getWriting, getContentHref } from "@/lib/content";
import { formatDate } from "@/lib/dates";
import { isLocale, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";
import { formatReadingTime } from "@/lib/ui-copy";

type Props = {
  params: Promise<{ locale: string }>;
};

const copy = {
  en: {
    title: "Writing",
    description:
      "Long-form essays on data engineering, platform design, distributed systems and AI tooling.",
    subtitle:
      "Long-form essays with explicit trade-offs and real implementation detail.",
  },
  ru: {
    title: "Статьи",
    description:
      "Большие тексты про data engineering, platform design, distributed systems и AI tooling.",
    subtitle:
      "Длинные тексты с явными trade-off'ами и практическими деталями реализации.",
  },
} as const satisfies Record<Locale, unknown>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const text = copy[locale];
  return buildMetadata({
    locale,
    title: text.title,
    description: text.description,
    path: "/writing",
  });
}

export default async function WritingPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const text = copy[locale];
  const posts = getWriting(locale);

  return (
    <PageShell>
      <SectionTitle subtitle={text.subtitle}>{text.title}</SectionTitle>
      <div className="mt-6 grid gap-4">
        {posts.map((post) => (
          <article key={post.slug} className="surface-card p-6 sm:p-7">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-2xl">
                <p className="meta-line">
                  {formatDate(locale, post.date)}
                </p>
                <Link
                  href={getContentHref(post)}
                  className="mt-3 inline-block text-2xl font-semibold tracking-tight transition-colors hover:text-[--accent]"
                >
                  {post.title}
                </Link>
                <p className="mt-3 text-base leading-8 text-[--fg-muted]">
                  {post.summary}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Tag key={tag} tag={tag} locale={locale} />
                  ))}
                </div>
              </div>
              <p className="w-fit rounded-full border border-[--border] bg-[--surface] px-3 py-1.5 font-mono text-xs text-[--fg-muted]">
                {formatReadingTime(locale, post.readingMinutes)}
              </p>
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
