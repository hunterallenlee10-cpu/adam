"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Copy, Mail, MessageSquare, Phone } from "lucide-react";
import { business } from "@/lib/business";
import {
  buildRequest,
  normalisePhone,
  propertyTypes,
  timings,
  townOptions,
  tradeChips,
  tradeLabel,
  trades,
  type PlannerAnswers,
  type Trade,
} from "@/lib/planner";

type Props = {
  preset?: Trade;
  titleId: string;
  headingLevel?: "h2" | "h3";
};

const TOTAL = 4;
const STEP_TITLES = ["What do you need?", "A little more.", "Where and when.", "Your info."];

function Chip({ selected, onClick, children, multi = false }: { selected: boolean; onClick: () => void; children: React.ReactNode; multi?: boolean }) {
  return (
    <button
      type="button"
      role={multi ? "checkbox" : "radio"}
      aria-checked={selected}
      onClick={onClick}
      className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 py-2 text-left text-[0.9375rem] font-medium transition-colors ${
        selected ? "border-primary bg-primary text-deep-text" : "border-border bg-surface text-ink hover:border-primary"
      }`}
    >
      {multi && (
        <span
          aria-hidden="true"
          className={`grid h-4 w-4 place-items-center rounded-[3px] border ${selected ? "border-accent bg-accent text-ink" : "border-muted/60"}`}
        >
          {selected && <Check size={12} strokeWidth={3} />}
        </span>
      )}
      {children}
    </button>
  );
}

export function PlannerSteps({ preset, titleId, headingLevel = "h2" }: Props) {
  const [step, setStep] = useState(preset ? 2 : 1);
  const [a, setA] = useState<PlannerAnswers>({ trade: preset, details: [], name: "", phone: "", notes: "", discount: false });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState<"" | "text" | "copy" | "email">("");
  const [touch, setTouch] = useState(true);
  const headRef = useRef<HTMLHeadingElement>(null);
  const first = useRef(true);
  const H = headingLevel;

  useEffect(() => {
    // Phones get the text button. A desktop without a text app gets copy and email instead.
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const id = requestAnimationFrame(() => setTouch(coarse));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    headRef.current?.focus();
  }, [step, sent]);

  const set = <K extends keyof PlannerAnswers>(k: K, v: PlannerAnswers[K]) => {
    setA((prev) => ({ ...prev, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  function next() {
    const e: Record<string, string> = {};
    if (step === 1 && !a.trade) e.trade = "Pick the kind of work, or choose Not sure.";
    if (step === 2 && !a.property) e.property = "Is this a home, a business or an HOA?";
    if (step === 3 && !a.town) e.town = "Pick your town, or choose Other.";
    if (step === 3 && !a.timing) e.timing = "Roughly when would you like the work done?";
    if (step === 4) {
      if (!a.name.trim()) e.name = "Tell us what to call you.";
      if (!normalisePhone(a.phone)) e.phone = "Please check the number. We need 10 digits so we can call or text you back.";
    }
    setErrors(e);
    if (Object.values(e).some(Boolean)) {
      const firstErr = Object.keys(e)[0];
      requestAnimationFrame(() => document.getElementById(`pl-${firstErr}`)?.focus());
      return;
    }
    setStep((s) => s + 1);
  }

  function back() {
    setSent("");
    setStep((s) => Math.max(preset ? 1 : 1, s - 1));
  }

  const request = buildRequest(a);
  const smsHref = `${business.sms}?&body=${encodeURIComponent(request)}`;
  const mailHref = `mailto:${business.email}?subject=${encodeURIComponent("Free estimate request")}&body=${encodeURIComponent(request)}`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(request);
    } catch {
      const t = document.createElement("textarea");
      t.value = request;
      document.body.appendChild(t);
      t.select();
      document.execCommand("copy");
      t.remove();
    }
    setSent("copy");
  }

  const reviewing = step > TOTAL;
  const progress = reviewing ? 100 : ((step - 1) / TOTAL) * 100 + 100 / TOTAL / 2;

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      {/* Progress and step counter */}
      <div className="px-5 pt-5 sm:px-8 sm:pt-7">
        <div className="flex items-center justify-between text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-muted">
          <span aria-live="polite">{reviewing ? "Review and send" : `Step ${step} of ${TOTAL}`}</span>
          {a.trade && step > 1 && !reviewing && <span className="normal-case tracking-normal">{tradeLabel(a.trade)}</span>}
        </div>
        <div className="mt-3 h-[3px] w-full overflow-hidden rounded-full bg-border" role="progressbar" aria-label="Progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)}>
          <div className="h-full bg-accent transition-[width] duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-8">
        <H id={titleId} ref={headRef} tabIndex={-1} className="font-display text-h3 font-extrabold text-primary wide-sm outline-none sm:text-[1.75rem]">
          {reviewing ? (sent ? "Thank you." : "Check it, then send it.") : STEP_TITLES[step - 1]}
        </H>

        {step === 1 && (
          <fieldset className="mt-5">
            <legend className="sr-only">Type of work</legend>
            <div role="radiogroup" id="pl-trade" tabIndex={-1} className="grid gap-2 outline-none">
              {trades.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  role="radio"
                  aria-checked={a.trade === t.id}
                  onClick={() => {
                    setA((p) => ({ ...p, trade: t.id, details: p.trade === t.id ? p.details : [] }));
                    setErrors({});
                    setStep(2);
                  }}
                  className={`flex min-h-[60px] w-full items-center justify-between gap-4 rounded-[6px] border px-4 py-3 text-left transition-colors ${
                    a.trade === t.id ? "border-primary bg-primary/5" : "border-border bg-surface hover:border-primary"
                  }`}
                >
                  <span>
                    <span className="block font-semibold text-ink">{t.label}</span>
                    <span className="block text-sm text-muted">{t.hint}</span>
                  </span>
                  <ArrowRight size={18} className="shrink-0 text-primary" aria-hidden="true" />
                </button>
              ))}
            </div>
            {errors.trade && <p className="mt-3 text-sm font-semibold text-error">{errors.trade}</p>}
          </fieldset>
        )}

        {step === 2 && a.trade && (
          <div className="mt-5 grid gap-7">
            <fieldset>
              <legend className="font-semibold text-ink">What is involved? Pick any that apply.</legend>
              <div className="mt-3 flex flex-wrap gap-2" role="group">
                {tradeChips[a.trade].map((c) => (
                  <Chip
                    key={c}
                    multi
                    selected={a.details.includes(c)}
                    onClick={() => set("details", a.details.includes(c) ? a.details.filter((x) => x !== c) : [...a.details, c])}
                  >
                    {c}
                  </Chip>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend className="font-semibold text-ink">What kind of property?</legend>
              <div className="mt-3 flex flex-wrap gap-2 outline-none" role="radiogroup" id="pl-property" tabIndex={-1}>
                {propertyTypes.map((p) => (
                  <Chip key={p} selected={a.property === p} onClick={() => set("property", p)}>
                    {p}
                  </Chip>
                ))}
              </div>
              {errors.property && <p className="mt-3 text-sm font-semibold text-error">{errors.property}</p>}
            </fieldset>
          </div>
        )}

        {step === 3 && (
          <div className="mt-5 grid gap-7">
            <div>
              <label htmlFor="pl-town" className="font-semibold text-ink">
                Your town
              </label>
              <select
                id="pl-town"
                value={a.town ?? ""}
                onChange={(e) => set("town", e.target.value)}
                aria-invalid={!!errors.town}
                aria-describedby={errors.town ? "pl-town-err" : undefined}
                className="mt-2 block min-h-12 w-full rounded-[6px] border border-border bg-surface px-3 text-base text-ink"
              >
                <option value="" disabled>
                  Choose your town
                </option>
                {townOptions.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              {errors.town && <p id="pl-town-err" className="mt-2 text-sm font-semibold text-error">{errors.town}</p>}
            </div>
            <fieldset>
              <legend className="font-semibold text-ink">When would you like it done?</legend>
              <div className="mt-3 flex flex-wrap gap-2 outline-none" role="radiogroup" id="pl-timing" tabIndex={-1}>
                {timings.map((t) => (
                  <Chip key={t} selected={a.timing === t} onClick={() => set("timing", t)}>
                    {t}
                  </Chip>
                ))}
              </div>
              {errors.timing && <p className="mt-3 text-sm font-semibold text-error">{errors.timing}</p>}
            </fieldset>
          </div>
        )}

        {step === 4 && (
          <div className="mt-5 grid gap-5">
            <div>
              <label htmlFor="pl-name" className="font-semibold text-ink">
                Your name
              </label>
              <input
                id="pl-name"
                autoComplete="name"
                value={a.name}
                onChange={(e) => set("name", e.target.value)}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "pl-name-err" : undefined}
                className="mt-2 block min-h-12 w-full rounded-[6px] border border-border bg-surface px-3 text-base text-ink"
              />
              {errors.name && <p id="pl-name-err" className="mt-2 text-sm font-semibold text-error">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="pl-phone" className="font-semibold text-ink">
                Your phone number
              </label>
              <input
                id="pl-phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                value={a.phone}
                onChange={(e) => set("phone", e.target.value)}
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "pl-phone-err" : "pl-phone-hint"}
                className="mt-2 block min-h-12 w-full rounded-[6px] border border-border bg-surface px-3 text-base text-ink"
              />
              {errors.phone ? (
                <p id="pl-phone-err" className="mt-2 text-sm font-semibold text-error">{errors.phone}</p>
              ) : (
                <p id="pl-phone-hint" className="mt-2 text-sm text-muted">So we can call or text you back about the site visit.</p>
              )}
            </div>
            <div>
              <label htmlFor="pl-notes" className="font-semibold text-ink">
                Anything else? <span className="font-normal text-muted">(optional)</span>
              </label>
              <textarea
                id="pl-notes"
                rows={3}
                value={a.notes}
                onChange={(e) => set("notes", e.target.value)}
                className="mt-2 block w-full rounded-[6px] border border-border bg-surface px-3 py-2.5 text-base text-ink"
              />
            </div>
            <label className="flex min-h-11 cursor-pointer items-center gap-3">
              <input type="checkbox" checked={a.discount} onChange={(e) => set("discount", e.target.checked)} className="h-5 w-5 accent-[#0F3D1E]" />
              <span className="text-ink">Ask about the senior or retired military discount</span>
            </label>
          </div>
        )}

        {reviewing && !sent && (
          <div className="mt-5">
            <p className="text-ink/85">
              Nothing reaches us until you send it. {touch ? "This opens your text app with your request filled in." : "Copy it into a text to (301) 994-1010, or email it."}
            </p>
            <pre className="mt-4 whitespace-pre-wrap rounded-[6px] border border-border bg-bg p-4 font-sans text-[0.9375rem] leading-relaxed text-ink">{request}</pre>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {touch ? (
                <>
                  <a href={smsHref} onClick={() => setSent("text")} className="btn btn-primary sm:col-span-2 whitespace-normal text-center">
                    <MessageSquare size={18} aria-hidden="true" />
                    Text my request to Adams Property Works
                  </a>
                  <a href={business.tel} className="btn btn-outline sm:col-span-2">
                    <Phone size={18} aria-hidden="true" />
                    Call {business.phone}
                  </a>
                </>
              ) : (
                <>
                  <button type="button" onClick={copy} className="btn btn-primary">
                    <Copy size={18} aria-hidden="true" />
                    Copy my request
                  </button>
                  <a href={mailHref} onClick={() => setSent("email")} className="btn btn-outline">
                    <Mail size={18} aria-hidden="true" />
                    Email my request
                  </a>
                  <p className="text-sm text-muted sm:col-span-2">
                    Or call or text <a className="link" href={business.tel}>{business.phone}</a>. {business.callOrText}.
                  </p>
                </>
              )}
            </div>
            <p className="mt-4 text-sm text-muted">Please do not send payment or account details through this form.</p>
          </div>
        )}

        {reviewing && sent && (
          <div className="mt-5 rounded-[6px] border border-success/40 bg-success/5 p-5" role="status">
            <p className="flex items-center gap-2 font-semibold text-success">
              <Check size={18} aria-hidden="true" />
              {sent === "text" && "Your text app should now be open with your request. Press send and we will get back to you."}
              {sent === "copy" && "Copied. Paste it into a text or email to us and we will get back to you."}
              {sent === "email" && "Your email app should now be open with your request. Press send and we will get back to you."}
            </p>
            <p className="mt-3 text-ink/85">
              If nothing opened, call or text {business.phone}. {business.callOrText}.
            </p>
            {sent === "copy" && (
              <a href={mailHref} onClick={() => setSent("email")} className="link mt-3 inline-flex min-h-11 items-center gap-2">
                <Mail size={16} aria-hidden="true" /> Email it to {business.email}
              </a>
            )}
          </div>
        )}
      </div>

      {/* Footer: back and next, and the call or text row on every step */}
      <div className="border-t border-border px-5 pb-5 pt-4 sm:px-8 sm:pb-7">
        {!reviewing || !sent ? (
          <div className="flex items-center justify-between gap-3">
            {step > 1 ? (
              <button type="button" onClick={back} className="btn btn-outline min-h-12 px-4">
                <ArrowLeft size={18} aria-hidden="true" />
                Back
              </button>
            ) : (
              <span />
            )}
            {step > 1 && !reviewing && (
              <button type="button" onClick={next} className="btn btn-green min-h-12">
                {step === TOTAL ? "Review my request" : "Next"}
                <ArrowRight size={18} aria-hidden="true" />
              </button>
            )}
          </div>
        ) : null}
        <p className="mt-4 text-center text-sm text-muted">
          Rather talk? Call or text{" "}
          <a href={business.tel} className="link">
            {business.phone}
          </a>
          .
        </p>
      </div>
    </div>
  );
}
