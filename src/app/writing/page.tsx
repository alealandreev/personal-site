import type { Metadata } from "next";
import Link from "next/link";
import { Tag } from "@/components/ui/tag";

export const metadata: Metadata = {
  title: "Writing",
  description: "Long-form technical essays on data engineering, distributed systems, and software architecture.",
};

// TODO: Replace with: import { posts } from "@/lib/source";
const ALL_POSTS = [
  {
    slug: "hello-world",
    title: "Hello, world — stack overview and what's coming",
    date: "2026-04-30",
    summary: "First post on the new site. Stack overview and what's coming.",
    tags: ["meta"],
    readingTime: "3 min read",
  },
];

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function WritingPage() {
  const published = ALL_POSTS.filter((p) => true);

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1
        style={{ color: "var(--fg)", fontFamily: "var(--font-mono)" }}
        className="text-sm font-semibold uppercase tracking-widest"
      >
        Writing
      </h1>
      <p style={{ color: "var(--fg-muted)" }} className="mt-2 text-sm">
        Long-form technical essays. Avg. read: 10–20 min.
      </p>

      <div
        style={{ borderTop: "1px solid var(--border)" }}
        className="mt-10 divide-y"
      >
        {published.map((post) => (
          <article key={post.slug} className="py-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <Link
                  href={`/writing/${post.slug}`}
                  style={{ color: "var(--fg)" }}
                  className="font-medium leading-snug transition-colors hover:text-[--accent]"
                >
                  {post.title}
                </Link>
                <p
                  style={{ color: "var(--fg-muted)" }}
                  className="mt-1.5 text-sm leading-relaxed"
                >
                  {post.summary}
                </p>
                <div className="mt-2.5 flex flex-wrap items-center gap-2">
                  {post.tags.map((tag) => (
                    <Tag key={tag} tag={tag} />
                  ))}
                  <span
                    style={{ color: "var(--fg-muted)", fontFamily: "var(--font-mono)" }}
                    className="text-xs"
                  >
                    {post.readingTime}
                  </span>
                </div>
              </div>
              <time
                dateTime={post.date}
                style={{ color: "var(--fg-muted)", fontFamily: "var(--font-mono)", flexShrink: 0 }}
                className="text-xs"
              >
                {formatDate(post.date)}
              </time>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
