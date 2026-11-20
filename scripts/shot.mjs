// Screenshot helper. Usage:
//   node scripts/shot.mjs <path> <outPrefix> [--full] [--widths=1440,375] [--wait=1600] [--base=http://localhost:3000] [--reduce]
// Writes <outPrefix>-<width>.png. Phones use 375x812, desktop 1440x900.
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
let playwright;
try {
  playwright = require("playwright");
} catch {
  playwright = require("/opt/node22/lib/node_modules/playwright");
}

const args = process.argv.slice(2);
const path = args[0] ?? "/";
const out = args[1] ?? "shot";
const full = args.includes("--full");
const reduce = args.includes("--reduce");
const widths = (args.find((a) => a.startsWith("--widths="))?.split("=")[1] ?? "1440,375").split(",").map(Number);
const wait = Number(args.find((a) => a.startsWith("--wait="))?.split("=")[1] ?? 1800);
const base = args.find((a) => a.startsWith("--base="))?.split("=")[1] ?? "http://localhost:3000";
const scale = Number(args.find((a) => a.startsWith("--scale="))?.split("=")[1] ?? 1);
const clickSel = args.find((a) => a.startsWith("--click="))?.slice(8);
const scrollTo = args.find((a) => a.startsWith("--scroll="))?.slice(9);

const browser = await playwright.chromium.launch();
for (const w of widths) {
  const h = w < 600 ? 812 : w < 1100 ? 1024 : 900;
  const ctx = await browser.newContext({
    viewport: { width: w, height: h },
    deviceScaleFactor: scale,
    reducedMotion: reduce || full ? "reduce" : "no-preference",
    hasTouch: w < 600,
    isMobile: w < 600,
  });
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  await page.goto(base + path, { waitUntil: "networkidle" });
  if (full) {
    // Scroll through the page so lazy images load and scroll reveals play, then return to the top.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 400) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 120));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(600);
  }
  if (scrollTo) {
    await page.locator(scrollTo).first().scrollIntoViewIfNeeded();
    await page.evaluate(() => window.scrollBy(0, -80));
  }
  if (clickSel) {
    await page.locator(clickSel).first().click();
  }
  await page.waitForTimeout(wait);
  const file = `${out}-${w}.png`;
  await page.screenshot({ path: file, fullPage: full });
  const sw = await page.evaluate(() => document.documentElement.scrollWidth);
  console.log(file, "scrollWidth", sw, sw > w ? "OVERFLOW" : "ok", errors.length ? "ERRORS: " + errors.join(" | ").slice(0, 600) : "");
  await ctx.close();
}
await browser.close();
