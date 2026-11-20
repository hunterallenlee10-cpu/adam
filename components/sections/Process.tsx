import { process } from "@/lib/business";

// A numbered rail: his four steps, joined by a grade line.
export function Process({ tick = "05 / How it works", onSurface = true }: { tick?: string; onSurface?: boolean }) {
  return (
    <section className={`section border-y border-border ${onSurface ? "bg-surface" : ""}`} aria-labelledby="process-heading">
      <div className="container-x">
        <p className="tick">{tick}</p>
        <h2 id="process-heading" className="mt-4 text-h2 text-primary">
          Written estimates with no surprises.
        </h2>

        <ol className="relative mt-12 grid gap-0 lg:mt-16 lg:grid-cols-4">
          {/* The rail */}
          <span aria-hidden="true" className="absolute bottom-16 left-[15px] top-0 w-[2px] bg-border lg:bottom-auto lg:left-0 lg:right-0 lg:top-[15px] lg:h-[2px] lg:w-auto" />
          {process.map((s) => (
            <li key={s.n} className="reveal relative pb-10 pl-14 last:pb-0 lg:pb-0 lg:pl-0 lg:pr-8 lg:pt-14">
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 grid h-8 w-8 place-items-center rounded-full border-2 border-primary bg-bg font-display text-[0.8125rem] font-extrabold text-primary wide"
              >
                {s.n}
              </span>
              <h3 className="text-h3 text-ink">
                <span className="sr-only">{s.n} </span>
                {s.title}
              </h3>
              <p className="mt-2 max-w-[30ch] text-ink/80">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
