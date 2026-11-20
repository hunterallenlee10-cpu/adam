// Runs Lighthouse against a running production server, phone and desktop.
//   LH_DIR=<dir with lighthouse installed> CHROME_PATH=<chrome> node scripts/lighthouse.mjs <label> [paths...]
// Prints a table of the four category scores and writes JSON reports to <LH_DIR>/reports/<label>.
import { createRequire } from "node:module";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LH_DIR = process.env.LH_DIR;
const require = createRequire(join(LH_DIR, "package.json"));
const lighthouse = (await import(require.resolve("lighthouse"))).default;
const chromeLauncher = await import(require.resolve("chrome-launcher"));
const lhVersion = require("lighthouse/package.json").version;

const label = process.argv[2] ?? "run";
const paths = process.argv.slice(3).length ? process.argv.slice(3) : ["/", "/concrete", "/our-work", "/about", "/free-estimate"];
const base = process.env.BASE ?? "http://localhost:3000";
const out = join(LH_DIR, "reports", label);
mkdirSync(out, { recursive: true });

const chrome = await chromeLauncher.launch({
  chromePath: process.env.CHROME_PATH,
  chromeFlags: ["--headless=new", "--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage"],
});
const rows = [];
const failing = {};
for (const formFactor of ["mobile", "desktop"]) {
  for (const p of paths) {
    const flags = { port: chrome.port, output: "json", logLevel: "error", onlyCategories: ["performance", "accessibility", "best-practices", "seo"] };
    const config =
      formFactor === "desktop"
        ? { extends: "lighthouse:default", settings: { formFactor: "desktop", screenEmulation: { mobile: false, width: 1350, height: 940, deviceScaleFactor: 1, disabled: false }, throttling: { rttMs: 40, throughputKbps: 10240, cpuSlowdownMultiplier: 1, requestLatencyMs: 0, downloadThroughputKbps: 0, uploadThroughputKbps: 0 }, emulatedUserAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36" } }
        : { extends: "lighthouse:default" };
    const r = await lighthouse(base + p, flags, config);
    const lhr = r.lhr;
    writeFileSync(join(out, `${formFactor}${p === "/" ? "-home" : p.replace(/\//g, "-")}.json`), r.report);
    const s = (k) => Math.round((lhr.categories[k].score ?? 0) * 100);
    const audits = lhr.audits;
    rows.push({
      form: formFactor,
      page: p,
      perf: s("performance"),
      a11y: s("accessibility"),
      bp: s("best-practices"),
      seo: s("seo"),
      lcp: audits["largest-contentful-paint"].displayValue,
      cls: audits["cumulative-layout-shift"].displayValue,
      tbt: audits["total-blocking-time"].displayValue,
    });
    for (const k of ["performance", "accessibility", "best-practices", "seo"]) {
      for (const ref of lhr.categories[k].auditRefs) {
        const a = audits[ref.id];
        if (ref.weight > 0 && a.score !== null && a.score < 0.9) (failing[`${k}: ${ref.id}`] ??= []).push(`${formFactor}${p}`);
      }
    }
  }
}
await chrome.kill();
console.log(`\nLighthouse ${lhVersion}  (${label})  ${base}`);
console.log("form     page                  perf  a11y  bp    seo   LCP      CLS    TBT");
for (const r of rows)
  console.log(`${r.form.padEnd(8)} ${r.page.padEnd(21)} ${String(r.perf).padEnd(5)} ${String(r.a11y).padEnd(5)} ${String(r.bp).padEnd(5)} ${String(r.seo).padEnd(5)} ${String(r.lcp).padEnd(8)} ${String(r.cls).padEnd(6)} ${r.tbt}`);
const keys = Object.keys(failing);
if (keys.length) {
  console.log("\nAudits scoring under 90:");
  for (const k of keys) console.log(`  ${k}  (${failing[k].join(", ")})`);
}
