import type { NextConfig } from "next";

const isLive = process.env.NEXT_PUBLIC_SITE_MODE === "live";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  devIndicators: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [70, 75],
    deviceSizes: [384, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [96, 128, 256, 384],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // Demo mode: every response, images included, carries noindex. Live mode: no header.
  async headers() {
    if (isLive) return [];
    return [
      {
        source: "/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
