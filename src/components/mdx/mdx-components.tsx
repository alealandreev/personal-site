import type { MDXComponents } from "mdx/types";
import Link from "next/link";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    // Override anchor to use Next.js Link for internal links
    a: ({ href, children, ...props }) => {
      if (href?.startsWith("/") || href?.startsWith("#")) {
        return (
          <Link href={href} {...props}>
            {children}
          </Link>
        );
      }
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
          {children}
        </a>
      );
    },

    // Responsive images
    img: ({ src, alt, ...props }) => (
      <figure className="my-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt || ""}
          className="w-full rounded-[28px] border border-[--border] shadow-[var(--shadow-card)]"
          {...props}
        />
        {alt && (
          <figcaption className="mt-2 text-center font-mono text-xs text-[--fg-muted]">
            {alt}
          </figcaption>
        )}
      </figure>
    ),

    // Callout / blockquote
    blockquote: ({ children }) => (
      <blockquote className="my-8 rounded-3xl border border-[--border] bg-[--surface-strong] px-5 py-4 text-[--fg-muted]">
        {children}
      </blockquote>
    ),

    // Merge with custom components
    ...components,
  };
}
