import { Phone } from "lucide-react";
import { business } from "@/lib/business";
import type { Trade } from "@/lib/planner";
import { Photo } from "@/components/ui/Photo";
import { PlannerButton } from "@/components/ui/PlannerButton";

type Props = { title?: string; trade?: Trade; tick?: string };

// Final call to action on a deep band, photo 03 at low opacity.
export function CtaBand({ title = "Tell us what needs moving, pouring or tearing down.", trade, tick = "Free estimate" }: Props) {
  return (
    <section className="broom on-deep relative overflow-hidden" aria-labelledby="cta-heading">
      <Photo id="p03" sizes="100vw" className="absolute inset-0 rounded-none opacity-[0.16]" decorative />
      <div className="container-x section relative">
        <p className="tick">{tick}</p>
        <h2 id="cta-heading" className="mt-4 max-w-[20ch] text-h1 text-deep-text">
          {title}
        </h2>
        <p className="mt-5 max-w-[44ch] text-lead text-deep-muted">
          Free site visit. Written, itemised quote. {business.callOrText}.
        </p>
        <div className="mt-9 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
          <PlannerButton trade={trade} />
          <a href={business.tel} className="btn btn-outline">
            <Phone size={18} aria-hidden="true" />
            Call {business.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
