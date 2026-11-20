"use client";

import { useId, useState } from "react";
import { cubicYards } from "@/lib/rules";

// "How much concrete is that?" Length x width x thickness in feet, divided by 27. No prices.
export function ConcreteCalc() {
  const id = useId();
  const [len, setLen] = useState("");
  const [wid, setWid] = useState("");
  const [thick, setThick] = useState(4);
  const L = Number(len) || 0;
  const W = Number(wid) || 0;
  const yards = cubicYards(L, W, thick);
  const ready = L > 0 && W > 0;

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
      <div className="grid gap-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor={`${id}-l`} className="font-semibold text-ink">
              Length (feet)
            </label>
            <input
              id={`${id}-l`}
              inputMode="decimal"
              value={len}
              onChange={(e) => setLen(e.target.value.replace(/[^\d.]/g, ""))}
              className="mt-2 block min-h-12 w-full rounded-[6px] border border-border bg-surface px-3 text-lg text-ink"
            />
          </div>
          <div>
            <label htmlFor={`${id}-w`} className="font-semibold text-ink">
              Width (feet)
            </label>
            <input
              id={`${id}-w`}
              inputMode="decimal"
              value={wid}
              onChange={(e) => setWid(e.target.value.replace(/[^\d.]/g, ""))}
              className="mt-2 block min-h-12 w-full rounded-[6px] border border-border bg-surface px-3 text-lg text-ink"
            />
          </div>
        </div>
        <fieldset>
          <legend className="font-semibold text-ink">Thickness</legend>
          <div className="mt-2 grid grid-cols-3 gap-2" role="radiogroup">
            {[4, 5, 6].map((t) => (
              <button
                key={t}
                type="button"
                role="radio"
                aria-checked={thick === t}
                onClick={() => setThick(t)}
                className={`min-h-12 rounded-[6px] border font-semibold transition-colors ${
                  thick === t ? "border-primary bg-primary text-deep-text" : "border-border bg-surface text-ink hover:border-primary"
                }`}
              >
                {t} inches
              </button>
            ))}
          </div>
        </fieldset>
      </div>
      <div className="flex flex-col justify-between rounded-[6px] border border-border bg-bg p-6" aria-live="polite">
        <p className="tick">Result</p>
        <p className="mt-3 font-display font-extrabold text-primary wide-sm">
          <span className="text-display leading-none">{ready ? yards.toFixed(1) : "0.0"}</span>
          <span className="ml-2 text-h3">cubic yards</span>
        </p>
        <p className="mt-3 text-ink/85">
          {ready ? `${L} by ${W} feet at ${thick} inches thick.` : "Enter the length and width of your slab."}
        </p>
        <p className="mt-4 border-t border-border pt-4 text-sm text-muted">
          Add about 10% for waste. We measure it properly at the free site visit.
        </p>
      </div>
    </div>
  );
}
