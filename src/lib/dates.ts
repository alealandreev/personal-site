import type { Locale } from "@/lib/i18n";

const localeMap: Record<Locale, string> = {
  en: "en-US",
  ru: "ru-RU",
};

export function formatDate(locale: Locale, value: string, style: "long" | "short" = "short") {
  return new Date(value).toLocaleDateString(localeMap[locale], {
    year: "numeric",
    month: style === "long" ? "long" : "short",
    day: "numeric",
  });
}
