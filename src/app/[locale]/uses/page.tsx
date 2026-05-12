import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell, SectionTitle } from "@/components/site/primitives";
import { isLocale, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";

type Props = {
  params: Promise<{ locale: string }>;
};

const copy = {
  en: {
    title: "Uses",
    description: "The hardware, software and tooling I reach for most often.",
    groups: [
      {
        heading: "Editor and terminal",
        items: [
          "Cursor for daily development and writing with strong AI assistance.",
          "A terminal-first workflow with tmux for long-running data jobs.",
          "GitHub, GitLab and internal tooling stitched into one developer loop.",
        ],
      },
      {
        heading: "Data stack",
        items: [
          "Kafka, Flink, Spark, Airflow, dbt, Trino and Iceberg.",
          "DuckDB for local analysis and fast ad-hoc validation.",
          "Python and SQL for most glue work, with TypeScript where UX matters.",
        ],
      },
      {
        heading: "AI tooling",
        items: [
          "Claude for code, writing and internal tooling experiments.",
          "RAG setups grounded in docs and code, not generic chat wrappers.",
        ],
      },
    ],
  },
  ru: {
    title: "Инструменты",
    description: "Железо, софт и tooling, которыми я пользуюсь чаще всего.",
    groups: [
      {
        heading: "Редактор и терминал",
        items: [
          "Cursor для ежедневной разработки и письма с сильной AI-поддержкой.",
          "Terminal-first workflow с tmux для долгих data jobs.",
          "GitHub, GitLab и внутренние инструменты в одном developer loop.",
        ],
      },
      {
        heading: "Data stack",
        items: [
          "Kafka, Flink, Spark, Airflow, dbt, Trino и Iceberg.",
          "DuckDB для локального анализа и быстрых ad-hoc проверок.",
          "Python и SQL для большинства задач, TypeScript там, где важен UX.",
        ],
      },
      {
        heading: "AI tooling",
        items: [
          "Claude для кода, письма и внутренних инженерных экспериментов.",
          "RAG-подходы, которые опираются на docs и code, а не на generic chat wrappers.",
        ],
      },
    ],
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
    path: "/uses",
  });
}

export default async function UsesPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const text = copy[locale];

  return (
    <PageShell>
      <SectionTitle subtitle={text.description}>{text.title}</SectionTitle>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {text.groups.map((group, index) => (
          <section key={group.heading} className="surface-card p-6">
            <p className="font-mono text-xs text-[--accent]">0{index + 1}</p>
            <h2 className="mt-3 text-xl font-semibold tracking-tight">
              {group.heading}
            </h2>
            <ul className="mt-4 space-y-3">
              {group.items.map((item) => (
                <li key={item} className="text-sm leading-7 text-[--fg-muted]">
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </PageShell>
  );
}
