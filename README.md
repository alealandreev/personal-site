# persistentengineer.com

Personal website of **Aleksandr Andreev** — Lead Data Engineer.

→ **[persistentengineer.com](https://persistentengineer.com)**

The site is now structured as a bilingual portfolio and writing platform with
localized routes under `/en/*` and `/ru/*`.

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 16 (App Router, RSC, TypeScript) |
| Styling | Tailwind CSS v4, Geist Sans/Mono |
| Content | MDX content registry + localized routes |
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

The middleware redirects `/` and any non-localized page routes to the default
English experience under `/en/*`.

## Adding a post

```bash
# Create file:
touch content/posts/your-slug.mdx
touch content/ru/posts/your-slug.mdx
```

```mdx
Content here.
```

```bash
git add . && git commit -m "post: title" && git push
# Vercel auto-deploys in ~60s
```

## Content structure

```bash
# List localized content files
rg --files content
```

- `content/posts/` and `content/til/` hold English content
- `content/ru/posts/`, `content/ru/til/`, `content/ru/projects/` hold Russian
  localized content
- shared metadata and route generation live in `src/lib/content.tsx`

## Key routes

- `/en` and `/ru` — localized homepages
- `/en/writing/*`, `/ru/writing/*`
- `/en/til/*`, `/ru/til/*`
- `/en/projects/*`, `/ru/projects/*`
- `/rss.xml` — default English RSS feed
- `/ru/rss.xml` — Russian RSS feed

## License

Code: MIT · Content (`content/`): CC-BY-4.0
