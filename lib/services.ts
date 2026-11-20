import type { PhotoId } from "./photos";
import type { Trade } from "./planner";

// The four service pages. One template, driven by this data. Facts from BUILD-SPEC.md section 1
// and his own service pages; copy trimmed to half.

export type Block = {
  id: string;
  title: string;
  body: string;
  list?: string[];
  photos?: PhotoId[];
  pairCaption?: [string, string];
  kind?: "photos" | "beforeAfter" | "placeholder" | "steps" | "table" | "icon" | "swatch";
  placeholder?: string;
  steps?: { title: string; body: string }[];
  table?: { caption: string; head: string[]; rows: string[][] };
  note?: string;
  icon?: "truck" | "sun";
  mainAspect?: string;
  mainPos?: string;
  mainZoom?: { scale: number; origin: string };
};

export type Service = {
  slug: "excavation" | "concrete" | "demolition" | "asphalt-sealcoating";
  trade: Trade;
  faqKey: "excavation" | "concrete" | "demolition" | "asphalt";
  title: string;
  description: string;
  crumb: string;
  tick: string;
  h1: string;
  intro: string;
  heroPhoto: PhotoId;
  heroPos?: string;
  heroCaption: string;
  facts: string[];
  blocks: Block[];
  quote?: { text: string; sub?: string; photo?: PhotoId; caption?: string };
  tool: "sediment" | "concrete" | "sealcoat" | "checklist";
  related: Service["slug"][];
  cta: string;
  schemaName: string;
  serviceOutput: string[];
};

export const services: Record<Service["slug"], Service> = {
  excavation: {
    slug: "excavation",
    trade: "excavation",
    faqKey: "excavation",
    title: "Excavation and Site Work in Southern MD | DL Adams",
    description:
      "Site prep, land clearing, grading, drainage, sediment control and trenching in St. Mary's, Calvert and Charles Counties. Call or text (301) 994-1010.",
    crumb: "Excavation",
    tick: "Excavation and site work",
    h1: "Excavation and site work in Southern Maryland.",
    intro:
      "Clearing, grading, drainage and utilities by an owner-operated crew that knows the Southern Maryland clay. We dig it, drain it and leave it ready for what comes next.",
    heroPhoto: "p03",
    heroPos: "40% 60%",
    heroCaption: "The Adams truck and Kubota on a freshly graded lot.",
    facts: ["Miss Utility (811) before every dig", "Grading to plan", "Pad-ready sites"],
    blocks: [
      {
        id: "site-prep",
        title: "Site prep and land clearing",
        body: "Brush and trees out, stumps grubbed, and a clean, stable lot left behind. From a garage pad to multi-acre clearing.",
        list: ["Site prep", "Land clearing", "Brush and tree clearing", "Stump removal and grubbing", "Storm clean up"],
        photos: ["p05", "p41"],
      },
      {
        id: "grading",
        title: "Grading and foundations",
        body: "We cut and level to grade, dig footers and foundations, and build the base for roads and driveways.",
        list: ["Grading and levelling", "Footer and foundation digs", "Road installation and repair"],
        photos: ["p15"],
      },
      {
        id: "drainage",
        title: "Drainage and storm water",
        body: "It's not a water problem. It's a grade problem. We shape the ground so water leaves your property the way it should, and pipe it where the ground cannot.",
        list: ["French drains", "Curtain drains and swales", "Storm water management", "Pipe culvert replacement"],
        photos: ["p13", "p07", "p11"],
      },
      {
        id: "erosion",
        title: "Sediment and erosion control",
        body: "Silt fence, stabilised entrances, inlet protection, matting and riprap, built to hold through a Southern Maryland summer storm and keep your site out of trouble with inspectors.",
        list: ["Silt fence and super silt fence", "Stabilised construction entrances", "Inlet protection", "Erosion matting and straw", "Riprap aprons"],
        photos: ["p25", "p32"],
      },
      {
        id: "utilities",
        title: "Trenching and duct banks",
        body: "Utility site work for homes and commercial jobs, from a single trench to a duct bank of conduits on spacers.",
        list: ["Trenching", "Utility site work", "Duct banks"],
        photos: ["p10"],
      },
    ],
    quote: { text: "We know the Southern Maryland clay.", photo: "p38", caption: "Headwall on fresh straw matting, our truck behind." },
    tool: "sediment",
    related: ["concrete", "demolition"],
    cta: "Tell us what needs clearing, grading or draining.",
    schemaName: "Excavation and site work",
    serviceOutput: ["Site prep", "Land clearing", "Grading", "Drainage", "Sediment control", "Trenching"],
  },

  concrete: {
    slug: "concrete",
    trade: "concrete",
    faqKey: "concrete",
    title: "Concrete Contractor in Southern MD | Adams Property Works",
    description:
      "Slabs, driveways, patios, walks, curbs, steps, pool decks, grinding and coatings across St. Mary's, Calvert and Charles Counties. Call or text (301) 994-1010.",
    crumb: "Concrete",
    tick: "Concrete",
    h1: "Concrete contractor in Southern Maryland.",
    intro:
      "Slabs, driveways, patios, walks, walls and coatings. We dig and prep the base ourselves, because a slab is only as good as what is under it.",
    heroPhoto: "p18",
    heroPos: "50% 50%",
    heroCaption: "Finished broom-finish slab with control joints, shoreline behind.",
    facts: ["We prep our own base", "Forms set to the laser", "Control joints cut"],
    blocks: [
      {
        id: "slabs",
        title: "Slabs, pads and driveways",
        body: "Garage floors, pads, driveways and patios, on a compacted stone base with mesh or rebar, then poured and finished by hand.",
        list: ["Slabs", "Garage floors and pads", "Driveways", "Patios", "Footings and foundations", "Stem walls and retaining walls"],
        photos: ["p09", "p39"],
      },
      {
        id: "walks",
        title: "Walks, curbs, steps and ADA ramps",
        body: "Sidewalks, curb and gutter, steps and ramps, with crisp joints and the ground stabilised when we leave.",
        list: ["Sidewalks", "Curbs", "Steps", "ADA ramps", "Drainage"],
        photos: ["p22", "p23", "p36"],
      },
      {
        id: "commercial",
        title: "Commercial entrances",
        body: "Storefront entrances and walks, prepped, formed and poured. Before and after, same entrance.",
        list: ["Repairs", "Saw cutting", "Joint repair"],
        kind: "beforeAfter",
        photos: ["p34", "p35"],
        pairCaption: ["Before: mesh and forms set.", "After: the fresh slab finished."],
      },
      {
        id: "pool-decks",
        title: "Pool decks",
        body: "Old deck out, ground dug and prepped, new deck poured around the pool. A non slip coating is available on top.",
        list: ["Pool deck removal and replacement", "Non slip pool deck coatings"],
        photos: ["p06"],
      },
      {
        id: "coatings",
        title: "Grinding, coatings and decorative finishes",
        body: "We grind the surface with the vacuum hooked up, then coat it. Speckled finishes, colour bands at the steps, and floors that clean up easily.",
        list: ["Grinding", "Epoxy", "Chip flake", "Quartz", "Cementitious overlays", "Decorative finishes"],
        photos: ["p30", "p29", "p37"],
      },
    ],
    quote: {
      text: "PREP IS THE KEY.",
      sub: "A slab is only as good as the ground under it. We dig, compact and form it ourselves, so nothing is left to chance before the truck shows up.",
    },
    tool: "concrete",
    related: ["excavation", "asphalt-sealcoating"],
    cta: "Tell us what you want poured.",
    schemaName: "Concrete contracting",
    serviceOutput: ["Slabs", "Driveways", "Patios", "Sidewalks", "Curbs", "Steps", "Pool decks", "Coatings"],
  },

  demolition: {
    slug: "demolition",
    trade: "demolition",
    faqKey: "demolition",
    title: "Demolition Contractor in Southern MD | Adams Property Works",
    description:
      "Controlled tear-downs of homes, mobile homes, barns and small commercial buildings, plus concrete removal and hauling in Southern MD. Call (301) 994-1010.",
    crumb: "Demolition",
    tick: "Demolition",
    h1: "Demolition contractor in Southern Maryland.",
    intro:
      "Controlled tear-downs of homes, mobile homes, barns and small commercial buildings. We take it apart piece by piece, sort what we can, haul the rest and leave a clean lot.",
    heroPhoto: "p01",
    heroPos: "42% 60%",
    heroCaption: "Our Komatsu PC120 taking down a single-storey house.",
    facts: ["Hydraulic attachments, no wrecking ball", "Debris sorted and hauled", "Magnet sweep at the end"],
    blocks: [
      {
        id: "tear-downs",
        title: "Full structure tear-downs",
        body: "Homes, mobile homes, aging barns and small commercial buildings, from site prep to the final haul. Or just the garage, shed or damaged wing, with the rest left standing.",
        list: ["Homes", "Mobile homes", "Barns", "Small commercial buildings", "Selective demolition"],
        photos: ["p01"],
        // A tight crop on the bucket and the falling wall, so it does not repeat the hero.
        mainAspect: "aspect-[4/3]",
        mainZoom: { scale: 1.7, origin: "38% 62%" },
      },
      {
        id: "commercial",
        title: "Commercial demolition",
        body: "Long, low commercial buildings taken down in sections, with the operator in control of every piece.",
        list: ["Small commercial buildings", "Selective demolition"],
        photos: ["p08"],
        // Landscape crop from the top of the frame keeps the side mirror out.
        mainAspect: "aspect-[16/10]",
        mainPos: "50% 4%",
      },
      {
        id: "concrete-removal",
        title: "Concrete and hardscape removal",
        body: "We do not use wrecking balls. A hydraulic breaker on the excavator arm takes out old concrete right next to a building, without damaging what stays.",
        list: ["Driveways and sidewalks", "Old pool decks", "Retaining walls and foundations"],
        photos: ["p33"],
      },
      {
        id: "clean-up",
        title: "Sorting, hauling and a clean lot",
        body: "Metal, concrete and clean wood are sorted from general waste and hauled to the right facilities. Then light grading, so the lot is stable and ready for what comes next.",
        list: ["Debris sorting", "Hauling", "Site clean up", "Light grading"],
        kind: "icon",
        icon: "truck",
      },
    ],
    quote: {
      text: "Precision over force. We do not use wrecking balls.",
      sub: "Hydraulic shears, grapples and hammers let the operator take a structure apart piece by piece. Safer, quieter, and kinder to the house next door.",
    },
    tool: "checklist",
    related: ["excavation", "concrete"],
    cta: "Tell us what needs to come down.",
    schemaName: "Demolition",
    serviceOutput: ["Structure tear-downs", "Selective demolition", "Concrete removal", "Debris hauling", "Site clean up"],
  },

  "asphalt-sealcoating": {
    slug: "asphalt-sealcoating",
    trade: "asphalt",
    faqKey: "asphalt",
    title: "Asphalt Sealcoating in Southern MD | Adams Property Works",
    description:
      "Asphalt sealcoating, crack filling, repair and maintenance for driveways and parking lots in St. Mary's, Calvert and Charles Counties. Call (301) 994-1010.",
    crumb: "Asphalt and Sealcoating",
    tick: "Asphalt and sealcoating",
    h1: "Asphalt sealcoating in Southern Maryland.",
    intro:
      "Sealcoating, crack filling, repair and maintenance for driveways and parking lots. Think of sealcoat as sunscreen for your pavement.",
    heroPhoto: "p04",
    heroPos: "62% 50%",
    heroCaption: "Our black tri-axle dump truck on fresh asphalt.",
    facts: ["Hand-brushed edges on driveways", "Hot rubberised crack filler", "Barricaded while it cures"],
    blocks: [
      {
        id: "why-sealcoat",
        title: "Why sealcoat",
        body: "Sun dries out the oils that keep asphalt flexible. It turns grey, goes brittle and starts to crack. Sealcoat stops that.",
        list: ["Blocks UV damage", "Resists oil, gas and salt", "Seals out water before winter freeze and thaw", "Brings back the dark finish"],
        kind: "swatch",
      },
      {
        id: "process",
        title: "Our process",
        body: "We do not just paint your driveway. A sealcoat that lasts is mostly preparation.",
        kind: "steps",
        steps: [
          { title: "Cleaning", body: "Blowers, wire brooms and sometimes a pressure washer. Sealer will not bond to dirt." },
          { title: "Oil spot priming", body: "Primer on oil and gas stains, or the sealer peels off them." },
          { title: "Crack filling", body: "Commercial-grade hot rubberised filler keeps water out of the base." },
          { title: "Application", body: "Hand-brushed on driveways for a thick, clean edge. Sprayed on large lots for an even coat." },
          { title: "Barricading", body: "High-visibility tape keeps traffic off while it cures." },
        ],
      },
      {
        id: "residential-commercial",
        title: "Residential and commercial",
        body: "Driveways and parking lots need different methods. Here is how they compare.",
        kind: "table",
        table: {
          caption: "Residential driveways compared with commercial parking lots",
          head: ["", "Residential driveways", "Commercial parking lots"],
          rows: [
            ["Application", "Hand-brushed (squeegee)", "Spray or dual application"],
            ["Main goal", "Looks and protection", "Safety, compliance and longevity"],
            ["Drying time", "24 to 48 hours", "Done in phases to keep the business open"],
            ["Crack treatment", "Individual crack sealing", "Mass crack filling and patching"],
          ],
        },
      },
      {
        id: "when",
        title: "When to sealcoat",
        body: "New asphalt is sealed 12 to 24 months after it goes down, once it has cured. After that, reseal every 2 to 3 years. We seal at 50°F and rising, with no rain in the 24-hour forecast.",
        list: ["New asphalt: 12 to 24 months after installation", "Then every 2 to 3 years", "50°F and rising, no rain for 24 hours"],
        kind: "icon",
        icon: "sun",
      },
    ],
    tool: "sealcoat",
    related: ["concrete", "excavation"],
    cta: "Tell us about your driveway or lot.",
    schemaName: "Asphalt sealcoating and repair",
    serviceOutput: ["Sealcoating", "Crack filling", "Asphalt repair", "Maintenance"],
  },
};

export const serviceList = Object.values(services);
