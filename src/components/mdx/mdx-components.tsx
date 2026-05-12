import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import Image from "next/image";

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
          className="rounded-md border"
          style={{ borderColor: "var(--border)", width: "100%" }}
          {...props}
        />
        {alt && (
          <figcaption
            style={{
              color: "var(--fg-muted)",
              fontFamily: "var(--font-mono)",
            }}
            className="mt-2 text-center text-xs"
          >
            {alt}
          </figcaption>
        )}
      </figure>
    ),

    // Callout / blockquote
    blockquote: ({ children }) => (
      <blockquote
        style={{
          borderLeft: "3px solid var(--accent)",
          paddingLeft: "1rem",
          color: "var(--fg-muted)",
          fontStyle: "italic",
          margin: "1.5rem 0",
        }}
      >
        {children}
      </blockquote>
    ),

    // Merge with custom components
    ...components,
  };
}
