import { Clock, MapPin, MessageSquare, Phone } from "lucide-react";
import { business } from "@/lib/business";
import { photos, type PhotoId } from "@/lib/photos";
import { Photo } from "@/components/ui/Photo";

const fleet: { id: PhotoId; caption: string }[] = [
  { id: "p03", caption: "Dump truck and Kubota on a graded lot." },
  { id: "p04", caption: "Black tri-axle dump truck." },
  { id: "p05", caption: "CAT wheel loader." },
];

// Proof he is real: his own truck, his own machine.
export function TruckProof() {
  return (
    <section className="section" aria-labelledby="truck-heading">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
          <figure className="lg:col-span-7">
            <Photo id="p02" sizes="(min-width: 1024px) 56vw, 100vw" className="aspect-[4/3]" pos="45% 58%" />
            <figcaption className="mt-3 flex items-baseline gap-3 text-sm text-muted">
              <span className="h-[2px] w-6 shrink-0 translate-y-[-3px] bg-accent" aria-hidden="true" />
              {photos.p02.caption}
            </figcaption>
          </figure>

          <div className="lg:col-span-5">
            <p className="tick">04 / Proof</p>
            <h2 id="truck-heading" className="mt-4 text-h2 text-primary">
              The truck that shows up.
            </h2>
            <p className="mt-5 text-lead text-ink/90">
              <span className="font-semibold text-ink">Owner-operated.</span> The person who quotes your job is on your job.
            </p>
            <dl className="mt-8 grid gap-5 border-t border-border pt-6">
              <div className="flex gap-4">
                <dt className="mt-0.5 text-primary">
                  <MapPin size={20} aria-hidden="true" />
                  <span className="sr-only">Based in</span>
                </dt>
                <dd>
                  <span className="font-semibold">Great Mills, MD 20634.</span>
                  <br />
                  <span className="text-muted">St. Mary&apos;s, Calvert and Charles Counties.</span>
                </dd>
              </div>
              <div className="flex gap-4">
                <dt className="mt-0.5 text-primary">
                  <Clock size={20} aria-hidden="true" />
                  <span className="sr-only">Hours</span>
                </dt>
                {/* DRAFT: confirm hours for all seven days */}
                <dd>
                  <span className="font-semibold">{business.hours}.</span>
                  <br />
                  <span className="text-muted">{business.callOrText}.</span>
                </dd>
              </div>
            </dl>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={business.tel} className="btn btn-green">
                <Phone size={18} aria-hidden="true" />
                Call {business.phone}
              </a>
              <a href={business.sms} className="btn btn-outline">
                <MessageSquare size={18} aria-hidden="true" />
                Text us
              </a>
            </div>
          </div>
        </div>

        <ul className="mt-12 grid grid-cols-3 gap-2 sm:gap-4 lg:mt-16 lg:gap-5" aria-label="Our fleet">
          {fleet.map((f) => (
            <li key={f.id} className="reveal">
              <figure>
                <Photo id={f.id} sizes="(min-width: 640px) 32vw, 34vw" className="aspect-square sm:aspect-[3/2]" />
                <figcaption className="caption mt-2 text-[0.75rem] sm:text-sm">{f.caption}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
