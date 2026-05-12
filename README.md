# persistentengineer.com

Personal website of **Aleksandr Andreev** — Lead Data Engineer.

→ **[persistentengineer.com](https://persistentengineer.com)**

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 15 (App Router, RSC, TypeScript) |
| Styling | Tailwind CSS v4, Geist Sans/Mono |
| Content | MDX via fumadocs-mdx |
| Syntax | rehype-pretty-code + Shiki |
| Database | Neon Postgres + Drizzle ORM |
| Hosting | Vercel (Hobby) |
| CDN/DNS | Cloudflare |
| Newsletter | Buttondown |

## Local dev

```bash
cp .env.example .env.local   # fill in secrets
pnpm install
pnpm dev                      # → http://localhost:3000
```

## Adding a post

```bash
# Create file:
touch content/posts/your-slug.mdx
```

```mdx
---
title: "Post title"
date: "2026-05-15"
summary: "One sentence summary."
tags: ["data-engineering"]
---

Content here.
```

```bash
git add . && git commit -m "post: title" && git push
# Vercel auto-deploys in ~60s
```

## Replacing TODOs

```bash
# Find all remaining TODOs:
grep -r "TODO" src/ --include="*.tsx" -n
```

| TODO | Where | What to put |
|------|-------|-------------|
| `TODO_YOUR_LINKEDIN` | `src/app/page.tsx`, `about/page.tsx`, `cv/page.tsx` | Your LinkedIn URL slug |
| `TODO_UNIVERSITY` | `src/app/cv/page.tsx` | University name |
| `TODO_DEGREE` | `src/app/cv/page.tsx` | Degree type and field |
| `TODO_YEARS` | `src/app/cv/page.tsx` | Education years |

## License

Code: MIT · Content (`content/`): CC-BY-4.0
