import { FileCheck2, Magnet, PlugZap, Recycle } from "lucide-react";

// "Before we start", from his demolition FAQ.
const items = [
  { icon: FileCheck2, title: "Permits", body: "Requirements vary by county. We guide you through the local process before anything comes down." },
  { icon: PlugZap, title: "Utility disconnects verified", body: "Water, electric and gas disconnects are confirmed before we strike the first blow." },
  { icon: Recycle, title: "Debris sorted and hauled", body: "Metal, concrete and clean wood are separated on site and hauled to Maryland-certified facilities." },
  { icon: Magnet, title: "Magnet sweep", body: "A final sweep pulls nails and metal fragments so your lot is safe to walk." },
];

export function DemolitionChecklist() {
  return (
    <ol className="grid gap-px overflow-hidden rounded-[6px] border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
      {items.map((it, i) => (
        <li key={it.title} className="bg-surface p-6">
          <div className="flex items-center justify-between">
            <it.icon size={24} strokeWidth={1.75} className="text-primary" aria-hidden="true" />
            <span className="font-display text-lg font-extrabold text-muted wide">{String(i + 1).padStart(2, "0")}</span>
          </div>
          <h3 className="mt-4 text-h3 text-ink">{it.title}</h3>
          <p className="mt-2 text-ink/80">{it.body}</p>
        </li>
      ))}
    </ol>
  );
}
