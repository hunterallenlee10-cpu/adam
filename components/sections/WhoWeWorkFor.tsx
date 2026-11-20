import { Building2, Home, Users } from "lucide-react";

// Three columns, no photos.
// DRAFT: confirm bonded and prevailing wage wording before adding it here.
// DRAFT: confirm "engineered plans" and "HOA maintenance plans" before launch.
const groups = [
  {
    icon: Home,
    title: "Homeowners",
    body: "Driveways, patios, walks, drainage fixes and tear-downs. A free site visit, a written quote and a firm start date.",
  },
  {
    icon: Building2,
    title: "Builders and developers",
    body: "We read engineered plans and dig to them. Clearing, pad-ready grading, footers, utilities and storm water to grade.",
  },
  {
    icon: Users,
    title: "HOAs and property managers",
    body: "Maintenance plans for sealcoating, patching and curb repair, run in phases so residents keep moving.",
  },
];

export function WhoWeWorkFor() {
  return (
    <section className="section" aria-labelledby="who-heading">
      <div className="container-x">
        <p className="tick">06 / Who we work for</p>
        <h2 id="who-heading" className="mt-4 max-w-[20ch] text-h2 text-primary">
          No job is too small for professional care.
        </h2>
        <ul className="mt-12 grid gap-px overflow-hidden rounded-[6px] border border-border bg-border md:grid-cols-3">
          {groups.map((g) => (
            <li key={g.title} className="bg-surface p-7 lg:p-9">
              <g.icon size={26} strokeWidth={1.75} className="text-primary" aria-hidden="true" />
              <h3 className="mt-5 text-h3 text-ink">{g.title}</h3>
              <p className="mt-3 text-ink/80">{g.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
