import { getWriting } from "@/lib/content";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://persistentengineer.com";
const AUTHOR = "Aleksandr Andreev";
const AUTHOR_EMAIL = "hire@persistentengineer.com";

export async function GET() {
  const items = getWriting("en")
    .map(
      (p) => `
    <item>
      <title><![CDATA[${p.title}]]></title>
      <link>${SITE_URL}/en/writing/${p.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/en/writing/${p.slug}</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <description><![CDATA[${p.summary}]]></description>
      <author>${AUTHOR_EMAIL} (${AUTHOR})</author>
    </item>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${AUTHOR}</title>
    <link>${SITE_URL}/en</link>
    <description>Writing on data engineering, distributed systems, and software architecture.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
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
