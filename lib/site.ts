// The launch switch. Everything about indexing is driven from here.
// demo (default): noindex in meta and header, no sitemap, no llms.txt, concept line shows.
// live: index, sitemap, llms.txt, concept line hidden. Live runs locally only until launch.

export type SiteMode = "demo" | "live";

export const SITE_MODE: SiteMode = process.env.NEXT_PUBLIC_SITE_MODE === "live" ? "live" : "demo";
export const IS_LIVE = SITE_MODE === "live";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

export function absoluteUrl(path = "/") {
  return `${SITE_URL}${path === "/" ? "" : path}` || SITE_URL;
}

// Real last-modified dates for the sitemap. Update when a page changes.
export const LAST_MODIFIED = "2026-11-20";

export const routes = [
  { path: "/", label: "Home" },
  { path: "/excavation", label: "Excavation" },
  { path: "/concrete", label: "Concrete" },
  { path: "/demolition", label: "Demolition" },
  { path: "/asphalt-sealcoating", label: "Asphalt" },
  { path: "/our-work", label: "Our Work" },
  { path: "/about", label: "About" },
  { path: "/service-area", label: "Service Area" },
  { path: "/faq", label: "FAQ" },
  { path: "/free-estimate", label: "Free Estimate" },
] as const;

export const navLinks = [
  { href: "/excavation", label: "Excavation" },
  { href: "/concrete", label: "Concrete" },
  { href: "/demolition", label: "Demolition" },
  { href: "/asphalt-sealcoating", label: "Asphalt" },
  { href: "/our-work", label: "Our Work" },
  { href: "/about", label: "About" },
] as const;
