// Every fact on the site comes from this file. Invent nothing.
// Source: BUILD-SPEC.md section 1, cross-checked against adamspropertyworks.com.

export const business = {
  name: "Adams Property Works",
  dba: "DL Adams",
  // DRAFT: confirm the owner's name and how he wants it shown. Until confirmed the site says "the owner".
  ownerName: "David L. Adams",
  ownerConfirmed: false,

  // Service-area business. No street address anywhere (two directories list two different ones).
  locality: "Great Mills",
  region: "MD",
  regionName: "Maryland",
  postalCode: "20634",
  napLine: "Adams Property Works, Great Mills, MD 20634, (301) 994-1010",

  phone: "(301) 994-1010",
  phoneE164: "+13019941010",
  tel: "tel:+13019941010",
  sms: "sms:+13019941010",
  callOrText: "Call or text 7 days a week",

  // DRAFT: confirm the email address.
  email: "adamspropertyworks@gmail.com",

  // DRAFT: confirm all seven days. Yelp shows Monday to Thursday, 8:00 am to 8:00 pm.
  hours: "8:00 am to 8:00 pm",
  hoursNote: "Call or text 7 days a week",
  openingHoursSpec: {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "08:00",
    closes: "20:00",
  },

  facebook: "https://www.facebook.com/profile.php?id=61558432149129",
  googleReview: "https://g.page/r/CYIX5mF3Zc98EBM/review",

  // DRAFT: confirm 25 or 30. The About page on his current site says 30+.
  years: "25+",
  yearsLong: "25+ years",

  // DRAFT: confirm the 500+ projects figure. Not shown on the site until confirmed.
  projects: "500+",

  searchPhrase: "excavation contractor Southern Maryland",
} as const;

export const counties = [
  {
    name: "St. Mary's County",
    short: "St. Mary's",
    permitOffice: "Leonardtown",
    towns: [
      "Leonardtown",
      "Callaway",
      "Point Lookout",
      "Tall Timbers",
      "Lexington Park",
      "Loveville",
      "Hollywood",
      "California",
      "Great Mills",
      "Mechanicsville",
    ],
  },
  {
    name: "Calvert County",
    short: "Calvert",
    permitOffice: "Prince Frederick",
    towns: ["Lusby", "Solomons Island", "St. Leonard", "Broomes Island", "Dowell", "Prince Frederick"],
  },
  {
    name: "Charles County",
    short: "Charles",
    permitOffice: "La Plata",
    towns: ["La Plata"],
  },
] as const;

// Towns in the order he lists them, plus Prince Frederick and La Plata.
export const towns = [
  "Leonardtown",
  "Callaway",
  "Point Lookout",
  "Tall Timbers",
  "Lexington Park",
  "Loveville",
  "Hollywood",
  "California",
  "Great Mills",
  "Mechanicsville",
  "Lusby",
  "Solomons Island",
  "St. Leonard",
  "Broomes Island",
  "Dowell",
  "Prince Frederick",
  "La Plata",
] as const;

export const permitOffices = ["Leonardtown", "Prince Frederick", "La Plata"] as const;

// His claims, usable as written.
export const claims = {
  ownerOperated: "Owner-operated, family-owned and local.",
  licensed: "Licensed, bonded and insured.",
  freeEstimate: "Free site visit. Written, itemised quote.",
  // DRAFT: confirm discount and financing terms.
  financing: "Financing available.",
  discount: "Senior and retired military discounts available.",
  uniform: "Our crew arrives on time and in uniform.",
  missUtility: "We coordinate with Miss Utility (811) before we dig.",
  // DRAFT: confirm these three before launch.
  plans: "We read engineered plans and dig to them.",
  bonded: "Bonded and prevailing wage work.",
  hoa: "HOA maintenance plans.",
  proofOfInsurance: "Ask us for proof of insurance at any time.",
} as const;

// His own lines.
export const lines = {
  hero: "From the first dig to the final pour.",
  startToFinish: "From start to finish, we get the job done right.",
  safety: "Safety and service first. Always.",
  getItDone: "We get it done.",
  prep: "PREP IS THE KEY.",
  precision: "Precision over force.",
  noWreckingBalls: "We do not use wrecking balls.",
  backyard: "We treat every project like it's in our own backyard.",
  grade: "It's not a water problem. It's a grade problem.",
  noJobTooSmall: "No job is too small for professional care.",
  clay: "We know the Southern Maryland clay.",
} as const;

export const process = [
  {
    n: "01",
    title: "Free site visit",
    body: "We walk your property with you, no obligation, and answer your questions on the spot.",
  },
  {
    n: "02",
    title: "Written, itemised quote",
    body: "A clear estimate in writing. No vague numbers, no hidden fees, no surprise charges.",
  },
  {
    n: "03",
    title: "A firm start date",
    body: "We lock in a date and show up with the right crew and equipment.",
  },
  {
    n: "04",
    title: "Clean finish and a walk-through",
    body: "Every job ends with site clean up and a walk-through to make sure you are satisfied.",
  },
] as const;

export const reviews = [
  {
    quote:
      "I recently had DL Adams grade my driveway, and I couldn't be happier with the results. They showed up on time, communicated clearly, and took the time to make sure everything was done right.",
    name: "Elizabeth A.",
    source: "Facebook",
    // DRAFT: confirm the year.
    date: "May 2026",
  },
  {
    quote: "Awesome crew, both professional and friendly, excellent quality service.",
    name: "Sherry H.",
    source: "Facebook",
    date: "March 2025",
  },
  {
    quote: "Outstanding service!",
    name: "Kalie S.",
    source: "Google",
    // DRAFT: add the date.
    date: null,
  },
] as const;

// DRAFT: his Google rating and review count were not captured. The slot stays empty and labelled.
export const googleRating: string | null = null;

export const equipment = [
  { name: "Komatsu PC120 excavator", photo: "p02" },
  { name: "Red Kubota mini excavator", photo: "p03" },
  { name: "CAT wheel loader", photo: "p05" },
  { name: "Tracked skid steer", photo: "p15" },
  { name: "Dump truck 06 with trailer", photo: "p02" },
  { name: "Black tri-axle dump truck", photo: "p04" },
  { name: "Hydraulic breaker", photo: "p33" },
  { name: "Concrete floor grinder", photo: "p37" },
] as const;
