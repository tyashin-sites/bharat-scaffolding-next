import { getSiteRoutes } from '@/lib/site-routes';
import { siteUrl } from '@/lib/seo';

/**
 * /sitemap-pages.xml — the site's OWN page sitemap.
 *
 * The Tyashin platform intercepts /sitemap.xml and serves it as a sitemap
 * INDEX referencing this file (plus its own /sitemap-content.xml for blog
 * posts). This path is NOT in the platform registry, so it dispatches straight
 * to this Worker.
 *
 * ORIGIN = the SAME canonical constant the metadata canonicals use (siteUrl
 * from src/lib/seo.ts) — never the request Host: OpenNext strips
 * x-forwarded-host and the raw dispatch Host is the workers.dev target.
 */
export const dynamic = 'force-static';

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function GET(): Response {
  const lastmod = new Date().toISOString().slice(0, 10);

  const urls = getSiteRoutes()
    .map((route) => {
      const loc = escapeXml(siteUrl(route.path));
      return [
        '  <url>',
        `    <loc>${loc}</loc>`,
        `    <lastmod>${lastmod}</lastmod>`,
        `    <changefreq>${route.changeFrequency}</changefreq>`,
        `    <priority>${route.priority.toFixed(1)}</priority>`,
        '  </url>',
      ].join('\n');
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  return new Response(xml, {
    headers: {
      'content-type': 'application/xml; charset=utf-8',
      'cache-control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
