import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/site/primitives";
import { SQLWorkbench } from "@/components/sql/sql-workbench";
import { isLocale, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";

type Props = {
  params: Promise<{ locale: string }>;
};

const copy = {
  en: {
    title: "Query my work",
    description:
      "A browser SQL workbench over public metadata from this site and my engineering activity.",
    eyebrow: "public dataset",
    intro:
      "This page turns the portfolio into a small data product: content metadata, project signals and activity aggregates are published as queryable tables and loaded into DuckDB-WASM in your browser.",
    note: "No private events or raw API payloads are exposed. The dataset is intentionally small, documented and reproducible.",
  },
  ru: {
    title: "Query my work",
    description:
      "SQL-workbench в браузере по публичным metadata сайта и инженерной активности.",
    eyebrow: "public dataset",
    intro:
      "Эта страница превращает портфолио в небольшой data product: metadata контента, проектные сигналы и агрегаты активности публикуются как queryable tables и загружаются в DuckDB-WASM прямо в браузере.",
    note: "Приватные события и сырые API payloads не публикуются. Датасет намеренно маленький, документированный и воспроизводимый.",
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
    path: "/sql",
  });
}

export default async function SQLPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const text = copy[locale];

  return (
    <PageShell wide>
      <section className="detail-hero p-7 sm:p-10">
        <p className="eyebrow">{text.eyebrow}</p>
        <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.065em] sm:text-6xl">
          {text.title}
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-[--fg-muted] sm:text-lg">
          {text.intro}
        </p>
        <p className="mt-5 max-w-3xl border-l border-[--accent] pl-4 text-sm leading-7 text-[--fg-muted]">
          {text.note}
        </p>
      </section>

      <div className="mt-8">
        <SQLWorkbench />
      </div>
    </PageShell>
  );
}
