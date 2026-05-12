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
    note:
      "This page intentionally stays minimal until I connect reliable external activity sources.",
  },
  ru: {
    title: "Dashboard",
    description: "Небольшой публичный снимок по данным самого сайта и контента.",
    note:
      "Страница специально остаётся минимальной, пока не подключены надёжные внешние источники активности.",
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
          { label: "Posts", value: stats.totalPosts },
          { label: "TIL", value: stats.totalTils },
          { label: "Projects", value: stats.totalProjects },
          { label: "Words", value: stats.totalWords.toLocaleString() },
        ].map((item) => (
          <div key={item.label} className="surface p-5">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[--fg-muted]">
              {item.label}
            </p>
            <p className="mt-3 text-3xl font-semibold tracking-tight">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="surface mt-6 p-6">
        <p className="text-sm leading-7 text-[--fg-muted]">{text.note}</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href={localePath(locale, "/writing")} className="button-secondary">
            Writing
          </Link>
          <Link href={localePath(locale, "/projects")} className="button-secondary">
            Projects
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
