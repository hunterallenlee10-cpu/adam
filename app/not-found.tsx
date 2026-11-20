import Link from "next/link";
import { Phone } from "lucide-react";
import { business } from "@/lib/business";
import { navLinks } from "@/lib/site";
import { PlannerButton } from "@/components/ui/PlannerButton";

export const metadata = {
  title: "Page not found | Adams Property Works",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="section">
      <div className="container-x">
        <p className="tick">404 / Off grade</p>
        <h1 className="mt-4 max-w-[16ch] text-h1 text-primary">This page is not on the plans.</h1>
        <p className="mt-6 measure text-lead text-ink/85">
          The address may have changed when we rebuilt the site. Try one of these, or just call or text us.
        </p>
        <ul className="mt-8 flex flex-wrap gap-2">
          <li>
            <Link href="/" className="chip hover:border-primary">
              Home
            </Link>
          </li>
          {navLinks.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="chip hover:border-primary">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
          <PlannerButton />
          <a href={business.tel} className="btn btn-outline">
            <Phone size={18} aria-hidden="true" />
            Call {business.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
