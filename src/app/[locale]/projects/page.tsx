import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell, SectionTitle } from "@/components/site/primitives";
import { Tag } from "@/components/ui/tag";
import { getContentHref, getProjects } from "@/lib/content";
import { isLocale, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";

type Props = {
  params: Promise<{ locale: string }>;
};

const copy = {
  en: {
    title: "Projects",
    description:
      "Case studies on practical systems, AI tooling and production-facing platform work.",
    subtitle: "Selected systems with context, architecture, trade-offs and outcomes.",
  },
  ru: {
    title: "Проекты",
    description:
      "Разборы практических систем, AI tooling и production-ориентированной platform work.",
    subtitle: "Выбранные системы с контекстом, архитектурой, trade-off'ами и результатами.",
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
    path: "/projects",
  });
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const text = copy[locale];
  const projects = getProjects(locale);

  return (
    <PageShell>
      <SectionTitle subtitle={text.subtitle}>{text.title}</SectionTitle>
      <div className="mt-6 grid gap-4">
        {projects.map((project) => (
          <article key={project.slug} className="surface p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <p className="eyebrow">{project.status ?? "active"}</p>
                <Link
                  href={getContentHref(project)}
                  className="mt-3 inline-block text-2xl font-semibold tracking-tight transition-colors hover:text-[--accent]"
                >
                  {project.title}
                </Link>
                <p className="mt-3 text-base leading-8 text-[--fg-muted]">
                  {project.summary}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Tag key={tag} tag={tag} locale={locale} />
                  ))}
                </div>
              </div>
              <p className="font-mono text-sm text-[--fg-muted]">
                {project.readingMinutes} min
              </p>
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
