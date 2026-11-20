import { Phone } from "lucide-react";
import { business } from "@/lib/business";
import { Photo } from "@/components/ui/Photo";
import { PlannerButton } from "@/components/ui/PlannerButton";
import { GradeLine } from "./GradeLine";

const facts = ["25+ years", "Owner-operated, licensed, bonded, insured", "Call or text 7 days a week"];

export function Hero() {
  return (
    <section data-hero className="relative overflow-hidden border-b border-border" aria-label="Introduction">
      <div className="lg:grid lg:min-h-[min(calc(100svh-112px),860px)] lg:grid-cols-12">
        {/* Photo: 4:5 on phones (capped so the headline and button stay on the first screen), right 7 columns on desktop. */}
        <figure className="relative h-[clamp(220px,38svh,469px)] sm:h-[min(80vw,52svh)] lg:order-2 lg:col-span-7 lg:h-auto">
          <Photo
            id="p01"
            preload
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="absolute inset-0 rounded-none"
            pos="38% 62%"
          />
          <figcaption className="absolute bottom-0 right-0 hidden max-w-xs rounded-tl-[6px] bg-bg/90 px-4 py-2.5 text-[0.8125rem] leading-snug text-ink lg:block">
            Our <span className="font-semibold">Komatsu PC120</span> taking down a single-storey house.
          </figcaption>
        </figure>

        <div className="relative z-10 flex flex-col justify-center px-5 pb-12 pt-5 sm:px-8 sm:pt-9 lg:order-1 lg:col-span-5 lg:py-12 lg:pl-[max(48px,calc((100vw-1320px)/2+48px))] lg:pr-10 xl:pr-14">
          <h1 className="order-1 text-pretty sm:order-none">
            <GradeLine
              eyebrow="Excavation, concrete, demolition and asphalt contractor · Southern Maryland"
              lines={["From the", "first dig", "to the", "final pour."]}
            />
          </h1>

          <p className="order-3 mt-6 max-w-[34rem] text-lead text-ink/90 sm:order-none sm:mt-7">
            One owner-operated crew for site work, concrete, demolition and asphalt across St.&nbsp;Mary&apos;s, Calvert and
            Charles Counties. Based in Great Mills for 25+ years.
          </p>

          <div className="order-2 mt-6 flex flex-col gap-3 sm:order-none sm:mt-8 xs:flex-row xs:flex-wrap xs:items-center">
            <PlannerButton />
            <a href={business.tel} className="btn btn-outline">
              <Phone size={18} aria-hidden="true" />
              Call {business.phone}
            </a>
            <a href={business.sms} className="link inline-flex min-h-11 items-center self-start px-1 xs:self-center">
              or text us
            </a>
          </div>

          <ul className="order-4 mt-8 grid gap-2.5 border-t border-border pt-5 text-[0.75rem] font-semibold uppercase leading-snug tracking-[0.12em] text-muted sm:order-none sm:mt-9 md:flex md:flex-wrap md:gap-x-6 lg:grid lg:gap-x-0">
            {facts.map((f) => (
              <li key={f} className="flex items-center gap-2.5">
                <span className="h-[2px] w-3 shrink-0 bg-accent" aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
