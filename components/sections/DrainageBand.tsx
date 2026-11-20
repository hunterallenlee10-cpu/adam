import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { lines } from "@/lib/business";
import { Photo } from "@/components/ui/Photo";

// Full width, photo 12 (capped at its native width), deep gradient under the text.
export function DrainageBand() {
  return (
    <section aria-labelledby="drainage-heading" className="bg-deep">
      <div className="relative mx-auto max-w-[1522px] overflow-hidden">
        <Photo
          id="p12"
          sizes="(min-width: 1522px) 1522px, 100vw"
          className="absolute inset-0 rounded-none lg:relative lg:aspect-[1522/661]"
          pos="38% 50%"
        />
        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "linear-gradient(to top, rgb(11 31 18 / 0.95) 0%, rgb(11 31 18 / 0.82) 38%, rgb(11 31 18 / 0.25) 72%, rgb(11 31 18 / 0) 100%)",
          }}
        />
        <div className="on-deep relative flex min-h-[560px] items-end lg:absolute lg:inset-0 lg:min-h-0">
          <div className="container-x pb-12 pt-40 lg:pb-16">
            <p className="tick">03 / Drainage</p>
            <h2 id="drainage-heading" className="mt-4 max-w-[18ch] text-h1 text-deep-text">
              {lines.grade}
            </h2>
            <p className="mt-5 max-w-[46ch] text-lead text-deep-text/90">
              French drains, swales, culverts and storm water work, by a crew that knows the Southern Maryland clay.
            </p>
            <Link href="/excavation#drainage" className="link mt-6 inline-flex min-h-11 items-center gap-2 text-lg">
              See drainage and storm water work
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
