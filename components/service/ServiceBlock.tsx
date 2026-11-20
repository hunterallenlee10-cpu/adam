import { Camera, Check, Sun, Truck } from "lucide-react";
import type { Block } from "@/lib/services";
import { photos } from "@/lib/photos";
import { Photo } from "@/components/ui/Photo";

function Media({ b }: { b: Block }) {
  if (b.kind === "placeholder") {
    // A labelled placeholder until he supplies a real photo. No stock image used.
    return (
      <div className="grid aspect-[16/10] place-items-center rounded-[6px] border-2 border-dashed border-border bg-surface p-8 text-center">
        <div>
          <Camera size={28} className="mx-auto text-muted" aria-hidden="true" />
          <p className="mt-3 font-semibold text-muted">{b.placeholder}</p>
        </div>
      </div>
    );
  }
  if (b.kind === "icon" && b.icon === "sun") {
    return (
      <div className="broom on-deep grid gap-6 rounded-[6px] p-8 sm:grid-cols-2 sm:items-end lg:p-10">
        <div>
          <Sun size={48} strokeWidth={1.25} className="text-accent" aria-hidden="true" />
          <p className="mt-5 font-display text-display font-extrabold leading-none text-accent wide">50°F</p>
          <p className="mt-2 font-display text-h3 font-extrabold text-deep-text wide-sm">and rising.</p>
        </div>
        <ul className="grid gap-3 border-t border-deep-muted/25 pt-5 text-deep-text sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
          <li><span className="font-semibold text-accent">No rain</span> in the 24-hour forecast</li>
          <li><span className="font-semibold text-accent">12 to 24 months</span> after new asphalt</li>
          <li><span className="font-semibold text-accent">Every 2 to 3 years</span> after that</li>
        </ul>
      </div>
    );
  }
  if (b.kind === "icon") {
    return (
      <div className="broom on-deep grid aspect-[4/3] place-items-center rounded-[6px] p-8">
        <div className="text-center">
          <Truck size={56} strokeWidth={1.25} className="mx-auto text-accent" aria-hidden="true" />
          <p className="mt-4 font-display text-h3 font-extrabold text-deep-text wide-sm">Sorted, hauled, swept.</p>
        </div>
      </div>
    );
  }
  if (b.kind === "swatch") {
    // A drawn comparison, not a photo: oxidised asphalt beside a fresh sealcoat.
    const grain = "repeating-radial-gradient(circle at 30% 40%, rgb(255 255 255 / 0.05) 0 1px, transparent 1px 4px)";
    return (
      <div className="grid grid-cols-2 gap-3" role="img" aria-label="Drawing comparing grey, oxidised asphalt with a deep black sealcoated surface">
        <div className="flex aspect-[3/4] flex-col justify-end rounded-[6px] p-5" style={{ backgroundColor: "#8E8F8A", backgroundImage: grain }}>
          <svg viewBox="0 0 100 60" className="mb-auto mt-4 w-3/4 text-[#5f605b]" aria-hidden="true">
            <path d="M5 30 L22 24 L30 36 L46 28 L58 40 L72 30 L95 38 M30 36 L34 52 M58 40 L52 56 M46 28 L50 12" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
          <p className="font-display text-h3 font-extrabold text-ink wide-sm">Unsealed</p>
          <p className="text-sm text-ink/80">Grey, dry and brittle. Cracks let water into the base.</p>
        </div>
        <div className="flex aspect-[3/4] flex-col justify-end rounded-[6px] p-5" style={{ backgroundColor: "#151716", backgroundImage: grain }}>
          <p className="font-display text-h3 font-extrabold text-deep-text wide-sm">Sealed</p>
          <p className="text-sm text-deep-muted">Deep black, flexible and waterproof.</p>
        </div>
      </div>
    );
  }
  if (b.kind === "beforeAfter" && b.photos) {
    return (
      <div className="grid grid-cols-2 gap-3">
        {b.photos.map((id, i) => (
          <figure key={id}>
            <div className="relative">
              <Photo id={id} sizes="(min-width: 1024px) 23vw, 50vw" className="aspect-[3/4]" />
              <span className="absolute left-2 top-2 rounded-[4px] bg-deep/85 px-2 py-0.5 text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-accent">
                {i === 0 ? "Before" : "After"}
              </span>
            </div>
            <figcaption className="caption mt-2">{b.pairCaption?.[i]}</figcaption>
          </figure>
        ))}
      </div>
    );
  }
  if (!b.photos?.length) return null;
  const [main, ...rest] = b.photos;
  const mainP = photos[main];
  const portrait = mainP.height > mainP.width;
  return (
    <div className="grid gap-3">
      <figure>
        <Photo
          id={main}
          sizes="(min-width: 1024px) 46vw, 100vw"
          pos={b.mainPos}
          zoom={b.mainZoom}
          className={b.mainAspect ?? (portrait ? "aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5]" : "aspect-[4/3]")}
        />
        <figcaption className="caption mt-2">{mainP.caption}</figcaption>
      </figure>
      {rest.length > 0 && (
        <div className={`grid gap-3 ${rest.length > 1 ? "grid-cols-2" : ""}`}>
          {rest.map((id) => {
            const p = photos[id];
            const strip = p.width / p.height > 2;
            return (
              <figure key={id}>
                <Photo
                  id={id}
                  sizes="(min-width: 1024px) 23vw, 50vw"
                  className={strip ? "aspect-[1024/354]" : "aspect-[4/3]"}
                  imgClassName={id === "p41" ? "scale-[1.08] origin-left" : ""}
                />
                <figcaption className="caption mt-2">{p.caption}</figcaption>
              </figure>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function ServiceBlock({ b, index, n }: { b: Block; index: number; n: number }) {
  const flip = index % 2 === 1;
  return (
    <section id={b.id} aria-labelledby={`${b.id}-h`} className="scroll-mt-28 py-14 lg:py-20">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-14">
        <div className={`min-w-0 lg:col-span-5 lg:sticky lg:top-28 ${flip ? "lg:order-2" : ""}`}>
          <p className="tick">
            {String(index + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
          </p>
          <h2 id={`${b.id}-h`} className="mt-3 text-h2 text-primary">
            {b.title}
          </h2>
          <p className="mt-5 measure text-lead text-ink/90">{b.body}</p>
          {b.list && (
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {b.list.map((li) => (
                <li key={li} className="flex items-start gap-2.5">
                  <Check size={18} strokeWidth={2.5} className="mt-[3px] shrink-0 text-primary" aria-hidden="true" />
                  {li}
                </li>
              ))}
            </ul>
          )}
          {b.kind === "steps" && b.steps && (
            <ol className="mt-8 grid gap-0 border-t border-border">
              {b.steps.map((st, i) => (
                <li key={st.title} className="grid grid-cols-[3rem_1fr] gap-2 border-b border-border py-4">
                  <span className="font-display text-xl font-extrabold text-primary wide">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="block font-semibold text-ink">{st.title}</span>
                    <span className="block text-ink/80">{st.body}</span>
                  </span>
                </li>
              ))}
            </ol>
          )}
        </div>
        <div className={`min-w-0 lg:col-span-7 ${flip ? "lg:order-1" : ""}`}>
          {b.kind === "table" && b.table ? (
            <div className="slab overflow-x-auto">
              <table className="w-full min-w-[520px] border-collapse text-left">
                <caption className="sr-only">{b.table.caption}</caption>
                <thead>
                  <tr className="border-b border-border">
                    {b.table.head.map((h, i) => (
                      <th key={i} scope="col" className="px-5 py-4 text-sm font-semibold uppercase tracking-[0.1em] text-muted">
                        {h || <span className="sr-only">Feature</span>}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {b.table.rows.map((r) => (
                    <tr key={r[0]} className="border-b border-border last:border-0">
                      <th scope="row" className="px-5 py-4 font-semibold text-ink">
                        {r[0]}
                      </th>
                      {r.slice(1).map((c, i) => (
                        <td key={i} className="px-5 py-4 text-ink/85">
                          {c}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : b.kind === "steps" ? (
            // TODO: swap for a real Adams photo
            <Media b={{ ...b, kind: "placeholder", placeholder: "Photo: sealcoating job, from Adams Property Works" }} />
          ) : (
            <Media b={b} />
          )}
        </div>
      </div>
    </section>
  );
}
