import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Uses",
  description: "Hardware, software, and tools I use daily.",
};

const USES = [
  {
    category: "Hardware",
    items: [
      {
        name: "MacBook Pro 16\" M3 Max",
        note: "Primary machine. 36 GB RAM — enough for local Spark.",
      },
      {
        name: "LG 27UK850-W 4K",
        note: "External display. Good enough.",
      },
      {
        name: "Keychron Q1 Pro",
        note: "QMK, Gateron G Pro 3.0 Brown switches.",
      },
    ],
  },
  {
    category: "Editor & Terminal",
    items: [
      {
        name: "Cursor",
        note: "VS Code fork with native LLM integration. Replaced VS Code in 2025.",
      },
      { name: "Ghostty", note: "Fast, native terminal. Replaced iTerm2." },
      {
        name: "Starship",
        note: "Cross-shell prompt. Shows git branch, Python venv, exit code.",
      },
      { name: "tmux", note: "Session management for long-running Spark jobs." },
      { name: "Zsh + Oh My Zsh", note: "Standard setup with z, fzf plugins." },
    ],
  },
  {
    category: "Data Engineering",
    items: [
      { name: "Apache Spark 3.5 (Databricks)", note: "Primary batch engine." },
      {
        name: "Apache Kafka + Kafka Streams",
        note: "Streaming. Self-managed on Kubernetes.",
      },
      { name: "Apache Airflow 2.x", note: "Orchestration. Self-managed." },
      {
        name: "dbt-core",
        note: "Transformation layer. Iceberg-native via trino adapter.",
      },
      {
        name: "Apache Iceberg",
        note: "Open table format. Replaced Parquet + Hive metastore.",
      },
      {
        name: "DuckDB",
        note:
          "Local analytics, ad-hoc queries over S3 Parquet. Replaced pandas for most analysis.",
      },
      {
        name: "Trino",
        note: "Federated query. Iceberg + PostgreSQL + Kafka connectors.",
      },
    ],
  },
  {
    category: "Languages",
    items: [
      { name: "Python 3.12", note: "Primary language. uv for package management." },
      {
        name: "Scala 2.13",
        note: "Spark jobs where performance matters.",
      },
      { name: "SQL", note: "The original data engineering language." },
      { name: "TypeScript", note: "For this site and internal tooling." },
    ],
  },
  {
    category: "Infrastructure",
    items: [
      { name: "Kubernetes (k3s)", note: "Self-managed data platform." },
      { name: "Terraform", note: "Infrastructure as code." },
      { name: "GitLab CI/CD", note: "Pipelines. GitHub Actions for OSS." },
      { name: "Docker", note: "Everything in containers." },
    ],
  },
  {
    category: "AI / LLM",
    items: [
      { name: "Claude (Anthropic)", note: "Primary LLM for coding and writing." },
      { name: "Cursor AI", note: "In-editor autocomplete and chat." },
      {
        name: "OpenWebUI",
        note: "Self-hosted chat UI over local Ollama + API models.",
      },
      { name: "Qdrant", note: "Vector database for RAG pipelines." },
    ],
  },
  {
    category: "Productivity",
    items: [
      { name: "Obsidian", note: "Notes and knowledge base. Local markdown files." },
      { name: "Linear", note: "Task tracking for personal projects." },
      { name: "Raycast", note: "macOS launcher. Replaced Alfred." },
      { name: "1Password", note: "Password manager. Also stores SSH keys." },
    ],
  },
];

export default function UsesPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1
        style={{ color: "var(--fg)", fontFamily: "var(--font-mono)" }}
        className="text-sm font-semibold uppercase tracking-widest"
      >
        Uses
      </h1>
      <p style={{ color: "var(--fg-muted)" }} className="mt-2 text-sm">
        Hardware, software, and tools in my daily workflow.
      </p>

      <div className="mt-12 space-y-12">
        {USES.map(({ category, items }) => (
          <section key={category}>
            <h2
              style={{
                color: "var(--fg)",
                fontFamily: "var(--font-mono)",
                borderBottom: "1px solid var(--border)",
              }}
              className="pb-1 text-xs font-semibold uppercase tracking-widest"
            >
              {category}
            </h2>

            <ul className="mt-3 space-y-0">
              {items.map(({ name, note }) => (
                <li
                  key={name}
                  style={{ borderBottom: "1px solid var(--border)" }}
                  className="flex gap-4 py-3"
                >
                  <span
                    style={{
                      color: "var(--fg)",
                      fontFamily: "var(--font-mono)",
                      flexShrink: 0,
                      minWidth: "200px",
                    }}
                    className="text-sm font-medium"
                  >
                    {name}
                  </span>
                  <span
                    style={{ color: "var(--fg-muted)" }}
                    className="text-sm"
                  >
                    {note}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
