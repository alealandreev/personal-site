import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell, SectionTitle } from "@/components/site/primitives";
import { getAllTags } from "@/lib/content";
import { isLocale, localePath, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";

type Props = {
  params: Promise<{ locale: string }>;
};

const copy = {
  en: {
    title: "Tags",
    description: "Browse all writing, notes and projects by topic.",
    subtitle: "A lightweight index of topics I keep coming back to.",
  },
  ru: {
    title: "Теги",
    description: "Навигация по статьям, заметкам и проектам по темам.",
    subtitle: "Лёгкий индекс тем, к которым я регулярно возвращаюсь.",
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
    path: "/tags",
  });
}

export default async function TagsPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const text = copy[locale];
  const tags = getAllTags(locale);

  return (
    <PageShell>
      <SectionTitle subtitle={text.subtitle}>{text.title}</SectionTitle>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {tags.map((item) => (
          <Link
            key={item.tag}
            href={localePath(locale, `/tags/${item.tag}`)}
            className="surface flex flex-col gap-3 p-5 transition-colors hover:border-[--accent]"
          >
            <div className="flex items-center justify-between gap-4">
              <h2 className="font-mono text-sm text-[--fg]">#{item.tag}</h2>
              <span className="pill">{item.count}</span>
            </div>
            <p className="text-sm leading-7 text-[--fg-muted]">
              {item.description ?? item.tag}
            </p>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
