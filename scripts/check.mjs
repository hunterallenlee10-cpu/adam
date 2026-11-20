// npm run check: site checks against a running server.
//   node scripts/check.mjs [--base=http://localhost:3000] [--only=/,/concrete] [--live]
// Checks: one h1 per page, internal links and anchors resolve, no leftover placeholder text,
// no em dashes or double hyphens (pages and source), alt text and dimensions on every image,
// every phone number and email matches lib/business.ts, no DRAFT items in live mode.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const args = process.argv.slice(2);
const base = (args.find((a) => a.startsWith("--base="))?.split("=")[1] ?? process.env.CHECK_BASE ?? "http://localhost:3000").replace(/\/$/, "");
const only = args.find((a) => a.startsWith("--only="))?.split("=")[1]?.split(",");
const live = args.includes("--live") || process.env.NEXT_PUBLIC_SITE_MODE === "live";

const biz = readFileSync("lib/business.ts", "utf8");
const PHONE = biz.match(/phone: "([^"]+)"/)[1];
const PHONE_E164 = biz.match(/phoneE164: "([^"]+)"/)[1];
const EMAIL = biz.match(/email: "([^"]+)"/)[1];
const siteTs = readFileSync("lib/site.ts", "utf8");
const allRoutes = [...siteTs.matchAll(/\{ path: "([^"]+)", label/g)].map((m) => m[1]);
const pages = only ?? allRoutes;

const fails = [];
const seen = new Set();
const warns = [];
const fail = (page, msg) => { const k = `${page}: ${msg}`; if (!seen.has(k)) { seen.add(k); fails.push(k); } };
const warn = (page, msg) => warns.push(`${page}: ${msg}`);

function visibleText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<template[\s\S]*?<\/template>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ");
}

const cache = new Map();
async function get(path) {
  if (cache.has(path)) return cache.get(path);
  const res = await fetch(base + path, { redirect: "manual" });
  const body = res.headers.get("content-type")?.includes("text/html") ? await res.text() : "";
  const out = { status: res.status, body };
  cache.set(path, out);
  return out;
}

for (const page of pages) {
  const { status, body: html } = await get(page);
  if (status !== 200) {
    fail(page, `status ${status}`);
    continue;
  }
  const text = visibleText(html);

  // One h1.
  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  if (h1s !== 1) fail(page, `${h1s} h1 elements`);

  // Placeholder text.
  const ph = text.match(/\b(lorem|ipsum|TODO|TBD|FIXME|undefined|NaN)\b|\[object|\{\{/gi);
  if (ph) fail(page, `placeholder text: ${[...new Set(ph)].join(", ")}`);
  if (/goes here/i.test(text)) warn(page, "labelled empty slot present (Google rating)");

  // Em dashes, en dashes, double hyphens.
  const dash = text.match(/.{0,30}(—|–| -- ).{0,30}/);
  if (dash) fail(page, `dash in copy: "${dash[0].trim()}"`);

  // Images.
  for (const img of html.matchAll(/<img\b[^>]*>/gi)) {
    const tag = img[0];
    const decorative = /aria-hidden="true"/.test(tag);
    if (!/\balt="[^"]+"/.test(tag) && !decorative) fail(page, `img without alt: ${tag.slice(0, 120)}`);
    if (!/\bwidth="\d+"/.test(tag) || !/\bheight="\d+"/.test(tag)) fail(page, `img without width/height: ${tag.slice(0, 120)}`);
  }
  // Image src paths: no stock images outside the asphalt page.
  if (page !== "/asphalt-sealcoating" && /images\/stock\//.test(html)) fail(page, "stock image outside /asphalt-sealcoating");

  // Phone numbers and emails.
  for (const m of text.matchAll(/\(?\b\d{3}\)?[ .-]?\d{3}[ .-]\d{4}\b/g)) {
    if (m[0] !== PHONE) fail(page, `phone "${m[0]}" does not match ${PHONE}`);
  }
  for (const m of html.matchAll(/href="(tel|sms):([^"?&]+)/g)) {
    if (m[2] !== PHONE_E164) fail(page, `${m[1]} link ${m[2]} does not match ${PHONE_E164}`);
  }
  for (const m of text.matchAll(/[\w.+-]+@[\w-]+\.[\w.]+/g)) {
    if (m[0] !== EMAIL) fail(page, `email ${m[0]} does not match ${EMAIL}`);
  }

  // Live mode: nothing unconfirmed on the page.
  if (live) {
    if (/DRAFT/i.test(text)) fail(page, "DRAFT text visible in live mode");
    if (/goes here/i.test(text)) fail(page, "empty review slot in live mode");
    if (/Concept preview/i.test(text)) fail(page, "concept line visible in live mode");
  }

  // Internal links and anchors.
  for (const m of html.matchAll(/<a\b[^>]*href="(\/[^"]*)"/g)) {
    const href = m[1].replace(/&amp;/g, "&");
    if (href.startsWith("//") || href.startsWith("/_next")) continue;
    const [pathPart, hash] = href.split("#");
    const path = pathPart.split("?")[0] || page;
    const target = await get(path);
    if (target.status !== 200) {
      fail(page, `broken link ${href} (${target.status})`);
      continue;
    }
    if (hash && !new RegExp(`id="${hash}"`).test(target.body)) fail(page, `missing anchor ${href}`);
  }
  for (const m of html.matchAll(/<a\b[^>]*href="#([^"]+)"/g)) {
    if (!new RegExp(`id="${m[1]}"`).test(html)) fail(page, `missing in-page anchor #${m[1]}`);
  }
}

// 404 page must return 404.
{
  const res = await fetch(base + "/this-page-does-not-exist");
  if (res.status !== 404) fail("/404", `status ${res.status}, expected 404`);
}

// Source scan: no em dashes or double hyphens in content files.
function walk(dir, out = []) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/\.(tsx?|mdx?|css|txt)$/.test(f)) out.push(p);
  }
  return out;
}
for (const file of [...walk("app"), ...walk("components"), ...walk("lib")]) {
  const src = readFileSync(file, "utf8");
  src.split("\n").forEach((line, i) => {
    if (/—|–/.test(line)) fail(file, `line ${i + 1} has an em or en dash`);
    if (/[A-Za-z] -- [A-Za-z]/.test(line)) fail(file, `line ${i + 1} has a double hyphen`);
  });
}

console.log(`\nnpm run check  base=${base}  mode=${live ? "live" : "demo"}  pages=${pages.length}`);
for (const w of warns) console.log("  warn  " + w);
for (const f of fails) console.log("  FAIL  " + f);
console.log(fails.length ? `\n${fails.length} failure(s)` : `\nAll checks passed (${pages.length} pages, ${cache.size} URLs fetched).`);
process.exit(fails.length ? 1 : 0);
