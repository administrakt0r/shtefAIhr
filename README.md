# Umjetna Inteligencija Blog by ShtefAI

Public URL: https://umjetnainteligencijablog.pages.dev/

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

Supported deployment options:

- GitHub Actions direct deploy to the Cloudflare Pages project `umjetnainteligencijablog`
- Or a native Git-connected Cloudflare Pages project using the settings below

Recommended Pages dashboard settings:

- Framework preset: `Next.js (Static HTML Export)`
- Build command: `pnpm build`
- Build output directory: `out`
- Production branch: `main`
- Root directory: `/`
- Node version: `22`

Important:

- For a Git-connected Cloudflare Pages project, do not set a dashboard deploy command like `wrangler pages deploy ...`.
- Cloudflare should only run the build command and publish the `out/` directory.
- The `ERR_MODULE_NOT_FOUND` / `wrangler-dist/cli.js` error usually means Wrangler is being invoked in the Cloudflare dashboard build pipeline when it should not be.
- The repository includes a `.node-version` file set to `22`, and the app also falls back to `https://umjetnainteligencijablog.pages.dev` when `NEXT_PUBLIC_APP_URL` is not provided at build time.

Custom response headers are defined in `public/_headers`.

## GitHub Actions

The repository includes three workflows:

- `PR Checks` runs `pnpm lint`, `pnpm check-types`, and `pnpm build` for every pull request to `main`.
- `Auto Merge PR` squashes and merges pull requests to `main` after `PR Checks` succeeds, then dispatches a deployment.
- `Deploy to Cloudflare Pages` publishes the static export to the Cloudflare Pages project `umjetnainteligencijablog` on every push to `main` and can also be run manually.

Required GitHub repository secrets:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

## Notes

- Phase 1 localizes the public shell, metadata, SEO surface, and deployment setup to Croatian.
- Existing MDX article bodies remain unchanged in this phase.
- Dynamic OG generation, dynamic icon metadata, and runtime RSS were removed in favor of static assets.
