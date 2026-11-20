"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import type { Trade } from "@/lib/planner";
import { PlannerSteps } from "./PlannerSteps";

type Props = { open: boolean; preset?: Trade; onClose: () => void };

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

// Esc closes, focus is trapped, body scroll is locked. Full-screen sheet on phones, a panel on desktop.
export default function PlannerModal({ open, preset, onClose }: Props) {
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    const scrollbar = window.innerWidth - html.clientWidth;
    html.style.overflow = "hidden";
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;

    const t = requestAnimationFrame(() => {
      const target = panel.current?.querySelector<HTMLElement>("[data-autofocus]") ?? panel.current?.querySelector<HTMLElement>(FOCUSABLE);
      target?.focus();
    });

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panel.current) return;
      const items = Array.from(panel.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((el) => el.offsetParent !== null);
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || !panel.current.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (active === last || !panel.current.contains(active))) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(t);
      html.style.overflow = prevOverflow;
      document.body.style.paddingRight = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[70] flex items-stretch justify-center sm:items-center sm:p-6">
      <div className="absolute inset-0 bg-deep/75 backdrop-blur-[2px]" onClick={onClose} aria-hidden="true" />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="planner-title"
        className="relative flex h-[100dvh] w-full flex-col bg-surface sm:h-auto sm:max-h-[min(860px,calc(100dvh-48px))] sm:max-w-[640px] sm:rounded-[6px] sm:border sm:border-border"
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-3 sm:px-8">
          <p className="font-display text-lg font-extrabold text-primary wide">
            Free estimate planner
          </p>
          <button
            type="button"
            onClick={onClose}
            data-autofocus
            className="grid h-11 w-11 place-items-center rounded-[6px] border border-border text-ink hover:border-primary"
            aria-label="Close the estimate planner"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>
        <div className="flex min-h-0 flex-1 flex-col">
          <PlannerSteps preset={preset} titleId="planner-title" />
        </div>
      </div>
    </div>,
    document.body,
  );
}
