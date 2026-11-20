import { Clock, Mail, MapPin, MessageSquare, Phone } from "lucide-react";
import { business, counties } from "@/lib/business";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PlannerSteps } from "@/components/EstimatePlanner/PlannerSteps";

export const metadata = pageMetadata({
  title: "Free Estimate in Southern Maryland | Adams Property Works",
  description:
    "Free site visit and a written, itemised quote for excavation, concrete, demolition or asphalt in Southern Maryland. Call or text (301) 994-1010.",
  path: "/free-estimate",
});

const tiles = [
  { href: business.tel, icon: Phone, label: "Call", value: business.phone, note: business.callOrText },
  { href: business.sms, icon: MessageSquare, label: "Text", value: business.phone, note: "Send a photo of the job with it." },
  // DRAFT: confirm the email address.
  { href: `mailto:${business.email}`, icon: Mail, label: "Email", value: business.email, note: "For the details in writing." },
];

export default function FreeEstimatePage() {
  return (
    <>
      <section className="border-b border-border">
        <div className="container-x pb-12 pt-6 lg:pb-16 lg:pt-8">
          <Breadcrumbs items={[{ name: "Free Estimate", path: "/free-estimate" }]} />
          <div className="mt-8 grid gap-8 lg:mt-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="tick">Free site visit</p>
              <h1 className="mt-4 text-h1 text-primary">Get your free estimate.</h1>
            </div>
            <p className="text-lead text-ink/85 lg:col-span-5">
              Tell us about the job in four quick steps, or just call or text. We come out, look at the ground and give you a
              written, itemised quote.
            </p>
          </div>
          <ul className="mt-10 grid gap-3 md:grid-cols-3">
            {tiles.map((t) => (
              <li key={t.label}>
                <a href={t.href} className="slab flex min-h-[96px] items-center gap-4 p-5 transition-colors hover:border-primary">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary text-deep-text">
                    <t.icon size={22} aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold uppercase tracking-[0.12em] text-muted">{t.label}</span>
                    <span className="block break-all font-semibold text-ink">{t.value}</span>
                    <span className="block text-sm text-muted">{t.note}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-label="Estimate planner">
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="slab flex min-h-[560px] flex-col lg:col-span-7">
            <PlannerSteps titleId="inline-planner-title" />
          </div>

          <aside className="lg:col-span-5" aria-label="Service area and hours">
            <div className="slab p-7">
              <h2 className="text-h3 text-primary">Where and when we work</h2>
              <dl className="mt-6 grid gap-5">
                <div className="flex gap-4">
                  <dt className="mt-0.5 text-primary">
                    <MapPin size={20} aria-hidden="true" />
                    <span className="sr-only">Address</span>
                  </dt>
                  <dd>
                    <address className="not-italic">
                      {business.name}
                      <br />
                      {business.locality}, {business.region} {business.postalCode}
                      <br />
                      {business.phone}
                    </address>
                  </dd>
                </div>
                <div className="flex gap-4">
                  <dt className="mt-0.5 text-primary">
                    <Clock size={20} aria-hidden="true" />
                    <span className="sr-only">Hours</span>
                  </dt>
                  {/* DRAFT: confirm hours for all seven days */}
                  <dd>
                    {business.hours}.<br />
                    <span className="text-muted">{business.callOrText}.</span>
                  </dd>
                </div>
              </dl>
              <div className="mt-6 grid gap-4 border-t border-border pt-6">
                {counties.map((c) => (
                  <div key={c.name}>
                    <h3 className="font-semibold text-ink">{c.name}</h3>
                    <p className="text-sm text-muted">{c.towns.join(", ")}.</p>
                  </div>
                ))}
              </div>
              <p className="mt-6 border-t border-border pt-6 text-sm text-muted">
                Senior and retired military discounts. Financing available.
              </p>
            </div>
            <p className="mt-5 text-sm text-muted">Please do not send payment or account details through this form.</p>
          </aside>
        </div>
      </section>
    </>
  );
}
