import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell, SectionTitle } from "@/components/site/primitives";
import { Tag } from "@/components/ui/tag";
import { getContentHref, getTils } from "@/lib/content";
import { formatDate } from "@/lib/dates";
import { isLocale, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";

type Props = {
  params: Promise<{ locale: string }>;
};

const copy = {
  en: {
    title: "Today I Learned",
    description:
      "Compact notes on practical discoveries from daily work with data systems.",
    subtitle: "Short notes, sharp edges and useful reminders worth keeping.",
  },
  ru: {
    title: "Today I Learned",
    description:
      "Короткие заметки про практические находки из повседневной работы с data systems.",
    subtitle: "Короткие заметки, острые углы и полезные напоминания.",
  },
} as const satisfies Record<Locale, unknown>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const text = copy[locale];
  return buildMetadata({
    locale,
    title: text.title,
    description: text.description,
    path: "/til",
  });
}

export default async function TilPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const text = copy[locale];
  const tils = getTils(locale);

  return (
    <PageShell>
      <SectionTitle subtitle={text.subtitle}>{text.title}</SectionTitle>
      <div className="mt-6 grid gap-4">
        {tils.map((entry) => (
          <article key={entry.slug} className="surface p-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-[--fg-muted]">
                  {formatDate(locale, entry.date)}
                </p>
                <Link
                  href={getContentHref(entry)}
                  className="mt-3 inline-block text-xl font-semibold tracking-tight transition-colors hover:text-[--accent]"
                >
                  {entry.title}
                </Link>
                <p className="mt-3 text-sm leading-7 text-[--fg-muted]">
                  {entry.summary}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {entry.tags.map((tag) => (
                    <Tag key={tag} tag={tag} locale={locale} />
                  ))}
                </div>
              </div>
              <p className="font-mono text-xs text-[--fg-muted]">
                {entry.readingMinutes} min
              </p>
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
