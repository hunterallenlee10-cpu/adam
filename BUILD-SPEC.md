# Adams Property Works: Claude Code Build Prompt

Paste everything below the line into Claude Code, in an empty folder.

---

You are a senior web designer and front-end engineer. Your job is to build an award-level, front-end-only concept website for a real business, **Adams Property Works** (DBA DL Adams), an owner-operated excavation, concrete, demolition and asphalt contractor in Great Mills, Southern Maryland. This is a demo that Lee Enterprises Unlimited will show to the owner, who asked for it.

He already has a site (adamspropertyworks.com), and the content is real, but the execution undersells him. Every page header carries the image description "A close-up of a vibrant purple tulip". The Free Estimate page calls the company "Adams Sealcoating". The home page says 25+ years and the About page says 30+. Copy has typos such as "O wner-operated", "Concree" and "Installattion". Real job photos are mixed with Pexels and Vecteezy stock and AI-generated crews in spotless hi-vis, and the home hero photo is a 360px sidewalk. The menu holds 36 links across 42 pages, a discount ticker repeats the same line four times, and the only way to ask for a quote is a long form even though his own footer says "Call or text 7 days a week". Meanwhile his best material, a lettered truck hauling a Komatsu, a house coming down under his excavator, and a slab poured on the edge of the Chesapeake Bay, is buried.

The new site has to make him say "I need this" in the first five seconds. He will most likely open the link on his phone, so the first phone screen matters more than anything else. It must look like the best civil contractor brand in the Mid-Atlantic, built from his own trucks and his own dirt, not an AI template. If you could swap the logo and pass it off as a competitor's site, it is not finished.

**Finish the whole build in this session.** Ordinary obstacles (a port in use, a missing browser for screenshots, an image that will not convert, a Lighthouse run that fails) are yours to diagnose and work through. Do not end by listing what is left or offering to continue. The only planned stop is missing photos, as described in section 0.

**First actions, in this order:** save this whole prompt as `BUILD-SPEC.md`. Write a short `CLAUDE.md` (the stack, the commands, the rules that never bend from sections 0, 1 and 8, and the line "re-read the matching part of BUILD-SPEC.md at the start of each phase"). Run `git init`. Then write the plan file from section 9. Commit after every phase.

## 0. Get the assets first

All images live in Hunter's Google Drive folder **"Adams Property Works - Website Demo Assets"**:
https://drive.google.com/drive/folders/1LtSuDwTw5-FTSHcj2Z0qe7-FH1Jn2jQI

- `photos/` (folder ID `1tRmipbyfkNwAFbVIoSGvDb6Ncwl7K5nb`): 42 real photos and the logo, all taken from the owner's own website (many are his own Facebook uploads). These are the photos of his work allowed on the site.
- `reference-brand (look and feel only, not site images)/` (folder ID `1NvNEHrZsyUrL6jO-5rBPAnT5I-cmge-x`): three of his flyers plus two likely AI renders and two likely stock shots from his current site. Read the flyers for colour, wording and attitude. Never put any of these on the site.

If you have a Google Drive connector, download every file in `photos/` into `public/images/raw/`. If you do not, check whether `public/images/raw/` already holds them. If it is empty, stop and ask Hunter to drop the `photos/` folder into `public/images/raw/`, then continue. Look at every image yourself before you design, so you know what is in each one.

Keep the source files at full size and let `next/image` serve the right size per screen. Give every image a `sizes` value, a width and a height. Turn on AVIF and WebP. Preload the hero image with the framework's current setting. Lazy-load everything below the fold.

### Photo map (what each file is and where it goes)

Files `01` to `10` are 1920px wide and can run full width. Files `11` to `36` are about 1150 to 1540px wide, mostly portrait phone shots, so use them at half width or contained, never stretched across a desktop screen. Files `40` to `42` are small and belong in cards only. Never stretch a photo past its native size.

| File | Size | What it shows | Use it for |
|---|---|---|---|
| `00-logo-logo-dl-adams-property-works` | 1170x646 | Oval "DL ADAMS PROPERTY WORKS" logo, yellow on deep green, with "ASPHALT · CONCRETE · EXCAVATING" and 301-994-1010. The source was a phone screenshot | Footer and OG image only. In the nav, set the wordmark in type |
| `01-HERO-demolition-komatsu-pc120-tearing-down-house-BEST` | 1920x1440 | **Best photo.** Yellow Komatsu PC120 mid tear-down of a single-storey house, operator in the cab, dust rising, big blue sky | Home hero. Demolition page hero |
| `02-TRUCK-white-adams-lettered-dump-truck-hauling-komatsu` | 1920x1440 | **The trust photo.** White dump truck number 06 with the yellow ADAMS logo on the door, towing the Komatsu PC120 on a trailer down a gravel lane | "Proof he is real" section, About hero, OG image |
| `03-truck-white-dump-kubota-on-trailer-cleared-lot` | 1920x1440 | The same Adams truck with a red Kubota mini excavator on the trailer, crew member in hi-vis, freshly graded red dirt lot | Excavation page hero, fleet strip, final call-to-action band |
| `04-truck-black-tri-axle-dump-fall-leaves` | 1920x1440 | Black tri-axle dump truck with a polished aluminium body on fresh black asphalt, autumn trees | Fleet strip. Asphalt page hero (his only real asphalt photo). Crop any readable plate |
| `05-cat-wheel-loader-on-graded-site` | 1920x1440 | Yellow CAT wheel loader on a wide graded site | Fleet strip, Excavation page: site work |
| `06-pool-deck-dig-around-inground-pool` | 1920x1440 | Inground pool with brick coping, old deck removed and ground dug out around it | Concrete page: pool decks |
| `07-stormwater-precast-structure-kubota-orange-fence` | 1920x1440 | Kubota beside a precast stormwater structure with outfall pipe, orange safety fence | Excavation page: storm water management |
| `08-demolition-commercial-strip-building-excavator` | 1920x2560 | Portrait. Excavator taking down a long low commercial building. A side mirror sits bottom right, crop it out | Demolition page: commercial. Our Work |
| `09-concrete-pour-garage-apron-crew-chute` | 1920x2560 | Portrait. Crew placing concrete from a chute at a metal garage building | Concrete page: slabs. Crop toward the chute and the work |
| `10-duct-bank-trench-conduits-commercial` | 1920x2560 | Portrait. Deep trench with a duct bank of grey conduits on spacers | Excavation page: duct banks. Proof of commercial utility work |
| `11-culvert-pipe-install-roadside-excavator-crew` | 1538x2048 | Portrait. Large black corrugated culvert pipe along a road edge, crew guiding it, excavator digging | Excavation page: pipe culvert replacement |
| `12-crew-setting-precast-box-in-trench-wide` | 1522x661 | Wide. Two crew in hard hats setting a precast box in a red clay trench | Home drainage band. The "Southern Maryland clay" photo |
| `13-drainage-precast-box-crew-red-clay` | 1160x1545 | Portrait. Crew member at a precast drainage box in red clay | Excavation page: drainage |
| `14-bay-slab-1-graded-pad-on-the-water` | 1536x2048 | Waterfront slab job, stage 1. Graded dirt pad on a lawn, the bay behind | Dirt to Done, job A, stop 1 |
| `15-bay-slab-1b-skid-steer-cutting-grade` | 1536x2048 | Same job. Tracked skid steer cutting the pad to grade | Our Work, Excavation page: grading |
| `16-bay-slab-2-forms-and-wire-mesh` | 1536x2048 | Stage 2. Forms set, wire mesh down, open water behind | Dirt to Done, job A, stop 2 |
| `17-bay-slab-3-pour-and-screed-crew` | 1536x2048 | Stage 3. Crew screeding the wet slab, bay behind | Dirt to Done, job A, stop 3 |
| `18-bay-slab-4-finished-slab-bay-view-BEST` | 1536x2048 | **Stage 4.** Finished broom-finish slab with control joints, shoreline behind | Dirt to Done, job A, stop 4. Concrete page hero |
| `19-sidewalk-1-dug-and-formed` | 1536x2048 | Neighbourhood sidewalk job, stage 1. Old walk out, base dug, forms set | Dirt to Done, job B, stop 1 |
| `20-sidewalk-2-pour-from-truck-chute` | 1536x2048 | Stage 2. Concrete coming down the truck chute, two crew raking | Dirt to Done, job B, stop 2 |
| `21-sidewalk-3-crew-screeding-mixer-truck` | 1536x2048 | Stage 3. Crew screeding beside the mixer. Customer homes behind, keep the crop on the work | Dirt to Done, job B, stop 3 |
| `22-sidewalk-4-finished-walk-erosion-matting` | 1536x2048 | Stage 4. Finished walk with crisp joints, erosion matting both sides | Dirt to Done, job B, stop 4 |
| `23-curb-and-ramp-finished-crew-member` | 1536x2048 | New curb, gutter and sidewalk ramp | Concrete page: curbs and ADA ramps |
| `24-curb-gutter-new-with-straw-stabilisation` | 1536x2048 | New curb and walk with straw on the shoulder | Our Work |
| `25-inlet-headwall-riprap-straw` | 1536x2048 | Concrete inlet headwall with riprap apron and straw matting | Excavation page: sediment control |
| `26-headwall-riprap-outfall-new-concrete` | 1536x2048 | New headwall and outfall with riprap | Our Work |
| `27-walkway-1-kubota-digging-beside-brick-home` | 1170x1459 | Brick home walkway job, stage 1. Kubota digging out the old walk | Dirt to Done, job C, stop 1 |
| `28-walkway-2-forms-mesh-curved` | 1170x1442 | Stage 2. Curved forms and wire mesh along the porch | Dirt to Done, job C, stop 2 |
| `29-walkway-3-finished-coated-walk-and-step` | 1170x1454 | Stage 3. Finished walk with a speckled decorative coating and a brown step band | Dirt to Done, job C, stop 3 |
| `30-coated-landing-steps-brick-gate-BEST` | 1146x1515 | Finished coated landing and steps, brick pillars, black iron gate | Concrete page: coatings and decorative finishes. Home services bento |
| `31-coated-walk-iron-fence-pool-gate` | 1163x1518 | Coated walk running to an iron pool gate | Our Work |
| `32-shoreline-riprap-and-straw-on-the-water` | 1536x2048 | Waterfront shoreline stabilised with riprap stone and straw, pier and boats behind | Service Area hero. Excavation page: erosion |
| `33-hydraulic-breaker-breaking-concrete-by-building` | 1536x2048 | Hydraulic breaker on an excavator arm breaking old concrete beside a building | Demolition page: concrete removal. Backs his "no wrecking balls" line |
| `34-storefront-slab-1-rebar-mesh-prep` | 1536x2048 | Commercial storefront entrance prepped with mesh and forms | Concrete page: commercial, before |
| `35-storefront-slab-2-fresh-pour-finished` | 1536x2048 | The same storefront with the fresh slab finished | Concrete page: commercial, after |
| `36-fresh-concrete-steps-three-risers` | 1536x2048 | Three freshly poured steps | Concrete page: steps |
| `37-concrete-floor-grinding-operator-dustless` | 1920x1080 | Operator running a floor grinder with vacuum hoses, a frame from his own video, soft | Concrete page: grinding, half width at most |
| `38-headwall-on-straw-matting-adams-truck-behind` | 1824x778 | Wide. Headwall on fresh straw matting, the white Adams truck behind | Excavation page: wide band |
| `39-concrete-pump-truck-on-residential-job` | 1520x576 | Wide. Mixer and blue pump boom over a lawn | Concrete page support |
| `40-crew-excavator-precast-install-small` | 769x1024 | Small. Crew member in an orange Adams shirt with excavator, precast box and laser case | Cards only |
| `41-land-clearing-excavator-in-woods-small` | 1024x354 | Small strip. Yellow excavator clearing a wooded slope | Excavation page: land clearing card only |
| `42-crew-orange-shirt-excavator-trench-strip` | 1400x432 | Wide strip. Crew member in an orange shirt at a trench | Cards only |

**Photos from the internet, one narrow allowance.** Hunter approved pulling better photos from the internet where his own run out, and that is true in exactly one place: he has no real sealcoating or paving photos apart from `04`. For the Asphalt and Sealcoating page only, you may download up to three free-licence photos from Pexels or Unsplash into `public/images/stock/`: surface and close-up shots such as fresh sealcoat, a squeegee on asphalt or alligator cracking. No people, no trucks, no logos, no lettering, nothing that reads as a specific job. Record each one in `CREDITS.md` (URL, photographer, licence) and mark every use `// TODO: swap for a real Adams photo`. If you cannot reach those sites, use a labelled placeholder block instead ("Photo: sealcoating job, from Adams Property Works").

Everywhere else, use only the files above. **Never generate, fetch or use stock or AI images beyond that one allowance.** Stock and AI crews are what make his current site feel anonymous, and an owner spots a stranger's excavator on his own site instantly. Nothing from `public/images/stock/` may appear on the home page, in Our Work, in reviews or on the About page.

Land clearing, retaining walls, patios and barn demolition have no strong real photo. Use an icon-led card or the small files, not a borrowed image.

## 1. Business facts (use only these, invent nothing)

Put all of this in `lib/business.ts`.

- **Name:** Adams Property Works. Also trades as DL Adams. Write "Adams Property Works" in body copy and "DL Adams" where his own lines use it.
- **Owner:** David L. Adams. `// DRAFT: confirm the owner's name and how he wants it shown`. Until confirmed, say "the owner", never the name.
- **Location:** service-area business based in Great Mills, MD 20634. No street address on the page or in structured data (two directories list two different street addresses).
- **Service area:** St. Mary's County, Calvert County and Charles County. Towns, as he lists them: Leonardtown, Callaway, Point Lookout, Tall Timbers, Lexington Park, Loveville, Hollywood, California, Great Mills, Mechanicsville, Lusby, Solomons Island, St. Leonard, Broomes Island, Dowell, plus Prince Frederick and La Plata.
- **Name, area and phone, exactly, everywhere:** Adams Property Works, Great Mills, MD 20634, (301) 994-1010.
- **Phone (call or text):** (301) 994-1010. Use `tel:+13019941010` and `sms:+13019941010`. His line: "Call or text 7 days a week".
- **Email:** adamspropertyworks@gmail.com. `// DRAFT: confirm`.
- **Hours:** 8:00 am to 8:00 pm (Yelp shows Monday to Thursday). `// DRAFT: confirm all seven days`.
- **Links:** Facebook https://www.facebook.com/profile.php?id=61558432149129. Google review link https://g.page/r/CYIX5mF3Zc98EBM/review.
- **Main search phrase:** "excavation contractor Southern Maryland". Variations: "concrete contractor St. Mary's County", "demolition contractor Southern MD", "asphalt sealcoating Southern Maryland".
- **Experience:** "25+ years" (home page and Why Choose Us). The About page says 30+ and the concrete copy says "30 years of experience in concrete contracting". Use 25+ everywhere. `// DRAFT: confirm 25 or 30`.
- **His claims, usable as written:** owner-operated, family-owned, local. Licensed, bonded and insured. Free estimates with a site visit and a written, itemised quote. Financing available. Senior and retired military discounts available. 500+ projects completed (`// DRAFT: confirm`). Crew arrives on time and in uniform. Coordinates with Miss Utility (811) before digging. Reads engineered plans, handles bonded and prevailing wage work, and offers HOA maintenance plans (`// DRAFT: confirm these three before launch`).
- **Services:**
  - Excavation and site work: site prep, land clearing, brush and tree clearing, stump removal and grubbing, grading and levelling, footer and foundation digs, road installation and repair, trenching, storm clean up, utility site work, French drains, curtain drains and swales, storm water management, sediment control, pipe culvert replacement, duct banks.
  - Concrete: slabs, garage floors and pads, driveways, patios, pool decks, sidewalks, curbs, steps, stem walls and retaining walls, ADA ramps, drainage, footings and foundations, repairs, saw cutting, joint repair, grinding, coatings (epoxy, chip flake, quartz, cementitious overlays, non slip pool deck coatings), decorative finishes.
  - Demolition: full structure tear-downs (homes, mobile homes, barns, small commercial buildings), selective demolition, concrete and hardscape removal, debris sorting, hauling, site clean up and light grading.
  - Asphalt: sealcoating, crack filling, repair and maintenance for driveways and parking lots.
- **Equipment (visible in his photos):** Komatsu PC120 excavator, red Kubota mini excavator, CAT wheel loader, tracked skid steer, white lettered dump truck number 06 with trailer, black tri-axle dump truck, hydraulic breaker, concrete floor grinder.
- **How he works (the differentiator):** one owner-operated crew takes a property from raw dirt to finished surface. He digs it, drains it, pours it, paves it and tears down what is in the way, so the customer deals with one contractor instead of three.
- **His own lines you can reuse:** "From the first dig to the final pour." "From start to finish, we get the job done right!" "Safety & service first. Always." "We get it done." "PREP IS THE KEY!!" "Precision over force." "We do not use wrecking balls." "We treat every project like it's in our own backyard." "It's not a water problem. It's a grade problem." "No job is too small for professional care." "We know the Southern Maryland clay."
- **Process, in his words:** 1. Free site visit. 2. Written, itemised quote. 3. A firm start date. 4. Clean finish and a walk-through.
- **Reviews (real, show as plain text with source and date, no star graphics):**
  - "I recently had DL Adams grade my driveway, and I couldn't be happier with the results. They showed up on time, communicated clearly, and took the time to make sure everything was done right." Elizabeth A., Facebook, May 2026. `// DRAFT: confirm the year`
  - "Awesome crew, both professional and friendly, excellent quality service." Sherry H., Facebook, March 2025.
  - "Outstanding service!" Kalie S., Google. `// DRAFT: add the date`
  - His Google rating and review count were not captured. Do not show a rating or a count. Leave one empty, labelled slot: "Your Google rating goes here."
- **Conflicts to leave off:** a second number, 301-481-1992, appears only on his Facebook profile image. Leave it off and add it to the confirm list.
- **Do not claim:** "NOBODY HAS BETTER REVIEWS THAN US", "unrivaled", any star rating or review count, licence numbers, awards, prices, a warranty, irrigation or sprinkler work, and the "Michael T., Residential Contractor" testimonial on his current site (it cannot be traced to a real review).

## 2. The ONE goal

Every visitor action leads to **"Get My Free Estimate"**. That button opens the Estimate Planner (section 5). This is considered, high-ticket work, so the planner leads, and calling or texting (301) 994-1010 sits beside it everywhere because he answers both seven days a week. No other competing buttons, no newsletter, no email capture.

## 3. Design direction: "Grade Line"

Fresh concrete, DL Adams green and equipment yellow. The feel is a job site at 7 am: a clean slab, a levelled pad, a yellow machine against a blue sky. Light, calm and exact, like a surveyor's drawing, with his real photos doing the shouting. It is emphatically not a black site with neon accents, and not his busy flyers. Every local competitor is dark or stock blue, so a light, confident site stands apart beside them.

- **Colour tokens (CSS variables in the Tailwind `@theme` block, written in OKLCH with the hex beside each):**
  - `bg` `#F4F2EC` fresh concrete. About 60% of the site.
  - `surface` `#FBFAF6` cards. `border` `#DAD6C9`.
  - `ink` `#131A14` text, a green-tinted off-black. `muted` `#55604F`.
  - `primary` `#0F3D1E` Adams green, lifted from the logo's `#013702`. Hover `#0A2E16`. Headlines, links, secondary buttons. With the deep sections, about 30%.
  - `deep` `#0B1F12` for two dark bands (the show-stopper and the final call to action), with `#F4F2EC` text and `#B9C2B4` muted text.
  - `accent` `#FED104` equipment yellow, sampled from his logo. Hover `#E8BE00`. About 10%: the primary button, the grade line, the active stop in the show-stopper, key numbers on dark bands. Never yellow text on a light background.
  - `success` `#1F7A3D`, `error` `#B3261E`.
  - Contrast, already checked: ink on bg 15.8, muted on bg 5.9, primary on bg 11.0, ink on accent 12.1, accent on deep 11.8, bg on deep 15.4, bg on primary 11.0. Button text on yellow is always `ink`.
  - Photos are warm (red clay, straw, yellow iron), and the warm concrete background is tuned to them. Do not tint photos. The only overlay allowed is a bottom-up `deep` gradient under text that sits on a photo.
- **Phase 1 renders a palette board** (the swatches, a button, a card, a paragraph and photo `01`). Screenshot it, look at it, and fix anything muddy or harsh before building further.
- **Fonts (2, via `next/font`):**
  - Display: **Archivo** (variable). Headlines at width 115 to 125 and weight 800, echoing the wide, heavy lettering on his truck door. The hero headline alone is italic, like his logo.
  - Body: **Public Sans** (400, 500, 600).
  - Type scale, seven named steps, each a `clamp()` in rem: label, body, lead, h3, h2, h1, display. No ceiling more than 2.5 times its floor. Body never under 1rem, about 66 characters per line, line height 1.55. Display line height 1.0. The longest word in the hero headline must fit at 375px.
- **Material, "broom finish and control joints":** surfaces are slabs. Cards have a 6px radius, a 1px border and no drop shadow. Sections are separated by a control joint: a 2px tooled groove (1px of ink at 10% above 1px of white at 60%), the way a saw cut divides a slab. Dark bands carry a broom-finish texture, a repeating 3px linear gradient at 3% opacity. Small surveyor ticks mark section numbers ("01 / Dig") in the label style.
- **Spacing:** 8px grid. Section padding 112 to 128px on desktop, 72px on phones.
- **Icons:** `lucide-react`, one stroke width. Social icons are inline SVGs from Simple Icons. No emoji, no shield icons.
- **Motion in two places only:** the hero grade line and the Dirt to Done show-stopper, both on the home page, built with `motion` (imported from `motion/react`, loaded lazily). Everything else gets hover and press states, plus quiet scroll reveals in plain CSS inside reduced-motion and browser-support checks. No loading intro, no cursor effects, no scroll-jacking. Respect `prefers-reduced-motion` everywhere.
- **Layout variety:** the services section is a bento grid, the proof section is a split, the drainage band is full width, the process is a numbered rail. Never four identical cards in a row repeated down the page.

**What the best sites in this trade do (follow these):**
- They open on one huge real photo of their own iron, with the service and the region in the first line. A machine at work beats any illustration.
- Each main service gets its own page, because people search "demolition contractor" and "concrete contractor" separately, and those pages rank.
- Proof sits high: years, licence wording, the owner's truck, a real review, all within two phone screens.
- The newest ones are light or mid-tone with one strong equipment colour, oversized wide type, numbered sections and thin rule lines, closer to an engineering drawing than a billboard.
- Work is shown as sequences and before and after, not a wall of thumbnails.
- The quote path is short and tap-driven, with the phone number beside it at all times.
- Dated patterns to avoid: sliders, tickers, stock crews, mega menus with thirty links, near-identical town pages, wall-of-text service pages.
- Where even the good ones are weak, and where this demo wins: almost none let a customer see a job go from dirt to finished, almost none answer a real question on the page (how much concrete, do I need a sediment plan), and almost none offer text as a first-class way to ask for a quote.

**Things only this business has (all required):**
- His line "From the first dig to the final pour." as the hero headline.
- Truck number 06 with the ADAMS door logo, captioned, in the proof section.
- The Komatsu PC120 named in a caption.
- The waterfront slab job as a four-stage sequence, with the bay in every frame.
- "It's not a water problem. It's a grade problem." over the red clay trench photo.
- "We do not use wrecking balls." beside the hydraulic breaker photo.
- His real towns as chips, and the three county permit offices he names (Leonardtown, Prince Frederick, La Plata).
- "Call or text 7 days a week", and the senior and retired military discount.

## 4. Site map and page structure

**Shape: compact multi-page, 10 pages.** `/` (home), `/excavation`, `/concrete`, `/demolition`, `/asphalt-sealcoating`, `/our-work`, `/about`, `/service-area`, `/faq`, `/free-estimate`. His 42 current pages collapse into these. Do not build town pages or a blog. Build each page type once as a template driven by `lib/business.ts` and `lib/services.ts`.

**Discount bar (slim, static, dismissible):** "Senior and retired military discounts. Financing available." `// DRAFT: confirm terms`. Not a ticker.

**Nav (sticky, slim):** wordmark left, set in type: "ADAMS" in Archivo 800 with "PROPERTY WORKS" small beneath. Links: Excavation, Concrete, Demolition, Asphalt, Our Work, About. Right: "(301) 994-1010" as a tap-to-call link with a phone icon, plus the "Get My Free Estimate" button. Phones: a burger opens a full-screen sheet with large targets, and a sticky bottom bar shows [Call] [Text] [Free Estimate]. The sticky bar must never cover an element that has keyboard focus.

### Home page

**1. Hero (make this the best section on the site):**
- Desktop: a split. Left 5 columns of type on `bg`, right 7 columns holding photo `01` edge to edge, top to bottom. Phones: photo `01` cropped 4:5 on top, cropped to the excavator arm and the falling wall, then the type.
- **Signature motion, "the grade line":** on load a 2px yellow line sweeps left to right across the full width in about 1.1 seconds at the baseline of the headline. The headline starts tilted 1.2 degrees and settles dead level as the line passes, and a small bubble-level mark beside the eyebrow centres at the same moment. The line stays as a thin rule. Transform only, so nothing shifts. The headline and buttons are visible from the first instant and never fade in. It plays once. With reduced motion it is the final state.
- Eyebrow: "EXCAVATION, CONCRETE, DEMOLITION AND ASPHALT CONTRACTOR · SOUTHERN MARYLAND"
- Headline (Archivo, italic, huge): **"From the first dig"** then **"to the final pour."**
- The eyebrow and headline together are the page's single `<h1>`: the eyebrow as a small span, the headline as the large span.
- Sub: "One owner-operated crew for site work, concrete, demolition and asphalt across St. Mary's, Calvert and Charles Counties. Based in Great Mills for 25+ years."
- Buttons: "Get My Free Estimate" (yellow), "Call (301) 994-1010" (outline) and a text link "or text us".
- Under the buttons, three facts: "25+ YEARS" | "OWNER-OPERATED, LICENSED, BONDED, INSURED" | "CALL OR TEXT 7 DAYS A WEEK"
- At 375px the first screen shows, in order: the nav, the photo, the eyebrow, the headline, the primary button. The headline and primary button are both visible without scrolling.

**2. Proof strip (inside the first two phone screens):** a small crop of truck `02`, the Sherry H. review with "Facebook, March 2025", and the line "Free site visit. Written, itemised quote."

**3. "One crew. Four trades." (the differentiator, a bento grid):** four tiles of different sizes, each linking to its page with link text that names the page. Excavation and Site Work (large, photo `03`): "Clearing, grading, drainage, footers and utilities." Concrete (tall, photo `30`): "Slabs, driveways, patios, walks, walls and coatings." Demolition (photo `08` cropped): "Controlled tear-downs. We do not use wrecking balls." Asphalt and Sealcoating (photo `04`): "Sealcoating, crack filling and repair." Intro line above: "Most jobs need more than one trade. You only need one phone number."

**4. Dirt to Done (the show-stopper, on a `deep` band):** headline "Watch a job go from dirt to done."
- Three tabs, one per real job: **A. Waterfront slab on the Chesapeake Bay** (`14`, `16`, `17`, `18`), **B. Neighbourhood sidewalk** (`19`, `20`, `21`, `22`), **C. Walkway and steps with a decorative coating** (`27`, `28`, `29`).
- Desktop: a split, with the portrait photo on the left (at most 560px wide, 3:4) and a vertical stage rail on the right. Phones: photo on top, a horizontal rail beneath.
- The rail is a real slider with four stops (three for job C), labelled "01 Dig and grade", "02 Form and reinforce", "03 Pour and finish", "04 Done". Dragging, tapping a stop, the arrow keys and Previous and Next buttons all work. The slider reports its value as text ("Stage 2 of 4, form and reinforce").
- Changing stop crossfades the photo in about 300ms, and the yellow grade line from the hero slides to the active stop.
- One readout line per stop, in his voice: 01 "We excavate, cut the pad to grade and compact a stone base." 02 "Forms set to the laser. Rebar or wire mesh down." 03 "The pour, screeded and finished by hand." 04 "Control joints cut. Site cleaned. Ready to use."
- It advances once through the stops, about 900ms each, the first time it scrolls into view, then rests on Done. Reduced motion: no auto-advance and no crossfade.
- Captions use only what the photo map says. No addresses, no customer names, no dates.
- Button beneath: "Get an estimate for a job like this" opens the Estimate Planner with Concrete pre-selected.
- **Fallback:** if the crossfade or the slider fights you, build the same three tabs with four stacked, numbered photos each. Never ship a half-working slider.

**5. Drainage band (full width, photo `12`, `deep` gradient under the text):** headline "It's not a water problem. It's a grade problem." Line: "French drains, swales, culverts and storm water work, by a crew that knows the Southern Maryland clay." Link: "See drainage and storm water work" to `/excavation#drainage`.

**6. "The truck that shows up" (proof he is real, a split):** photo `02` large with the caption "Truck 06 hauling our Komatsu PC120." Text: "Owner-operated. The person who quotes your job is on your job." Then: Great Mills, MD 20634. St. Mary's, Calvert and Charles Counties. Hours. Call and text links. Beneath, a three-photo fleet strip (`03`, `04`, `05`) with plain captions.

**7. How it works (a numbered rail, his four steps):** "01 Free site visit", "02 Written, itemised quote", "03 A firm start date", "04 Clean finish and a walk-through", each with one line from his Why Choose Us page.

**8. Who we work for (three columns, no photos):** Homeowners. Builders and developers ("We read engineered plans and dig to them."). HOAs and property managers. `// DRAFT: confirm bonded and prevailing wage wording before adding it here`

**9. Reviews:** the three real reviews as plain text cards with name, source and month. One empty, labelled slot for his Google rating. A link "Read our Google reviews" to the review link. No stars.

**10. FAQ (accordion, 6 questions, answers from his own FAQ page):** Are you licensed and insured? Do you offer free estimates? How do you handle underground utilities before digging? Will you help with permits? What does it cost? (honest answer: every site is different, the site visit is free and the quote is written and itemised, financing is available) How long before I can drive on new asphalt or concrete? A link to the full `/faq`.

**11. Service area strip:** the three counties and the towns as chips, linking to `/service-area`.

**12. Final call-to-action band (`deep`, photo `03` at low opacity):** "Tell us what needs moving, pouring or tearing down." Buttons "Get My Free Estimate" and "Call (301) 994-1010".

**13. Footer:** logo `00`, "From start to finish, we get the job done right.", the phone (large), a text link, the email, "Adams Property Works, Great Mills, MD 20634", hours, the four service links, the towns as text, the Facebook icon. Small line: "© 2026 Adams Property Works. Doing business as DL Adams." On a separate small line: **"Concept preview by Lee Enterprises Unlimited."** (demo mode only, section 7)

### Service page template (`/excavation`, `/concrete`, `/demolition`, `/asphalt-sealcoating`)

One design, four pages, data in `lib/services.ts`. Each page: a split hero (page h1, one paragraph in his words, the primary button, the page's hero photo), then three to five service blocks that alternate photo side, each with a stable id, a real photo from the photo map and a short list from section 1. Then the page's own tool, three questions from his own page FAQ, links to the two most related services, and the call-to-action band. Breadcrumbs at the top. Each page carries at least three things no other page has.

- **`/excavation`**, hero `03`. Blocks: Site prep and land clearing (`05`, `41`), Grading and foundations (`15`), Drainage and storm water with id `drainage` (`13`, `07`, `11`), Sediment and erosion control (`25`, `38`, `32`), Trenching and duct banks (`10`). **Tool, "Do I need a sediment control plan?":** two number fields, square feet disturbed and cubic yards of earth moved. His site states that Maryland requires a plan above 5,000 square feet or 100 cubic yards. Before using those numbers, confirm them against the Maryland Department of the Environment and put the source URL in a code comment. Output: "You likely need a plan" or "You are likely under the threshold", plus "General guide, not legal advice. Your county office in Leonardtown, Prince Frederick or La Plata has the final say."
- **`/concrete`**, hero `18`. Blocks: Slabs, pads and driveways (`09`, `39`), Walks, curbs, steps and ADA ramps (`22`, `23`, `36`), Commercial entrances shown as a before and after pair (`34`, `35`), Pool decks (`06`), Grinding, coatings and decorative finishes (`30`, `29`, `37`). Pull-quote: "PREP IS THE KEY." **Tool, "How much concrete is that?":** length and width in feet, thickness of 4, 5 or 6 inches, output in cubic yards to one decimal (length x width x thickness in feet, divided by 27) with the line "Add about 10% for waste. We measure it properly at the free site visit." No prices.
- **`/demolition`**, hero `01`. Blocks: Full structure tear-downs (`01`), Commercial demolition (`08`), Concrete and hardscape removal (`33`), Sorting, hauling and a clean lot. Pull-quote: "Precision over force. We do not use wrecking balls." **Tool:** none. Instead a "Before we start" checklist from his FAQ: permits, utility disconnects verified, debris sorted and hauled, magnet sweep.
- **`/asphalt-sealcoating`**, hero `04`. Blocks: Why sealcoat, Our process (his five steps: cleaning, oil spot priming, crack filling, application, barricading), Residential and commercial (his comparison table as a real table), When to sealcoat. The approved internet photos go here and only here. **Tool, "Is it time to sealcoat?":** three questions answered from his own page: how old is the asphalt (under 12 months: wait, new asphalt is sealed 12 to 24 months after installation), when was it last sealed (over 2 to 3 years: it is time), and are there deep alligator cracks (yes: resurfacing or repair comes first). The result ends with "50°F and rising, with no rain in the forecast, is sealing weather."

### Other pages

- **`/our-work`:** real photos only. Filters: All, Excavation, Concrete, Demolition, Drainage and erosion, Fleet. A masonry grid, and a lightbox with keyboard and swipe. The three job sequences appear as grouped strips at the top. Captions come from the photo map only.
- **`/about`:** hero `02`. His story in his words (local, family-owned, owner-operated, "we treat every project like it's in our own backyard"), the four-step process, the equipment list with photos, the licence wording and "Ask us for proof of insurance at any time."
- **`/service-area`:** hero `32`. The three counties as columns with their towns, a simple outlined map of the three counties drawn as SVG (if a clean outline is not achievable, use the three columns alone), and the permit office note.
- **`/faq`:** all 14 questions from his FAQ page, grouped Residential and Commercial, plus his residential versus commercial comparison table.
- **`/free-estimate`:** a short hero, three contact tiles (Call, Text, Email), the Estimate Planner embedded inline, the service area and hours card, and the line "Please do not send payment or account details through this form."

## 5. The Estimate Planner (the conversion engine)

A modal (inline on `/free-estimate`) with four tap-first steps, a progress bar and step counter, Back and Next, and a "Rather talk? Call or text (301) 994-1010" row on every step. It never asks for anything twice.

1. **What do you need?** Excavation and site work, Concrete, Demolition, Asphalt and sealcoating, Not sure, come take a look. Pre-selected when opened from a service page, a bento tile or the show-stopper.
2. **A little more.** Chips for the chosen trade, multi-select, drawn from section 1 (for Concrete: Driveway, Patio, Slab or pad, Sidewalk or steps, Pool deck, Retaining wall, Repair or grinding, Coating). Then Residential, Commercial, or HOA and property management.
3. **Where and when.** Town (his towns, plus Other). Timing: As soon as possible, In the next month or two, Just planning.
4. **Your info.** Name, phone (required, validated, with a friendly error), optional notes, and an optional tick: "Ask about the senior or retired military discount".

**The last screen is honest.** Nothing reaches him until the visitor acts, so the final step shows a summary and one primary button that names the real action: **"Text my request to Adams Property Works"**, which opens `sms:` with a body built from the answers, with "Call (301) 994-1010" beside it. The success message appears only after that tap. On desktop, where a text link does nothing, show "Copy my request" and an email link instead. Close with Esc, trap focus, lock body scroll.

## 6. Tech and file rules

- Install the current stable releases, print the installed versions, and read the upgrade notes for those major versions before writing code, because your habits may be older than the tools. At the time of writing that means Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS 4.
- Known changes: route `params` and `searchParams` are Promises and must be awaited. The `middleware` file is now `proxy`. `next lint` is gone, so run ESLint directly. Tailwind 4 keeps design tokens in a CSS `@theme` block, not a JavaScript config.
- Server-rendered by default. Only the interactive pieces (hero motion, Dirt to Done, the planner, the three tools, the lightbox, the nav sheet) are client components. The planner loads when first needed.
- One component file per section in `components/sections/`, plus `components/EstimatePlanner/` and `components/DirtToDone/`. No file over 500 lines.
- Facts in `lib/business.ts`, services in `lib/services.ts`, gallery data in `lib/gallery.ts`, looked-up thresholds in `lib/rules.ts` with source URLs in comments.
- Responsive at 375, 768, 1024 and 1440px with no horizontal scroll.
- Accessibility to WCAG 2.2 AA: semantic landmarks, alt text written from the photo map, visible focus rings, base text 16px, tap targets 44px, zoom never blocked, sliders with roles and value text, every drag control also operable by buttons and keys.
- Speed budgets, measured on a production build with the phone profile: main image within 2.5 seconds, layout shift under 0.1, response to taps within 200 milliseconds.
- A "Back to top" button after 1.5 screens. A real 404 page that returns a 404 status.
- Link preview: Open Graph and Twitter large-image tags, and a generated 1200x630 `og-image.png` built from truck photo `02`, the wordmark and "From the first dig to the final pour." A favicon and Apple touch icon made from an "A" monogram in yellow on Adams green. Check that the preview looks right.
- No backend, no database, no API keys, no analytics beyond `@vercel/analytics`.
- `npm run check`: a script that tests one h1 per page, no broken internal links, no leftover blanks or placeholder text, no em dashes, alt text and dimensions on every image, every phone number and email on the pages matching `lib/business.ts`, and no DRAFT items in live mode. Run it at the end of every phase and print the result.

## 7. SEO: built to score 100 at launch

This is a demo, but its SEO is finished, not postponed. Target: **Lighthouse SEO 100 in live mode**, and 90 or higher on Performance, Accessibility and Best Practices, on the home page and one page of each type. Print the Lighthouse version you used.

**The launch switch.** A concept site must stay out of Google so it never competes with his real site, and Lighthouse fails any hidden page. So build one switch and drive everything from it:

- `NEXT_PUBLIC_SITE_MODE`: `demo` (the default) or `live`. `NEXT_PUBLIC_SITE_URL`: the base for every absolute link.
- **Demo mode:** robots meta `noindex, nofollow`, and an `X-Robots-Tag: noindex, nofollow` header on every response, including images, set in the framework's headers config. The robots file still allows search engines (so they can read the tag), lists no sitemap, and disallows AI crawlers by name. No sitemap, no `llms.txt`. The concept footer line shows.
- **Live mode:** robots meta `index, follow`, no header, a sitemap listing all 10 pages with real last-modified dates, `llms.txt` served, the concept line hidden. The build fails in live mode if any DRAFT item, empty review slot or `// TODO: swap` marker remains.
- The deployed demo stays in demo mode. Live mode runs locally only.
- Expect SEO of about 69 in demo mode, with "page is blocked from indexing" as the only failing check. That is correct, not a fault.

**Words in the right places**

| Page | Title | h1 contains |
|---|---|---|
| `/` | Excavation Contractor in Southern MD \| Adams Property Works | excavation, concrete, demolition and asphalt contractor, Southern Maryland |
| `/excavation` | Excavation and Site Work in Southern MD \| DL Adams | excavation and site work, Southern Maryland |
| `/concrete` | Concrete Contractor in Southern MD \| Adams Property Works | concrete contractor, Southern Maryland |
| `/demolition` | Demolition Contractor in Southern MD \| Adams Property Works | demolition contractor, Southern Maryland |
| `/asphalt-sealcoating` | Asphalt Sealcoating in Southern MD \| Adams Property Works | asphalt sealcoating, Southern Maryland |
| `/our-work` | Our Work in Southern Maryland \| Adams Property Works | recent work |
| `/about` | About Adams Property Works \| Great Mills, MD Contractor | about Adams Property Works |
| `/service-area` | Service Area in Southern Maryland \| Adams Property Works | St. Mary's, Calvert and Charles Counties |
| `/faq` | Contractor FAQ for Southern Maryland \| Adams Property Works | questions |
| `/free-estimate` | Free Estimate in Southern Maryland \| Adams Property Works | free estimate |

- Title: `Excavation Contractor in Southern MD | Adams Property Works` (home page, 59 characters).
- Home meta description: "Excavation, concrete, demolition and asphalt across St. Mary's, Calvert and Charles Counties. Owner-operated 25+ years. Call or text (301) 994-1010." Write a unique description of about 150 characters for every other page in the same pattern: what, where, one action.
- Exactly one server-rendered `<h1>` per page. The logo is never the h1. Headings step down in order.
- Name, area and phone as text in the footer and on `/free-estimate`, exactly as in section 1. The towns written out as text.
- Internal links between related service pages. A self-referencing canonical on every page. `<html lang="en">`. No hreflang.
- Every link says where it goes. No bare "learn more" or "read more". Icon-only links get an `aria-label`. Anything that opens the planner is a `<button>`.

**Structured data (JSON-LD, server-rendered, validated)**
- `GeneralContractor` on the home page: name, phone, URL, logo, image, opening hours, `areaServed` for the three counties, and an address holding only locality, region and postal code.
- `Service` on each service page. `BreadcrumbList` on every inner page.
- `FAQPage` markup is optional and earns nothing visible in Google now. If you add it, it must match the visible FAQ word for word.
- Never add `aggregateRating` or `review` markup. Google ignores reviews a business marks up about itself.
- Validate every block and say how you did it.

**`llms.txt`** (live mode only): Markdown with a top heading, the facts from section 1 and proper links.

**`SEO-LAUNCH.md`** in the repo root, a launch-day checklist: set the two environment variables and redeploy. Confirm the robots meta, header and sitemap. **Redirect every old address to its new page, never all to the home page:** `/excavation-services`, `/site-work`, `/land-grading`, `/land-clearing-md`, `/land-clearing-in-southern-md`, `/brush-and-tree-clearing`, `/storm-water-management`, `/sediment-control` and `/irrigation-solutions` to `/excavation`. `/concrete-services`, `/concrete-grinding`, `/concrete-prep`, `/concrete-coatings`, `/concrete-pools-decks`, `/concrete-patios`, `/concrete-pads`, `/concrete-finish-work-decorative-surface` and `/retaining-walls-southern-md` to `/concrete`. `/demolition-services` and `/barn-and-building-demolition` to `/demolition`. `/asphalt-repair` to `/asphalt-sealcoating`. `/about-us` and `/why-choose-us` to `/about`. `/areas-we-serve`, `/southern-md-service-areas` and the Leonardtown, Mechanicsville and St. Mary's County pages to `/service-area`. `/contact-us` to `/free-estimate`. Keep `/blog` and its five articles alive by migrating them or redirecting each to its matching service page. Then: link the home page from the Google Business Profile, bring the name, area and phone into line on Google, Apple Business, Bing Places, Yelp and the BBB, submit the sitemap in Search Console and Bing Webmaster Tools, check that the host's bot protection is not blocking search crawlers, and retire the preview address. Close with one honest line for the owner: the site is technically complete, and ranking from here depends mostly on his Google profile, reviews, links and listings.

## 8. Copy rules (strict)

- **No em dashes or double hyphens anywhere.** Use periods and commas.
- Short, plain, confident. Sound like a contractor who has moved Southern Maryland dirt for 25 years, not a marketing agency. Aim for about half the words you first think of. His current pages are long. Keep his facts and cut his padding.
- Reuse his own lines from section 1 wherever a headline is needed.
- No hype words ("unrivaled", "seamless", "elevate", "cutting-edge", "transform"). No stats, ratings, counts, prices, awards or brand claims beyond section 1.
- Anything you had to assume gets a `// DRAFT` comment or a visible label.

## 9. Build order (follow it, and tick the boxes)

Create `implementation_kickstart.md` with this plan, the design tokens and the section 10 checklist, and commit it. Then build one phase at a time. After each phase run the site, screenshot it at 1440px and 375px with Playwright (install its browser first, and if it cannot install, say so and check by reading the rendered HTML), look at the screenshots yourself, fix the three weakest things, run `npm run check`, tick the box and commit. Never regenerate the whole project to fix one section.

- [ ] Phase 1: scaffold, tokens, fonts, the palette board, discount bar, nav, **the home hero with the grade line** (phone first, polished until it is the best thing on the site), footer
- [ ] Review 1: a fresh subagent that has not seen the build scores the hero screenshots as an award juror would (design 40, usability 30, creativity 20, content 10) and names the three weakest things. One round of fixes, no more
- [ ] Phase 2: proof strip, bento, **Dirt to Done**
- [ ] Phase 3: drainage band, proof section, process, who we work for, reviews, FAQ, service area strip, final band
- [ ] Phase 4: Estimate Planner, every button wired with the right pre-selects, the honest last step, sticky phone bar, `/free-estimate`
- [ ] Phase 5: the service page template, then the four service pages with their tools and sourced thresholds
- [ ] Phase 6: `/our-work`, `/about`, `/service-area`, `/faq`
- [ ] Phase 7: everything in section 7, the OG image, favicon, 404, `SEO-LAUNCH.md`, `CREDITS.md`
- [ ] Phase 8: Lighthouse on a production build (`next build` then `next start`), phone and desktop, home page plus one page of each type. Live mode first, locally, with the site URL set to the local address: SEO must be 100 and the other three 90 or higher. Then demo mode: only the indexing check may fail. Print the response headers of the home page and of one image in demo mode. Fix and rerun until it holds. Report real numbers and never estimate a score
- [ ] Review 2: a second fresh subagent scores the whole site the same way and runs a fact audit, checking every number, name, claim and quote on the built pages against section 1. One round of fixes
- [ ] Phase 9: final checklist, last commit, ready for a GitHub push and a Vercel import as its own project named `adams-property-works-concept`

## 10. Final review checklist

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

## 11. When you finish

Print: the local URL, the installed versions, the Lighthouse version and the scores for all four categories in both modes (phone and desktop), the demo-mode header check, the last `npm run check` output, the structured-data validation result, and the title, description and h1 of each page. Attach desktop and phone screenshots of the hero, Dirt to Done, one service page and the Estimate Planner. Then list every `DRAFT`, `TODO` and empty slot the owner needs to confirm or supply: the owner's name, 25 or 30 years, the email, full hours, the second phone number, the 500+ projects figure, bonded and prevailing wage wording, discount and financing terms, his licence number, his Google rating and more reviews with dates, the original logo file, and real photos of sealcoating, land clearing, retaining walls and patios. List every internet photo used and where.
