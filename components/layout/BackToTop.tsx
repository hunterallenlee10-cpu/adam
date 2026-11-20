"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

// Appears after one and a half screens.
export function BackToTop() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 1.5);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function toTop() {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    const main = document.getElementById("main");
    main?.focus({ preventScroll: true });
  }

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Back to top"
      className={`fixed bottom-24 right-4 z-30 grid h-12 w-12 place-items-center rounded-[6px] border border-border bg-surface text-primary transition-opacity duration-200 hover:border-primary lg:bottom-8 lg:right-8 ${
        shown ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      tabIndex={shown ? 0 : -1}
      aria-hidden={!shown}
    >
      <ArrowUp size={20} aria-hidden="true" />
    </button>
  );
}
