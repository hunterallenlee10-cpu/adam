// Validates the structured data on every page of a running server.
//   node scripts/validate-jsonld.mjs [--base=http://localhost:3000]
// Checks: every block parses as JSON, has @context https://schema.org and a known @type,
// carries the properties Google and schema.org expect for that type, uses absolute URLs,
// and never includes aggregateRating, review or a street address.
import { readFileSync } from "node:fs";

const base = (process.argv.find((a) => a.startsWith("--base="))?.split("=")[1] ?? "http://localhost:3000").replace(/\/$/, "");
const routes = [...readFileSync("lib/site.ts", "utf8").matchAll(/\{ path: "([^"]+)", label/g)].map((m) => m[1]);

const required = {
  GeneralContractor: ["name", "url", "telephone", "address", "areaServed", "logo", "image", "openingHoursSpecification"],
  Service: ["name", "serviceType", "provider", "areaServed", "url"],
  BreadcrumbList: ["itemListElement"],
};
const banned = ["aggregateRating", "review", "streetAddress"];
const errors = [];
const summary = [];

function walk(obj, fn, path = "") {
  if (obj && typeof obj === "object") {
    for (const [k, v] of Object.entries(obj)) {
      fn(k, v, `${path}.${k}`);
      walk(v, fn, `${path}.${k}`);
    }
  }
}

for (const route of routes) {
  const html = await (await fetch(base + route)).text();
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  const types = [];
  for (const raw of blocks) {
    let data;
    try {
      data = JSON.parse(raw);
    } catch (e) {
      errors.push(`${route}: invalid JSON (${e.message})`);
      continue;
    }
    const type = data["@type"];
    types.push(type);
    if (data["@context"] !== "https://schema.org") errors.push(`${route}: ${type} missing @context https://schema.org`);
    if (!required[type]) {
      errors.push(`${route}: unexpected @type ${type}`);
      continue;
    }
    for (const prop of required[type]) if (data[prop] === undefined) errors.push(`${route}: ${type} missing ${prop}`);
    walk(data, (k, v, p) => {
      if (banned.includes(k)) errors.push(`${route}: ${type} has banned property ${p}`);
      if (["url", "item", "logo", "@id"].includes(k) && typeof v === "string" && !/^https?:\/\//.test(v)) errors.push(`${route}: ${type} ${p} is not absolute`);
    });
    if (type === "BreadcrumbList") {
      data.itemListElement.forEach((it, i) => {
        if (it["@type"] !== "ListItem" || it.position !== i + 1 || !it.name || !it.item) errors.push(`${route}: breadcrumb item ${i + 1} malformed`);
      });
      const last = data.itemListElement.at(-1);
      if (!last.item.endsWith(route)) errors.push(`${route}: last breadcrumb ${last.item} does not match the page`);
    }
    if (type === "GeneralContractor") {
      const a = data.address;
      if (a["@type"] !== "PostalAddress" || !a.addressLocality || !a.addressRegion || !a.postalCode) errors.push(`${route}: address incomplete`);
      if (!/^\+1\d{10}$/.test(data.telephone)) errors.push(`${route}: telephone not E.164`);
    }
  }
  if (route === "/" && !types.includes("GeneralContractor")) errors.push("/: missing GeneralContractor");
  if (route !== "/" && !types.includes("BreadcrumbList")) errors.push(`${route}: missing BreadcrumbList`);
  if (["/excavation", "/concrete", "/demolition", "/asphalt-sealcoating"].includes(route) && !types.includes("Service")) errors.push(`${route}: missing Service`);
  summary.push(`  ${route.padEnd(22)} ${types.join(", ") || "(none)"}`);
}

console.log("\nStructured data validation (JSON-LD)\n" + summary.join("\n"));
if (errors.length) {
  console.log("\n" + errors.map((e) => "  FAIL  " + e).join("\n"));
  process.exit(1);
}
console.log(`\nAll ${routes.length} pages valid. No aggregateRating, review or street address anywhere.`);
