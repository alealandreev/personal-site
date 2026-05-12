import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PrintButton } from "@/components/ui/print-button";
import { PageShell, SectionTitle } from "@/components/site/primitives";
import { isLocale, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";

type Props = {
  params: Promise<{ locale: string }>;
};

const content = {
  en: {
    title: "CV",
    description: "Selected experience, systems work and strengths of Aleksandr Andreev.",
    summary:
      "Lead Data Engineer with 9+ years building streaming, analytics and lakehouse platforms. Strong in platform design, delivery, and turning messy operational needs into dependable systems.",
    actions: {
      print: "Print",
      email: "Email",
      linkedin: "LinkedIn",
    },
    highlightsTitle: "Highlights",
    highlights: [
      "Built and scaled data platforms that support analytics and near real-time decisioning.",
      "Hands-on with Kafka, Flink, Spark, Airflow, dbt, Iceberg, Trino and Python.",
      "Experienced leading delivery, mentoring engineers and tightening engineering standards.",
    ],
    experienceTitle: "Experience",
    skillsTitle: "Selected skills",
    detailsTitle: "Additional details",
    details: [
      "Location: Moscow, Russia",
      "Work style: remote-first, relocation-friendly",
      "Interests: platform engineering, distributed systems, internal AI tooling",
    ],
  },
  ru: {
    title: "CV",
    description: "Ключевой опыт, проекты и сильные стороны Александра Андреева.",
    summary:
      "Lead Data Engineer с 9+ годами опыта в streaming, analytics и lakehouse-платформах. Сильные стороны: platform design, delivery и превращение хаотичных operational needs в надёжные системы.",
    actions: {
      print: "Печать",
      email: "Email",
      linkedin: "LinkedIn",
    },
    highlightsTitle: "Коротко",
    highlights: [
      "Проектировал и развивал data platforms для аналитики и near real-time сценариев.",
      "Практический стек: Kafka, Flink, Spark, Airflow, dbt, Iceberg, Trino и Python.",
      "Есть опыт delivery, менторства и повышения инженерной дисциплины в командах.",
    ],
    experienceTitle: "Опыт",
    skillsTitle: "Выборка навыков",
    detailsTitle: "Дополнительно",
    details: [
      "Локация: Москва, Россия",
      "Формат: remote-first, рассматриваю relocation",
      "Интересы: platform engineering, distributed systems, internal AI tooling",
    ],
  },
} as const satisfies Record<Locale, unknown>;

const jobs = {
  en: [
    {
      company: "AlfaStrakhovanie",
      role: "Lead Data Engineer",
      period: "2021 — present",
      bullets: [
        "Led design of real-time claims pipelines on Kafka, Flink and Iceberg for high-throughput workloads.",
        "Drove migration of analytical workloads toward open lakehouse patterns with Trino, dbt and Iceberg.",
        "Built an LLM-assisted merge request review workflow adopted by multiple teams.",
      ],
    },
    {
      company: "Large financial services company",
      role: "Senior Data Engineer",
      period: "2018 — 2021",
      bullets: [
        "Built and operated Spark-based ETL pipelines across multiple upstream systems.",
        "Standardized orchestration patterns in Airflow and improved observability for data SLAs.",
        "Improved query performance through better file layout, partitioning and columnar storage practices.",
      ],
    },
    {
      company: "Earlier analytics and data roles",
      role: "Data Engineer / Data Analyst",
      period: "2015 — 2018",
      bullets: [
        "Moved from SQL-heavy analytics toward Python and distributed data engineering.",
        "Built early event pipelines and learned how platform decisions affect downstream teams.",
      ],
    },
  ],
  ru: [
    {
      company: "AlfaStrakhovanie",
      role: "Lead Data Engineer",
      period: "2021 — настоящее время",
      bullets: [
        "Проектировал real-time pipelines для claims processing на Kafka, Flink и Iceberg.",
        "Развивал lakehouse-подход для аналитических нагрузок на базе Trino, dbt и Iceberg.",
        "Сделал LLM-assisted MR review workflow, которым пользуются несколько команд.",
      ],
    },
    {
      company: "Крупная финтех/финансовая компания",
      role: "Senior Data Engineer",
      period: "2018 — 2021",
      bullets: [
        "Строил и сопровождал Spark-based ETL pipelines для нескольких upstream-систем.",
        "Унифицировал orchestration-подходы в Airflow и улучшал observability для data SLA.",
        "Ускорял аналитические запросы за счёт file layout, partitioning и columnar storage.",
      ],
    },
    {
      company: "Ранние роли в аналитике и данных",
      role: "Data Engineer / Data Analyst",
      period: "2015 — 2018",
      bullets: [
        "Прошёл путь от SQL-heavy аналитики к Python и distributed data engineering.",
        "Строил первые event pipelines и быстро понял цену плохих platform-решений.",
      ],
    },
  ],
} as const satisfies Record<Locale, Array<{ company: string; role: string; period: string; bullets: string[] }>>;

const skills = {
  en: [
    { label: "Streaming", value: "Kafka, Kafka Streams, Flink" },
    { label: "Batch", value: "Spark, Airflow, dbt" },
    { label: "Storage", value: "Iceberg, Parquet, ClickHouse, PostgreSQL" },
    { label: "Query", value: "Trino, DuckDB, SQL optimization" },
    { label: "Infra", value: "Kubernetes, Docker, Terraform, GitLab CI" },
    { label: "AI tooling", value: "Claude API, RAG, Qdrant, internal developer tools" },
  ],
  ru: [
    { label: "Streaming", value: "Kafka, Kafka Streams, Flink" },
    { label: "Batch", value: "Spark, Airflow, dbt" },
    { label: "Storage", value: "Iceberg, Parquet, ClickHouse, PostgreSQL" },
    { label: "Query", value: "Trino, DuckDB, SQL optimization" },
    { label: "Infra", value: "Kubernetes, Docker, Terraform, GitLab CI" },
    { label: "AI tooling", value: "Claude API, RAG, Qdrant, внутренние dev-tools" },
  ],
} as const satisfies Record<Locale, Array<{ label: string; value: string }>>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const text = content[locale];
  return buildMetadata({
    locale,
    title: `${text.title} · Aleksandr Andreev`,
    description: text.description,
    path: "/cv",
  });
}

export default async function CVPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const text = content[locale];

  return (
    <PageShell>
      <section className="surface p-7 sm:p-10">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between print:hidden">
          <div>
            <p className="eyebrow">{text.title}</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight">
              Aleksandr Andreev
            </h1>
            <p className="mt-3 max-w-3xl text-base leading-8 text-[--fg-muted]">
              {text.summary}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="mailto:hire@persistentengineer.com" className="button-secondary">
              {text.actions.email}
            </a>
            <a
              href="https://linkedin.com/in/aleksandr-andreev/"
              target="_blank"
              rel="noopener noreferrer"
              className="button-secondary"
            >
              {text.actions.linkedin}
            </a>
            <PrintButton label={text.actions.print} />
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {text.highlights.map((item) => (
            <div key={item} className="rounded-2xl border border-[--border] p-4">
              <p className="text-sm leading-7 text-[--fg-muted]">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <SectionTitle>{text.experienceTitle}</SectionTitle>
        <div className="mt-6 space-y-4">
          {jobs[locale].map((job) => (
            <article key={`${job.company}-${job.period}`} className="surface p-6">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="text-xl font-semibold tracking-tight">{job.role}</h2>
                  <p className="mt-1 text-sm text-[--fg-muted]">{job.company}</p>
                </div>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-[--fg-muted]">
                  {job.period}
                </p>
              </div>
              <ul className="mt-4 space-y-3">
                {job.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3 text-sm leading-7 text-[--fg-muted]">
                    <span className="mt-2 h-2 w-2 rounded-full bg-[--accent]" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-14 grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)]">
        <div className="surface p-6">
          <SectionTitle>{text.skillsTitle}</SectionTitle>
          <div className="mt-5 space-y-4">
            {skills[locale].map((item) => (
              <div
                key={item.label}
                className="grid gap-2 border-b border-[--border] pb-4 last:border-b-0 last:pb-0 sm:grid-cols-[140px_minmax(0,1fr)]"
              >
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-[--fg-muted]">
                  {item.label}
                </p>
                <p className="text-sm leading-7 text-[--fg]">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <aside className="surface p-6">
          <SectionTitle>{text.detailsTitle}</SectionTitle>
          <ul className="mt-5 space-y-3">
            {text.details.map((item) => (
              <li key={item} className="text-sm leading-7 text-[--fg-muted]">
                {item}
              </li>
            ))}
          </ul>
        </aside>
      </section>
    </PageShell>
  );
}
