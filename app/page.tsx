import { pageMetadata } from "@/lib/seo";
import { business, counties } from "@/lib/business";
import { photos } from "@/lib/photos";
import { absoluteUrl, SITE_URL } from "@/lib/site";
import { JsonLd } from "@/components/ui/JsonLd";
import { Hero } from "@/components/sections/Hero";
import { ProofStrip } from "@/components/sections/ProofStrip";
import { Bento } from "@/components/sections/Bento";
import { DirtToDoneSection } from "@/components/sections/DirtToDoneSection";
import { DrainageBand } from "@/components/sections/DrainageBand";
import { TruckProof } from "@/components/sections/TruckProof";
import { Process } from "@/components/sections/Process";
import { WhoWeWorkFor } from "@/components/sections/WhoWeWorkFor";
import { Reviews } from "@/components/sections/Reviews";
import { HomeFaq } from "@/components/sections/HomeFaq";
import { ServiceAreaStrip } from "@/components/sections/ServiceAreaStrip";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata = pageMetadata({
  title: "Excavation Contractor in Southern MD | Adams Property Works",
  description:
    "Excavation, concrete, demolition and asphalt across St. Mary's, Calvert and Charles Counties. Owner-operated 25+ years. Call or text (301) 994-1010.",
  path: "/",
});

// GeneralContractor: no street address (locality, region and postal code only), no ratings or reviews.
const contractorLd = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  "@id": `${SITE_URL}/#business`,
  name: business.name,
  alternateName: business.dba,
  url: absoluteUrl("/"),
  telephone: business.phoneE164,
  email: business.email,
  logo: `${SITE_URL}${photos.logo.src}`,
  image: [`${SITE_URL}/og-image.png`, `${SITE_URL}${photos.p02.src}`, `${SITE_URL}${photos.p01.src}`],
  description:
    "Owner-operated excavation, concrete, demolition and asphalt contractor serving St. Mary's, Calvert and Charles Counties in Southern Maryland.",
  address: {
    "@type": "PostalAddress",
    addressLocality: business.locality,
    addressRegion: business.region,
    postalCode: business.postalCode,
    addressCountry: "US",
  },
  areaServed: counties.map((c) => ({ "@type": "AdministrativeArea", name: `${c.name}, Maryland` })),
  // DRAFT: confirm hours for all seven days.
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: business.openingHoursSpec.days,
      opens: business.openingHoursSpec.opens,
      closes: business.openingHoursSpec.closes,
    },
  ],
  sameAs: [business.facebook],
  knowsAbout: ["Excavation", "Site work", "Concrete", "Demolition", "Asphalt sealcoating", "Drainage", "Sediment control"],
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={contractorLd} />
      <Hero />
      <ProofStrip />
      <Bento />
      <DirtToDoneSection />
      <DrainageBand />
      <TruckProof />
      <Process />
      <WhoWeWorkFor />
      <Reviews />
      <HomeFaq />
      <ServiceAreaStrip />
      <CtaBand />
    </>
  );
}
