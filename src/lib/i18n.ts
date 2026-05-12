export const locales = ["en", "ru"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeLabels: Record<Locale, string> = {
  en: "EN",
  ru: "RU",
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function normalizeLocale(value?: string): Locale {
  return value && isLocale(value) ? value : defaultLocale;
}

export function localePath(locale: Locale, path = "/"): string {
  if (!path || path === "/") return `/${locale}`;
  return `/${locale}${path.startsWith("/") ? path : `/${path}`}`;
}

export function stripLocalePrefix(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return "/";
  if (!isLocale(segments[0])) return pathname || "/";

  const rest = segments.slice(1).join("/");
  return rest ? `/${rest}` : "/";
}

export function getAlternateLocale(locale: Locale): Locale {
  return locale === "en" ? "ru" : "en";
}
