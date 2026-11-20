// FAQ answers condensed from his own FAQ, demolition, sediment control and sealcoating pages
// on adamspropertyworks.com. His facts, less padding.

export type QA = { q: string; a: string };

const licensed: QA = {
  q: "Are you licensed and insured?",
  a: "Yes. We are licensed, bonded and insured. Our crew arrives in uniform, and we hold every job to the same standard, from a small repair to commercial site prep. Ask us for proof of insurance at any time.",
};
const estimates: QA = {
  q: "Do you offer free estimates?",
  a: "Yes. Estimates are free, with no obligation, anywhere in St. Mary's, Calvert and Charles Counties. We visit the site, look at the ground and give you a written, itemised quote so you know exactly what to expect.",
};
const utilities: QA = {
  q: "How do you handle underground utilities before digging?",
  a: "We coordinate with Miss Utility (811) to mark all public lines before we break ground. We ask you to point out private lines, like well pipes, septic parts or an invisible dog fence, so we can work around them safely.",
};
const permits: QA = {
  q: "Will you help with permits?",
  a: "Yes. The homeowner is the legal applicant, but we provide the technical drawings, site plans and specifications the county offices in Leonardtown, Prince Frederick or La Plata ask for, so your permit goes through as smoothly as possible.",
};
const cost: QA = {
  q: "What does it cost?",
  a: "Every site is different, so we do not guess over the phone. The site visit is free and the quote is written and itemised, with no hidden fees. Financing is available, so a bigger job does not have to wait on a big check.",
};
const driveOn: QA = {
  q: "How long before I can drive on new asphalt or concrete?",
  // DRAFT: confirm the concrete guidance with the owner. His site gives asphalt and sealcoat times only.
  a: "Keep vehicles off new asphalt for at least 48 to 72 hours, a little longer in hot Maryland summers. A fresh sealcoat needs 24 to 48 hours. New concrete depends on the mix and the weather, so we give you a time for your slab at the walk-through.",
};
const stemWall: QA = {
  q: 'What is a stem retaining wall, and why might I need one?',
  a: 'A stem, or cantilever, retaining wall is an "L" shaped reinforced concrete wall that uses the weight of the soil itself to stay put. It suits Southern Maryland lots with steep slopes or tight property lines, where you need the most strength in the smallest footprint.',
};
const asphaltWait: QA = {
  q: "How long should I wait to drive on my new asphalt driveway?",
  a: 'Keep all vehicles off fresh asphalt for at least 48 to 72 hours. In extreme summer heat you may need a little longer, so the surface cures enough to avoid "power steering marks" and dents.',
};
const sealVsResurface: QA = {
  q: "What is the difference between sealcoating and resurfacing?",
  a: 'Sealcoating is a maintenance layer that protects the surface from sun and water. Resurfacing, or overlaying, adds a new 1.5 to 2 inch layer of asphalt over the existing base. If your driveway has deep "alligator" cracks or the base has failed, resurfacing or a full replacement is usually the better long-term fix.',
};
const drainage: QA = {
  q: "Why is drainage so important for concrete patios and walls?",
  a: "Heavy rain and high water tables here build up pressure behind walls and under slabs. We install drainage, including gravel backfill and weep holes, so water moves away from your structures instead of undermining them.",
};
const overOld: QA = {
  q: "Can I pour a new concrete patio over an old one?",
  a: 'We do not recommend it. New concrete over old, cracked concrete usually gets "reflective cracking", where the new layer copies the cracks below. We dig out the old material and start on a fresh, compacted stone base so it lasts.',
};
const largeScale: QA = {
  q: "Are you equipped for large-scale site development and clearing?",
  a: 'Yes. We run excavators and loaders for multi-acre clearing, grading and commercial foundation digs, and we take raw land to a "pad-ready" site for developers across Southern Maryland.',
};
const hoa: QA = {
  q: "Do you work with HOAs and property management firms?",
  // DRAFT: confirm HOA maintenance plans before launch.
  a: "We do. We offer maintenance plans for HOA communities, including sealcoating, asphalt patching and concrete curb repair. We work with boards to run projects in phases so residents are disrupted as little as possible.",
};
const blueprints: QA = {
  q: "Can you work from engineered blueprints and site plans?",
  // DRAFT: confirm before launch.
  a: 'Yes. Our team reads and builds to civil engineering plans. Whether it is a compaction spec for a commercial slab or a storm water pond to exact grade, we make sure every "shot" matches your plans.',
};
const safety: QA = {
  q: "What safety and compliance standards do you follow?",
  a: "We follow OSHA standards and Maryland environmental rules, especially for sediment and erosion control. Silt fence, stabilised construction entrances and the other best management practices go in first, to keep your site compliant and avoid fines.",
};
const prevailing: QA = {
  q: "Do you take bonded or prevailing wage work for municipal projects?",
  // DRAFT: confirm bonded and prevailing wage wording before launch.
  a: "Yes. We can handle bonded projects and know the reporting requirements for prevailing wage jobs in St. Mary's, Calvert and Charles Counties. We are happy to provide our certificate of insurance and bonding capacity on request during bidding.",
};

export const homeFaq: QA[] = [licensed, estimates, utilities, permits, cost, driveOn];

export const faqGroups: { title: string; items: QA[] }[] = [
  {
    title: "Residential",
    items: [licensed, estimates, utilities, stemWall, asphaltWait, sealVsResurface, drainage, overOld, permits],
  },
  {
    title: "Commercial",
    items: [largeScale, hoa, blueprints, safety, prevailing],
  },
];

export const comparison = {
  caption: "Residential and commercial work, side by side",
  head: ["", "Residential", "Commercial"],
  rows: [
    ["Primary focus", "Looks and longevity", "Durability and compliance"],
    ["Drainage", "Decorative and functional", "Engineered storm water management"],
    ["Paving", "Driveways and patios", "Parking lots and access roads"],
    ["Permitting", "Homeowner assistance", "Developer and contractor coordination"],
  ],
};

export const serviceFaq: Record<string, QA[]> = {
  excavation: [
    largeScale,
    {
      q: "Why is sediment control required for my project?",
      a: "Once vegetation comes off, bare soil washes into storm drains, streams and the neighbours' yards with the first heavy rain. Sediment control keeps it on your site, keeps the project within Maryland's rules and avoids fines and stop-work orders.",
    },
    {
      q: "What erosion control methods do you use?",
      a: "It depends on the slope and the soil. Silt fence and super silt fence, stabilised construction entrances to stop track-out, straw wattles and erosion blankets on slopes, and diversion berms to send runoff to a stable outlet.",
    },
  ],
  concrete: [stemWall, drainage, overOld],
  demolition: [
    {
      q: "How do you tear down a building without a wrecking ball?",
      a: "We use excavators with hydraulic attachments like shears, grapples and hammers, so the operator takes the structure apart piece by piece. It is safer and quieter, and far less likely to throw debris or damage the property next door.",
    },
    {
      q: "Do I need to handle the permits for the demolition?",
      a: "Requirements vary across St. Mary's, Calvert and Charles Counties. The owner is responsible for the property, but we guide you through the local process and make sure water, electric and gas disconnects are verified before we start.",
    },
    {
      q: "What happens to the debris once the structure is down?",
      a: 'We sort it on site, separating metal, concrete and clean wood from general waste, and haul it to Maryland-certified disposal or recycling facilities. Then we run a "magnet sweep" so your lot is free of nails and metal fragments.',
    },
  ],
  asphalt: [
    {
      q: "How long do I stay off my driveway after sealcoating?",
      a: "Keep vehicles off for at least 24 to 48 hours. You can usually walk on it after 4 to 8 hours, but keep pets and bikes off until the next day so nothing tracks or scuffs.",
    },
    {
      q: 'Why are there tyre marks or "scuffing" on my fresh sealcoat?',
      a: 'That is normal while it cures. The sealer stays flexible for the first few weeks, so turning the wheel while the car is standing still can leave "power steering marks". They are cosmetic and fade as the sealer hardens. Keep the car moving while you turn.',
    },
    sealVsResurface,
  ],
};
