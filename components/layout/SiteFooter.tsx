import Image from "next/image";
import Link from "next/link";
import { Mail, MessageSquare, Phone } from "lucide-react";
import { business, lines, towns } from "@/lib/business";
import { photos } from "@/lib/photos";
import { IS_LIVE } from "@/lib/site";
import { FacebookIcon } from "@/components/ui/BrandIcons";

const serviceLinks = [
  { href: "/excavation", label: "Excavation and site work" },
  { href: "/concrete", label: "Concrete" },
  { href: "/demolition", label: "Demolition" },
  { href: "/asphalt-sealcoating", label: "Asphalt and sealcoating" },
];

const companyLinks = [
  { href: "/our-work", label: "Our work" },
  { href: "/about", label: "About" },
  { href: "/service-area", label: "Service area" },
  { href: "/faq", label: "FAQ" },
  { href: "/free-estimate", label: "Free estimate" },
];

export function SiteFooter() {
  const logo = photos.logo;
  return (
    <footer className="broom on-deep pb-28 lg:pb-10" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Contact and site links
      </h2>
      <div className="container-x pt-16 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Image
              src={logo.src}
              width={logo.width}
              height={logo.height}
              alt={logo.alt}
              sizes="220px"
              loading="lazy"
              className="h-auto w-[200px] rounded-[6px] sm:w-[220px]"
            />
            <p className="mt-6 max-w-sm font-display text-h3 font-extrabold text-deep-text wide-sm">{lines.startToFinish}</p>
            <a
              href={business.tel}
              className="mt-6 inline-flex items-center gap-3 font-display text-[2rem] font-extrabold leading-none text-accent hover:underline sm:text-[2.5rem]"
              style={{ fontVariationSettings: '"wdth" 118' }}
            >
              <Phone size={28} aria-hidden="true" strokeWidth={2.25} />
              {business.phone}
            </a>
            <p className="mt-2 text-deep-muted">{business.callOrText}.</p>
            <ul className="mt-5 grid gap-2">
              <li>
                <a href={business.sms} className="link inline-flex min-h-11 items-center gap-2">
                  <MessageSquare size={18} aria-hidden="true" />
                  Text us at {business.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${business.email}`} className="link inline-flex min-h-11 items-center gap-2 break-all">
                  <Mail size={18} aria-hidden="true" />
                  {business.email}
                </a>
              </li>
            </ul>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-7 lg:grid-cols-3">
            <div>
              <h3 className="tick">Services</h3>
              <ul className="mt-4 grid gap-1">
                {serviceLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="inline-flex min-h-11 items-center text-deep-text hover:text-accent hover:underline">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="tick">Company</h3>
              <ul className="mt-4 grid gap-1">
                {companyLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="inline-flex min-h-11 items-center text-deep-text hover:text-accent hover:underline">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="sm:col-span-2 lg:col-span-1">
              <h3 className="tick">Find us</h3>
              <address className="mt-4 not-italic text-deep-text">
                {business.name}
                <br />
                {business.locality}, {business.region} {business.postalCode}
                <br />
                {business.phone}
              </address>
              {/* DRAFT: confirm hours for all seven days */}
              <p className="mt-3 text-deep-muted">Hours: {business.hours}.</p>
              <a
                href={business.facebook}
                className="mt-4 inline-flex h-11 w-11 items-center justify-center rounded-[6px] border border-deep-muted/40 text-deep-text hover:border-accent hover:text-accent"
                aria-label="Adams Property Works on Facebook"
                rel="noopener"
              >
                <FacebookIcon />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-deep-muted/20 pt-6">
          <p className="text-sm text-deep-muted">
            <span className="font-semibold text-deep-text">Serving St. Mary&apos;s, Calvert and Charles Counties: </span>
            {towns.join(", ")}.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-deep-muted/20 pt-6 text-sm text-deep-muted">
          <p>© 2026 {business.name}. Doing business as {business.dba}.</p>
          {!IS_LIVE && <p>Concept preview by Lee Enterprises Unlimited.</p>}
        </div>
      </div>
    </footer>
  );
}
