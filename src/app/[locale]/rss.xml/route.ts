import { getWriting } from "@/lib/content";
import { isLocale } from "@/lib/i18n";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://persistentengineer.com";
const AUTHOR = "Aleksandr Andreev";
const AUTHOR_EMAIL = "hire@persistentengineer.com";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function GET(_: Request, { params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    return new Response("Not found", { status: 404 });
  }

  const description =
    locale === "ru"
      ? "Статьи о data engineering, distributed systems и engineering trade-offs."
      : "Writing on data engineering, distributed systems, and software architecture.";
  const language = locale === "ru" ? "ru-ru" : "en-us";

  const items = getWriting(locale)
    .map(
      (entry) => `
    <item>
      <title><![CDATA[${entry.title}]]></title>
      <link>${SITE_URL}/${locale}/writing/${entry.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/${locale}/writing/${entry.slug}</guid>
      <pubDate>${new Date(entry.date).toUTCString()}</pubDate>
      <description><![CDATA[${entry.summary}]]></description>
      <author>${AUTHOR_EMAIL} (${AUTHOR})</author>
    </item>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${AUTHOR}</title>
    <link>${SITE_URL}/${locale}</link>
    <description>${description}</description>
    <language>${language}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/${locale}/rss.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
