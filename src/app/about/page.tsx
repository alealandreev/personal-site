import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Lead Data Engineer with 9+ years building petabyte-scale data platforms. " +
    "Open to senior+ roles in AU/NZ/EU/US.",
};

const TECH = [
  "Apache Spark",
  "Apache Kafka",
  "Apache Airflow",
  "Apache Iceberg",
  "dbt",
  "Python",
  "Scala",
  "Kubernetes",
  "Terraform",
  "PostgreSQL",
  "ClickHouse",
  "DuckDB",
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1
        style={{ color: "var(--fg)", fontFamily: "var(--font-mono)" }}
        className="text-sm font-semibold uppercase tracking-widest"
      >
        About
      </h1>

      <div className="mt-10 space-y-6 leading-relaxed">
        <p style={{ color: "var(--fg)" }}>
          I&apos;m a Lead Data Engineer based in Moscow with 9+ years of
          experience building data infrastructure at scale. Currently at{" "}
          <strong>AlfaStrakhovanie</strong>, one of Russia&apos;s largest
          insurance companies, where I lead data platform engineering.
        </p>

        <p style={{ color: "var(--fg)" }}>
          My work spans the full data engineering stack: streaming pipelines
          with Kafka and Flink, batch processing with Spark and Airflow,
          open lakehouse architectures on Apache Iceberg, and transformation
          layers built with dbt. I care about data reliability, schema
          evolution, and systems that remain maintainable at scale.
        </p>

        <p style={{ color: "var(--fg)" }}>
          Beyond day-to-day engineering, I explore applied ML/LLM integrations
          — recently building a GitLab MR review agent using FastAPI, Qdrant,
          and Claude API with RAG over Confluence.
        </p>

        <p style={{ color: "var(--fg)" }}>
          I write about distributed systems, data engineering trade-offs, and
          the hard parts of production data infrastructure. Occasionally I write
          in Russian on Habr.
        </p>
      </div>

      {/* Work auth */}
      <div
        style={{
          border: "1px solid var(--border)",
          borderLeft: "3px solid var(--accent)",
          borderRadius: "4px",
        }}
        className="mt-10 p-4"
      >
        <p
          style={{ color: "var(--fg-muted)", fontFamily: "var(--font-mono)" }}
          className="text-xs leading-relaxed"
        >
          <span style={{ color: "var(--accent)" }}>// work_authorization</span>
          <br />
          Russian citizen · Currently Moscow, Russia
          <br />
          Open to relocation for senior+ Data Engineering roles
          <br />
          Target markets: <strong>AU / NZ / EU / US</strong>
          <br />
          Remote also considered for the right role
        </p>
      </div>

      {/* Tech stack */}
      <section className="mt-12">
        <h2
          style={{ color: "var(--fg)", fontFamily: "var(--font-mono)" }}
          className="text-sm font-semibold uppercase tracking-widest"
        >
          Core Stack
        </h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {TECH.map((t) => (
            <span
              key={t}
              style={{
                border: "1px solid var(--border)",
                color: "var(--fg-muted)",
                fontFamily: "var(--font-mono)",
                borderRadius: "3px",
                fontSize: "0.75rem",
              }}
              className="px-2 py-1"
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="mt-12">
        <h2
          style={{ color: "var(--fg)", fontFamily: "var(--font-mono)" }}
          className="text-sm font-semibold uppercase tracking-widest"
        >
          Contact
        </h2>
        <ul
          style={{ fontFamily: "var(--font-mono)" }}
          className="mt-4 space-y-2 text-sm"
        >
          {[
            { label: "Email", href: "mailto:hire@persistentengineer.com", text: "hire@persistentengineer.com" },
            { label: "LinkedIn", href: "https://linkedin.com/in/TODO_YOUR_LINKEDIN", text: "/in/yourprofile" },
            { label: "GitHub", href: "https://github.com/alealandreev", text: "github.com/alealandreev" },
            { label: "CV", href: "/cv", text: "persistentengineer.com/cv" },
          ].map(({ label, href, text }) => (
            <li
              key={label}
              style={{ borderBottom: "1px solid var(--border)" }}
              className="flex justify-between py-2"
            >
              <span style={{ color: "var(--fg-muted)" }}>{label}</span>
              <a
                href={href}
                style={{ color: "var(--fg)" }}
                className="transition-colors hover:text-[--accent]"
                {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {text}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
