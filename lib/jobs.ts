import type { PhotoId } from "./photos";

// The three real job sequences for Dirt to Done. Captions come from the photo map only.

export type Stage = {
  n: string;
  label: string;
  readout: string;
  photo: PhotoId;
};

export type Job = {
  id: "a" | "b" | "c";
  letter: string;
  title: string;
  short: string;
  stages: Stage[];
};

const S = {
  dig: { n: "01", label: "Dig and grade", readout: "We excavate, cut the pad to grade and compact a stone base." },
  form: { n: "02", label: "Form and reinforce", readout: "Forms set to the laser. Rebar or wire mesh down." },
  pour: { n: "03", label: "Pour and finish", readout: "The pour, screeded and finished by hand." },
  done: { n: "04", label: "Done", readout: "Control joints cut. Site cleaned. Ready to use." },
};

export const jobs: Job[] = [
  {
    id: "a",
    letter: "A",
    title: "Waterfront slab on the Chesapeake Bay",
    short: "Waterfront slab",
    stages: [
      { ...S.dig, photo: "p14" },
      { ...S.form, photo: "p16" },
      { ...S.pour, photo: "p17" },
      { ...S.done, photo: "p18" },
    ],
  },
  {
    id: "b",
    letter: "B",
    title: "Neighbourhood sidewalk",
    short: "Sidewalk",
    stages: [
      { ...S.dig, photo: "p19" },
      { ...S.form, readout: "Forms set to the laser, then the concrete comes down the chute.", photo: "p20" },
      { ...S.pour, photo: "p21" },
      { ...S.done, photo: "p22" },
    ],
  },
  {
    id: "c",
    letter: "C",
    title: "Walkway and steps with a decorative coating",
    short: "Walkway",
    stages: [
      { ...S.dig, readout: "We dig out the old walk and compact a stone base.", photo: "p27" },
      { ...S.form, photo: "p28" },
      { n: "03", label: "Done", readout: "Poured, finished and coated. Site cleaned. Ready to use.", photo: "p29" },
    ],
  },
];
