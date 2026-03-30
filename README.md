# Umjetna Inteligencija Blog by ShtefAI

Public URL: https://umjetnainteligencijablog.pages.dev/

Static Next.js 16 + MDX AI news blog prepared for Cloudflare Pages static export.

## Stack

- Next.js 16 App Router
- Tailwind CSS v4
- MDX content posts
- Static export output in `out/`
- Cloudflare Pages deployment target

## Local Build

```bash
pnpm install
pnpm build
```

The build:

- generates `public/images/posts/*.png`
- generates `public/images/og-image.png`
- generates `public/rss.xml`
- exports the site to `out/`

Generated images and RSS are **build artifacts**. They are intentionally ignored in git and must not be committed in content PRs.

## Content PR Validation

Bot-authored content PRs are limited to:

- `src/content/*.mdx`
- `src/assets/data/blog-posts.ts`
- `published-log.json` for news posts only

GitHub `PR Checks` runs:

- `pnpm validate:bot-pr`
- `pnpm lint`
- `pnpm check-types`
- `pnpm test`
- `pnpm build`

`Auto Merge PR` only merges bot PRs from `post/*` and `opinion/*` after `PR Checks` succeeds on the current PR head SHA.

## Cloudflare Pages

Canonical production deployment is a **Git-connected Cloudflare Pages project** for `administrakt0r/shtefAIhr`.

Recommended Pages settings:

- Framework preset: `Next.js (Static HTML Export)`
- Build command: `pnpm build`
- Build output directory: `out`
- Production branch: `main`
- Root directory: `/`
- Node version: `22`

Required Pages environment variables:

- Production: `NEXT_PUBLIC_APP_URL=https://umjetnainteligencijablog.pages.dev`
- Preview: set `NEXT_PUBLIC_APP_URL` for preview builds as well so RSS and metadata resolve correctly

Manual fallback remains available through the GitHub Actions workflow `Manual Cloudflare Pages Fallback Deploy`, which performs a direct Wrangler deploy only when triggered manually.

## GitHub Actions

The repository includes three workflows:

- `PR Checks`
- `Auto Merge PR`
- `Manual Cloudflare Pages Fallback Deploy`

Required GitHub repository secrets for the manual fallback deploy:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

Custom response headers are defined in `public/_headers`.
