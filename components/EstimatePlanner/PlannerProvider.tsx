"use client";

import dynamic from "next/dynamic";
import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import type { Trade } from "@/lib/planner";

type PlannerState = {
  isOpen: boolean;
  open: (trade?: Trade) => void;
  close: () => void;
};

const PlannerContext = createContext<PlannerState | null>(null);

// The modal and its steps load the first time someone opens the planner.
const PlannerModal = dynamic(() => import("./PlannerModal"), { ssr: false });

export function PlannerProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [preset, setPreset] = useState<Trade | undefined>(undefined);
  const [session, setSession] = useState(0);
  const opener = useRef<HTMLElement | null>(null);

  const open = useCallback((trade?: Trade) => {
    opener.current = (document.activeElement as HTMLElement) ?? null;
    setPreset(trade);
    setSession((s) => s + 1);
    setHasOpened(true);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    // Return focus to whatever opened the planner.
    requestAnimationFrame(() => opener.current?.focus?.());
  }, []);

  const value = useMemo(() => ({ isOpen, open, close }), [isOpen, open, close]);

  return (
    <PlannerContext.Provider value={value}>
      {children}
      {hasOpened && <PlannerModal key={session} open={isOpen} preset={preset} onClose={close} />}
    </PlannerContext.Provider>
  );
}

export function usePlanner() {
  const ctx = useContext(PlannerContext);
  if (!ctx) throw new Error("usePlanner must be used inside PlannerProvider");
  return ctx;
}
