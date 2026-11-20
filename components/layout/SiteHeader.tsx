import Link from "next/link";
import { Phone } from "lucide-react";
import { business } from "@/lib/business";
import { navLinks } from "@/lib/site";
import { PlannerButton } from "@/components/ui/PlannerButton";
import { Wordmark } from "./Wordmark";
import { MobileMenu } from "./MobileMenu";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/95 backdrop-blur-sm supports-[backdrop-filter]:bg-bg/85">
      <div className="container-x flex h-16 items-center justify-between gap-4 lg:h-[76px]">
        <Wordmark />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1 xl:gap-2">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="inline-flex min-h-11 items-center rounded-[6px] px-2.5 text-[0.9375rem] font-medium text-ink hover:text-primary hover:underline hover:decoration-accent hover:decoration-2 hover:underline-offset-[6px] xl:px-3"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 xl:gap-4">
          <a
            href={business.tel}
            className="hidden min-h-11 items-center gap-2 rounded-[6px] px-2 font-semibold text-primary hover:underline lg:inline-flex"
          >
            <Phone size={18} aria-hidden="true" strokeWidth={2} />
            <span className="sr-only xl:not-sr-only">{business.phone}</span>
            <span className="xl:hidden sr-only">Call {business.phone}</span>
          </a>
          <div className="hidden sm:block">
            <PlannerButton className="btn btn-primary min-h-11 px-4 py-2 text-[0.9375rem]" arrow={false} />
          </div>
          <a
            href={business.tel}
            className="grid h-11 w-11 place-items-center rounded-[6px] border border-border text-primary lg:hidden"
            aria-label={`Call ${business.phone}`}
          >
            <Phone size={20} aria-hidden="true" />
          </a>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
