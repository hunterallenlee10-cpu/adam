"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { filters, gallery, type Filter } from "@/lib/gallery";
import { photos } from "@/lib/photos";

// Filterable masonry grid and a lightbox with keyboard and swipe.
export function Gallery() {
  const [filter, setFilter] = useState<Filter>("All");
  const [open, setOpen] = useState<number | null>(null);
  const items = filter === "All" ? gallery : gallery.filter((g) => g.tags.includes(filter as Exclude<Filter, "All">));
  const opener = useRef<HTMLButtonElement | null>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);

  const close = () => {
    setOpen(null);
    requestAnimationFrame(() => opener.current?.focus());
  };
  const step = (d: number) => setOpen((i) => (i === null ? i : (i + d + items.length) % items.length));

  useEffect(() => {
    if (open === null) return;
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    dialog.current?.querySelector<HTMLElement>("[data-close]")?.focus();
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "Tab" && dialog.current) {
        const els = Array.from(dialog.current.querySelectorAll<HTMLElement>("button"));
        const i = els.indexOf(document.activeElement as HTMLElement);
        e.preventDefault();
        els[(i + (e.shiftKey ? -1 : 1) + els.length) % els.length]?.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => {
      html.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open === null]);

  const current = open !== null ? photos[items[open].id] : null;

  return (
    <div>
      <div role="group" aria-label="Filter photos" className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className="min-h-11 rounded-full border border-border bg-surface px-4 text-[0.9375rem] font-medium text-ink transition-colors hover:border-primary aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-deep-text"
          >
            {f}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {items.length} photos{filter === "All" ? "" : ` in ${filter}`}.
      </p>

      <ul className="mt-8 columns-2 gap-3 sm:gap-4 md:columns-3 lg:columns-4">
        {items.map((g, i) => {
          const p = photos[g.id];
          return (
            <li key={g.id} className="mb-3 break-inside-avoid sm:mb-4">
              <figure>
                <button
                  type="button"
                  onClick={(e) => {
                    opener.current = e.currentTarget;
                    setOpen(i);
                  }}
                  className="group block w-full overflow-hidden rounded-[6px] bg-border"
                  aria-label={`Open photo: ${p.caption}`}
                >
                  <Image
                    src={p.src}
                    width={p.width}
                    height={p.height}
                    alt={p.alt}
                    sizes="(min-width: 1024px) 24vw, (min-width: 768px) 32vw, 50vw"
                    loading="lazy"
                    className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </button>
                <figcaption className="caption mt-2">{p.caption}</figcaption>
              </figure>
            </li>
          );
        })}
      </ul>

      {current &&
        open !== null &&
        createPortal(
          <div
            ref={dialog}
            role="dialog"
            aria-modal="true"
            aria-label={`Photo ${open + 1} of ${items.length}`}
            className="on-deep fixed inset-0 z-[80] flex flex-col bg-deep/95"
            onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchX.current === null) return;
              const dx = e.changedTouches[0].clientX - touchX.current;
              if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1);
              touchX.current = null;
            }}
          >
            <div className="flex items-center justify-between px-4 py-3 text-deep-muted">
              <span className="text-sm">
                {open + 1} / {items.length}
              </span>
              <button data-close type="button" onClick={close} className="grid h-11 w-11 place-items-center rounded-[6px] border border-deep-muted/40 text-deep-text" aria-label="Close photo">
                <X size={20} aria-hidden="true" />
              </button>
            </div>
            <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 sm:px-16">
              <Image
                key={current.id}
                src={current.src}
                width={current.width}
                height={current.height}
                alt={current.alt}
                sizes="100vw"
                className="max-h-full w-auto max-w-full rounded-[6px] object-contain"
                style={{ maxHeight: "calc(100dvh - 150px)" }}
              />
              <button type="button" onClick={() => step(-1)} className="absolute left-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-deep/80 text-deep-text sm:left-4" aria-label="Previous photo">
                <ArrowLeft size={22} aria-hidden="true" />
              </button>
              <button type="button" onClick={() => step(1)} className="absolute right-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-deep/80 text-deep-text sm:right-4" aria-label="Next photo">
                <ArrowRight size={22} aria-hidden="true" />
              </button>
            </div>
            <p className="px-4 py-4 text-center text-deep-text">{current.caption}</p>
          </div>,
          document.body,
        )}
    </div>
  );
}
