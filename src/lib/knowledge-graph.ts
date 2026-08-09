import { SITE, siteUrl } from '@/lib/seo';
import { siteConfig } from '@/config/site';
import { offices } from '@/data/company';

/**
 * schema.org knowledge graph — ONE interlinked @graph per page (addendum §3b).
 *
 * B2B manufacturer archetype: Organization backbone + knowsAbout; no
 * Product/Offer nodes (nothing is sold online — hire is by written quotation).
 * The platform edge also injects a baseline (idempotent by @type), so anything
 * emitted here wins.
 */

type SchemaNode = Record<string, unknown>;

const ORIGIN = siteUrl('/').replace(/\/+$/, '');

function organizationNode(): SchemaNode {
  return {
    '@type': 'Organization',
    '@id': `${ORIGIN}/#organization`,
    name: siteConfig.legalName,
    alternateName: siteConfig.name,
    url: `${ORIGIN}/`,
    logo: `${ORIGIN}/logo.png`,
    description: siteConfig.description,
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phone,
    foundingDate: '1981',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'DSO-309, 3rd Floor, DLF South Court, Saket',
      addressLocality: 'New Delhi',
      postalCode: '110017',
      addressCountry: 'IN',
    },
    location: offices.map((o) => ({
      '@type': 'Place',
      name: `${siteConfig.name} — ${o.city}`,
      address: o.address,
    })),
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        telephone: siteConfig.contact.phone,
        email: siteConfig.contact.email,
        areaServed: 'IN',
      },
    ],
    sameAs: [siteConfig.social.linkedin],
    knowsAbout: [
      'scaffolding rental',
      'shuttering material on hire',
      'centering and formwork systems',
      'Cuplock scaffolding systems',
      'adjustable telescopic props',
      'MS shuttering plates',
      'scaffolding manufacturing',
      'construction site access and safety equipment',
      'metro rail and infrastructure construction support',
    ],
  };
}

function webSiteNode(): SchemaNode {
  return {
    '@type': 'WebSite',
    '@id': `${ORIGIN}/#website`,
    url: `${ORIGIN}/`,
    name: SITE.name,
    publisher: { '@id': `${ORIGIN}/#organization` },
  };
}

export interface PageGraphOptions {
  /** e.g. '/about'. Omit for the home page. */
  path?: string;
  title?: string;
  description?: string;
  /** Breadcrumb trail, home is prepended automatically. */
  breadcrumb?: { name: string; path: string }[];
  article?: {
    headline: string;
    datePublished?: string;
    dateModified?: string;
    image?: string;
    authorName?: string;
  };
  /** ItemList of links (e.g. the products index). */
  itemList?: { name: string; path: string }[];
}

export function buildGraph(opts: PageGraphOptions = {}): SchemaNode {
  const nodes: SchemaNode[] = [organizationNode(), webSiteNode()];

  if (opts.path) {
    const pageUrl = siteUrl(opts.path);
    const webPage: SchemaNode = {
      '@type': 'WebPage',
      '@id': `${pageUrl}#webpage`,
      url: pageUrl,
      name: opts.title || SITE.name,
      ...(opts.description ? { description: opts.description } : {}),
      isPartOf: { '@id': `${ORIGIN}/#website` },
      about: { '@id': `${ORIGIN}/#organization` },
    };

    if (opts.breadcrumb && opts.breadcrumb.length > 0) {
      const crumbs = [{ name: 'Home', path: '/' }, ...opts.breadcrumb];
      nodes.push({
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: crumbs.map((c, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: c.name,
          item: siteUrl(c.path),
        })),
      });
      webPage.breadcrumb = { '@id': `${pageUrl}#breadcrumb` };
    }

    if (opts.itemList && opts.itemList.length > 0) {
      nodes.push({
        '@type': 'ItemList',
        '@id': `${pageUrl}#itemlist`,
        itemListElement: opts.itemList.map((item, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: item.name,
          url: siteUrl(item.path),
        })),
      });
    }

    nodes.push(webPage);

    if (opts.article) {
      nodes.push({
        '@type': 'BlogPosting',
        '@id': `${pageUrl}#article`,
        mainEntityOfPage: { '@id': `${pageUrl}#webpage` },
        headline: opts.article.headline,
        ...(opts.article.datePublished ? { datePublished: opts.article.datePublished } : {}),
        ...(opts.article.dateModified ? { dateModified: opts.article.dateModified } : {}),
        ...(opts.article.image ? { image: opts.article.image } : {}),
        publisher: { '@id': `${ORIGIN}/#organization` },
        ...(opts.article.authorName
          ? { author: { '@type': 'Person', name: opts.article.authorName } }
          : {}),
      });
    }
  }

  return { '@context': 'https://schema.org', '@graph': nodes };
}

/** Serialize a graph safely for a <script type="application/ld+json"> tag. */
export function graphJson(opts: PageGraphOptions = {}): string {
  return JSON.stringify(buildGraph(opts)).replace(/</g, '\\u003c').replace(/>/g, '\\u003e');
}
