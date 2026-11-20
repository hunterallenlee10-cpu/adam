import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { business, counties } from "@/lib/business";
import { serviceFaq } from "@/lib/faq";
import { photos } from "@/lib/photos";
import { services, type Service } from "@/lib/services";
import { absoluteUrl } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { Photo } from "@/components/ui/Photo";
import { JsonLd } from "@/components/ui/JsonLd";
import { Accordion } from "@/components/ui/Accordion";
import { ServiceHero } from "@/components/service/ServiceHero";
import { ServiceBlock } from "@/components/service/ServiceBlock";
import { SedimentTool } from "@/components/service/SedimentTool";
import { ConcreteCalc } from "@/components/service/ConcreteCalc";
import { SealcoatCheck } from "@/components/service/SealcoatCheck";
import { DemolitionChecklist } from "@/components/service/DemolitionChecklist";
import { CtaBand } from "@/components/sections/CtaBand";

type Slug = Service["slug"];

export function serviceMetadata(slug: Slug) {
  const s = services[slug];
  return pageMetadata({ title: s.title, description: s.description, path: `/${s.slug}` });
}

const toolHead: Record<Service["tool"], { tick: string; title: string; intro: string }> = {
  sediment: {
    tick: "Tool",
    title: "Do I need a sediment control plan?",
    intro: "Two numbers tell you where you stand with Maryland's rule before you break ground.",
  },
  concrete: {
    tick: "Tool",
    title: "How much concrete is that?",
    intro: "Rough cubic yards for a slab, patio or driveway. Handy before you call.",
  },
  sealcoat: {
    tick: "Tool",
    title: "Is it time to sealcoat?",
    intro: "Three questions, answered the way we would answer them on your driveway.",
  },
  checklist: {
    tick: "Before we start",
    title: "Before we start.",
    intro: "Every tear-down follows the same four checks, in this order.",
  },
};

function Tool({ s }: { s: Service }) {
  if (s.tool === "sediment") return <SedimentTool />;
  if (s.tool === "concrete") return <ConcreteCalc />;
  if (s.tool === "sealcoat") return <SealcoatCheck />;
  return <DemolitionChecklist />;
}

function PullQuote({ s }: { s: Service }) {
  if (!s.quote) return null;
  const q = s.quote;
  if (!q.photo) {
    return (
      <section className="broom on-deep" aria-label="In our words">
        <div className="container-x py-20 lg:py-28">
          <p className="tick">In our words</p>
          <p className="mt-5 font-display text-display font-extrabold italic leading-none text-accent" style={{ fontVariationSettings: '"wdth" 118' }}>
            {q.text}
          </p>
          {q.sub && <p className="mt-6 max-w-[46ch] text-lead text-deep-muted">{q.sub}</p>}
        </div>
      </section>
    );
  }
  const p = photos[q.photo];
  const wide = p.width / p.height > 2;
  return (
    <section className="broom on-deep" aria-label="In our words">
      <div className={`container-x grid gap-8 py-16 lg:items-center lg:py-24 ${wide ? "" : "lg:grid-cols-12"}`}>
        <div className={wide ? "" : "lg:col-span-6"}>
          <p className="tick">In our words</p>
          <p className="mt-5 max-w-[18ch] font-display text-h1 font-extrabold italic text-accent" style={{ fontVariationSettings: '"wdth" 118' }}>
            {q.text}
          </p>
        </div>
        <figure className={wide ? "" : "lg:col-span-6"}>
          <Photo
            id={q.photo}
            sizes={wide ? "(min-width: 1320px) 1224px, 100vw" : "(min-width: 1024px) 46vw, 100vw"}
            className={wide ? "aspect-[1824/778]" : "aspect-[4/3]"}
          />
          <figcaption className="caption mt-3">{q.caption}</figcaption>
        </figure>
      </div>
    </section>
  );
}

// One template for the four service pages.
export function ServicePage({ slug }: { slug: Slug }) {
  const s = services[slug];
  const faq = serviceFaq[s.faqKey];
  const head = toolHead[s.tool];
  const half = Math.ceil(s.blocks.length / 2);

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.schemaName,
    serviceType: s.schemaName,
    url: absoluteUrl(`/${s.slug}`),
    description: s.description,
    provider: {
      "@type": "GeneralContractor",
      name: business.name,
      telephone: business.phoneE164,
      url: absoluteUrl("/"),
    },
    areaServed: counties.map((c) => ({ "@type": "AdministrativeArea", name: `${c.name}, Maryland` })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: s.schemaName,
      itemListElement: s.serviceOutput.map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
    },
  };

  return (
    <>
      <JsonLd data={serviceLd} />
      <ServiceHero s={s} />

      <div className="container-x divide-y divide-border">
        {s.blocks.slice(0, half).map((b, i) => (
          <ServiceBlock key={b.id} b={b} index={i} n={s.blocks.length} />
        ))}
      </div>

      <PullQuote s={s} />

      <div className="container-x divide-y divide-border">
        {s.blocks.slice(half).map((b, i) => (
          <ServiceBlock key={b.id} b={b} index={i + half} n={s.blocks.length} />
        ))}
      </div>

      <section className="section border-t border-border bg-surface" aria-labelledby="tool-heading">
        <div className="container-x">
          <p className="tick">{head.tick}</p>
          <h2 id="tool-heading" className="mt-4 text-h2 text-primary">
            {head.title}
          </h2>
          <p className="mt-4 measure text-lead text-ink/85">{head.intro}</p>
          <div className="mt-10">
            <Tool s={s} />
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="svc-faq-heading">
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <p className="tick">Questions</p>
            <h2 id="svc-faq-heading" className="mt-4 text-h2 text-primary">
              Asked before every job.
            </h2>
            <Link href="/faq" className="link mt-6 inline-flex min-h-11 items-center gap-2">
              Read all 14 questions in our FAQ
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <div className="lg:col-span-8">
            <Accordion items={faq} />
          </div>
        </div>
      </section>

      <section className="border-t border-border pb-20 pt-14 lg:pb-28" aria-labelledby="related-heading">
        <div className="container-x">
          <h2 id="related-heading" className="tick">
            Often booked together
          </h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            {s.related.map((slug) => {
              const r = services[slug];
              return (
                <li key={slug}>
                  <Link href={`/${r.slug}`} className="group slab flex items-center gap-5 p-4 transition-colors hover:border-primary">
                    <Photo id={r.heroPhoto} sizes="128px" pos={r.heroPos} className="h-20 w-28 shrink-0" />
                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-h3 font-extrabold text-primary wide-sm">{r.crumb}</span>
                      <span className="block text-sm text-muted">{r.intro.split(".")[0]}.</span>
                    </span>
                    <ArrowRight size={20} className="shrink-0 text-primary transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <CtaBand title={s.cta} trade={s.trade} />
    </>
  );
}
