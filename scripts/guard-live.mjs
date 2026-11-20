// Live mode refuses to build while unconfirmed items remain: any DRAFT marker,
// the empty Google rating slot, or a "TODO: swap" stock photo marker.
// For a local Lighthouse audit only, LOCAL_AUDIT=1 lets a live build through and says so.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

if (process.env.NEXT_PUBLIC_SITE_MODE !== "live") process.exit(0);

function walk(dir, out = []) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/\.(tsx?|css)$/.test(f)) out.push(p);
  }
  return out;
}
const hits = [];
for (const file of [...walk("app"), ...walk("components"), ...walk("lib")]) {
  readFileSync(file, "utf8").split("\n").forEach((line, i) => {
    if (/DRAFT|TODO: swap|googleRating: string \| null = null/.test(line)) hits.push(`${file}:${i + 1}  ${line.trim().slice(0, 100)}`);
  });
}
if (hits.length === 0) process.exit(0);
if (process.env.LOCAL_AUDIT === "1") {
  console.warn(`\nguard-live: ${hits.length} unconfirmed item(s) remain. LOCAL_AUDIT=1 set, building anyway for a local audit. Do not deploy this build.\n`);
  process.exit(0);
}
console.error(`\nguard-live: live mode build refused. ${hits.length} unconfirmed item(s) remain:\n` + hits.map((h) => "  " + h).join("\n"));
console.error("\nConfirm each item with the owner, or build in demo mode.\n");
process.exit(1);
