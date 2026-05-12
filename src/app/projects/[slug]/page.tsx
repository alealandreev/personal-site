import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Tag } from "@/components/ui/tag";

const PROJECTS: Record<
  string,
  {
    title: string;
    summary: string;
    tags: string[];
    status: string;
    date: string;
    github?: string;
  }
> = {
  "gitlab-mr-review-agent": {
    title: "GitLab MR Review Agent",
    summary:
      "LLM-powered code review bot using FastAPI, Qdrant vector search, Claude API, and RAG over Confluence docs.",
    tags: ["llm", "rag", "fastapi", "python", "qdrant"],
    status: "active",
    date: "2026-03-01",
  },
  "openwebui-mcp-stack": {
    title: "OpenWebUI + MCP + GitLab Integration",
    summary:
      "Self-hosted LLM interface wired to internal tooling via Model Context Protocol.",
    tags: ["llm", "mcp", "devtools"],
    status: "active",
    date: "2026-02-01",
  },
};

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS[slug];
  if (!project) return {};
  return { title: project.title, description: project.summary };
}

export async function generateStaticParams() {
  return Object.keys(PROJECTS).map((slug) => ({ slug }));
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = PROJECTS[slug];
  if (!project) notFound();

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <nav
        style={{ color: "var(--fg-muted)", fontFamily: "var(--font-mono)" }}
        className="mb-8 text-xs"
      >
        <Link
          href="/projects"
          className="transition-colors hover:text-[--accent]"
        >
          projects
        </Link>
        <span className="mx-2">/</span>
        <span>{slug}</span>
      </nav>

      <header className="mb-10">
        <div className="flex items-center gap-3">
          <h1
            style={{ color: "var(--fg)" }}
            className="text-2xl font-semibold"
          >
            {project.title}
          </h1>
          <span
            style={{
              color: "var(--accent)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              border: "1px solid var(--accent)",
              borderRadius: "3px",
            }}
            className="px-1.5 py-0.5"
          >
            {project.status}
          </span>
        </div>

        <p
          style={{ color: "var(--fg-muted)" }}
          className="mt-3 text-sm leading-relaxed"
        >
          {project.summary}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <Tag key={tag} tag={tag} />
          ))}
        </div>

        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "var(--fg-muted)",
              fontFamily: "var(--font-mono)",
              border: "1px solid var(--border)",
              borderRadius: "4px",
            }}
            className="mt-4 inline-block px-3 py-1.5 text-xs transition-colors hover:border-[--accent] hover:text-[--accent]"
          >
            View source ↗
          </a>
        )}
      </header>

      {/* MDX case study body goes here */}
      <article
        className="prose max-w-none"
        style={
          {
            "--tw-prose-body": "var(--fg)",
            "--tw-prose-headings": "var(--fg)",
            "--tw-prose-links": "var(--accent)",
            "--tw-prose-code": "var(--fg)",
          } as React.CSSProperties
        }
      >
        <p style={{ color: "var(--fg-muted)" }}>
          Full case study (problem context → architecture → trade-offs → results
          → lessons) is in{" "}
          <code>content/projects/{slug}.mdx</code>. Wire up fumadocs source to
          render it here.
        </p>
      </article>

      <div
        style={{
          borderTop: "1px solid var(--border)",
          color: "var(--fg-muted)",
          fontFamily: "var(--font-mono)",
        }}
        className="mt-16 flex justify-between pt-4 text-xs"
      >
        <Link
          href="/projects"
          className="transition-colors hover:text-[--accent]"
        >
          ← All projects
        </Link>
      </div>
    </div>
  );
}
