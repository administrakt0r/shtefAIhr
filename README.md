# ShtefAI blog HR

Public URL: https://aibloghr.pages.dev/

Static Next.js 16 + MDX AI news blog prepared for Cloudflare Pages Static HTML Export.

## Stack

- Next.js 16 App Router
- Tailwind CSS v4
- MDX content posts
- Static export output in `out/`
- Cloudflare Pages deployment target

## Build

```bash
pnpm install
pnpm build
```

The build:

- generates a static `public/rss.xml`
- exports the site to `out/`
- keeps the app compatible with Cloudflare Pages static hosting

## Cloudflare Pages

Recommended Pages settings:

- Framework preset: `Next.js (Static HTML Export)`
- Build command: `pnpm build`
- Build output directory: `out`

Custom response headers are defined in `public/_headers`.

## Notes

- Phase 1 localizes the public shell, metadata, SEO surface, and deployment setup to Croatian.
- Existing MDX article bodies remain unchanged in this phase.
- Dynamic OG generation, dynamic icon metadata, and runtime RSS were removed in favor of static assets.
