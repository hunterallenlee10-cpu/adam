import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { PhotoId } from "@/lib/photos";
import type { Trade } from "@/lib/planner";
import { Photo } from "@/components/ui/Photo";
import { PlannerButton } from "@/components/ui/PlannerButton";
import { SectionHead } from "@/components/ui/SectionHead";

type Tile = {
  n: string;
  title: string;
  line: string;
  href: string;
  linkText: string;
  photo: PhotoId;
  pos?: string;
  trade: Trade;
  area: string;
  sizes: string;
  frame: string;
};

const tiles: Tile[] = [
  {
    n: "01",
    title: "Excavation and Site Work",
    line: "Clearing, grading, drainage, footers and utilities.",
    href: "/excavation",
    linkText: "Excavation and site work",
    photo: "p03",
    pos: "22% 62%",
    trade: "excavation",
    area: "lg:col-span-8 lg:row-span-2",
    sizes: "(min-width: 1024px) 64vw, 100vw",
    frame: "aspect-[4/5] sm:aspect-[16/11] lg:aspect-auto",
  },
  {
    n: "02",
    title: "Concrete",
    line: "Slabs, driveways, patios, walks, walls and coatings.",
    href: "/concrete",
    linkText: "Concrete",
    photo: "p30",
    trade: "concrete",
    area: "lg:col-span-4 lg:row-span-3",
    sizes: "(min-width: 1024px) 32vw, 100vw",
    frame: "aspect-[4/5] lg:aspect-auto",
  },
  {
    n: "03",
    title: "Demolition",
    line: "Controlled tear-downs. We do not use wrecking balls.",
    href: "/demolition",
    linkText: "Demolition",
    photo: "p08",
    pos: "50% 24%",
    trade: "demolition",
    area: "lg:col-span-4",
    sizes: "(min-width: 1024px) 32vw, 100vw",
    frame: "aspect-[16/11] lg:aspect-auto",
  },
  {
    n: "04",
    title: "Asphalt and Sealcoating",
    line: "Sealcoating, crack filling and repair.",
    href: "/asphalt-sealcoating",
    linkText: "Asphalt and sealcoating",
    photo: "p04",
    pos: "70% 45%",
    trade: "asphalt",
    area: "lg:col-span-4",
    sizes: "(min-width: 1024px) 32vw, 100vw",
    frame: "aspect-[16/11] lg:aspect-auto",
  },
];

export function Bento() {
  return (
    <section className="section" aria-labelledby="trades-heading">
      <div className="container-x">
        <SectionHead
          tick="01 / One crew"
          id="trades-heading"
          title="One crew. Four trades."
          intro={<p>Most jobs need more than one trade. You only need one phone number.</p>}
          align="split"
        />

        <ul className="mt-12 grid gap-4 lg:mt-14 lg:grid-cols-12 lg:grid-rows-[minmax(220px,auto)_minmax(220px,auto)_minmax(330px,auto)] lg:gap-5">
          {tiles.map((t) => (
            <li key={t.n} className={`reveal group relative overflow-hidden rounded-[6px] bg-deep ${t.area} ${t.frame}`}>
              <Photo
                id={t.photo}
                sizes={t.sizes}
                pos={t.pos}
                className="absolute inset-0 rounded-none"
                imgClassName="transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgb(11 31 18 / 0.94) 0%, rgb(11 31 18 / 0.7) 34%, rgb(11 31 18 / 0.12) 60%, rgb(11 31 18 / 0) 72%)" }}
                aria-hidden="true"
              />
              <div className="on-deep relative flex h-full min-h-[inherit] flex-col justify-end p-5 sm:p-7">
                <p className="tick !text-deep-muted">{t.n}</p>
                <h3 className="mt-2 text-h3 text-deep-text">
                  <Link
                    href={t.href}
                    className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:outline focus-visible:after:outline-3 focus-visible:after:outline-offset-[-6px] focus-visible:after:outline-accent focus-visible:after:rounded-[6px]"
                  >
                    {t.title}
                  </Link>
                </h3>
                <p className="mt-2 max-w-[34ch] text-deep-text/90">{t.line}</p>
                <div className="relative z-10 mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent" aria-hidden="true">
                    {t.linkText}
                    <ArrowUpRight size={16} />
                  </span>
                  <PlannerButton
                    trade={t.trade}
                    arrow={false}
                    className="inline-flex min-h-11 items-center text-sm font-semibold text-deep-text underline decoration-deep-text/40 underline-offset-4 hover:decoration-accent"
                  >
                    Free estimate for {t.linkText.toLowerCase()}
                  </PlannerButton>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
