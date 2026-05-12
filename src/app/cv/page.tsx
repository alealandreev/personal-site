import type { Metadata } from "next";
import Link from "next/link";
import { PrintButton } from "@/components/ui/print-button";

export const metadata: Metadata = {
  title: "CV",
  description:
    "Aleksandr — Lead Data Engineer. 9+ years building petabyte-scale data platforms.",
};

const EXPERIENCE = [
  {
    company: "AlfaStrakhovanie",
    role: "Lead Data Engineer",
    period: "2021 — present",
    location: "Moscow, Russia",
    bullets: [
      "Led design and delivery of real-time claims processing pipeline handling 50k events/sec (Kafka + Flink + Iceberg)",
      "Migrated 40TB analytics DWH from Greenplum to Trino + Apache Iceberg, cutting query costs by 60%",
      "Built LLM-powered MR review agent (FastAPI, Qdrant, Claude API, RAG over Confluence), adopted by 3 teams",
      "Managed team of 5 data engineers; introduced dbt, code review SLAs, and data contract practices",
    ],
  },
  {
    company: "Previous Company",
    role: "Senior Data Engineer",
    period: "2018 — 2021",
    location: "Moscow, Russia",
    bullets: [
      "Built Spark ETL pipelines processing 5TB/day from 12 source systems into unified analytical layer",
      "Designed and maintained Airflow DAG library (200+ DAGs) with alerting and SLA monitoring",
      "Introduced column-oriented storage (Parquet + partitioning) reducing query time by 10×",
    ],
  },
  {
    company: "Earlier roles",
    role: "Data Engineer / Data Analyst",
    period: "2015 — 2018",
    location: "Moscow, Russia",
    bullets: [
      "Progressed from SQL analytics to Python/Spark engineering",
      "Built first streaming pipeline (Kafka → HDFS) for event tracking",
    ],
  },
];

const SKILLS = [
  { label: "Streaming", value: "Apache Kafka, Kafka Streams, Apache Flink" },
  { label: "Batch", value: "Apache Spark (PySpark + Scala), Apache Airflow" },
  { label: "Storage", value: "Apache Iceberg, Parquet, Delta Lake, ClickHouse" },
  { label: "Query", value: "Trino, DuckDB, PostgreSQL, Greenplum" },
  { label: "Transform", value: "dbt-core, Spark SQL" },
  { label: "Infra", value: "Kubernetes, Terraform, Docker, GitLab CI" },
  { label: "Languages", value: "Python 3.x, Scala 2.13, SQL, TypeScript" },
  { label: "LLM/AI", value: "Anthropic Claude API, RAG, Qdrant, LangChain" },
];

export default function CVPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      {/* Actions bar — hidden on print */}
      <div
        className="mb-10 flex items-center justify-between print:hidden"
        style={{ borderBottom: "1px solid var(--border)", paddingBottom: "1rem" }}
      >
        <span
          style={{ color: "var(--fg-muted)", fontFamily: "var(--font-mono)" }}
          className="text-xs"
        >
          /cv
        </span>
        <div className="flex gap-3">
          <a
            href="/cv.pdf"
            style={{
              border: "1px solid var(--border)",
              color: "var(--fg-muted)",
              fontFamily: "var(--font-mono)",
              borderRadius: "4px",
            }}
            className="px-3 py-1.5 text-xs transition-colors hover:border-[--accent] hover:text-[--accent]"
          >
            ↓ PDF
          </a>
          <PrintButton />
        </div>
      </div>

      {/* Header */}
      <header className="mb-10">
        <h1
          style={{ color: "var(--fg)" }}
          className="text-2xl font-semibold"
        >
          Aleksandr Andreev
        </h1>
        <p
          style={{ color: "var(--fg-muted)", fontFamily: "var(--font-mono)" }}
          className="mt-1 text-sm"
        >
          Lead Data Engineer · Moscow, Russia
        </p>
        <div
          style={{ fontFamily: "var(--font-mono)" }}
          className="mt-3 flex flex-wrap gap-4 text-xs"
        >
          {[
            { label: "hire@persistentengineer.com", href: "mailto:hire@persistentengineer.com" },
            {
              label: "linkedin.com/in/TODO_YOUR_LINKEDIN",
              href: "https://linkedin.com/in/TODO_YOUR_LINKEDIN",
            },
            {
              label: "github.com/alealandreev",
              href: "https://github.com/alealandreev",
            },
            { label: "persistentengineer.com", href: "https://persistentengineer.com" },
          ].map(({ label, href }) => (
            <a
              key={href}
              href={href}
              style={{ color: "var(--accent)" }}
              className="transition-opacity hover:opacity-70"
            >
              {label}
            </a>
          ))}
        </div>
      </header>

      {/* Summary */}
      <section className="mb-10">
        <p style={{ color: "var(--fg)" }} className="text-sm leading-relaxed">
          Lead Data Engineer with 9+ years building petabyte-scale data
          platforms. Specialised in streaming architectures (Kafka, Flink),
          open lakehouse (Iceberg, Trino, dbt), and applied LLM integration.
          Proven track record shipping production systems at insurance scale.
          Open to senior+ roles internationally (AU/NZ/EU/US).
        </p>
      </section>

      {/* Experience */}
      <section className="mb-10">
        <h2
          style={{
            color: "var(--fg)",
            fontFamily: "var(--font-mono)",
            borderBottom: "1px solid var(--border)",
          }}
          className="mb-6 pb-1 text-xs font-semibold uppercase tracking-widest"
        >
          Experience
        </h2>

        <div className="space-y-8">
          {EXPERIENCE.map((job) => (
            <div key={job.company}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div style={{ color: "var(--fg)" }} className="font-medium">
                    {job.role}
                  </div>
                  <div
                    style={{
                      color: "var(--fg-muted)",
                      fontFamily: "var(--font-mono)",
                    }}
                    className="text-xs"
                  >
                    {job.company} · {job.location}
                  </div>
                </div>
                <time
                  style={{
                    color: "var(--fg-muted)",
                    fontFamily: "var(--font-mono)",
                    flexShrink: 0,
                  }}
                  className="text-xs"
                >
                  {job.period}
                </time>
              </div>
              <ul className="mt-3 space-y-1.5">
                {job.bullets.map((b, i) => (
                  <li
                    key={i}
                    style={{ color: "var(--fg)" }}
                    className="flex gap-2 text-sm leading-relaxed"
                  >
                    <span
                      style={{ color: "var(--accent)", flexShrink: 0 }}
                    >
                      ·
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="mb-10">
        <h2
          style={{
            color: "var(--fg)",
            fontFamily: "var(--font-mono)",
            borderBottom: "1px solid var(--border)",
          }}
          className="mb-4 pb-1 text-xs font-semibold uppercase tracking-widest"
        >
          Skills
        </h2>
        <table className="w-full text-sm">
          <tbody>
            {SKILLS.map(({ label, value }) => (
              <tr
                key={label}
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                <td
                  style={{
                    color: "var(--fg-muted)",
                    fontFamily: "var(--font-mono)",
                  }}
                  className="py-2 pr-6 text-xs"
                >
                  {label}
                </td>
                <td style={{ color: "var(--fg)" }} className="py-2 text-xs">
                  {value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Education */}
      <section>
        <h2
          style={{
            color: "var(--fg)",
            fontFamily: "var(--font-mono)",
            borderBottom: "1px solid var(--border)",
          }}
          className="mb-4 pb-1 text-xs font-semibold uppercase tracking-widest"
        >
          Education
        </h2>
        <div className="flex items-start justify-between">
          <div>
            <div style={{ color: "var(--fg)" }} className="text-sm font-medium">
              TODO_UNIVERSITY
            </div>
            <div
              style={{
                color: "var(--fg-muted)",
                fontFamily: "var(--font-mono)",
              }}
              className="text-xs"
            >
              TODO_DEGREE · Moscow
            </div>
          </div>
          <span
            style={{
              color: "var(--fg-muted)",
              fontFamily: "var(--font-mono)",
            }}
            className="text-xs"
          >
            TODO_YEARS
          </span>
        </div>
      </section>
    </div>
  );
}
