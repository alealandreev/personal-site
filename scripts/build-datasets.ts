#!/usr/bin/env tsx
import { mkdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { contentMetadata } from "../src/lib/content-metadata";

type JsonRecord = Record<string, string | number | boolean | null>;

type StatsFile = {
  github?: {
    repos?: number;
    followers?: number;
    stars?: number;
    updated_at?: string | null;
    repositories?: Array<{
      name: string;
      language: string | null;
      stargazers_count: number;
      forks_count: number;
      pushed_at: string | null;
      html_url: string;
    }>;
  };
  wakatime?: {
    hours_this_year?: number;
    top_languages?: Array<{ name: string; percent: number }>;
    updated_at?: string | null;
  };
  generated_at?: string;
};

const root = process.cwd();
const publicDataDir = join(root, "public", "data");
const generatedAt = new Date().toISOString();

function readStats(): StatsFile {
  try {
    return JSON.parse(readFileSync(join(root, "data", "stats.json"), "utf8"));
  } catch {
    return {};
  }
}

function csvEscape(value: JsonRecord[string]) {
  if (value === null || value === undefined) return "";
  const stringValue = String(value);
  if (/[",\n\r]/.test(stringValue)) {
    return `"${stringValue.replaceAll('"', '""')}"`;
  }
  return stringValue;
}

function writeTable(name: string, rows: JsonRecord[]) {
  const jsonPath = join(publicDataDir, `${name}.json`);
  writeFileSync(jsonPath, JSON.stringify(rows, null, 2));

  const columns = Object.keys(rows[0] ?? {});
  const csv = [
    columns.join(","),
    ...rows.map((row) => columns.map((column) => csvEscape(row[column])).join(",")),
  ].join("\n");

  writeFileSync(join(publicDataDir, `${name}.csv`), `${csv}\n`);
}

const stats = readStats();

const posts = contentMetadata
  .filter((entry) => entry.kind === "post")
  .map((entry) => ({
    slug: entry.slug,
    locale: entry.locale,
    title: entry.title,
    date: entry.date,
    tags: entry.tags.join("|"),
    word_count: entry.wordCount,
    reading_minutes: entry.readingMinutes ?? null,
    featured: entry.featured ?? false,
    url: `/${entry.locale}/writing/${entry.slug}`,
  }));

const projects = contentMetadata
  .filter((entry) => entry.kind === "project")
  .map((entry) => ({
    slug: entry.slug,
    locale: entry.locale,
    title: entry.title,
    date: entry.date,
    status: entry.status ?? "active",
    tags: entry.tags.join("|"),
    summary: entry.summary,
    reading_minutes: entry.readingMinutes ?? null,
    url: `/${entry.locale}/projects/${entry.slug}`,
  }));

const til = contentMetadata
  .filter((entry) => entry.kind === "til")
  .map((entry) => ({
    slug: entry.slug,
    locale: entry.locale,
    title: entry.title,
    date: entry.date,
    tags: entry.tags.join("|"),
    summary: entry.summary,
    reading_minutes: entry.readingMinutes ?? null,
    url: `/${entry.locale}/til/${entry.slug}`,
  }));

const githubRepos =
  stats.github?.repositories?.map((repo) => ({
    name: repo.name,
    language: repo.language ?? "unknown",
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    pushed_at: repo.pushed_at,
    url: repo.html_url,
  })) ?? [
    {
      name: "personal-site",
      language: "TypeScript",
      stars: stats.github?.stars ?? 0,
      forks: 0,
      pushed_at: stats.github?.updated_at ?? generatedAt,
      url: "https://github.com/alealandreev/personal-site",
    },
  ];

const codingStats =
  stats.wakatime?.top_languages?.map((language) => ({
    language: language.name,
    percent: language.percent,
    hours_estimate: Math.round(
      ((stats.wakatime?.hours_this_year ?? 0) * language.percent) / 100
    ),
    generated_at: stats.wakatime?.updated_at ?? stats.generated_at ?? generatedAt,
  })) ?? [];

const tables = {
  posts,
  projects,
  til,
  github_repos: githubRepos,
  coding_stats: codingStats,
} satisfies Record<string, JsonRecord[]>;

const sampleQueries = [
  {
    id: "content-by-topic",
    title: "Which topics appear most often?",
    sql: `SELECT tag, COUNT(*) AS mentions
FROM (
  SELECT UNNEST(STRING_SPLIT(tags, '|')) AS tag FROM posts
  UNION ALL
  SELECT UNNEST(STRING_SPLIT(tags, '|')) AS tag FROM til
  UNION ALL
  SELECT UNNEST(STRING_SPLIT(tags, '|')) AS tag FROM projects
)
GROUP BY tag
ORDER BY mentions DESC;`,
  },
  {
    id: "writing-density",
    title: "How much long-form writing exists?",
    sql: `SELECT locale, COUNT(*) AS posts, SUM(word_count) AS words
FROM posts
GROUP BY locale
ORDER BY words DESC;`,
  },
  {
    id: "coding-language-mix",
    title: "What is the coding language mix?",
    sql: `SELECT language, percent, hours_estimate
FROM coding_stats
ORDER BY percent DESC;`,
  },
  {
    id: "ai-data-projects",
    title: "Which projects connect AI tooling and data platforms?",
    sql: `SELECT title, status, tags, url
FROM projects
WHERE tags LIKE '%llm%' OR tags LIKE '%rag%' OR tags LIKE '%duckdb%'
ORDER BY date DESC;`,
  },
];

const catalog = {
  version: 1,
  generated_at: generatedAt,
  dataset_base_url:
    process.env.NEXT_PUBLIC_DATASET_BASE_URL?.replace(/\/$/, "") ?? "/data",
  privacy:
    "Only public content metadata and aggregated activity metrics are included. Raw personal events and private API payloads are not published.",
  tables: Object.entries(tables).map(([name, rows]) => ({
    name,
    row_count: rows.length,
    formats: {
      json: `${name}.json`,
      csv: `${name}.csv`,
      parquet: `${name}.parquet`,
    },
    columns: Object.entries(rows[0] ?? {}).map(([column, value]) => ({
      name: column,
      type:
        typeof value === "number"
          ? "number"
          : typeof value === "boolean"
            ? "boolean"
            : "string",
    })),
  })),
  sample_queries: sampleQueries,
};

mkdirSync(publicDataDir, { recursive: true });

for (const [name, rows] of Object.entries(tables)) {
  writeTable(name, rows);
}

writeFileSync(join(publicDataDir, "catalog.json"), JSON.stringify(catalog, null, 2));

console.log(
  `[datasets] wrote ${Object.keys(tables).length} tables to ${publicDataDir}`
);
