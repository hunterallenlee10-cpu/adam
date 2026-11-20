import type { MetadataRoute } from "next";
import { IS_LIVE, SITE_URL } from "@/lib/site";

// Both modes let search engines in, so they can read the noindex tag in demo mode.
// AI crawlers are named and disallowed in demo mode. Only live mode lists the sitemap.
const aiCrawlers = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "CCBot",
  "Google-Extended",
  "PerplexityBot",
  "Bytespider",
  "Applebot-Extended",
  "meta-externalagent",
  "Amazonbot",
  "cohere-ai",
];

export default function robots(): MetadataRoute.Robots {
  if (IS_LIVE) {
    return {
      rules: [{ userAgent: "*", allow: "/" }],
      sitemap: `${SITE_URL}/sitemap.xml`,
      host: SITE_URL,
    };
  }
  return {
    rules: [{ userAgent: "*", allow: "/" }, ...aiCrawlers.map((ua) => ({ userAgent: ua, disallow: "/" }))],
  };
}
