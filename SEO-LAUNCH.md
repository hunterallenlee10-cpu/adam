# SEO launch-day checklist

The concept preview runs in **demo mode**: every page carries `noindex, nofollow` in the robots meta tag and in an `X-Robots-Tag` header (images included), there is no sitemap and no `llms.txt`, and the footer shows the concept line. That keeps the preview out of Google so it never competes with the current site. Do not switch the preview deployment to live mode.

## 0. Before launch: confirm the open items

The live build refuses to run while any `DRAFT` marker, the empty Google rating slot or a `TODO: swap` photo marker remains (`scripts/guard-live.mjs`). Confirm each with the owner and update `lib/business.ts`:

- Owner's name and how he wants it shown
- 25 or 30 years
- Email address
- Hours for all seven days
- Whether 301-481-1992 is a real second number (it is left off)
- The 500+ projects figure
- Bonded and prevailing wage wording, engineered plans, HOA maintenance plans
- Discount and financing terms
- Elizabeth A.'s review year, Kalie S.'s review date, and his Google rating (fill the slot or remove it)
- New concrete cure-time guidance for the FAQ answer
- A real sealcoating photo for `/asphalt-sealcoating`

## 1. Switch to live

1. In the Vercel project for the real domain, set:
   - `NEXT_PUBLIC_SITE_MODE=live`
   - `NEXT_PUBLIC_SITE_URL=https://www.adamspropertyworks.com` (or the final domain, no trailing slash)
2. Redeploy.
3. Confirm, on the live domain:
   - View source on the home page: `<meta name="robots" content="index, follow">`
   - `curl -I https://www.adamspropertyworks.com/` shows **no** `X-Robots-Tag` header
   - `/sitemap.xml` lists all 10 pages; `/robots.txt` points to it; `/llms.txt` loads
   - The footer no longer shows "Concept preview by Lee Enterprises Unlimited."

## 2. Redirects (already built in)

Every old address goes to its matching new page with a permanent 308, never all to the home page. They are defined in `lib/redirects.mjs` and served by `next.config.ts`, so they work as soon as the domain points at this project. Spot-check a few after launch.

| Old address | New page |
|---|---|
| `/excavation-services`, `/site-work`, `/land-grading`, `/land-clearing-md`, `/land-clearing-in-southern-md`, `/brush-and-tree-clearing`, `/storm-water-management`, `/sediment-control`, `/irrigation-solutions` | `/excavation` |
| `/concrete-services`, `/concrete-grinding`, `/concrete-prep`, `/concrete-coatings`, `/concrete-pools-decks`, `/concrete-patios`, `/concrete-pads`, `/concrete-finish-work-decorative-surface`, `/retaining-walls-southern-md` | `/concrete` |
| `/demolition-services`, `/barn-and-building-demolition` | `/demolition` |
| `/asphalt-repair` | `/asphalt-sealcoating` |
| `/about-us`, `/why-choose-us` | `/about` |
| `/areas-we-serve`, `/southern-md-service-areas`, `/leonardtown-excavation-concrete-asphalt-demolition`, `/mechanicsville-excavation-demolition-and-concrete`, `/st-marys-county-excavation-concrete-demolition-asphalt-sealcoating` | `/service-area` |
| `/contact-us` | `/free-estimate` |
| `/blog` | `/faq` |
| `/prepare-for-excavation-project`, `/common-excavation-hazards-southern-md-guide` | `/excavation` |
| `/home-demolition-services-southern-md-guide` | `/demolition` |
| `/why-the-concrete-prep-is-more-important-than-the-paint` | `/concrete#coatings` |
| `/the-5-signs-your-retaining-wall-is-failing-and-how-to-fix-it` | `/concrete#slabs` |

`/faq`, `/free-estimate` and `/asphalt-sealcoating` keep their old addresses. If the owner wants the five blog articles kept as articles rather than redirected, migrate them as pages under `/blog/` and remove those redirects. The old site also has `/privacy` and `/terms-of-service`; recreate them before launch if he wants them, since this concept does not include legal pages.

## 3. Listings and search tools

1. Google Business Profile: set the website to the home page and make the name, area and phone match the site exactly: **Adams Property Works, Great Mills, MD 20634, (301) 994-1010**. Keep it a service-area business with no street address shown.
2. Bring the same name, area and phone into line on Apple Business Connect, Bing Places, Yelp and the BBB. Two directories currently list two different street addresses; remove or correct them.
3. Google Search Console: verify the domain, submit `/sitemap.xml`, and use URL inspection on the home page and each service page.
4. Bing Webmaster Tools: import from Search Console or verify, then submit the sitemap.
5. Check that the host's bot protection (Vercel firewall or attack challenge mode) is not blocking Googlebot or Bingbot.
6. Retire the preview address: delete the concept deployment or keep it password-protected.

## 4. An honest note for the owner

The site is technically complete for search: one clear page per service, fast pages, clean structured data and every old address redirected. From here, ranking depends mostly on things outside the site: a complete Google Business Profile, a steady flow of real Google reviews, consistent listings and links from local partners.
