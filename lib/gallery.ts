import type { PhotoId } from "./photos";

// Our Work. Real photos only, captions from the photo map. No stock images here, ever.

export const filters = ["All", "Excavation", "Concrete", "Demolition", "Drainage and erosion", "Fleet"] as const;
export type Filter = (typeof filters)[number];

export const gallery: { id: PhotoId; tags: Exclude<Filter, "All">[] }[] = [
  { id: "p01", tags: ["Demolition"] },
  { id: "p15", tags: ["Excavation"] },
  { id: "p09", tags: ["Concrete"] },
  { id: "p10", tags: ["Excavation"] },
  { id: "p08", tags: ["Demolition"] },
  { id: "p30", tags: ["Concrete"] },
  { id: "p25", tags: ["Drainage and erosion"] },
  { id: "p02", tags: ["Fleet"] },
  { id: "p11", tags: ["Excavation", "Drainage and erosion"] },
  { id: "p23", tags: ["Concrete"] },
  { id: "p32", tags: ["Drainage and erosion"] },
  { id: "p05", tags: ["Fleet", "Excavation"] },
  { id: "p33", tags: ["Demolition"] },
  { id: "p24", tags: ["Concrete", "Drainage and erosion"] },
  { id: "p13", tags: ["Drainage and erosion", "Excavation"] },
  { id: "p31", tags: ["Concrete"] },
  { id: "p26", tags: ["Drainage and erosion"] },
  { id: "p04", tags: ["Fleet"] },
  { id: "p07", tags: ["Drainage and erosion", "Excavation"] },
  { id: "p36", tags: ["Concrete"] },
  { id: "p06", tags: ["Concrete"] },
  { id: "p03", tags: ["Fleet", "Excavation"] },
  { id: "p35", tags: ["Concrete"] },
  { id: "p12", tags: ["Drainage and erosion", "Excavation"] },
  { id: "p40", tags: ["Excavation"] },
  { id: "p37", tags: ["Concrete"] },
  { id: "p38", tags: ["Drainage and erosion", "Fleet"] },
  { id: "p39", tags: ["Concrete"] },
];
