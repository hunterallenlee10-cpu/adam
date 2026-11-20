"use client";

import { useState } from "react";

type Age = "" | "under" | "over";
type Last = "" | "recent" | "old" | "never";
type Cracks = "" | "yes" | "no";

// "Is it time to sealcoat?" Answers from his own Asphalt Sealcoating page. See lib/rules.ts.
export function SealcoatCheck() {
  const [age, setAge] = useState<Age>("");
  const [last, setLast] = useState<Last>("");
  const [cracks, setCracks] = useState<Cracks>("");

  let verdict = "";
  let detail = "";
  let tone = "text-muted";
  if (cracks === "yes") {
    verdict = "Repair comes first.";
    detail = "Deep alligator cracks mean the base is failing. Resurfacing or repair comes before any sealcoat.";
    tone = "text-error";
  } else if (age === "under") {
    verdict = "Wait a little.";
    detail = "New asphalt is sealed 12 to 24 months after installation, once it has fully cured.";
    tone = "text-primary";
  } else if (age === "over" && (last === "old" || last === "never")) {
    verdict = "It is time.";
    detail = "Over 2 to 3 years since the last seal, or never sealed. Let us take a look.";
    tone = "text-success";
  } else if (age === "over" && last === "recent") {
    verdict = "You are covered for now.";
    detail = "We recommend resealing every 2 to 3 years in the Southern Maryland climate.";
    tone = "text-primary";
  }

  function Q<T extends string>({ label, value, set, options }: { label: string; value: T; set: (v: T) => void; options: [T, string][] }) {
    return (
      <fieldset>
        <legend className="font-semibold text-ink">{label}</legend>
        <div className="mt-2 flex flex-wrap gap-2" role="radiogroup">
          {options.map(([v, l]) => (
            <button
              key={v}
              type="button"
              role="radio"
              aria-checked={value === v}
              onClick={() => set(v)}
              className={`min-h-11 rounded-full border px-4 text-[0.9375rem] font-medium transition-colors ${
                value === v ? "border-primary bg-primary text-deep-text" : "border-border bg-surface text-ink hover:border-primary"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </fieldset>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
      <div className="grid gap-6">
        {Q<Age>({ label: "How old is the asphalt?", value: age, set: setAge, options: [["under", "Under 12 months"], ["over", "Over 12 months"]] })}
        {Q<Last>({
          label: "When was it last sealed?",
          value: last,
          set: setLast,
          options: [["recent", "In the last 2 years"], ["old", "Over 2 to 3 years ago"], ["never", "Never"]],
        })}
        {Q<Cracks>({ label: "Are there deep alligator cracks?", value: cracks, set: setCracks, options: [["yes", "Yes"], ["no", "No"]] })}
      </div>
      <div className="flex flex-col justify-between rounded-[6px] border border-border bg-bg p-6" aria-live="polite">
        <p className="tick">Result</p>
        <p className={`mt-3 font-display text-h2 font-extrabold wide-sm ${tone}`}>{verdict || "Answer the three questions."}</p>
        {detail && <p className="mt-3 text-ink/85">{detail}</p>}
        <p className="mt-4 border-t border-border pt-4 text-sm text-muted">50°F and rising, with no rain in the forecast, is sealing weather.</p>
      </div>
    </div>
  );
}
