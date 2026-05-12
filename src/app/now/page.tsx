import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Now",
  description: "What I'm focused on right now.",
};

const UPDATED = "2026-04-30";

export default function NowPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <div className="flex items-baseline justify-between">
        <h1
          style={{ color: "var(--fg)", fontFamily: "var(--font-mono)" }}
          className="text-sm font-semibold uppercase tracking-widest"
        >
          Now
        </h1>
        <time
          dateTime={UPDATED}
          style={{ color: "var(--fg-muted)", fontFamily: "var(--font-mono)" }}
          className="text-xs"
        >
          Updated {UPDATED}
        </time>
      </div>

      <p style={{ color: "var(--fg-muted)" }} className="mt-2 text-sm">
        A snapshot of what I&apos;m working on.{" "}
        <a
          href="https://nownownow.com/about"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "var(--accent)" }}
          className="text-xs"
        >
          What&apos;s a /now page?
        </a>
      </p>

      <div className="mt-10 space-y-8">
        {[
          {
            heading: "Work",
            items: [
              "Building LLM-based code review agent at AlfaStrakhovanie (FastAPI + Qdrant + Claude API + RAG over Confluence)",
              "Migrating analytics dbt project to Apache Iceberg on Trino",
              "Designing real-time claims fraud detection pipeline (Kafka + Flink)",
            ],
          },
          {
            heading: "Learning",
            items: [
              "Re-reading Designing Data-Intensive Applications — still the best book in DE",
              "Working through CMU Database Systems lectures (15-445/645)",
              "Exploring Rust for high-performance data connectors",
            ],
          },
          {
            heading: "Personal",
            items: [
              "Preparing for senior+ DE interview loops (system design focus)",
              "Building this site — content infrastructure before content",
              "Learning enough English to sound native in writing",
            ],
          },
        ].map(({ heading, items }) => (
          <section key={heading}>
            <h2
              style={{
                color: "var(--fg)",
                fontFamily: "var(--font-mono)",
                borderBottom: "1px solid var(--border)",
              }}
              className="pb-1 text-xs font-semibold uppercase tracking-widest"
            >
              {heading}
            </h2>
            <ul className="mt-3 space-y-2">
              {items.map((item, i) => (
                <li
                  key={i}
                  style={{ color: "var(--fg)" }}
                  className="flex gap-2 text-sm leading-relaxed"
                >
                  <span style={{ color: "var(--accent)", flexShrink: 0 }}>
                    →
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
