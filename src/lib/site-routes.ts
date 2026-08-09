import { products } from '@/data/products';

/**
 * ONE source of truth for the site's indexable routes.
 *
 * /sitemap-pages.xml is generated from this list; the platform's /sitemap.xml
 * (a sitemap index) references it automatically once it detects the route.
 * Every `page.tsx` under `app/` that should be indexed MUST appear here, and
 * every dynamic route's generateStaticParams consumes the SAME product list —
 * drift is impossible.
 *
 * Blog POSTS are platform-owned data and live in the platform's
 * /sitemap-content.xml — only the /blog index belongs here.
 */
export interface SiteRoute {
  path: string;
  priority: number;
  changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
}

export function getSiteRoutes(): SiteRoute[] {
  return [
    { path: '/', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/products', priority: 0.9, changeFrequency: 'monthly' },
    ...products.map((p) => ({
      path: `/products/${p.slug}`,
      priority: 0.8,
      changeFrequency: 'monthly' as const,
    })),
    { path: '/projects', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/about', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/catalog', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/contact', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/blog', priority: 0.6, changeFrequency: 'weekly' },
  ];
}

/** generateStaticParams source for /products/[slug] — same list as the sitemap. */
export function productStaticParams(): { slug: string }[] {
  return products.map((p) => ({ slug: p.slug }));
}
