# Adams Property Works concept site

Front-end-only concept site for Adams Property Works (DL Adams), Great Mills, MD. Full brief: `BUILD-SPEC.md`. Plan and checklist: `implementation_kickstart.md`.

**Re-read the matching part of BUILD-SPEC.md at the start of each phase.**

@AGENTS.md

## Stack

Next.js 16 (App Router, Turbopack), React 19, TypeScript, Tailwind CSS 4 (tokens in the `@theme` block of `app/globals.css`), `motion` (from `motion/react`, hero grade line and Dirt to Done only), `lucide-react`, `@vercel/analytics`. No backend, no database, no API keys.

## Commands

- `npm run dev` local dev server
- `npm run build` then `npm run start` production build and server
- `npm run lint` ESLint (there is no `next lint` in Next 16)
- `npm run check` site checks (one h1 per page, links, placeholders, em dashes, image alt and size, phone and email match `lib/business.ts`, no DRAFT in live mode). Needs a running server, see `scripts/check.mjs`
- `NEXT_PUBLIC_SITE_MODE=live NEXT_PUBLIC_SITE_URL=http://localhost:3000 npm run build` live mode build (local only)

## Rules that never bend

Photos (section 0)
- Only the owner's photos in `public/images/raw/` appear on the site. Never generate, fetch or use stock or AI images, with one exception: up to three free-licence surface shots on `/asphalt-sealcoating` only, stored in `public/images/stock/`, credited in `CREDITS.md`, each use marked `// TODO: swap for a real Adams photo`.
- Nothing from `public/images/stock/` on the home page, Our Work, reviews or About.
- Never stretch a photo past its native width. Files 11 to 36 are half width or contained. Files 40 to 42 are cards only. Logo `00` is footer and OG image only.
- Every image has `sizes`, width and height, and alt text written from the photo map.

Facts (section 1)
- All facts live in `lib/business.ts`. Invent nothing.
- Name, area and phone exactly: Adams Property Works, Great Mills, MD 20634, (301) 994-1010. `tel:+13019941010`, `sms:+13019941010`.
- No street address. No owner name on the page until confirmed (say "the owner"). Use "25+ years" everywhere.
- Never show a star rating, review count, licence number, award, price or warranty. Never mention irrigation. Never use the second number 301-481-1992. Never use "NOBODY HAS BETTER REVIEWS THAN US", "unrivaled" or the "Michael T." testimonial.
- Anything assumed gets a `// DRAFT` comment or a visible label.

Copy (section 8)
- No em dashes and no double hyphens anywhere. Periods and commas.
- Short, plain, confident, in his voice. Reuse his own lines for headlines.
- No hype words: unrivaled, seamless, elevate, cutting-edge, transform.

Site
- One goal: "Get My Free Estimate" opens the Estimate Planner. Call or text (301) 994-1010 sits beside it everywhere. Anything that opens the planner is a `<button>`.
- Demo mode (`NEXT_PUBLIC_SITE_MODE=demo`, the default) is noindex in meta and `X-Robots-Tag` header. Live mode runs locally only.
- Motion in two places only: the hero grade line and Dirt to Done. Respect `prefers-reduced-motion`.
- No file over 500 lines. One component per section in `components/sections/`.
