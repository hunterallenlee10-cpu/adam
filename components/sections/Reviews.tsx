import { ArrowUpRight } from "lucide-react";
import { business, googleRating, reviews } from "@/lib/business";
import { GoogleIcon } from "@/components/ui/BrandIcons";

// Real reviews as plain text, with name, source and month. No stars, no counts.
export function Reviews() {
  return (
    <section className="section border-t border-border bg-surface" aria-labelledby="reviews-heading">
      <div className="container-x">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="tick">07 / In their words</p>
            <h2 id="reviews-heading" className="mt-4 text-h2 text-primary">
              We would rather you hear it from the people we have worked for.
            </h2>
          </div>
        </div>

        <ul className="mt-12 grid gap-5 lg:grid-cols-12">
          {reviews.map((r, i) => (
            <li key={r.name} className={`reveal slab flex flex-col p-7 ${i === 0 ? "lg:col-span-6 lg:row-span-2" : "lg:col-span-3"}`}>
              <figure className="flex h-full flex-col">
                <blockquote className={`font-display font-extrabold text-primary wide-sm ${i === 0 ? "text-h3 lg:text-[1.75rem] lg:leading-[1.2]" : "text-h3"}`}>
                  &ldquo;{r.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-auto pt-6 text-sm text-muted">
                  <span className="font-semibold text-ink">{r.name}</span>
                  <br />
                  {r.source}
                  {r.date ? `, ${r.date}` : ""}
                </figcaption>
              </figure>
            </li>
          ))}
          {/* DRAFT: his Google rating was not captured. This slot stays empty until he supplies it. */}
          <li className="flex flex-col justify-between gap-6 rounded-[6px] border-2 border-dashed border-border p-7 lg:col-span-6">
            <p className="flex items-center gap-3 font-semibold text-muted">
              <GoogleIcon />
              {googleRating ?? "Your Google rating goes here."}
            </p>
            <a href={business.googleReview} className="link inline-flex min-h-11 items-center gap-2" rel="noopener">
              Read our Google reviews
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
