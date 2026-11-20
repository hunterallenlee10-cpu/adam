import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { homeFaq } from "@/lib/faq";
import { Accordion } from "@/components/ui/Accordion";

export function HomeFaq() {
  return (
    <section className="section" aria-labelledby="faq-heading">
      <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-4">
          <p className="tick">08 / Questions</p>
          <h2 id="faq-heading" className="mt-4 text-h2 text-primary">
            Straight answers before we dig.
          </h2>
          <Link href="/faq" className="link mt-6 inline-flex min-h-11 items-center gap-2">
            Read all 14 questions in our FAQ
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
        <div className="lg:col-span-8">
          <Accordion items={homeFaq} />
        </div>
      </div>
    </section>
  );
}
