import type { Metadata } from "next";
import { defaultLocale, localePath, locales, type Locale } from "@/lib/i18n";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://persistentengineer.com";
const SITE_NAME = "persistentengineer.com";

const localeMeta: Record<
  Locale,
  { locale: string; siteTitle: string; siteDescription: string }
> = {
  en: {
    locale: "en_US",
    siteTitle: "Aleksandr Andreev — Lead Data Engineer",
    siteDescription:
      "Lead Data Engineer focused on streaming, lakehouse architecture, applied AI tooling and production-grade data systems.",
  },
  ru: {
    locale: "ru_RU",
    siteTitle: "Александр Андреев — Lead Data Engineer",
    siteDescription:
      "Lead Data Engineer: стриминг, lakehouse-архитектуры, applied AI tooling и production-grade data systems.",
  },
};

type MetadataOptions = {
  locale: Locale;
  title?: string;
  description?: string;
  path?: string;
  type?: "website" | "article";
  robots?: Metadata["robots"];
};

export function getSiteUrl(path = "") {
  return new URL(path, SITE_URL).toString();
}

export function buildMetadata({
  locale,
  title,
  description,
  path = "",
  type = "website",
  robots,
}: MetadataOptions): Metadata {
  const base = localeMeta[locale];
  const resolvedTitle = title ?? base.siteTitle;
  const resolvedDescription = description ?? base.siteDescription;
  const localizedPath = path ? localePath(locale, path) : localePath(locale);
  const canonical = getSiteUrl(localizedPath);

  const languages = Object.fromEntries(
    locales.map((candidate) => [
      candidate,
      getSiteUrl(path ? localePath(candidate, path) : localePath(candidate)),
    ])
  );

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    alternates: {
      canonical,
      languages,
      types:
        locale === defaultLocale
          ? { "application/rss+xml": getSiteUrl("/rss.xml") }
          : {
              "application/rss+xml": getSiteUrl(localePath(locale, "/rss.xml")),
            },
    },
    openGraph: {
      type,
      locale: base.locale,
      url: canonical,
      siteName: SITE_NAME,
      title: resolvedTitle,
      description: resolvedDescription,
      images: [getSiteUrl(localePath(locale, "/opengraph-image"))],
    },
    twitter: {
      card: "summary_large_image",
      creator: "@alealandreev",
      title: resolvedTitle,
      description: resolvedDescription,
      images: [getSiteUrl(localePath(locale, "/opengraph-image"))],
    },
    ...(robots ? { robots } : {}),
  };
}
