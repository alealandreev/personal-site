import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NewsletterForm } from "@/components/site/newsletter-form";
import { PageShell, SectionTitle } from "@/components/site/primitives";
import { Tag } from "@/components/ui/tag";
import {
  getContentHref,
  getContentStats,
  getFeaturedEntries,
  getRecentEntries,
} from "@/lib/content";
import { formatDate } from "@/lib/dates";
import { isLocale, localePath, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";
import {
  formatContentCount,
  formatProjectStatus,
  formatReadingTime,
} from "@/lib/ui-copy";

type Props = {
  params: Promise<{ locale: string }>;
};

const copy = {
  en: {
    title: "Aleksandr Andreev",
    badge: "Available for senior data platform roles",
    subtitle:
      "Lead Data Engineer building dependable platforms for data-intensive teams.",
    summary:
      "I design streaming and lakehouse systems, ship developer tooling with LLMs, and write about the trade-offs that matter once systems reach real scale.",
    availability:
      "Based in Moscow. Open to senior+ remote or relocation roles across AU/NZ/EU/US.",
    primaryCta: "View CV",
    secondaryCta: "About me",
    featuredWriting: "Featured writing",
    latestTils: "Latest TIL",
    featuredProjects: "Selected project",
    proofTitle: "What I usually bring",
    proofPoints: [
      "Production data platforms with explicit ownership and operability.",
      "Streaming and lakehouse decisions grounded in cost, latency and team constraints.",
      "Internal AI tooling that helps engineers move faster without hiding the system.",
    ],
    stats: [
      {
        label: "Experience",
        value: "9+ years",
        detail: "Data platforms and analytics",
      },
      { label: "Focus", value: "Streaming", detail: "Kafka, Flink, lakehouse" },
      {
        label: "Edge",
        value: "AI tooling",
        detail: "RAG, review agents, internal DX",
      },
    ],
    quickLinks: [
      { label: "LinkedIn", href: "https://linkedin.com/in/aleksandr-andreev/" },
      { label: "GitHub", href: "https://github.com/alealandreev" },
      { label: "Habr", href: "https://habr.com/users/alealandreev/posts/" },
      { label: "Email", href: "mailto:hire@persistentengineer.com" },
    ],
    writingLink: "All writing",
    tilLink: "All notes",
    projectLink: "Project archive",
    contentSummary: "Published",
    siteLabel: "Current signal",
    emptyWriting: "Featured essays will appear here soon.",
  },
  ru: {
    title: "Александр Андреев",
    badge: "Открыт к senior data platform ролям",
    subtitle:
      "Lead Data Engineer, который строит надёжные платформы для data-intensive команд.",
    summary:
      "Я проектирую streaming и lakehouse-системы, делаю внутренний developer tooling с LLM и пишу о тех компромиссах, которые становятся важны на реальном масштабе.",
    availability:
      "Живу в Москве. Открыт к senior+ remote и relocation ролям в AU/NZ/EU/US.",
    primaryCta: "Открыть CV",
    secondaryCta: "Обо мне",
    featuredWriting: "Избранные статьи",
    latestTils: "Последние TIL",
    featuredProjects: "Ключевой проект",
    proofTitle: "Что я обычно приношу",
    proofPoints: [
      "Production data platforms с понятным ownership и observability.",
      "Streaming и lakehouse-решения с учетом стоимости, latency и ограничений команды.",
      "Внутренний AI tooling, который ускоряет инженеров и не прячет систему.",
    ],
    stats: [
      { label: "Опыт", value: "9+ лет", detail: "Data platforms и analytics" },
      { label: "Фокус", value: "Streaming", detail: "Kafka, Flink, lakehouse" },
      {
        label: "Сильная сторона",
        value: "AI tooling",
        detail: "RAG, review agents, internal DX",
      },
    ],
    quickLinks: [
      { label: "LinkedIn", href: "https://linkedin.com/in/aleksandr-andreev/" },
      { label: "GitHub", href: "https://github.com/alealandreev" },
      { label: "Habr", href: "https://habr.com/users/alealandreev/posts/" },
      { label: "Email", href: "mailto:hire@persistentengineer.com" },
    ],
    writingLink: "Все статьи",
    tilLink: "Все заметки",
    projectLink: "Архив проектов",
    contentSummary: "Опубликовано",
    siteLabel: "Текущий сигнал",
    emptyWriting: "Избранные статьи скоро появятся здесь.",
  },
} as const satisfies Record<Locale, unknown>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const text = copy[locale];
  return buildMetadata({
    locale,
    title: `${text.title} — Lead Data Engineer`,
    description: text.summary,
  });
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const text = copy[locale];
  const featuredPosts = getFeaturedEntries(locale, "post", 2);
  const posts = featuredPosts.length
    ? featuredPosts
    : getRecentEntries(locale, "post", 2);
  const tils = getRecentEntries(locale, "til", 3);
  const project = getFeaturedEntries(locale, "project", 1)[0];
  const stats = getContentStats(locale);

  return (
    <PageShell wide>
      <section className="hero-panel animate-in">
        <div className="hero-grid">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <p className="eyebrow">persistentengineer.com</p>
              <span className="status-dot">{text.badge}</span>
            </div>
            <h1 className="mt-6 max-w-3xl text-5xl font-semibold tracking-[-0.055em] sm:text-6xl lg:text-7xl">
              {text.title}
            </h1>
            <p className="mt-5 max-w-3xl text-2xl leading-tight text-[--fg] sm:text-3xl">
              {text.subtitle}
            </p>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[--fg-muted] sm:text-lg">
              {text.summary}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={localePath(locale, "/cv")} className="button-primary">
                {text.primaryCta}
              </Link>
              <Link
                href={localePath(locale, "/about")}
                className="button-secondary"
              >
                {text.secondaryCta}
              </Link>
            </div>

            <div className="mt-7 flex flex-wrap gap-2">
              {text.quickLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    link.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="pill hover:border-[--accent] hover:bg-[--accent-soft] hover:text-[--accent]"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <aside className="signal-card">
            <p className="eyebrow">{text.siteLabel}</p>
            <p className="mt-3 text-sm leading-7 text-[--fg-muted]">
              {text.availability}
            </p>

            <dl className="mt-6 grid gap-3">
              {text.stats.map((item) => (
                <div key={item.label} className="metric-card">
                  <dt className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-[--fg-muted]">
                    {item.label}
                  </dt>
                  <dd className="mt-2 text-xl font-semibold tracking-tight text-[--fg]">
                    {item.value}
                  </dd>
                  <p className="mt-1 text-sm text-[--fg-muted]">
                    {item.detail}
                  </p>
                </div>
              ))}
            </dl>

            <div className="mt-5 rounded-2xl border border-[--border] bg-[--surface-strong] p-4">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[--fg-muted]">
                {text.contentSummary}
              </p>
              <p className="mt-3 text-sm leading-7 text-[--fg-muted]">
                {[
                  formatContentCount(locale, "post", stats.totalPosts),
                  formatContentCount(locale, "til", stats.totalTils),
                  formatContentCount(locale, "project", stats.totalProjects),
                ].join(" · ")}
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="mt-10 animate-in delay-100">
        <p className="eyebrow">{text.proofTitle}</p>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {text.proofPoints.map((point, index) => (
            <article key={point} className="surface-card p-5">
              <p className="font-mono text-xs text-[--accent]">0{index + 1}</p>
              <p className="mt-3 text-sm leading-7 text-[--fg-muted]">
                {point}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16 animate-in delay-100">
        <SectionTitle
          subtitle={
            <Link
              href={localePath(locale, "/writing")}
              className="text-[--accent]"
            >
              {text.writingLink}
            </Link>
          }
        >
          {text.featuredWriting}
        </SectionTitle>
        <div className="mt-6 grid gap-4">
          {posts.length ? (
            posts.map((post) => (
              <article key={post.slug} className="surface-card p-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="max-w-2xl">
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-[--fg-muted]">
                      {formatDate(locale, post.date)}
                    </p>
                    <Link
                      href={getContentHref(post)}
                      className="mt-3 inline-block text-2xl font-semibold tracking-tight transition-colors hover:text-[--accent]"
                    >
                      {post.title}
                    </Link>
                    <p className="mt-3 text-[--fg-muted]">{post.summary}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Tag key={tag} tag={tag} locale={locale} />
                      ))}
                    </div>
                  </div>
                  <div className="font-mono text-sm text-[--fg-muted]">
                    {formatReadingTime(locale, post.readingMinutes)}
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="surface-card p-6 text-sm text-[--fg-muted]">
              {text.emptyWriting}
            </div>
          )}
        </div>
      </section>

      {project ? (
        <section className="mt-16 animate-in delay-200">
          <SectionTitle
            subtitle={
              <Link
                href={localePath(locale, "/projects")}
                className="text-[--accent]"
              >
                {text.projectLink}
              </Link>
            }
          >
            {text.featuredProjects}
          </SectionTitle>
          <article className="surface-card mt-6 p-6 sm:p-8">
            <p className="eyebrow">
              {formatProjectStatus(locale, project.status)}
            </p>
            <Link
              href={getContentHref(project)}
              className="mt-4 inline-block text-3xl font-semibold tracking-tight transition-colors hover:text-[--accent]"
            >
              {project.title}
            </Link>
            <p className="mt-4 max-w-3xl text-base leading-8 text-[--fg-muted]">
              {project.summary}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Tag key={tag} tag={tag} locale={locale} />
              ))}
            </div>
          </article>
        </section>
      ) : null}

      <section className="mt-16 animate-in delay-300">
        <SectionTitle
          subtitle={
            <Link href={localePath(locale, "/til")} className="text-[--accent]">
              {text.tilLink}
            </Link>
          }
        >
          {text.latestTils}
        </SectionTitle>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {tils.map((til) => (
            <article key={til.slug} className="surface-card p-5">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[--fg-muted]">
                {formatDate(locale, til.date)}
              </p>
              <Link
                href={getContentHref(til)}
                className="mt-3 inline-block text-lg font-medium tracking-tight transition-colors hover:text-[--accent]"
              >
                {til.title}
              </Link>
              <p className="mt-3 text-sm leading-7 text-[--fg-muted]">
                {til.summary}
              </p>
            </article>
          ))}
        </div>
      </section>

      <div className="mt-16">
        <NewsletterForm locale={locale} />
      </div>
    </PageShell>
  );
}
