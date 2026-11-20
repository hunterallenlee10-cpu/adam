"use client";

import { useId, useState } from "react";
import { needsSedimentPlan, SEDIMENT_PLAN } from "@/lib/rules";

// "Do I need a sediment control plan?" Threshold and source in lib/rules.ts.
export function SedimentTool() {
  const id = useId();
  const [sqft, setSqft] = useState("");
  const [cuyd, setCuyd] = useState("");
  const a = Number(sqft.replace(/,/g, "")) || 0;
  const b = Number(cuyd.replace(/,/g, "")) || 0;
  const answered = sqft !== "" || cuyd !== "";
  const needs = needsSedimentPlan(a, b);

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
        <div>
          <label htmlFor={`${id}-sqft`} className="font-semibold text-ink">
            Square feet of ground disturbed
          </label>
          <input
            id={`${id}-sqft`}
            inputMode="numeric"
            placeholder="for example 4,000"
            value={sqft}
            onChange={(e) => setSqft(e.target.value.replace(/[^\d,]/g, ""))}
            className="mt-2 block min-h-12 w-full rounded-[6px] border border-border bg-surface px-3 text-lg text-ink"
          />
        </div>
        <div>
          <label htmlFor={`${id}-cuyd`} className="font-semibold text-ink">
            Cubic yards of earth moved
          </label>
          <input
            id={`${id}-cuyd`}
            inputMode="numeric"
            placeholder="for example 60"
            value={cuyd}
            onChange={(e) => setCuyd(e.target.value.replace(/[^\d,]/g, ""))}
            className="mt-2 block min-h-12 w-full rounded-[6px] border border-border bg-surface px-3 text-lg text-ink"
          />
        </div>
      </div>
      <div className="flex flex-col justify-between rounded-[6px] border border-border bg-bg p-6" aria-live="polite">
        <p className="tick">Result</p>
        <p className={`mt-3 font-display text-h2 font-extrabold wide-sm ${!answered ? "text-muted" : needs ? "text-error" : "text-success"}`}>
          {!answered ? "Enter your numbers." : needs ? "You likely need a plan." : "You are likely under the threshold."}
        </p>
        <p className="mt-3 text-ink/85">
          Maryland asks for an approved erosion and sediment control plan when work disturbs{" "}
          {SEDIMENT_PLAN.squareFeet.toLocaleString("en-US")} square feet or more, or moves {SEDIMENT_PLAN.cubicYards} cubic yards or more.
        </p>
        <p className="mt-4 border-t border-border pt-4 text-sm text-muted">
          General guide, not legal advice. Your county office in Leonardtown, Prince Frederick or La Plata has the final say.
        </p>
      </div>
    </div>
  );
}
