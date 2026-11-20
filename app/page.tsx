import { pageMetadata } from "@/lib/seo";
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

export default function HomePage() {
  return (
    <>
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
