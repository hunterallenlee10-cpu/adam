"use client";

import { useEffect, useState } from "react";
import { ArrowRight, MessageSquare, Phone } from "lucide-react";
import { business } from "@/lib/business";
import { usePlanner } from "@/components/EstimatePlanner/PlannerProvider";

const BAR = 76;

// Phones only. [Call] [Text] [Free Estimate]. Shows once the visitor scrolls,
// and never covers the element that has keyboard focus.
export function StickyBar() {
  const { open, isOpen } = usePlanner();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.55);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function onFocus(e: FocusEvent) {
      if (window.innerWidth >= 1024) return;
      const el = e.target as HTMLElement;
      if (!el?.getBoundingClientRect || el.closest("[data-sticky-bar]")) return;
      const r = el.getBoundingClientRect();
      const limit = window.innerHeight - BAR - 12;
      if (r.bottom > limit) window.scrollBy({ top: r.bottom - limit, behavior: "auto" });
    }
    document.addEventListener("focusin", onFocus);
    return () => document.removeEventListener("focusin", onFocus);
  }, []);

  const visible = shown && !isOpen;

  return (
    <div
      data-sticky-bar
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-border bg-surface/95 backdrop-blur-sm transition-transform duration-200 lg:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-hidden={!visible}
      inert={!visible}
    >
      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.6fr)] gap-2 px-3 py-3">
        <a href={business.tel} className="btn btn-outline min-h-[52px] px-2" aria-label={`Call ${business.phone}`}>
          <Phone size={18} aria-hidden="true" />
          Call
        </a>
        <a href={business.sms} className="btn btn-outline min-h-[52px] px-2" aria-label={`Text ${business.phone}`}>
          <MessageSquare size={18} aria-hidden="true" />
          Text
        </a>
        <button type="button" className="btn btn-primary min-h-[52px] px-2" onClick={() => open()} aria-haspopup="dialog">
          Free Estimate
          <ArrowRight size={18} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
