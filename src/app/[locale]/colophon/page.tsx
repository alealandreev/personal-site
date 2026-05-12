import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell, SectionTitle } from "@/components/site/primitives";
import { isLocale, localePath, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";

type Props = {
  params: Promise<{ locale: string }>;
};

const copy = {
  en: {
    title: "Colophon",
    description: "How this site is built and why the stack looks this way.",
    stack: [
      { label: "Framework", value: "Next.js 16, App Router, React 19" },
      { label: "Styling", value: "Tailwind CSS v4 with CSS-first tokens" },
      { label: "Content", value: "MDX content with a typed content registry" },
      { label: "Infra", value: "Vercel hosting, Cloudflare DNS, Neon Postgres" },
      { label: "Analytics", value: "@vercel/analytics" },
      { label: "Newsletter", value: "Buttondown" },
      { label: "Dataset", value: "Public JSON/CSV now, Parquet on Cloudflare R2 next" },
    ],
    notes: [
      "The site is intentionally content-first: essays, notes and case studies matter more than gimmicks.",
      "I prefer a small number of dependable building blocks over a large design-system abstraction.",
      "The public repo is part of the portfolio signal, so maintainability matters as much as appearance.",
    ],
  },
  ru: {
    title: "Colophon",
    description: "Как устроен сайт и почему стек выглядит именно так.",
    stack: [
      { label: "Framework", value: "Next.js 16, App Router, React 19" },
      { label: "Styling", value: "Tailwind CSS v4 и CSS-first токены" },
      { label: "Content", value: "MDX-контент с typed content registry" },
      { label: "Infra", value: "Vercel hosting, Cloudflare DNS, Neon Postgres" },
      { label: "Analytics", value: "@vercel/analytics" },
      { label: "Newsletter", value: "Buttondown" },
      { label: "Dataset", value: "Public JSON/CSV сейчас, Parquet в Cloudflare R2 следующим шагом" },
    ],
    notes: [
      "Сайт специально делается content-first: статьи, заметки и case studies важнее gimmicks.",
      "Мне ближе небольшой набор надёжных building blocks, чем тяжёлый дизайн-системный слой.",
      "Публичный репозиторий сам по себе часть портфолио, поэтому поддерживаемость важна не меньше внешнего вида.",
    ],
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
    path: "/colophon",
  });
}

export default async function ColophonPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const text = copy[locale];

  return (
    <PageShell>
      <SectionTitle subtitle={text.description}>{text.title}</SectionTitle>
      <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)]">
        <div className="surface-card p-6">
          <div className="space-y-4">
            {text.stack.map((item) => (
              <div
                key={item.label}
                className="grid gap-2 border-b border-[--border] pb-4 last:border-b-0 last:pb-0 sm:grid-cols-[140px_minmax(0,1fr)]"
              >
                <p className="meta-line">
                  {item.label}
                </p>
                <p className="text-sm leading-7 text-[--fg]">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <aside className="surface-card p-6">
          <h2 className="text-xl font-semibold tracking-tight">Notes</h2>
          <ul className="mt-4 space-y-3">
            {text.notes.map((item) => (
              <li key={item} className="text-sm leading-7 text-[--fg-muted]">
                {item}
              </li>
            ))}
          </ul>
          <Link href={localePath(locale, "/sql")} className="button-secondary mt-6">
            Query the dataset
          </Link>
        </aside>
      </div>
    </PageShell>
  );
}
