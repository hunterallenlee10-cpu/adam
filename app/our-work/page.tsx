import { jobs } from "@/lib/jobs";
import { photos } from "@/lib/photos";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Photo } from "@/components/ui/Photo";
import { Gallery } from "@/components/gallery/Gallery";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata = pageMetadata({
  title: "Our Work in Southern Maryland | Adams Property Works",
  description:
    "Real photos of our excavation, concrete, demolition and drainage jobs across St. Mary's, Calvert and Charles Counties. Call or text (301) 994-1010.",
  path: "/our-work",
});

export default function OurWorkPage() {
  return (
    <>
      <section className="border-b border-border">
        <div className="container-x pb-12 pt-4 lg:pb-16 lg:pt-6">
          <Breadcrumbs items={[{ name: "Our Work", path: "/our-work" }]} />
          <div className="mt-8 grid gap-6 lg:mt-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="tick">Our work</p>
              <h1 className="mt-4 text-h1 text-primary">Recent work, start to finish.</h1>
            </div>
            <p className="text-lead text-ink/85 lg:col-span-5">
              Every photo here is from our own jobs across Southern Maryland. Start with three jobs shot stage by stage.
            </p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="sequences-heading">
        <div className="container-x">
          <p className="tick">Dirt to done</p>
          <h2 id="sequences-heading" className="mt-4 text-h2 text-primary">
            Three jobs, stage by stage.
          </h2>
          <div className="mt-10 grid gap-14">
            {jobs.map((j) => (
              <div key={j.id}>
                <h3 className="flex items-baseline gap-3 text-h3 text-ink">
                  <span className="font-display text-primary wide">{j.letter}.</span>
                  {j.title}
                </h3>
                <ol className="-mx-5 mt-5 flex snap-x gap-3 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-4 sm:overflow-visible sm:px-0">
                  {j.stages.map((s) => (
                    <li key={s.n} className="w-[68%] shrink-0 snap-start sm:w-auto">
                      <figure>
                        <div className="relative">
                          <Photo id={s.photo} sizes="(min-width: 640px) 24vw, 68vw" className="aspect-[3/4]" />
                          <span className="absolute left-2 top-2 rounded-[4px] bg-deep/85 px-2 py-0.5 font-display text-sm font-extrabold text-accent wide">
                            {s.n}
                          </span>
                        </div>
                        <figcaption className="mt-2 text-sm">
                          <span className="font-semibold text-ink">{s.label}.</span>{" "}
                          <span className="text-muted">{photos[s.photo].caption}</span>
                        </figcaption>
                      </figure>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section border-t border-border bg-surface" aria-labelledby="gallery-heading">
        <div className="container-x">
          <p className="tick">Gallery</p>
          <h2 id="gallery-heading" className="mt-4 text-h2 text-primary">
            More from the job sites.
          </h2>
          <div className="mt-8">
            <Gallery />
          </div>
        </div>
      </section>

      <CtaBand title="Want yours on this page next?" />
    </>
  );
}
