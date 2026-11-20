"use client";

import { X } from "lucide-react";

// Slim, static, dismissible. Not a ticker.
// DRAFT: confirm discount and financing terms.
export function DiscountBar() {
  function dismiss() {
    try {
      sessionStorage.setItem("apw-bar", "0");
    } catch {}
    document.documentElement.classList.add("bar-dismissed");
  }
  return (
    <div className="discount-bar bg-primary text-deep-text">
      <div className="container-x flex min-h-9 items-center justify-between gap-2 py-0.5 sm:py-1.5">
        <p className="text-[0.78125rem] font-medium leading-tight sm:text-sm sm:leading-snug">
          <span className="mr-2 inline-block h-2 w-2 translate-y-[-1px] rounded-full bg-accent" aria-hidden="true" />
          Senior and retired military discounts. Financing available.
        </p>
        <button
          type="button"
          onClick={dismiss}
          className="-mr-2 grid h-11 w-11 shrink-0 place-items-center rounded-[6px] text-deep-text/80 hover:text-deep-text on-deep"
          aria-label="Dismiss the discount message"
        >
          <X size={18} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
