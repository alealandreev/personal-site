import type { ComponentType } from "react";
import type { MDXComponents } from "mdx/types";
import type { Locale } from "@/lib/i18n";
import {
  contentMetadata,
  tagDescriptions,
  type ContentKind,
  type ContentMetadataEntry,
} from "@/lib/content-metadata";
import EnHelloWorld from "../../content/posts/hello-world.mdx";
import EnDuckDbTil from "../../content/til/duckdb-httpfs-pushdown.mdx";
import EnGitlabProject from "../../content/projects/gitlab-mr-review-agent.mdx";
import RuHelloWorld from "../../content/ru/posts/hello-world.mdx";
import RuDuckDbTil from "../../content/ru/til/duckdb-httpfs-pushdown.mdx";
import RuGitlabProject from "../../content/ru/projects/gitlab-mr-review-agent.mdx";

export type { ContentKind } from "@/lib/content-metadata";

export type RenderableMdx = ComponentType<{ components?: MDXComponents }>;

export type ContentEntry = ContentMetadataEntry & {
  Component: RenderableMdx;
};

const componentsByEntry: Record<string, RenderableMdx> = {
  "en:post:hello-world": EnHelloWorld,
  "ru:post:hello-world": RuHelloWorld,
  "en:til:duckdb-httpfs-pushdown": EnDuckDbTil,
  "ru:til:duckdb-httpfs-pushdown": RuDuckDbTil,
  "en:project:gitlab-mr-review-agent": EnGitlabProject,
  "ru:project:gitlab-mr-review-agent": RuGitlabProject,
};

const contentEntries: ContentEntry[] = contentMetadata.map((entry) => ({
  ...entry,
  Component: componentsByEntry[`${entry.locale}:${entry.kind}:${entry.slug}`],
}));

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
