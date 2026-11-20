import { Check } from "lucide-react";
import { reviews } from "@/lib/business";
import { Photo } from "@/components/ui/Photo";

// Inside the first two phone screens: his truck, a real review, and the estimate promise.
export function ProofStrip() {
  const sherry = reviews[1];
  return (
    <section aria-label="Why people call us" className="border-b border-border bg-surface">
      <div className="container-x grid gap-6 py-8 sm:grid-cols-[auto_1fr] sm:items-center lg:grid-cols-[auto_1fr_auto] lg:gap-10 lg:py-10">
        <figure className="flex items-center gap-4">
          <Photo id="p02" sizes="160px" className="h-[84px] w-[120px] shrink-0 sm:h-[96px] sm:w-[136px]" pos="38% 58%" />
          <figcaption className="max-w-[12rem] text-sm leading-snug text-muted sm:hidden">
            Truck 06 hauling our Komatsu PC120.
          </figcaption>
        </figure>

        <figure className="border-l-2 border-accent pl-5">
          <blockquote className="font-display text-h3 font-extrabold text-primary wide-sm">
            &ldquo;{sherry.quote}&rdquo;
          </blockquote>
          <figcaption className="mt-2 text-sm text-muted">
            {sherry.name}, {sherry.source}, {sherry.date}
          </figcaption>
        </figure>

        <p className="flex items-center gap-3 font-semibold text-ink sm:col-span-2 lg:col-span-1">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary text-deep-text">
            <Check size={16} strokeWidth={3} aria-hidden="true" />
          </span>
          Free site visit. Written, itemised quote.
        </p>
      </div>
    </section>
  );
}
