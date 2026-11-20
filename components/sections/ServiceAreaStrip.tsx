import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { counties } from "@/lib/business";

// The three counties and his towns as chips.
export function ServiceAreaStrip() {
  return (
    <section className="section border-t border-border bg-surface" aria-labelledby="area-heading">
      <div className="container-x">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="tick">09 / Where we work</p>
            <h2 id="area-heading" className="mt-4 text-h2 text-primary">
              St. Mary&apos;s, Calvert and Charles Counties.
            </h2>
          </div>
          <p className="text-lead text-ink/85 lg:col-span-5">Based in Great Mills. We know the permit offices in Leonardtown, Prince Frederick and La Plata.</p>
        </div>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {counties.map((c) => (
            <div key={c.name}>
              <h3 className="flex items-center gap-3 text-h3 text-ink">
                <span className="h-[2px] w-5 bg-accent" aria-hidden="true" />
                {c.name}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {c.towns.map((t) => (
                  <li key={t} className="chip">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <Link href="/service-area" className="link mt-10 inline-flex min-h-11 items-center gap-2">
          See our full service area
          <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
