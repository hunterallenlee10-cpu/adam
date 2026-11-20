import { connection } from "next/server";
import { IS_LIVE, LAST_MODIFIED, routes, absoluteUrl } from "@/lib/site";

// Live mode only. Demo mode has no sitemap at all.
export async function GET() {
  // Demo mode answers at request time, so hosts that serve prerendered files keep the 404 status.
  if (!IS_LIVE) {
    await connection();
    return new Response("Not found", { status: 404, headers: { "content-type": "text/plain" } });
  }
  const urls = routes
    .map(
      (r) =>
        `  <url>\n    <loc>${absoluteUrl(r.path)}</loc>\n    <lastmod>${LAST_MODIFIED}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${r.path === "/" ? "1.0" : r.path === "/free-estimate" ? "0.9" : "0.8"}</priority>\n  </url>`,
    )
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, { headers: { "content-type": "application/xml; charset=utf-8" } });
}
