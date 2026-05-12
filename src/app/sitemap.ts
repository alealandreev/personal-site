import type { MetadataRoute } from "next";
import { getAllTags, getEntries } from "@/lib/content";
import { localePath, locales } from "@/lib/i18n";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://persistentengineer.com";

const staticPaths = [
  "",
  "/about",
  "/writing",
  "/til",
  "/projects",
  "/tags",
  "/dashboard",
  "/now",
  "/uses",
  "/cv",
  "/colophon",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    staticPaths.map((path) => ({
      url: `${SITE_URL}${localePath(locale, path || "/")}`,
      priority: path === "" ? 1.0 : 0.7,
      changeFrequency:
        path === "/writing" || path === "/til" ? "weekly" : "monthly",
      alternates: {
        languages: Object.fromEntries(
          locales.map((candidate) => [
            candidate,
            `${SITE_URL}${localePath(candidate, path || "/")}`,
          ])
        ),
      },
    }))
  );

  const contentRoutes: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    getEntries(locale).map((entry) => ({
      url: `${SITE_URL}${localePath(
        locale,
        entry.kind === "post"
          ? `/writing/${entry.slug}`
          : entry.kind === "til"
            ? `/til/${entry.slug}`
            : `/projects/${entry.slug}`
      )}`,
      lastModified: entry.date,
      priority: entry.kind === "post" ? 0.8 : 0.6,
      changeFrequency: entry.kind === "post" ? "monthly" : "yearly",
      alternates: {
        languages: Object.fromEntries(
          locales.map((candidate) => [
            candidate,
            `${SITE_URL}${localePath(
              candidate,
              entry.kind === "post"
                ? `/writing/${entry.slug}`
                : entry.kind === "til"
                  ? `/til/${entry.slug}`
                  : `/projects/${entry.slug}`
            )}`,
          ])
        ),
      },
    }))
  );

  const tagRoutes: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    getAllTags(locale).map((item) => ({
      url: `${SITE_URL}${localePath(locale, `/tags/${item.tag}`)}`,
      priority: 0.5,
      changeFrequency: "monthly",
      alternates: {
        languages: Object.fromEntries(
          locales.map((candidate) => [
            candidate,
            `${SITE_URL}${localePath(candidate, `/tags/${item.tag}`)}`,
          ])
        ),
      },
    }))
  );

  return [...staticRoutes, ...contentRoutes, ...tagRoutes];
}
