import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Tag } from "@/components/ui/tag";
import { getMDXComponents } from "@/components/mdx/mdx-components";

// TODO: Replace with real source
// import { posts } from "@/lib/source";

// Stub until fumadocs source is wired
const POSTS_MAP: Record<
  string,
  { title: string; date: string; summary: string; tags: string[] }
> = {
  "hello-world": {
    title: "Hello, world — stack overview and what's coming",
    date: "2026-04-30",
    summary: "First post on the new site. Stack overview and what's coming.",
    tags: ["meta"],
  },
};

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = POSTS_MAP[slug];
  if (!post) return {};

  return {
    title: post.title,
    description: post.summary,
    openGraph: { title: post.title, description: post.summary, type: "article" },
  };
}

export async function generateStaticParams() {
  return Object.keys(POSTS_MAP).map((slug) => ({ slug }));
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = POSTS_MAP[slug];
  if (!post) notFound();

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      {/* Breadcrumb */}
      <nav
        style={{ color: "var(--fg-muted)", fontFamily: "var(--font-mono)" }}
        className="mb-8 text-xs"
      >
        <Link href="/writing" className="hover:text-[--accent] transition-colors">
          writing
        </Link>
        <span className="mx-2">/</span>
        <span>{slug}</span>
      </nav>

      {/* Header */}
      <header className="mb-10">
        <h1
          style={{ color: "var(--fg)" }}
          className="text-2xl font-semibold leading-tight"
        >
          {post.title}
        </h1>

        <div
          style={{ color: "var(--fg-muted)", fontFamily: "var(--font-mono)" }}
          className="mt-3 flex flex-wrap items-center gap-3 text-xs"
        >
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>·</span>
          <span>Aleksandr</span>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <Tag key={tag} tag={tag} />
          ))}
        </div>

        <p
          style={{
            color: "var(--fg-muted)",
            borderLeft: "2px solid var(--accent)",
            paddingLeft: "1rem",
          }}
          className="mt-5 text-sm leading-relaxed"
        >
          {post.summary}
        </p>
      </header>

      {/* Article body — MDX goes here once fumadocs source is wired */}
      <article
        className="prose prose-custom max-w-none"
        style={
          {
            "--tw-prose-body": "var(--fg)",
            "--tw-prose-headings": "var(--fg)",
            "--tw-prose-links": "var(--accent)",
            "--tw-prose-bold": "var(--fg)",
            "--tw-prose-counters": "var(--fg-muted)",
            "--tw-prose-bullets": "var(--fg-muted)",
            "--tw-prose-hr": "var(--border)",
            "--tw-prose-quote-borders": "var(--accent)",
          } as React.CSSProperties
        }
      >
        <p>
          This post is rendered via MDX. Wire up{" "}
          <code>fumadocs-mdx</code> source to replace this placeholder.
        </p>
      </article>

      {/* Footer nav */}
      <div
        style={{ borderTop: "1px solid var(--border)", color: "var(--fg-muted)", fontFamily: "var(--font-mono)" }}
        className="mt-16 flex justify-between pt-6 text-xs"
      >
        <Link href="/writing" className="hover:text-[--accent] transition-colors">
          ← All posts
        </Link>
        <a
          href={`https://github.com/alealandreev/personal-site/blob/main/content/posts/${slug}.mdx`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[--accent] transition-colors"
        >
          Edit on GitHub ↗
        </a>
      </div>
    </div>
  );
}
