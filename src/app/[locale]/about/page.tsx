import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NewsletterForm } from "@/components/site/newsletter-form";
import { InfoPill, PageShell, SectionTitle } from "@/components/site/primitives";
import { isLocale, localePath, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";

type Props = {
  params: Promise<{ locale: string }>;
};

const copy = {
  en: {
    title: "About",
    description:
      "Lead Data Engineer with 9+ years building streaming, lakehouse and analytics platforms at production scale.",
    intro: [
      "I work across the full data platform surface area: streaming pipelines, batch compute, table formats, orchestration, data quality and the tooling teams need to move faster without losing discipline.",
      "In recent years I have also been building internal AI tooling, especially review and knowledge-assist systems grounded in real documentation rather than generic prompts.",
      "This site is both a portfolio and a writing lab. I use it to publish essays, compact notes, and case studies about systems that are interesting because they have trade-offs, not because they have hype.",
    ],
    principlesTitle: "How I work",
    principles: [
      "Prefer boring infrastructure when it scales operationally.",
      "Make trade-offs explicit instead of hiding them in architecture diagrams.",
      "Build platforms teams can actually adopt, not just admire.",
    ],
    stackTitle: "Core stack",
    stack: [
      "Kafka",
      "Flink",
      "Spark",
      "Airflow",
      "dbt",
      "Iceberg",
      "Trino",
      "DuckDB",
      "Python",
      "Scala",
      "TypeScript",
      "Kubernetes",
    ],
    contactTitle: "Contact",
    contact: [
      { label: "Email", value: "hire@persistentengineer.com", href: "mailto:hire@persistentengineer.com" },
      { label: "LinkedIn", value: "linkedin.com/in/aleksandr-andreev", href: "https://linkedin.com/in/aleksandr-andreev/" },
      { label: "GitHub", value: "github.com/alealandreev", href: "https://github.com/alealandreev" },
      { label: "Habr", value: "habr.com/users/alealandreev/posts", href: "https://habr.com/users/alealandreev/posts/" },
    ],
    availabilityTitle: "Availability",
    availability:
      "Currently based in Moscow. Open to senior+ opportunities with remote-first teams or relocation support across AU/NZ/EU/US.",
  },
  ru: {
    title: "Обо мне",
    description:
      "Lead Data Engineer с 9+ годами опыта в streaming, lakehouse и production-grade data platforms.",
    intro: [
      "Я работаю по всему стеку data platform: от streaming pipelines и batch compute до orchestration, table formats, data quality и внутренних инструментов, которые помогают командам двигаться быстрее.",
      "Последние годы много внимания уделяю internal AI tooling, особенно review- и knowledge-assist системам, которые опираются на реальную документацию и процессы.",
      "Этот сайт для меня одновременно портфолио и площадка для инженерного письма: здесь я публикую статьи, короткие заметки и разборы систем, интересных не хайпом, а компромиссами.",
    ],
    principlesTitle: "Как я работаю",
    principles: [
      "Предпочитаю скучную инфраструктуру, если она лучше выдерживает эксплуатацию.",
      "Люблю явные trade-off'ы, а не красивые, но пустые архитектурные схемы.",
      "Стараюсь строить платформы, которыми команды реально пользуются.",
    ],
    stackTitle: "Основной стек",
    stack: [
      "Kafka",
      "Flink",
      "Spark",
      "Airflow",
      "dbt",
      "Iceberg",
      "Trino",
      "DuckDB",
      "Python",
      "Scala",
      "TypeScript",
      "Kubernetes",
    ],
    contactTitle: "Контакты",
    contact: [
      { label: "Email", value: "hire@persistentengineer.com", href: "mailto:hire@persistentengineer.com" },
      { label: "LinkedIn", value: "linkedin.com/in/aleksandr-andreev", href: "https://linkedin.com/in/aleksandr-andreev/" },
      { label: "GitHub", value: "github.com/alealandreev", href: "https://github.com/alealandreev" },
      { label: "Habr", value: "habr.com/users/alealandreev/posts", href: "https://habr.com/users/alealandreev/posts/" },
    ],
    availabilityTitle: "Доступность",
    availability:
      "Сейчас нахожусь в Москве. Рассматриваю senior+ роли с remote-first форматом или relocation support в AU/NZ/EU/US.",
  },
} as const satisfies Record<Locale, unknown>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const text = copy[locale];
  return buildMetadata({
    locale,
    title: `${text.title} · Aleksandr Andreev`,
    description: text.description,
    path: "/about",
  });
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const text = copy[locale];

  return (
    <PageShell>
      <section className="surface p-7 sm:p-10">
        <p className="eyebrow">{text.title}</p>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight">
          Aleksandr Andreev
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-[--fg-muted]">
          {text.description}
        </p>
        <div className="mt-8 grid gap-5 lg:grid-cols-[minmax(0,1.4fr)_minmax(260px,0.8fr)]">
          <div className="space-y-4 text-base leading-8 text-[--fg]">
            {text.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <aside className="rounded-3xl border border-[--border] bg-[--surface-strong] p-5">
            <p className="eyebrow">{text.availabilityTitle}</p>
            <p className="mt-4 text-sm leading-7 text-[--fg-muted]">
              {text.availability}
            </p>
            <div className="mt-5">
              <a href="mailto:hire@persistentengineer.com" className="button-secondary">
                hire@persistentengineer.com
              </a>
            </div>
          </aside>
        </div>
      </section>

      <section className="mt-14 grid gap-8 lg:grid-cols-2">
        <div className="surface p-6">
          <SectionTitle>{text.principlesTitle}</SectionTitle>
          <ul className="mt-5 space-y-3">
            {text.principles.map((principle) => (
              <li key={principle} className="flex gap-3 text-sm leading-7 text-[--fg-muted]">
                <span className="mt-2 h-2 w-2 rounded-full bg-[--accent]" />
                <span>{principle}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="surface p-6">
          <SectionTitle>{text.stackTitle}</SectionTitle>
          <div className="mt-5 flex flex-wrap gap-2">
            {text.stack.map((item) => (
              <InfoPill key={item}>{item}</InfoPill>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-14">
        <SectionTitle>{text.contactTitle}</SectionTitle>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {text.contact.map((item) => (
            <a
              key={item.href}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="surface flex items-center justify-between p-5 transition-colors hover:border-[--accent]"
            >
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-[--fg-muted]">
                {item.label}
              </span>
              <span className="text-sm text-[--fg]">{item.value}</span>
            </a>
          ))}
        </div>
      </section>

      <div className="mt-14">
        <NewsletterForm locale={locale} compact />
      </div>
    </PageShell>
  );
}
