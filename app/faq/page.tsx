import { comparison, faqGroups } from "@/lib/faq";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Accordion } from "@/components/ui/Accordion";
import { PlannerButton } from "@/components/ui/PlannerButton";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata = pageMetadata({
  title: "Contractor FAQ for Southern Maryland | Adams Property Works",
  description:
    "Answers on licensing, estimates, Miss Utility, permits, drainage, sealcoating and commercial work in Southern Maryland. Call or text (301) 994-1010.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <section className="border-b border-border">
        <div className="container-x pb-12 pt-4 lg:pb-16 lg:pt-6">
          <Breadcrumbs items={[{ name: "FAQ", path: "/faq" }]} />
          <div className="mt-8 grid gap-6 lg:mt-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="tick">FAQ</p>
              <h1 className="mt-4 text-h1 text-primary">Your questions, answered straight.</h1>
            </div>
            <p className="text-lead text-ink/85 lg:col-span-5">
              Fourteen questions we hear before almost every job, for homeowners and for commercial clients.
            </p>
          </div>
        </div>
      </section>

      {faqGroups.map((g, i) => (
        <section key={g.title} className={`section ${i ? "border-t border-border bg-surface" : ""}`} aria-labelledby={`faq-${g.title}`}>
          <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-4">
              <p className="tick">
                {String(i + 1).padStart(2, "0")} / {g.items.length} questions
              </p>
              <h2 id={`faq-${g.title}`} className="mt-4 text-h2 text-primary">
                {g.title}
              </h2>
            </div>
            <div className="lg:col-span-8">
              <Accordion items={g.items} />
            </div>
          </div>
        </section>
      ))}

      <section className="section border-t border-border" aria-labelledby="compare-heading">
        <div className="container-x">
          <p className="tick">Side by side</p>
          <h2 id="compare-heading" className="mt-4 text-h2 text-primary">
            Residential and commercial.
          </h2>
          <div className="slab mt-10 overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left">
              <caption className="sr-only">{comparison.caption}</caption>
              <thead>
                <tr className="border-b border-border">
                  {comparison.head.map((h, i) => (
                    <th key={i} scope="col" className="px-5 py-4 text-sm font-semibold uppercase tracking-[0.1em] text-muted">
                      {h || <span className="sr-only">Feature</span>}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.rows.map((r) => (
                  <tr key={r[0]} className="border-b border-border last:border-0">
                    <th scope="row" className="px-5 py-4 font-semibold text-ink">
                      {r[0]}
                    </th>
                    <td className="px-5 py-4 text-ink/85">{r[1]}</td>
                    <td className="px-5 py-4 text-ink/85">{r[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-10">
            <PlannerButton>Ask us at your free site visit</PlannerButton>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
