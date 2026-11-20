import { FileCheck2 } from "lucide-react";
import { claims, equipment, lines } from "@/lib/business";
import { photos } from "@/lib/photos";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Photo } from "@/components/ui/Photo";
import { PlannerButton } from "@/components/ui/PlannerButton";
import { Process } from "@/components/sections/Process";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata = pageMetadata({
  title: "About Adams Property Works | Great Mills, MD Contractor",
  description:
    "Local, family-owned and owner-operated in Great Mills, MD for 25+ years. Excavation, concrete, demolition and asphalt. Call or text (301) 994-1010.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-border">
        <div className="container-x pt-4 lg:pt-6">
          <Breadcrumbs items={[{ name: "About", path: "/about" }]} />
        </div>
        <div className="container-x grid gap-10 pb-14 pt-6 lg:grid-cols-12 lg:items-center lg:gap-14 lg:pb-20 lg:pt-8">
          <div className="lg:col-span-5">
            <p className="tick">About us</p>
            <h1 className="mt-4 text-h1 text-primary">About Adams Property Works.</h1>
            <p className="mt-6 text-lead text-ink/90">
              Local, family-owned and owner-operated, based in Great Mills for 25+ years. The person who quotes your job is on your job.
            </p>
            <div className="mt-8">
              <PlannerButton />
            </div>
          </div>
          <figure className="lg:col-span-7">
            <Photo id="p02" preload sizes="(min-width: 1024px) 56vw, 100vw" className="aspect-[4/3]" pos="45% 58%" />
            <figcaption className="caption mt-3 flex items-baseline gap-3">
              <span className="h-[2px] w-6 shrink-0 translate-y-[-3px] bg-accent" aria-hidden="true" />
              {photos.p02.caption}
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="section" aria-labelledby="story-heading">
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <p className="tick">Our story</p>
            <h2 id="story-heading" className="mt-4 text-h2 text-primary">
              {lines.backyard}
            </h2>
          </div>
          <div className="grid gap-5 text-lead text-ink/90 lg:col-span-7">
            <p>
              Adams Property Works is a local, family-owned contractor serving Great Mills and the communities around it in St. Mary&apos;s,
              Calvert and Charles Counties. We do the foundation work of a property: excavation and site prep, concrete, demolition and asphalt.
            </p>
            <p>
              Our crew is seasoned machine operators who know Maryland&apos;s soil and weather. We arrive on time and in uniform, we work to
              the schedule we give you, and we leave the site clean. Homeowner or business, small patio or full parking lot, you get the same care.
            </p>
            <p className="font-display text-h3 font-extrabold text-primary wide-sm">{lines.getItDone}</p>
          </div>
        </div>
      </section>

      <Process tick="How we work" />

      <section className="section" aria-labelledby="equipment-heading">
        <div className="container-x">
          <p className="tick">Equipment</p>
          <h2 id="equipment-heading" className="mt-4 text-h2 text-primary">
            Our own iron.
          </h2>
          <p className="mt-4 measure text-lead text-ink/85">The machines you see on our jobs, run by our crew.</p>
          <ul className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            {equipment.map((e) => (
              <li key={e.name}>
                <figure>
                  <Photo id={e.photo} sizes="(min-width: 768px) 24vw, 50vw" className="aspect-[4/3]" />
                  <figcaption className="mt-2 font-semibold text-ink">{e.name}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-border bg-surface py-14 lg:py-20" aria-labelledby="licence-heading">
        <div className="container-x flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-5">
            <FileCheck2 size={36} strokeWidth={1.5} className="mt-1 shrink-0 text-primary" aria-hidden="true" />
            <div>
              <h2 id="licence-heading" className="text-h3 text-primary">
                {claims.licensed}
              </h2>
              <p className="mt-2 text-ink/85">{claims.proofOfInsurance} {claims.missUtility}</p>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
