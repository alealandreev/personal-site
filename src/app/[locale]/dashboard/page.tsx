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
    description: "A public snapshot of the site as a small data product.",
    note: "For now this dashboard is powered by local content metadata. The next step is a scheduled ETL that adds GitHub, writing and activity signals as queryable public data.",
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
    description: "Публичный снимок сайта как небольшого data product.",
    note: "Сейчас dashboard питается локальными metadata контента. Следующий шаг — scheduled ETL, который добавит GitHub, writing и activity-сигналы как публичные queryable data.",
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
          <div key={item.label} className="surface-card p-5">
            <p className="meta-line">
              {item.label}
            </p>
            <p className="mt-3 text-3xl font-semibold tracking-[-0.055em]">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <div className="surface-card mt-6 p-6 sm:p-7">
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
