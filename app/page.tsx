import { pageMetadata } from "@/lib/seo";
import { Hero } from "@/components/sections/Hero";

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
    </>
  );
}
