import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell, SectionTitle } from "@/components/site/primitives";
import { getContentStats } from "@/lib/content";
import { isLocale, localePath, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";

type Props = {
  params: Promise<{ locale: string }>;
};

const copy = {
  en: {
    title: "Dashboard",
    description: "A small public snapshot based on site and content data.",
    note: "This page intentionally stays minimal until I connect reliable external activity sources.",
    statsLabels: {
      posts: "Posts",
      til: "TIL",
      projects: "Projects",
    },
    wordsLabel: "words",
    writingLink: "Writing",
    projectsLink: "Projects",
  },
  ru: {
    title: "Dashboard",
    description:
      "Небольшой публичный снимок по данным самого сайта и контента.",
    note: "Страница специально остаётся минимальной, пока не подключены надёжные внешние источники активности.",
    statsLabels: {
      posts: "Статьи",
      til: "TIL",
      projects: "Проекты",
    },
    wordsLabel: "слов",
    writingLink: "Статьи",
    projectsLink: "Проекты",
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
    path: "/dashboard",
    robots: { index: false, follow: true },
  });
}

export default async function DashboardPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const text = copy[locale];
  const stats = getContentStats(locale);

  return (
    <PageShell>
      <SectionTitle subtitle={text.description}>{text.title}</SectionTitle>
      <div className="mt-6 grid gap-4 md:grid-cols-4">
        {[
          { label: text.statsLabels.posts, value: stats.totalPosts },
          { label: text.statsLabels.til, value: stats.totalTils },
          { label: text.statsLabels.projects, value: stats.totalProjects },
          {
            label: text.wordsLabel,
            value: stats.totalWords.toLocaleString(locale),
          },
        ].map((item) => (
          <div key={item.label} className="surface p-5">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[--fg-muted]">
              {item.label}
            </p>
            <p className="mt-3 text-3xl font-semibold tracking-tight">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <div className="surface mt-6 p-6">
        <p className="text-sm leading-7 text-[--fg-muted]">{text.note}</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href={localePath(locale, "/writing")}
            className="button-secondary"
          >
            {text.writingLink}
          </Link>
          <Link
            href={localePath(locale, "/projects")}
            className="button-secondary"
          >
            {text.projectsLink}
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
