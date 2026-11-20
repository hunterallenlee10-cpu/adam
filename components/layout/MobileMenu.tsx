"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Menu, MessageSquare, Phone, X } from "lucide-react";
import { business } from "@/lib/business";
import { usePlanner } from "@/components/EstimatePlanner/PlannerProvider";

const sheetLinks = [
  { href: "/excavation", label: "Excavation and site work" },
  { href: "/concrete", label: "Concrete" },
  { href: "/demolition", label: "Demolition" },
  { href: "/asphalt-sealcoating", label: "Asphalt and sealcoating" },
  { href: "/our-work", label: "Our work" },
  { href: "/about", label: "About" },
  { href: "/service-area", label: "Service area" },
  { href: "/faq", label: "FAQ" },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const sheet = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const { open: openPlanner } = usePlanner();


  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.dataset.sheet = "open";
    const first = sheet.current?.querySelector<HTMLElement>("a, button");
    first?.focus();
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
      if (e.key === "Tab" && sheet.current) {
        const items = Array.from(sheet.current.querySelectorAll<HTMLElement>("a, button"));
        const firstEl = items[0];
        const lastEl = items[items.length - 1];
        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      delete document.documentElement.dataset.sheet;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        ref={trigger}
        type="button"
        className="grid h-11 w-11 place-items-center rounded-[6px] border border-border text-ink lg:hidden"
        aria-label="Open the menu"
        aria-expanded={open}
        aria-controls="mobile-sheet"
        onClick={() => setOpen(true)}
      >
        <Menu size={22} aria-hidden="true" />
      </button>
      {open &&
        createPortal(
          <div
            id="mobile-sheet"
            ref={sheet}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-bg lg:hidden"
          >
            <div className="container-x flex h-16 items-center justify-between border-b border-border">
              <span className="font-display text-xl font-extrabold text-primary wide">ADAMS</span>
              <button
                type="button"
                className="grid h-11 w-11 place-items-center rounded-[6px] border border-border"
                aria-label="Close the menu"
                onClick={() => {
                  setOpen(false);
                  trigger.current?.focus();
                }}
              >
                <X size={22} aria-hidden="true" />
              </button>
            </div>
            <nav aria-label="Menu" className="container-x flex-1 py-4">
              <ul>
                <li>
                  <Link href="/" onClick={() => setOpen(false)} className="flex min-h-14 items-center border-b border-border font-display text-2xl font-extrabold wide-sm">
                    Home
                  </Link>
                </li>
                {sheetLinks.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      aria-current={pathname === l.href ? "page" : undefined}
                      className="flex min-h-14 items-center border-b border-border font-display text-2xl font-extrabold wide-sm aria-[current=page]:text-primary"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="container-x grid gap-3 pb-8 pt-2">
              <button
                type="button"
                className="btn btn-primary w-full"
                onClick={() => {
                  setOpen(false);
                  openPlanner();
                }}
              >
                Get My Free Estimate
              </button>
              <div className="grid grid-cols-2 gap-3">
                <a href={business.tel} className="btn btn-outline w-full">
                  <Phone size={18} aria-hidden="true" /> Call
                </a>
                <a href={business.sms} className="btn btn-outline w-full">
                  <MessageSquare size={18} aria-hidden="true" /> Text
                </a>
              </div>
              <p className="text-center text-sm text-muted">
                {business.phone}. {business.callOrText}.
              </p>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
