// Every old adamspropertyworks.com address goes to its matching new page, never all to home.
// Permanent (308). Used by next.config.ts and listed in SEO-LAUNCH.md.

const to = (dest, sources) => sources.map((source) => ({ source, destination: dest, permanent: true }));

export const redirects = [
  ...to("/excavation", [
    "/excavation-services",
    "/site-work",
    "/land-grading",
    "/land-clearing-md",
    "/land-clearing-in-southern-md",
    "/brush-and-tree-clearing",
    "/storm-water-management",
    "/sediment-control",
    "/irrigation-solutions",
  ]),
  ...to("/concrete", [
    "/concrete-services",
    "/concrete-grinding",
    "/concrete-prep",
    "/concrete-coatings",
    "/concrete-pools-decks",
    "/concrete-patios",
    "/concrete-pads",
    "/concrete-finish-work-decorative-surface",
    "/retaining-walls-southern-md",
  ]),
  ...to("/demolition", ["/demolition-services", "/barn-and-building-demolition"]),
  ...to("/asphalt-sealcoating", ["/asphalt-repair"]),
  ...to("/about", ["/about-us", "/why-choose-us"]),
  ...to("/service-area", [
    "/areas-we-serve",
    "/southern-md-service-areas",
    "/leonardtown-excavation-concrete-asphalt-demolition",
    "/mechanicsville-excavation-demolition-and-concrete",
    "/st-marys-county-excavation-concrete-demolition-asphalt-sealcoating",
  ]),
  ...to("/free-estimate", ["/contact-us"]),
  // The blog and its five articles, each to its matching service page.
  ...to("/faq", ["/blog"]),
  ...to("/excavation", ["/prepare-for-excavation-project", "/common-excavation-hazards-southern-md-guide"]),
  ...to("/demolition", ["/home-demolition-services-southern-md-guide"]),
  ...to("/concrete#coatings", ["/why-the-concrete-prep-is-more-important-than-the-paint"]),
  ...to("/concrete#slabs", ["/the-5-signs-your-retaining-wall-is-failing-and-how-to-fix-it"]),
];
