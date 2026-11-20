import { Phone } from "lucide-react";
import { business } from "@/lib/business";
import type { Service } from "@/lib/services";
import { Photo } from "@/components/ui/Photo";
import { PlannerButton } from "@/components/ui/PlannerButton";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export function ServiceHero({ s }: { s: Service }) {
  return (
    <section className="border-b border-border" aria-label="Introduction">
      <div className="container-x pt-4 lg:pt-6">
        <Breadcrumbs items={[{ name: s.crumb, path: `/${s.slug}` }]} />
      </div>
      <div className="container-x grid gap-8 pb-12 pt-6 lg:grid-cols-12 lg:items-center lg:gap-12 lg:pb-16 lg:pt-8">
        <div className="lg:col-span-6">
          <p className="tick">{s.tick}</p>
          <h1 className="mt-4 text-h1 text-primary">{s.h1}</h1>
          <p className="mt-6 max-w-[36rem] text-lead text-ink/90">{s.intro}</p>
          <div className="mt-8 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
            <PlannerButton trade={s.trade} />
            <a href={business.tel} className="btn btn-outline">
              <Phone size={18} aria-hidden="true" />
              Call {business.phone}
            </a>
          </div>
          <ul className="mt-8 grid gap-2.5 border-t border-border pt-5 text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-muted">
            {s.facts.map((f) => (
              <li key={f} className="flex items-center gap-2.5">
                <span className="h-[2px] w-3 shrink-0 bg-accent" aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>
        </div>
        <figure className="lg:col-span-6">
          <Photo
            id={s.heroPhoto}
            preload
            sizes="(min-width: 1024px) 46vw, 100vw"
            pos={s.heroPos}
            className="aspect-[4/3] sm:aspect-[16/11] lg:aspect-[5/6]"
          />
          <figcaption className="caption mt-3 flex items-baseline gap-3">
            <span className="h-[2px] w-6 shrink-0 translate-y-[-3px] bg-accent" aria-hidden="true" />
            {s.heroCaption}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
