# Adams Property Works: concept site

A front-end-only concept website for Adams Property Works (DL Adams), an owner-operated excavation, concrete, demolition and asphalt contractor in Great Mills, Southern Maryland. Built by Lee Enterprises Unlimited as a demo for the owner.

- Brief: `BUILD-SPEC.md`. Plan, tokens, review log and Lighthouse results: `implementation_kickstart.md`.
- Launch checklist and redirects: `SEO-LAUNCH.md`. Photo and data credits: `CREDITS.md`.

## Stack

Next.js 16 (App Router, Turbopack), React 19, TypeScript, Tailwind CSS 4, `motion`, `lucide-react`, `@vercel/analytics`. All pages prerender as static HTML. No backend, no database, no API keys.

## Commands

```bash
npm install
npm run dev            # http://localhost:3000
npm run build && npm run start
npm run lint
npm run check          # site checks against a running server
npm run validate:jsonld
```

## Modes

`NEXT_PUBLIC_SITE_MODE` is `demo` by default: every page and image carries `noindex, nofollow`, there is no sitemap or `llms.txt`, and the footer shows the concept line. `live` turns indexing on and refuses to build while any `DRAFT` item remains (see `SEO-LAUNCH.md`). The preview deployment stays in demo mode.

## Deploy

Import the GitHub repository into Vercel as its own project named `adams-property-works-concept`, framework preset Next.js, no environment variables needed for the demo. Optionally set `NEXT_PUBLIC_SITE_URL` to the preview address so canonical and Open Graph URLs are absolute to it.
