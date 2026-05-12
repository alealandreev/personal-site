import type { Locale } from "@/lib/i18n";

export type ContentKind = "post" | "til" | "project";

export type ContentMetadataEntry = {
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
};

export const contentMetadata: ContentMetadataEntry[] = [
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
  },
  {
    locale: "ru",
    kind: "post",
    slug: "hello-world",
    title: "Hello, world",
    date: "2026-04-30",
    summary:
      "Первый пост на новом сайте — коротко о стеке и о том, что будет дальше.",
    tags: ["meta"],
    path: "content/ru/posts/hello-world.mdx",
    wordCount: 320,
    readingMinutes: 2,
    featured: true,
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
  },
];

export const tagDescriptions: Record<Locale, Record<string, string>> = {
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
    duckdb:
      "Локальная аналитика, быстрый ad-hoc SQL и работа с файлами без лишнего слоя.",
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
