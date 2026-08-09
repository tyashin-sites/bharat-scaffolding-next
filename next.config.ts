import type { NextConfig } from "next";

const TYASHIN_SUBDOMAIN = "https://bharat-scaffolding.sites.tyashin.com";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_TYASHIN_API_URL:
      process.env.TYASHIN_API_URL || "https://website-api.tyashin.com",
    NEXT_PUBLIC_PROJECT_ID: process.env.PROJECT_ID || "6a78f8580d4336cd5bf428be",
    NEXT_PUBLIC_SITE_DOMAIN: process.env.NEXT_PUBLIC_SITE_DOMAIN || "preetbharat.com",
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "website-api.tyashin.com" },
      { protocol: "https", hostname: "*.sites.tyashin.com" },
    ],
  },
  // These rewrites only matter for direct *.workers.dev access (dev/QA).
  // In production the Tyashin dispatch layer intercepts these platform-owned
  // paths before the Worker is invoked, so they are no-ops there.
  async rewrites() {
    return [
      { source: "/brand-kit.css", destination: `${TYASHIN_SUBDOMAIN}/brand-kit.css` },
      { source: "/tyashin-runtime.js", destination: `${TYASHIN_SUBDOMAIN}/tyashin-runtime.js` },
      { source: "/sitemap.xml", destination: `${TYASHIN_SUBDOMAIN}/sitemap.xml` },
      { source: "/robots.txt", destination: `${TYASHIN_SUBDOMAIN}/robots.txt` },
      { source: "/blog/rss.xml", destination: `${TYASHIN_SUBDOMAIN}/blog/rss.xml` },
      { source: "/rss.xml", destination: `${TYASHIN_SUBDOMAIN}/rss.xml` },
      { source: "/feed", destination: `${TYASHIN_SUBDOMAIN}/feed` },
      { source: "/feed.xml", destination: `${TYASHIN_SUBDOMAIN}/feed.xml` },
    ];
  },
};

export default nextConfig;
