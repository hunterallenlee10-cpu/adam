import type { Metadata } from "next";
import { business } from "./business";
import { IS_LIVE, SITE_URL, absoluteUrl } from "./site";

type PageMeta = {
  title: string;
  description: string;
  path: string;
};

export const robotsMeta: Metadata["robots"] = IS_LIVE
  ? { index: true, follow: true }
  : { index: false, follow: false, googleBot: { index: false, follow: false } };

export function pageMetadata({ title, description, path }: PageMeta): Metadata {
  const url = absoluteUrl(path);
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    robots: robotsMeta,
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      siteName: business.name,
      title,
      description,
      images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: "Adams Property Works truck 06 hauling the Komatsu PC120. From the first dig to the final pour." }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/og-image.png`],
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}
