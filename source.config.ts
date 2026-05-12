import { defineCollections, defineConfig } from "fumadocs-mdx/config";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";
import { z } from "zod";

export const posts = defineCollections({
  type: "doc",
  dir: "content/posts",
  schema: z.object({
    title: z.string().min(1).max(120),
    date: z.string(),
    updated: z.string().optional(),
    summary: z.string().min(10).max(280),
    tags: z.array(z.string()).max(8).default([]),
    status: z
      .enum(["draft", "in-progress", "published", "evergreen"])
      .default("published"),
    growth: z.enum(["seedling", "budding", "evergreen"]).optional(),
    confidence: z
      .enum(["speculative", "likely", "highly likely", "certain"])
      .optional(),
    cover_image: z.string().optional(),
    canonical_url: z.string().url().optional(),
    hidden: z.boolean().default(false),
  }),
});

export const tils = defineCollections({
  type: "doc",
  dir: "content/til",
  schema: z.object({
    title: z.string(),
    date: z.string(),
    tags: z.array(z.string()).default([]),
    summary: z.string().optional(),
  }),
});

export const projects = defineCollections({
  type: "doc",
  dir: "content/projects",
  schema: z.object({
    title: z.string(),
    date: z.string(),
    summary: z.string(),
    tags: z.array(z.string()).default([]),
    status: z.enum(["active", "archived", "wip"]).default("active"),
    featured: z.boolean().default(false),
    github: z.string().url().optional(),
  }),
});

export const papers = defineCollections({
  type: "doc",
  dir: "content/papers",
  schema: z.object({
    title: z.string(),
    date: z.string(),
    authors: z.array(z.string()).default([]),
    venue: z.string().optional(),
    year: z.number().optional(),
    summary: z.string(),
    tags: z.array(z.string()).default([]),
    paper_url: z.string().url().optional(),
  }),
});

export default defineConfig({
  mdxOptions: {
    rehypePlugins: (v) => [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
          properties: { className: ["anchor"] },
        },
      ],
      [
        rehypePrettyCode,
        {
          theme: { dark: "github-dark-dimmed", light: "github-light" },
          keepBackground: false,
        },
      ],
      ...v,
    ],
    remarkPlugins: (v) => [remarkGfm, ...v],
  },
});
