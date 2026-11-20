# Implementation kickstart

Plan for the Adams Property Works concept site. Source of truth: `BUILD-SPEC.md`.

Installed: Next.js 16.4.6, React 19.3.0, TypeScript 5.9.3, Tailwind CSS 4.3.3, motion 14.14.0, lucide-react 1.77.0, @vercel/analytics 2.0.1, ESLint 9.39.5. Node 22.

## Build order

After each phase: run the site, screenshot at 1440px and 375px with Playwright, look at the screenshots, fix the three weakest things, run `npm run check`, tick the box, commit.

- [ ] Phase 1: scaffold, tokens, fonts, the palette board, discount bar, nav, the home hero with the grade line (phone first), footer
- [ ] Review 1: a fresh subagent scores the hero screenshots as an award juror (design 40, usability 30, creativity 20, content 10) and names the three weakest things. One round of fixes
- [ ] Phase 2: proof strip, bento, Dirt to Done
- [ ] Phase 3: drainage band, proof section, process, who we work for, reviews, FAQ, service area strip, final band
- [ ] Phase 4: Estimate Planner, every button wired with the right pre-selects, the honest last step, sticky phone bar, `/free-estimate`
- [ ] Phase 5: the service page template, then the four service pages with their tools and sourced thresholds
- [ ] Phase 6: `/our-work`, `/about`, `/service-area`, `/faq`
- [ ] Phase 7: SEO (launch switch, metadata, JSON-LD, robots, sitemap, llms.txt), the OG image, favicon, 404, `SEO-LAUNCH.md`, `CREDITS.md`
- [ ] Phase 8: Lighthouse on a production build, phone and desktop, home plus one page of each type. Live mode: SEO 100, others 90+. Demo mode: only the indexing check fails. Print demo-mode headers for the home page and one image
- [ ] Review 2: a second fresh subagent scores the whole site and runs a fact audit against section 1. One round of fixes
- [ ] Phase 9: final checklist, last commit, ready for GitHub and a Vercel import as `adams-property-works-concept`

## Design tokens ("Grade Line")

| Token | Hex | Use |
|---|---|---|
| `bg` | `#F4F2EC` | fresh concrete, about 60% |
| `surface` | `#FBFAF6` | cards |
| `border` | `#DAD6C9` | 1px card and rule lines |
| `ink` | `#131A14` | text |
| `muted` | `#55604F` | secondary text |
| `primary` | `#0F3D1E` | Adams green, headlines, links, secondary buttons |
| `primary-hover` | `#0A2E16` | |
| `deep` | `#0B1F12` | two dark bands only |
| `deep-text` | `#F4F2EC` | text on deep |
| `deep-muted` | `#B9C2B4` | muted text on deep |
| `accent` | `#FED104` | equipment yellow, about 10%. Never text on light |
| `accent-hover` | `#E8BE00` | |
| `success` | `#1F7A3D` | |
| `error` | `#B3261E` | |

Contrast: ink on bg 15.8, muted on bg 5.9, primary on bg 11.0, ink on accent 12.1, accent on deep 11.8, bg on deep 15.4, bg on primary 11.0.

Type: Archivo (variable, width 115 to 125, weight 800, hero headline italic) and Public Sans (400, 500, 600). Seven steps, each a `clamp()` in rem: label, body, lead, h3, h2, h1, display. Ceiling at most 2.5 times the floor. Body at least 1rem, line height 1.55, about 66ch. Display line height 1.0.

Material: 6px radius, 1px border, no shadows. Control joint between sections (1px ink at 10% over 1px white at 60%). Broom-finish texture on deep bands (repeating 3px gradient at 3%). Surveyor ticks for section numbers ("01 / Dig").

Spacing: 8px grid. Sections 112 to 128px desktop, 72px phones.

## Final review checklist

- [ ] The hero alone would sell the job. The grade line plays once and reads as a laser level. At 375px the headline and primary button are visible without scrolling.
- [ ] Dirt to Done works with mouse, touch and keyboard across all three jobs, and every caption matches the photo map.
- [ ] The sediment threshold is sourced in a code comment and carries the "general guide" line. The concrete calculator returns correct cubic yards.
- [ ] Every "Get My Free Estimate" button opens the planner with the right pre-selects. The last step names the real action. Phone and text links work.
- [ ] Every item in "Things only this business has" is on the site.
- [ ] Zero em dashes, zero generated images, zero invented facts. Internet photos appear only on the asphalt page, at most three, each credited and marked for swapping.
- [ ] No star ratings and no review counts. The Google rating slot is empty and labelled.
- [ ] Two fonts, the token palette only, motion in two places, no cursor effects or loading intro.
- [ ] All 10 pages resolve from the nav and footer. No page is thin. Screenshots at 1440 and 375 cover one page of each type.
- [ ] A keyboard-only pass and a 200% zoom pass both work. The sticky bar never hides the focused element.
- [ ] Demo mode serves `noindex, nofollow` in the tag and the header, with the concept line. Live mode serves `index, follow`, the sitemap, `llms.txt` and no concept line.
- [ ] Lighthouse SEO is 100 in live mode on phone and desktop. The other three are 90 or higher. In demo mode the only failing SEO check is indexing.
- [ ] One h1 per page with the service and the region. Titles and descriptions are unique. JSON-LD validates and claims nothing untrue.
- [ ] The Open Graph image and favicon are his.
