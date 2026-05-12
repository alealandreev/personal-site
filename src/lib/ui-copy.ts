import type { ContentKind, ContentEntry } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

type ProjectStatus = NonNullable<ContentEntry["status"]>;

const readingMinuteLabels: Record<Locale, string> = {
  en: "min read",
  ru: "мин чтения",
};

const contentKindLabels: Record<Locale, Record<ContentKind, string>> = {
  en: {
    post: "posts",
    til: "TIL",
    project: "projects",
  },
  ru: {
    post: "статей",
    til: "TIL",
    project: "проектов",
  },
};

const projectStatusLabels: Record<Locale, Record<ProjectStatus, string>> = {
  en: {
    active: "Active",
    archived: "Archived",
    wip: "In progress",
  },
  ru: {
    active: "Активный",
    archived: "В архиве",
    wip: "В работе",
  },
};

export const detailCopy = {
  en: {
    writing: "Writing",
    til: "TIL",
    projects: "Projects",
    allPosts: "All posts",
    allNotes: "All notes",
    allProjects: "All projects",
    editOnGitHub: "Edit on GitHub",
  },
  ru: {
    writing: "Статьи",
    til: "TIL",
    projects: "Проекты",
    allPosts: "Все статьи",
    allNotes: "Все заметки",
    allProjects: "Все проекты",
    editOnGitHub: "Редактировать на GitHub",
  },
} as const;

export function formatReadingTime(locale: Locale, minutes?: number) {
  if (!minutes) return "";
  return `${minutes} ${readingMinuteLabels[locale]}`;
}

export function formatContentCount(
  locale: Locale,
  kind: ContentKind,
  count: number
) {
  return `${count} ${contentKindLabels[locale][kind]}`;
}

export function formatProjectStatus(
  locale: Locale,
  status: ContentEntry["status"] = "active"
) {
  return projectStatusLabels[locale][status];
}
