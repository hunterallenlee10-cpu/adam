"use client";

// Placeholder until Phase 4 builds the full planner.
export default function PlannerModal({ open, onClose }: { open: boolean; preset?: string; onClose: () => void }) {
  if (!open) return null;
  return (
    <div role="dialog" aria-modal="true" aria-label="Estimate planner" className="fixed inset-0 z-50 grid place-items-center bg-ink/60">
      <div className="slab p-8">
        <p>Estimate planner</p>
        <button className="btn btn-green mt-4" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
