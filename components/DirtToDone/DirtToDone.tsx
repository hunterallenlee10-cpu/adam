"use client";

import Image from "next/image";
import { LazyMotion, MotionConfig, m, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { jobs } from "@/lib/jobs";
import { photos } from "@/lib/photos";
import { PlannerButton } from "@/components/ui/PlannerButton";

const loadFeatures = () => import("@/components/motion/features").then((r) => r.default);
const STEP_MS = 900;

/**
 * The show-stopper. Three real jobs, each a real slider with three or four stops.
 * Drag, tap a stop, arrow keys, Home and End, and Previous and Next all work.
 * The photo crossfades in about 300ms and the yellow grade line slides to the active stop.
 * The first time it scrolls into view it advances once through the stops, then rests on Done.
 * Reduced motion: no auto-advance and no crossfade.
 */
export function DirtToDone() {
  const [jobIdx, setJobIdx] = useState(0);
  const [stage, setStage] = useState(0);
  const [interacted, setInteracted] = useState(false);
  const reduce = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const timers = useRef<number[]>([]);
  const dragging = useRef(false);

  const job = jobs[jobIdx];
  const n = job.stages.length;
  const current = job.stages[stage];

  const stopAuto = useCallback(() => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  }, []);

  const userSet = useCallback(
    (i: number) => {
      stopAuto();
      setInteracted(true);
      setStage(Math.max(0, Math.min(n - 1, i)));
    },
    [n, stopAuto],
  );

  // Auto-advance once, the first time the section is in view.
  useEffect(() => {
    const el = root.current;
    if (!el || reduce) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        const steps = jobs[0].stages.length;
        for (let i = 1; i < steps; i++) {
          timers.current.push(window.setTimeout(() => setStage(i), STEP_MS * i));
        }
      },
      { threshold: 0.45 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      stopAuto();
    };
  }, [reduce, stopAuto]);

  function selectJob(i: number) {
    stopAuto();
    setInteracted(true);
    setJobIdx(i);
    setStage(0);
  }

  function onTabKey(e: React.KeyboardEvent, i: number) {
    let next = -1;
    if (e.key === "ArrowRight") next = (i + 1) % jobs.length;
    if (e.key === "ArrowLeft") next = (i - 1 + jobs.length) % jobs.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = jobs.length - 1;
    if (next < 0) return;
    e.preventDefault();
    selectJob(next);
    tabRefs.current[next]?.focus();
  }

  function onRailKey(e: React.KeyboardEvent) {
    const map: Record<string, number> = {
      ArrowRight: stage + 1,
      ArrowDown: stage + 1,
      ArrowLeft: stage - 1,
      ArrowUp: stage - 1,
      Home: 0,
      End: n - 1,
      PageDown: n - 1,
      PageUp: 0,
    };
    if (!(e.key in map)) return;
    e.preventDefault();
    userSet(map[e.key]);
  }

  function indexFromPointer(e: React.PointerEvent) {
    const rail = railRef.current;
    if (!rail) return stage;
    const r = rail.getBoundingClientRect();
    const vertical = r.height > r.width;
    const t = vertical ? (e.clientY - r.top) / r.height : (e.clientX - r.left) / r.width;
    return Math.max(0, Math.min(n - 1, Math.floor(t * n)));
  }

  function onPointerDown(e: React.PointerEvent) {
    dragging.current = true;
    railRef.current?.setPointerCapture(e.pointerId);
    userSet(indexFromPointer(e));
  }
  function onPointerMove(e: React.PointerEvent) {
    if (!dragging.current) return;
    const i = indexFromPointer(e);
    if (i !== stage) userSet(i);
  }
  function onPointerUp(e: React.PointerEvent) {
    dragging.current = false;
    railRef.current?.releasePointerCapture?.(e.pointerId);
  }

  const valueText = `Stage ${stage + 1} of ${n}, ${current.label.toLowerCase()}`;
  const fade = reduce ? { duration: 0 } : { duration: 0.3, ease: "easeOut" as const };
  const slide = reduce ? { duration: 0 } : { type: "spring" as const, stiffness: 420, damping: 38 };

  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">
        <div ref={root}>
          <div role="tablist" aria-label="Choose a job" className="flex flex-wrap gap-2">
            {jobs.map((j, i) => (
              <button
                key={j.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                role="tab"
                type="button"
                id={`dtd-tab-${j.id}`}
                aria-selected={i === jobIdx}
                aria-controls="dtd-panel"
                tabIndex={i === jobIdx ? 0 : -1}
                onClick={() => selectJob(i)}
                onKeyDown={(e) => onTabKey(e, i)}
                className="inline-flex min-h-11 items-center gap-2 rounded-[6px] border border-deep-muted/35 px-3.5 text-[0.9375rem] font-semibold text-deep-text transition-colors hover:border-deep-text aria-selected:border-accent aria-selected:bg-accent aria-selected:text-ink sm:px-4"
              >
                <span className="font-display wide">{j.letter}.</span>
                <span className="sm:hidden">{j.short}</span>
                <span className="hidden sm:inline">{j.title}</span>
              </button>
            ))}
          </div>

          <div
            id="dtd-panel"
            role="tabpanel"
            aria-labelledby={`dtd-tab-${job.id}`}
            className="mt-8 grid gap-8 lg:mt-10 lg:grid-cols-[minmax(0,520px)_minmax(0,1fr)] lg:gap-16 xl:grid-cols-[minmax(0,560px)_minmax(0,1fr)]"
          >
            <figure className="min-w-0">
              <div className="relative aspect-[3/4] w-full max-w-[560px] overflow-hidden rounded-[6px] bg-deep">
                {job.stages.map((s, i) => {
                  const p = photos[s.photo];
                  return (
                    <m.div
                      key={`${job.id}-${s.photo}`}
                      className="absolute inset-0"
                      initial={false}
                      animate={{ opacity: i === stage ? 1 : 0 }}
                      transition={fade}
                      aria-hidden={i !== stage}
                    >
                      <Image
                        src={p.src}
                        width={p.width}
                        height={p.height}
                        alt={p.alt}
                        sizes="(min-width: 1280px) 560px, (min-width: 1024px) 520px, 100vw"
                        loading="lazy"
                        className="h-full w-full object-cover"
                        style={{ objectPosition: p.pos ?? "50% 50%" }}
                      />
                    </m.div>
                  );
                })}
                <span className="absolute left-3 top-3 rounded-[4px] bg-deep/85 px-2.5 py-1 font-display text-sm font-extrabold text-accent wide">
                  {current.n} / {String(n).padStart(2, "0")}
                </span>
              </div>
              <figcaption className="caption mt-3 min-h-[2.8em]">{photos[current.photo].caption}</figcaption>
            </figure>

            <div className="flex min-w-0 flex-col">
              <h3 className="text-h3 text-deep-text">{job.title}</h3>

              {/* The rail: a real slider. Vertical on desktop, horizontal on phones. */}
              <div
                ref={railRef}
                role="slider"
                tabIndex={0}
                aria-label={`Stage of the ${job.title.toLowerCase()} job`}
                aria-valuemin={1}
                aria-valuemax={n}
                aria-valuenow={stage + 1}
                aria-valuetext={valueText}
                onKeyDown={onRailKey}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
                className="relative mt-6 grid cursor-pointer select-none touch-pan-y grid-flow-col auto-cols-fr rounded-[6px] border border-deep-muted/25 lg:mt-8 lg:touch-pan-x lg:grid-flow-row lg:auto-rows-fr lg:auto-cols-auto"
              >
                {/* Grade line marker, transform only. */}
                <m.span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-0 top-0 hidden w-full lg:block"
                  style={{ height: `${100 / n}%` }}
                  initial={false}
                  animate={{ y: `${stage * 100}%` }}
                  transition={slide}
                >
                  <span className="absolute inset-x-0 bottom-0 h-[2px] bg-accent shadow-[0_1px_0_rgb(0_0_0/0.3)]" />
                  <span className="absolute bottom-0 left-0 h-3 w-3 -translate-x-1/2 translate-y-[5px] rounded-full bg-accent" />
                </m.span>
                <m.span
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-0 left-0 block h-[3px] bg-accent lg:hidden"
                  style={{ width: `${100 / n}%` }}
                  initial={false}
                  animate={{ x: `${stage * 100}%` }}
                  transition={slide}
                />
                {job.stages.map((s, i) => (
                  <div
                    key={s.n}
                    className={`relative flex min-h-[64px] flex-col justify-center gap-1 px-3 py-3 transition-colors lg:min-h-[76px] lg:flex-row lg:items-center lg:justify-start lg:gap-4 lg:px-6 ${
                      i > 0 ? "border-l border-deep-muted/20 lg:border-l-0 lg:border-t" : ""
                    }`}
                  >
                    <span className={`font-display text-lg font-extrabold wide ${i <= stage ? "text-accent" : "text-deep-muted/60"}`}>
                      {s.n}
                    </span>
                    <span className={`text-[0.8125rem] font-semibold leading-tight sm:text-[0.9375rem] lg:text-base ${i === stage ? "text-deep-text" : "text-deep-muted"}`}>
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>

              <p className="mt-6 min-h-[3.2em] text-lead text-deep-text" aria-live={interacted ? "polite" : "off"}>
                <span className="sr-only">{valueText}. </span>
                {current.readout}
              </p>

              <div className="mt-4 flex items-center gap-3">
                <button
                  type="button"
                  className="btn btn-outline min-h-11 px-4"
                  onClick={() => userSet(stage - 1)}
                  disabled={stage === 0}
                  aria-label="Previous stage"
                >
                  <ArrowLeft size={18} aria-hidden="true" />
                  <span className="hidden sm:inline">Previous</span>
                </button>
                <button
                  type="button"
                  className="btn btn-outline min-h-11 px-4"
                  onClick={() => userSet(stage + 1)}
                  disabled={stage === n - 1}
                  aria-label="Next stage"
                >
                  <span className="hidden sm:inline">Next</span>
                  <ArrowRight size={18} aria-hidden="true" />
                </button>
                <span className="ml-1 text-sm text-deep-muted">
                  Drag the rail or use the arrow keys.
                </span>
              </div>

              <div className="mt-8 border-t border-deep-muted/20 pt-8">
                <PlannerButton trade="concrete">Get an estimate for a job like this</PlannerButton>
              </div>
            </div>
          </div>
        </div>
      </MotionConfig>
    </LazyMotion>
  );
}
