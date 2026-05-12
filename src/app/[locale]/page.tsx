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
    badge: "Lead Data Engineer · Moscow · remote/relocation",
    subtitle: "I build data platforms, then explain the trade-offs in public.",
    summary:
      "This site is evolving into a small engineering artifact: essays, TIL notes, project write-ups and interactive explanations about streaming, lakehouse systems and applied AI tooling.",
    availability:
      "Based in Moscow. Open to senior+ remote or relocation roles across AU/NZ/EU/US.",
    primaryCta: "Start with the project",
    secondaryCta: "View CV",
    featuredWriting: "Writing with implementation detail",
    latestTils: "Field notes",
    featuredProjects: "Current build",
    proofTitle: "Operating thesis",
    proofPoints: [
      {
        label: "Production taste",
        text: "Data systems are only useful when ownership, observability and failure modes are explicit.",
      },
      {
        label: "Trade-off writing",
        text: "The interesting part is rarely the tool. It is latency, cost, team shape and what breaks at scale.",
      },
      {
        label: "Site as system",
        text: "The roadmap is a public ETL: content, metrics and small interactive demos that make the architecture visible.",
      },
    ],
    artifactTitle: "Site roadmap as a data product",
    artifactSummary:
      "The research direction is clear: one strong technical artifact beats a generic portfolio. This site will bias toward executable explanations, public dashboards and short memorable URLs.",
    pipelineSteps: [
      { label: "ingest", value: "MDX, GitHub, activity APIs" },
      { label: "model", value: "tags, feeds, views, references" },
      { label: "serve", value: "essays, TIL, demos, dashboard" },
    ],
    startHereTitle: "Start here",
    startHere: [
      {
        title: "Writing",
        href: "/writing",
        text: "Long-form essays with explicit implementation detail.",
      },
      {
        title: "Projects",
        href: "/projects",
        text: "Case studies and systems that show applied judgement.",
      },
      {
        title: "TIL",
        href: "/til",
        text: "Short notes from daily work with data systems.",
      },
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
    siteLabel: "Current dataset",
    emptyWriting: "Featured essays will appear here soon.",
  },
  ru: {
    title: "Александр Андреев",
    badge: "Lead Data Engineer · Москва · remote/relocation",
    subtitle:
      "Я строю data platforms и публично разбираю инженерные trade-off'ы.",
    summary:
      "Этот сайт развивается как небольшой инженерный артефакт: статьи, TIL-заметки, разборы проектов и интерактивные объяснения про streaming, lakehouse и applied AI tooling.",
    availability:
      "Живу в Москве. Открыт к senior+ remote и relocation ролям в AU/NZ/EU/US.",
    primaryCta: "Начать с проекта",
    secondaryCta: "Открыть CV",
    featuredWriting: "Статьи с деталями реализации",
    latestTils: "Полевые заметки",
    featuredProjects: "Текущая сборка",
    proofTitle: "Рабочая доктрина",
    proofPoints: [
      {
        label: "Production taste",
        text: "Data systems полезны только тогда, когда ownership, observability и failure modes явно проговорены.",
      },
      {
        label: "Trade-off writing",
        text: "Интересная часть редко в инструменте. Чаще в latency, стоимости, форме команды и том, что ломается на масштабе.",
      },
      {
        label: "Site as system",
        text: "Roadmap сайта — публичный ETL: контент, метрики и маленькие интерактивные демо, которые показывают архитектуру.",
      },
    ],
    artifactTitle: "Roadmap сайта как data product",
    artifactSummary:
      "Вывод исследования простой: один сильный технический артефакт лучше generic portfolio. Поэтому сайт будет смещаться к executable explanations, публичным dashboard'ам и коротким запоминаемым URL.",
    pipelineSteps: [
      { label: "ingest", value: "MDX, GitHub, activity APIs" },
      { label: "model", value: "tags, feeds, views, references" },
      { label: "serve", value: "essays, TIL, demos, dashboard" },
    ],
    startHereTitle: "Куда смотреть",
    startHere: [
      {
        title: "Статьи",
        href: "/writing",
        text: "Длинные тексты с практическими деталями реализации.",
      },
      {
        title: "Проекты",
        href: "/projects",
        text: "Разборы систем и решений, где виден инженерный judgement.",
      },
      {
        title: "TIL",
        href: "/til",
        text: "Короткие заметки из ежедневной работы с data systems.",
      },
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
    siteLabel: "Текущий dataset",
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
          <div className="relative z-10">
            <div className="flex flex-wrap items-center gap-3">
              <p className="eyebrow">persistentengineer.com</p>
              <span className="status-dot">{text.badge}</span>
            </div>
            <h1 className="mt-6 max-w-3xl text-5xl font-semibold leading-[0.95] tracking-[-0.07em] sm:text-6xl">
              {text.title}
            </h1>
            <p className="mt-5 max-w-3xl text-xl leading-tight text-[--fg] sm:text-2xl">
              {text.subtitle}
            </p>
            <p className="mt-5 max-w-2xl border-l border-[--accent] pl-5 text-sm leading-7 text-[--fg-muted] sm:text-base">
              {text.summary}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={localePath(locale, "/projects/gitlab-mr-review-agent")}
                className="button-primary"
              >
                {text.primaryCta}
              </Link>
              <Link
                href={localePath(locale, "/cv")}
                className="button-secondary"
              >
                {text.secondaryCta}
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
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

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {text.pipelineSteps.map((step) => (
                <div
                  key={step.label}
                  className="rounded-2xl border border-[--border] bg-[color-mix(in_srgb,var(--surface)_62%,transparent)] p-3"
                >
                  <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[--accent]">
                    {step.label}
                  </p>
                  <p className="mt-2 text-xs leading-5 text-[--fg-muted]">
                    {step.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <aside className="signal-card relative z-10">
            <p className="eyebrow">{text.siteLabel}</p>
            <p className="mt-3 text-sm leading-7 text-[--fg-muted]">
              {text.availability}
            </p>

            <dl className="mt-5 grid gap-2">
              {text.stats.map((item) => (
                <div
                  key={item.label}
                  className="metric-card grid gap-3 sm:grid-cols-[7rem_minmax(0,1fr)] sm:items-baseline"
                >
                  <dt className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-[--fg-muted]">
                    {item.label}
                  </dt>
                  <dd>
                    <span className="block text-lg font-semibold tracking-tight text-[--fg]">
                      {item.value}
                    </span>
                    <span className="mt-1 block text-sm leading-6 text-[--fg-muted]">
                      {item.detail}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-4 rounded-2xl border border-[--border] bg-[color-mix(in_srgb,var(--surface-strong)_78%,transparent)] p-4">
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
            <article key={point.label} className="surface-card p-6">
              <p className="font-mono text-xs text-[--accent]">0{index + 1}</p>
              <h2 className="mt-3 text-lg font-semibold tracking-tight">
                {point.label}
              </h2>
              <p className="mt-2 text-sm leading-7 text-[--fg-muted]">
                {point.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16 grid gap-4 animate-in delay-200 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
        <article className="surface-card p-7 sm:p-9">
          <p className="eyebrow">{text.artifactTitle}</p>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-[--fg-muted]">
            {text.artifactSummary}
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {text.pipelineSteps.map((step) => (
              <div key={step.label} className="pipeline-step">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-[--accent]">
                  {step.label}
                </p>
                <p className="mt-2 text-sm leading-6 text-[--fg-muted]">
                  {step.value}
                </p>
              </div>
            ))}
          </div>
        </article>

        <aside className="terminal-panel">
          <div className="flex items-center justify-between border-b border-[color-mix(in_srgb,var(--border)_70%,transparent)] px-4 py-3 font-mono text-xs text-[--fg-muted]">
            <span>persistentengineer.local</span>
            <span>public artifact</span>
          </div>
          <div className="space-y-4 p-5 font-mono text-xs leading-6">
            <p>
              <span className="text-[--accent]">$</span> select signal from
              portfolio;
            </p>
            <p className="text-[--fg-muted]">
              essays + projects + TIL + dashboards + interactive systems
            </p>
            <p>
              <span className="text-[--accent]">$</span> next moonshot
            </p>
            <p className="text-[--fg-muted]">
              explorable data engineering concepts, one strong artifact at a
              time
            </p>
          </div>
        </aside>
      </section>

      <section className="mt-16 animate-in delay-200">
        <SectionTitle>{text.startHereTitle}</SectionTitle>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {text.startHere.map((item, index) => (
            <Link
              key={item.href}
              href={localePath(locale, item.href)}
              className="surface-card block p-6"
            >
              <p className="font-mono text-xs text-[--accent]">
                0{index + 1}
              </p>
              <h2 className="text-xl font-semibold tracking-tight">
                {item.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-[--fg-muted]">
                {item.text}
              </p>
            </Link>
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
              <article key={post.slug} className="surface-card p-6 sm:p-7">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="max-w-2xl">
                    <p className="meta-line">
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
                  <div className="rounded-full border border-[--border] bg-[--surface] px-3 py-1.5 font-mono text-xs text-[--fg-muted]">
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
          <article className="surface-card mt-6 p-7 sm:p-9">
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
              <p className="meta-line">
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
