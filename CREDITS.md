# Credits

## Photos

Every photo on this site is the owner's own, taken from his current website and Facebook page, and supplied by Hunter in the Google Drive folder "Adams Property Works - Website Demo Assets" (`photos/`). They live in `public/images/raw/`.

No stock, AI-generated or other third-party photos are used anywhere on the site.

## Internet photos (Asphalt and Sealcoating page)

The brief allowed up to three free-licence surface photos from Pexels or Unsplash for `/asphalt-sealcoating` only. Neither site could be reached from the build environment (Pexels returned 403 and the Unsplash search pages returned 401), so **none were used**. `public/images/stock/` does not exist.

In their place the page has:

- One labelled placeholder: "Photo: sealcoating job, from Adams Property Works", marked `// TODO: swap for a real Adams photo` in `components/service/ServiceBlock.tsx`.
- A drawn comparison panel of unsealed and sealed asphalt (CSS and an inline SVG, not a photo).
- A "sealing weather" panel built from his own guidance (50°F and rising, no rain in the forecast).

## Map data

The county outlines on `/service-area` are projected from US Census cartographic boundary files, via the public `plotly/datasets` `geojson-counties-fips.json` (FIPS 24037, 24009, 24017). Census data is in the public domain.

## Fonts and icons

- Archivo and Public Sans, by Omnibus-Type and the US Web Design System, from Google Fonts (SIL Open Font License), self-hosted through `next/font`.
- Icons from Lucide (ISC licence). The Facebook and Google marks are from Simple Icons (CC0).

## Facts and copy

All facts, claims, process steps, FAQ answers and quotes come from the brief (`BUILD-SPEC.md`, section 1) and the owner's own pages on adamspropertyworks.com, trimmed for length. The sediment control threshold is sourced from the Maryland Department of the Environment (see `lib/rules.ts`).
