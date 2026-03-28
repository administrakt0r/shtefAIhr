# ShtefAI blog HR

Public URL: https://shtefaihr.pages.dev/

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
- Production branch: `main`

Custom response headers are defined in `public/_headers`.

## GitHub Actions

The repository includes three workflows:

- `PR Checks` runs `pnpm lint`, `pnpm check-types`, and `pnpm build` for every pull request to `main`.
- `Auto Merge PR` squashes and merges pull requests to `main` after `PR Checks` succeeds.
- `Deploy to Cloudflare Pages` builds the site on every push to `main` and deploys the `out/` directory to Cloudflare Pages.

Required GitHub repository secrets:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

The deploy workflow targets the Cloudflare Pages project `shtefaihr`.

## Notes

- Phase 1 localizes the public shell, metadata, SEO surface, and deployment setup to Croatian.
- Existing MDX article bodies remain unchanged in this phase.
- Dynamic OG generation, dynamic icon metadata, and runtime RSS were removed in favor of static assets.
