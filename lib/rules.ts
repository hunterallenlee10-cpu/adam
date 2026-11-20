// Looked-up thresholds used by the on-page tools. Each one carries its source.

// Maryland erosion and sediment control plan threshold.
// Source: Maryland Department of the Environment, Erosion and Sediment Control
//   https://mde.maryland.gov/programs/water/stormwatermanagementprogram/pages/erosionsedimentcontrol.aspx
//   "...requires erosion and sediment control plans to be reviewed and approved for earth moving
//   activity that disturbs 5,000 square feet or more of land area or 100 cubic yards or more of soil."
//   Local programs may set stricter requirements.
// Also COMAR 26.17.01.05, which exempts grading that disturbs less than 5,000 square feet
//   AND less than 100 cubic yards: https://dsd.maryland.gov/regulations/Pages/26.17.01.05.aspx
// Checked 2026-11-20.
export const SEDIMENT_PLAN = {
  squareFeet: 5000,
  cubicYards: 100,
  sourceUrl: "https://mde.maryland.gov/programs/water/stormwatermanagementprogram/pages/erosionsedimentcontrol.aspx",
} as const;

export function needsSedimentPlan(sqft: number, cuyd: number) {
  return sqft >= SEDIMENT_PLAN.squareFeet || cuyd >= SEDIMENT_PLAN.cubicYards;
}

// Concrete volume: length x width x thickness in feet, divided by 27, to one decimal.
export function cubicYards(lengthFt: number, widthFt: number, thicknessIn: number) {
  const yd = (lengthFt * widthFt * (thicknessIn / 12)) / 27;
  return Math.round(yd * 10) / 10;
}

// Sealcoating guidance from his own Asphalt Sealcoating page (adamspropertyworks.com/asphalt-sealcoating):
// new asphalt is sealed 12 to 24 months after installation, reseal every 2 to 3 years,
// deep alligator cracks mean resurfacing or repair first, and sealing weather is 50°F and rising with no rain forecast.
export const SEALCOAT = {
  newAsphaltMonths: 12,
  resealYears: 2,
} as const;
