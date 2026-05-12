import type { Metadata } from "next";
import Link from "next/link";
import { Tag } from "@/components/ui/tag";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Deep case studies on real data engineering systems I've designed and built.",
};

const PROJECTS = [
  {
    slug: "gitlab-mr-review-agent",
    title: "GitLab MR Review Agent",
    summary:
      "LLM-powered code review bot using FastAPI, Qdrant vector search, Claude API, and RAG over Confluence docs. Reduced review turnaround by 40%.",
    tags: ["llm", "rag", "fastapi", "python"],
    status: "active" as const,
    featured: true,
  },
  {
    slug: "openwebui-mcp-stack",
    title: "OpenWebUI + MCP + GitLab Integration",
    summary:
      "Self-hosted LLM interface wired to internal tooling via Model Context Protocol. Enables engineers to query Jira, GitLab, and Confluence from chat.",
    tags: ["llm", "mcp", "devtools"],
    status: "active" as const,
    featured: true,
  },
];

const STATUS_LABEL: Record<string, string> = {
  active: "active",
  archived: "archived",
  wip: "wip",
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1
        style={{ color: "var(--fg)", fontFamily: "var(--font-mono)" }}
        className="text-sm font-semibold uppercase tracking-widest"
      >
        Projects
      </h1>
      <p style={{ color: "var(--fg-muted)" }} className="mt-2 text-sm">
        Deep case studies — problem context, architecture, trade-offs, results.
      </p>

      <div
        style={{ borderTop: "1px solid var(--border)" }}
        className="mt-10 divide-y"
      >
        {PROJECTS.map((project) => (
          <article key={project.slug} className="py-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/projects/${project.slug}`}
                    style={{ color: "var(--fg)" }}
                    className="font-medium transition-colors hover:text-[--accent]"
                  >
                    {project.title}
                  </Link>
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
                    {STATUS_LABEL[project.status]}
                  </span>
                </div>
                <p
                  style={{ color: "var(--fg-muted)" }}
                  className="mt-1.5 text-sm leading-relaxed"
                >
                  {project.summary}
                </p>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <Tag key={tag} tag={tag} />
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
