"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  getAlternateLocale,
  localeLabels,
  localePath,
  stripLocalePrefix,
  type Locale,
} from "@/lib/i18n";

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const alternateLocale = getAlternateLocale(locale);
  const targetPath = localePath(alternateLocale, stripLocalePrefix(pathname));

  return (
    <div className="flex items-center gap-1 rounded-full border border-[--border] bg-[--surface] p-1 shadow-[var(--shadow-card)]">
      <span className="rounded-full bg-[--surface-strong] px-2 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-[--fg]">
        {localeLabels[locale]}
      </span>
      <Link
        href={targetPath}
        className="rounded-full px-2 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-[--fg-muted] transition-colors hover:text-[--accent]"
      >
        {localeLabels[alternateLocale]}
      </Link>
    </div>
  );
}
