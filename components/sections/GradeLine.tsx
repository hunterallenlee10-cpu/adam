"use client";

import { LazyMotion, MotionConfig, m, useAnimate } from "motion/react";
import { useEffect, useLayoutEffect, useRef } from "react";
import { LevelMark } from "@/components/ui/BrandIcons";

const loadFeatures = () => import("@/components/motion/features").then((r) => r.default);

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

const SWEEP = 1.1;
const EASE: [number, number, number, number] = [0.6, 0.02, 0.25, 1];

type Props = {
  eyebrow: string;
  eyebrowTail: string;
  // Four deliberate lines, two phrases: "From the / first dig / to the / final pour."
  lines: [string, string, string, string];
};

/**
 * The signature motion. On load a 2px yellow line sweeps left to right across the full width
 * at the baseline of the headline. The headline starts tilted 1.2 degrees and settles level as
 * the line passes, and the bubble in the level mark centres at the same moment.
 * Transform only. The text is visible from the first instant. Plays once.
 * With reduced motion, CSS in globals.css pins everything to the final state.
 */
export function GradeLine({ eyebrow, eyebrowTail, lines }: Props) {
  const [scope, animate] = useAnimate();
  const lineRef = useRef<HTMLSpanElement>(null);
  const anchorRef = useRef<HTMLSpanElement>(null);

  // Stretch the rule from the left edge of the hero to its right edge.
  useIsoLayoutEffect(() => {
    function fit() {
      const line = lineRef.current;
      const anchor = anchorRef.current;
      const hero = anchor?.closest("[data-hero]") as HTMLElement | null;
      if (!line || !anchor || !hero) return;
      const a = anchor.getBoundingClientRect();
      const h = hero.getBoundingClientRect();
      line.style.left = `${h.left - a.left}px`;
      line.style.width = `${h.width}px`;
    }
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    let cancelled = false;
    // Start once the display face is in, so the owner actually sees the sweep.
    const ready = document.fonts?.ready ?? Promise.resolve();
    ready.then(() => {
      setTimeout(() => {
        if (cancelled) return;
        animate(".gl-line", { scaleX: [0, 1] }, { duration: SWEEP, ease: EASE });
        animate(".gl-head", { rotate: [-1.2, 0] }, { duration: 0.75, delay: SWEEP * 0.42, ease: [0.3, 1.3, 0.5, 1] });
        animate(".gl-bubble", { x: [-9, 0] }, { duration: 0.75, delay: SWEEP * 0.42, ease: [0.3, 1.4, 0.5, 1] });
        animate(".gl-tag", { scaleX: [0, 1] }, { duration: 0.3, delay: SWEEP * 0.95, ease: "easeOut" });
      }, 250);
    });
    return () => {
      cancelled = true;
    };
  }, [animate]);

  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">
        <span ref={scope} className="block">
          <span className="flex items-start gap-3 text-[0.6875rem] font-semibold uppercase leading-[1.5] tracking-[0.08em] text-muted sm:text-label sm:tracking-[0.14em]">
            <span className="relative mt-[1px] inline-flex shrink-0 text-primary" aria-hidden="true">
              <LevelMark />
              <m.span
                className="gl-bubble absolute left-[19.5px] top-[4.5px] block h-[7px] w-[9px] rounded-full bg-accent"
                style={{ x: -9 }}
              />
            </span>
            <span>
              {eyebrow} <span className="whitespace-nowrap">{eyebrowTail}</span>
            </span>
          </span>
          {/* The rule sits in a level wrapper, so it never tilts with the headline. */}
          <span
            ref={anchorRef}
            className="relative mt-4 block font-display text-[clamp(2.75rem,12.6vw,3.25rem)] leading-[0.98] sm:mt-6 sm:text-[clamp(3.25rem,9vw,4.75rem)] lg:text-[clamp(3.4rem,5.35vw,5.75rem)]"
          >
            <m.span
              className="gl-head relative z-10 block font-extrabold italic text-primary"
              style={{ rotate: -1.2, transformOrigin: "0% 100%", fontVariationSettings: '"wdth" 112', letterSpacing: "-0.02em" }}
            >
              <span className="block">{lines[0]}</span>
              <span className="block">{lines[1]}</span>
              <span className="block">{lines[2]}</span>
              <span className="block">{lines[3]}</span>
            </m.span>
            <m.span
              ref={lineRef}
              aria-hidden="true"
              className="gl-line pointer-events-none absolute z-0 block h-[2px] bg-accent shadow-[0_1px_0_rgb(0_0_0/0.28)]"
              style={{ left: "-100vw", width: "300vw", bottom: "0.15em", scaleX: 0, transformOrigin: "0% 50%" }}
            >
              <m.span
                className="gl-tag after:content-[attr(data-tag)] absolute bottom-[6px] right-4 hidden rounded-[3px] bg-accent px-1.5 py-0.5 font-sans text-[0.6875rem] font-semibold not-italic leading-none tracking-[0.14em] text-ink lg:block xl:right-6"
                style={{ scaleX: 0, transformOrigin: "100% 50%" }}
                data-tag="GRADE ±0.00"
              />
            </m.span>
          </span>
        </span>
      </MotionConfig>
    </LazyMotion>
  );
}
