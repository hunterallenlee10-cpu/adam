import { business, counties, towns } from "@/lib/business";
import { serviceList } from "@/lib/services";
import { connection } from "next/server";
import { IS_LIVE, absoluteUrl } from "@/lib/site";

// Live mode only.
export async function GET() {
  // Demo mode answers at request time, so hosts that serve prerendered files keep the 404 status.
  if (!IS_LIVE) {
    await connection();
    return new Response("Not found", { status: 404, headers: { "content-type": "text/plain" } });
  }
  const md = `# ${business.name}

> Owner-operated excavation, concrete, demolition and asphalt contractor based in ${business.locality}, ${business.region} ${business.postalCode}, serving ${counties.map((c) => c.name).join(", ")} in Southern Maryland for ${business.yearsLong}. Also trades as ${business.dba}.

- Phone (call or text, 7 days a week): ${business.phone}
- Email: ${business.email}
- Hours: ${business.hours}
- Free estimates: free site visit and a written, itemised quote
- Licensed, bonded and insured. Financing available. Senior and retired military discounts.

## Services

${serviceList.map((s) => `- [${s.crumb}](${absoluteUrl(`/${s.slug}`)}): ${s.intro}`).join("\n")}

## Service area

${counties.map((c) => `- ${c.name}: ${c.towns.join(", ")}`).join("\n")}

Towns: ${towns.join(", ")}.

## Pages

- [Home](${absoluteUrl("/")})
- [Our work](${absoluteUrl("/our-work")})
- [About](${absoluteUrl("/about")})
- [Service area](${absoluteUrl("/service-area")})
- [FAQ](${absoluteUrl("/faq")})
- [Free estimate](${absoluteUrl("/free-estimate")})
`;
  return new Response(md, { headers: { "content-type": "text/markdown; charset=utf-8" } });
}
