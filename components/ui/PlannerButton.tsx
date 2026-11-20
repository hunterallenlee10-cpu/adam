"use client";

import { ArrowRight } from "lucide-react";
import { usePlanner } from "@/components/EstimatePlanner/PlannerProvider";
import type { Trade } from "@/lib/planner";

type Props = {
  trade?: Trade;
  className?: string;
  children?: React.ReactNode;
  arrow?: boolean;
};

// Anything that opens the planner is a <button>.
export function PlannerButton({ trade, className = "btn btn-primary", children = "Get My Free Estimate", arrow = true }: Props) {
  const { open } = usePlanner();
  return (
    <button type="button" className={className} onClick={() => open(trade)} aria-haspopup="dialog">
      {children}
      {arrow && <ArrowRight aria-hidden="true" size={18} strokeWidth={2} />}
    </button>
  );
}
