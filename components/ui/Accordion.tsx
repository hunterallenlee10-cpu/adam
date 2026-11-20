import { Plus } from "lucide-react";
import type { QA } from "@/lib/faq";

// Native details and summary: keyboard and screen reader support for free, no JavaScript.
export function Accordion({ items, onDeep = false }: { items: QA[]; onDeep?: boolean }) {
  return (
    <div className={`border-t ${onDeep ? "border-deep-muted/25" : "border-border"}`}>
      {items.map((it) => (
        <details key={it.q} className={`group border-b ${onDeep ? "border-deep-muted/25" : "border-border"}`}>
          <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-4 text-left font-display text-[1.125rem] font-extrabold leading-snug wide-sm [&::-webkit-details-marker]:hidden sm:text-h3">
            <span>{it.q}</span>
            <span
              className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-transform duration-200 group-open:rotate-45 ${
                onDeep ? "border-deep-muted/40" : "border-border bg-surface text-primary"
              }`}
              aria-hidden="true"
            >
              <Plus size={18} />
            </span>
          </summary>
          <p className={`measure pb-6 pr-12 ${onDeep ? "text-deep-muted" : "text-ink/85"}`}>{it.a}</p>
        </details>
      ))}
    </div>
  );
}
