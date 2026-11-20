import { Landmark } from "lucide-react";
import { business, counties } from "@/lib/business";
import { photos } from "@/lib/photos";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Photo } from "@/components/ui/Photo";
import { PlannerButton } from "@/components/ui/PlannerButton";
import { CountyMap } from "@/components/sections/CountyMap";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata = pageMetadata({
  title: "Service Area in Southern Maryland | Adams Property Works",
  description:
    "Serving St. Mary's, Calvert and Charles Counties from Great Mills: Leonardtown, Lexington Park, Lusby, Solomons, La Plata and more. Call (301) 994-1010.",
  path: "/service-area",
});

export default function ServiceAreaPage() {
  return (
    <>
      <section className="border-b border-border">
        <div className="container-x pt-4 lg:pt-6">
          <Breadcrumbs items={[{ name: "Service Area", path: "/service-area" }]} />
        </div>
        <div className="container-x grid gap-10 pb-14 pt-6 lg:grid-cols-12 lg:items-center lg:gap-14 lg:pb-20 lg:pt-8">
          <div className="lg:col-span-6">
            <p className="tick">Service area</p>
            <h1 className="mt-4 text-h1 text-primary">Serving St. Mary&apos;s, Calvert and Charles Counties.</h1>
            <p className="mt-6 text-lead text-ink/90">
              Based in Great Mills, working across Southern Maryland, from the Potomac to the Patuxent and the shore of the Chesapeake Bay.
            </p>
            <div className="mt-8">
              <PlannerButton />
            </div>
          </div>
          <figure className="lg:col-span-6">
            <Photo id="p32" preload sizes="(min-width: 1024px) 46vw, 100vw" className="aspect-[4/3] lg:aspect-[5/6]" />
            <figcaption className="caption mt-3">{photos.p32.caption}</figcaption>
          </figure>
        </div>
      </section>

      <section className="section" aria-labelledby="counties-heading">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <p className="tick">Counties and towns</p>
            <h2 id="counties-heading" className="mt-4 text-h2 text-primary">
              Where we work.
            </h2>
            <div className="mt-10 grid gap-10 sm:grid-cols-3 sm:gap-8">
              {counties.map((c) => (
                <div key={c.name}>
                  <h3 className="border-b-2 border-accent pb-2 text-h3 text-ink">{c.name}</h3>
                  <ul className="mt-4 grid gap-2">
                    {c.towns.map((t) => (
                      <li key={t} className="text-ink/90">
                        {t}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-sm text-muted">Permit office: {c.permitOffice}</p>
                </div>
              ))}
            </div>
            <p className="mt-10 text-ink/85">Not on the list? We take jobs in selected surrounding areas too. Call or text {business.phone} and ask.</p>
          </div>
          <div className="lg:col-span-5">
            <div className="slab p-5">
              <CountyMap />
              <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
                <li className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full border border-ink bg-accent" aria-hidden="true" />
                  Our base
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 bg-primary" aria-hidden="true" />
                  County permit office
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-surface py-14 lg:py-20" aria-labelledby="permits-heading">
        <div className="container-x flex items-start gap-5">
          <Landmark size={32} strokeWidth={1.5} className="mt-1 shrink-0 text-primary" aria-hidden="true" />
          <div className="measure">
            <h2 id="permits-heading" className="text-h3 text-primary">
              We know the permit offices.
            </h2>
            <p className="mt-3 text-ink/85">
              The homeowner is the legal applicant, but we provide the drawings, site plans and specifications the county offices in
              Leonardtown, Prince Frederick and La Plata ask for, so your permit goes through as smoothly as possible.
            </p>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
