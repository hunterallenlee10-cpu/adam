import { towns } from "./business";

export type Trade = "excavation" | "concrete" | "demolition" | "asphalt" | "unsure";

export const trades: { id: Trade; label: string; hint: string }[] = [
  { id: "excavation", label: "Excavation and site work", hint: "Clearing, grading, drainage, footers" },
  { id: "concrete", label: "Concrete", hint: "Slabs, driveways, patios, walks, coatings" },
  { id: "demolition", label: "Demolition", hint: "Tear-downs and concrete removal" },
  { id: "asphalt", label: "Asphalt and sealcoating", hint: "Sealcoating, crack filling, repair" },
  { id: "unsure", label: "Not sure, come take a look", hint: "We will tell you what it needs" },
];

// Chips per trade, drawn from his service list (BUILD-SPEC.md section 1).
export const tradeChips: Record<Trade, string[]> = {
  excavation: [
    "Site prep",
    "Land clearing",
    "Stump removal",
    "Grading and levelling",
    "Footer or foundation dig",
    "Drainage or French drain",
    "Storm water",
    "Sediment control",
    "Trenching or utilities",
    "Culvert",
    "Road or driveway",
  ],
  concrete: [
    "Driveway",
    "Patio",
    "Slab or pad",
    "Sidewalk or steps",
    "Pool deck",
    "Retaining wall",
    "Repair or grinding",
    "Coating",
  ],
  demolition: [
    "House",
    "Mobile home",
    "Barn or shed",
    "Small commercial building",
    "Part of a building",
    "Concrete or hardscape removal",
    "Debris hauling and clean up",
  ],
  asphalt: ["Sealcoating", "Crack filling", "Repair", "Driveway", "Parking lot"],
  unsure: [
    "Water or drainage problem",
    "Something to tear down",
    "New concrete",
    "Worn asphalt",
    "Land to clear",
  ],
};

export const propertyTypes = ["Residential", "Commercial", "HOA and property management"] as const;

export const timings = ["As soon as possible", "In the next month or two", "Just planning"] as const;

export const townOptions = [...towns, "Other"] as const;

export function tradeLabel(t: Trade) {
  return trades.find((x) => x.id === t)?.label ?? "";
}
