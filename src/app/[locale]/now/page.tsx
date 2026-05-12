import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell, SectionTitle } from "@/components/site/primitives";
import { isLocale, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";

type Props = {
  params: Promise<{ locale: string }>;
};

const copy = {
  en: {
    title: "Now",
    description: "What I am focused on right now.",
    sections: [
      {
        heading: "Work",
        items: [
          "Building AI-assisted code review and internal knowledge tooling.",
          "Improving data platform reliability around contracts, orchestration and observability.",
          "Spending more time on platform design than one-off pipeline fixes.",
        ],
      },
      {
        heading: "Learning",
        items: [
          "Distributed systems design trade-offs that show up in day-to-day platform work.",
          "Where lakehouse architecture helps, and where it becomes accidental complexity.",
          "How to make AI tooling genuinely useful to engineers instead of noisy.",
        ],
      },
      {
        heading: "Writing",
        items: [
          "Building a habit of publishing more compact notes and fewer hidden drafts.",
          "Turning project experience into clear case studies and essays.",
        ],
      },
    ],
  },
  ru: {
    title: "Сейчас",
    description: "Чем я сейчас в основном занят.",
    sections: [
      {
        heading: "Работа",
        items: [
          "Делаю AI-assisted code review и internal knowledge tooling.",
          "Укрепляю data platform вокруг contracts, orchestration и observability.",
          "Больше времени трачу на platform design, а не на точечные pipeline-фиксы.",
        ],
      },
      {
        heading: "Изучаю",
        items: [
          "Trade-off'ы distributed systems, которые реально проявляются в platform work.",
          "Где lakehouse-подход помогает, а где становится accidental complexity.",
          "Как делать AI tooling полезным для инженеров, а не просто шумным.",
        ],
      },
      {
        heading: "Пишу",
        items: [
          "Стараюсь публиковать больше коротких заметок и меньше держать черновики в столе.",
          "Перевожу проектный опыт в понятные case studies и статьи.",
        ],
      },
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
    path: "/now",
  });
}

export default async function NowPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const text = copy[locale];

  return (
    <PageShell>
      <SectionTitle subtitle={text.description}>{text.title}</SectionTitle>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {text.sections.map((section, index) => (
          <section key={section.heading} className="surface-card p-6">
            <p className="font-mono text-xs text-[--accent]">0{index + 1}</p>
            <h2 className="mt-3 text-xl font-semibold tracking-tight">
              {section.heading}
            </h2>
            <ul className="mt-4 space-y-3">
              {section.items.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-sm leading-7 text-[--fg-muted]"
                >
                  <span className="mt-2 h-2 w-2 rounded-full bg-[--accent]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </PageShell>
  );
}
