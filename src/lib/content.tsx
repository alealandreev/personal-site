import type { ComponentType } from "react";
import type { MDXComponents } from "mdx/types";
import type { Locale } from "@/lib/i18n";
import EnHelloWorld from "../../content/posts/hello-world.mdx";
import EnDuckDbTil from "../../content/til/duckdb-httpfs-pushdown.mdx";
import EnGitlabProject from "../../content/projects/gitlab-mr-review-agent.mdx";
import RuHelloWorld from "../../content/ru/posts/hello-world.mdx";
import RuDuckDbTil from "../../content/ru/til/duckdb-httpfs-pushdown.mdx";
import RuGitlabProject from "../../content/ru/projects/gitlab-mr-review-agent.mdx";

export type ContentKind = "post" | "til" | "project";

export type RenderableMdx = ComponentType<{ components?: MDXComponents }>;

export type ContentEntry = {
  locale: Locale;
  kind: ContentKind;
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  path: string;
  wordCount: number;
  readingMinutes?: number;
  featured?: boolean;
  status?: "active" | "archived" | "wip";
  github?: string;
  Component: RenderableMdx;
};

const contentEntries: ContentEntry[] = [
  {
    locale: "en",
    kind: "post",
    slug: "hello-world",
    title: "Hello, world",
    date: "2026-04-30",
    summary: "First post on the new site — stack overview and what's coming.",
    tags: ["meta"],
    path: "content/posts/hello-world.mdx",
    wordCount: 290,
    readingMinutes: 2,
    featured: true,
    Component: EnHelloWorld,
  },
  {
    locale: "ru",
    kind: "post",
    slug: "hello-world",
    title: "Hello, world",
    date: "2026-04-30",
    summary: "Первый пост на новом сайте — коротко о стеке и о том, что будет дальше.",
    tags: ["meta"],
    path: "content/ru/posts/hello-world.mdx",
    wordCount: 320,
    readingMinutes: 2,
    featured: true,
    Component: RuHelloWorld,
  },
  {
    locale: "en",
    kind: "til",
    slug: "duckdb-httpfs-pushdown",
    title: "DuckDB httpfs column pushdown over Parquet on S3",
    date: "2026-04-29",
    summary:
      "DuckDB pushes column projection and filter predicates down to S3 Parquet reads — but only if your file stats are valid.",
    tags: ["duckdb", "parquet", "s3"],
    path: "content/til/duckdb-httpfs-pushdown.mdx",
    wordCount: 180,
    readingMinutes: 1,
    Component: EnDuckDbTil,
  },
  {
    locale: "ru",
    kind: "til",
    slug: "duckdb-httpfs-pushdown",
    title: "DuckDB httpfs pushdown для Parquet в S3",
    date: "2026-04-29",
    summary:
      "DuckDB умеет проталкивать проекции колонок и фильтры прямо в чтение Parquet из S3 — но только если статистика файла действительно записана.",
    tags: ["duckdb", "parquet", "s3"],
    path: "content/ru/til/duckdb-httpfs-pushdown.mdx",
    wordCount: 200,
    readingMinutes: 2,
    Component: RuDuckDbTil,
  },
  {
    locale: "en",
    kind: "project",
    slug: "gitlab-mr-review-agent",
    title: "GitLab MR Review Agent",
    date: "2026-03-01",
    summary:
      "LLM-powered code review bot using FastAPI, Qdrant, Claude API, and RAG over Confluence. Reduced review turnaround by 40%.",
    tags: ["llm", "rag", "fastapi", "python", "qdrant"],
    path: "content/projects/gitlab-mr-review-agent.mdx",
    wordCount: 440,
    readingMinutes: 3,
    featured: true,
    status: "active",
    Component: EnGitlabProject,
  },
  {
    locale: "ru",
    kind: "project",
    slug: "gitlab-mr-review-agent",
    title: "GitLab MR Review Agent",
    date: "2026-03-01",
    summary:
      "LLM-агент для code review на FastAPI, Qdrant и Claude API с RAG по внутренней документации. Сократил время до review примерно на 40%.",
    tags: ["llm", "rag", "fastapi", "python", "qdrant"],
    path: "content/ru/projects/gitlab-mr-review-agent.mdx",
    wordCount: 410,
    readingMinutes: 3,
    featured: true,
    status: "active",
    Component: RuGitlabProject,
  },
];

const tagDescriptions: Record<Locale, Record<string, string>> = {
  en: {
    duckdb: "In-process analytics, fast ad-hoc SQL and file-native exploration.",
    fastapi: "Python services, clean APIs and production integrations.",
    llm: "Practical LLM systems, tooling and automation in real teams.",
    meta: "Notes about the site itself and how it evolves.",
    parquet: "Columnar formats, storage layouts and efficient scans.",
    python: "Glue code, services and data tooling that actually ships.",
    qdrant: "Vector retrieval for pragmatic RAG systems.",
    rag: "Retrieval-augmented generation grounded in real documentation.",
    s3: "Object storage patterns, pushdown and large-scale data access.",
  },
  ru: {
    duckdb: "Локальная аналитика, быстрый ad-hoc SQL и работа с файлами без лишнего слоя.",
    fastapi: "Python-сервисы, API и внутренние интеграции для production.",
    llm: "Практическое применение LLM в инженерных командах.",
    meta: "Заметки о самом сайте и о том, как он развивается.",
    parquet: "Columnar storage, физический layout данных и эффективные сканы.",
    python: "Сервисы, glue code и инженерный tooling на Python.",
    qdrant: "Векторный поиск и retrieval для прикладных RAG-систем.",
    rag: "Retrieval-augmented generation с опорой на реальную документацию.",
    s3: "Паттерны работы с object storage и большими датасетами.",
  },
};

function sortByDateDesc<T extends { date: string }>(entries: T[]): T[] {
  return [...entries].sort((left, right) => {
    return Number(new Date(right.date)) - Number(new Date(left.date));
  });
}

export function getEntries(locale: Locale, kind?: ContentKind): ContentEntry[] {
  const filtered = contentEntries.filter((entry) => {
    return entry.locale === locale && (!kind || entry.kind === kind);
  });

  return sortByDateDesc(filtered);
}

export function getEntry(locale: Locale, kind: ContentKind, slug: string) {
  return contentEntries.find((entry) => {
    return entry.locale === locale && entry.kind === kind && entry.slug === slug;
  });
}

export function getWriting(locale: Locale) {
  return getEntries(locale, "post");
}

export function getTils(locale: Locale) {
  return getEntries(locale, "til");
}

export function getProjects(locale: Locale) {
  return getEntries(locale, "project");
}

export function getFeaturedEntries(
  locale: Locale,
  kind: ContentKind,
  limit = 3
) {
  return getEntries(locale, kind)
    .filter((entry) => entry.featured)
    .slice(0, limit);
}

export function getRecentEntries(
  locale: Locale,
  kind: ContentKind,
  limit = 3
) {
  return getEntries(locale, kind).slice(0, limit);
}

export function getAllTags(locale: Locale) {
  const counts = new Map<string, number>();

  for (const entry of getEntries(locale)) {
    for (const tag of entry.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .map(([tag, count]) => ({
      tag,
      count,
      description: tagDescriptions[locale][tag],
    }))
    .sort((left, right) => {
      if (right.count === left.count) {
        return left.tag.localeCompare(right.tag);
      }

      return right.count - left.count;
    });
}

export function getEntriesByTag(locale: Locale, tag: string) {
  return getEntries(locale).filter((entry) => entry.tags.includes(tag));
}

export function getTagDescription(locale: Locale, tag: string) {
  return tagDescriptions[locale][tag];
}

export function getContentStats(locale: Locale) {
  const entries = getEntries(locale);

  return {
    totalEntries: entries.length,
    totalPosts: entries.filter((entry) => entry.kind === "post").length,
    totalTils: entries.filter((entry) => entry.kind === "til").length,
    totalProjects: entries.filter((entry) => entry.kind === "project").length,
    totalWords: entries.reduce((sum, entry) => sum + entry.wordCount, 0),
    totalTags: getAllTags(locale).length,
  };
}

export function getEditOnGitHubUrl(entry: ContentEntry) {
  return `https://github.com/alealandreev/personal-site/blob/main/${entry.path}`;
}

export function getContentHref(entry: ContentEntry) {
  if (entry.kind === "post") return `/${entry.locale}/writing/${entry.slug}`;
  if (entry.kind === "til") return `/${entry.locale}/til/${entry.slug}`;
  return `/${entry.locale}/projects/${entry.slug}`;
}
