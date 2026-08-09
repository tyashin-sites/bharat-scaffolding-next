import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin } from 'lucide-react';
import { getLegalConfig } from '@/lib/legal';
import { siteConfig } from '@/config/site';
import { PRODUCT_GROUPS, products } from '@/data/products';
import { offices } from '@/data/company';

const companyLinks = [
  { href: '/about', label: 'About Us' },
  { href: '/projects', label: 'Landmark Projects' },
  { href: '/catalog', label: 'Product Catalogue' },
  { href: '/contact', label: 'Contact & Offices' },
];

export async function Footer({ hasBlog = false }: { hasBlog?: boolean }) {
  const legal = await getLegalConfig();

  const links = hasBlog ? [...companyLinks, { href: '/blog', label: 'Blog' }] : companyLinks;

  // Footer = the link-mesh safety net: every product page gets an inbound link.
  const productsByGroup = PRODUCT_GROUPS.map((group) => ({
    group,
    items: products.filter((p) => p.group === group),
  }));

  return (
    <footer className="bg-charcoal steel-grid text-white/85">
      <div className="container py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand + contact */}
          <div className="lg:col-span-4">
            <Link href="/" className="mb-4 flex items-center gap-3">
              <span className="inline-flex rounded-sm bg-white p-1.5">
                <Image src="/logo.png" alt={`${siteConfig.name} logo`} width={40} height={33} />
              </span>
              <span className="font-display text-xl font-bold uppercase leading-none tracking-tight text-white">
                Bharat
                <span className="text-primary-foreground/70 block text-[0.7em] tracking-[0.18em]">
                  Scaffolding
                </span>
              </span>
            </Link>
            <p className="mb-6 max-w-sm text-sm leading-relaxed text-white/60">
              {siteConfig.tagline} {siteConfig.services.join(' · ')} — on hire and manufactured
              in-house, pan-India.
            </p>
            <div className="space-y-3 text-sm">
              <a
                href={siteConfig.contact.phoneHref}
                className="flex items-center gap-3 transition-colors hover:text-white"
              >
                <Phone className="text-primary h-4 w-4 flex-shrink-0" />
                {siteConfig.contact.phone} · {siteConfig.contact.phone2}
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center gap-3 transition-colors hover:text-white"
              >
                <Mail className="text-primary h-4 w-4 flex-shrink-0" />
                {siteConfig.contact.email}
              </a>
              <div className="flex items-start gap-3">
                <MapPin className="text-primary mt-0.5 h-4 w-4 flex-shrink-0" />
                <span className="text-white/60">{siteConfig.headOffice}</span>
              </div>
            </div>
          </div>

          {/* Products — ALL of them (no orphan pages) */}
          <div className="lg:col-span-5">
            <h4 className="font-display mb-4 text-sm font-bold uppercase tracking-[0.15em] text-white">
              Products
            </h4>
            <div className="grid grid-cols-1 gap-x-8 gap-y-1 sm:grid-cols-2">
              {productsByGroup.map(({ group, items }) => (
                <div key={group} className="mb-3">
                  <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-white/40">
                    {group}
                  </p>
                  <ul className="space-y-1.5">
                    {items.map((p) => (
                      <li key={p.slug}>
                        <Link
                          href={`/products/${p.slug}`}
                          className="hover:text-primary-foreground text-sm text-white/60 transition-colors hover:text-white"
                        >
                          {p.shortName}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Company + cities */}
          <div className="lg:col-span-3">
            <h4 className="font-display mb-4 text-sm font-bold uppercase tracking-[0.15em] text-white">
              Company
            </h4>
            <ul className="mb-6 space-y-2">
              {links.map((link) =>
                link.href === '/blog' ? (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-white/60 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ) : (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
            <h4 className="font-display mb-3 text-sm font-bold uppercase tracking-[0.15em] text-white">
              Pan-India presence
            </h4>
            <p className="text-sm leading-relaxed text-white/60">
              {offices.map((o) => o.city).join(' · ')}
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-center text-sm text-white/40 md:text-left">
            {legal.copyrightText ||
              `© ${new Date().getFullYear()} ${siteConfig.copyrightHolder}. All rights reserved.`}
          </p>
          {legal.pages.length > 0 && (
            <div className="flex items-center gap-6 text-sm text-white/40">
              {legal.pages.map((page) => (
                <Link
                  key={page.slug}
                  href={`/${page.slug}`}
                  className="transition-colors hover:text-white"
                >
                  {page.title}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Tyashin attribution — mandatory on every plan, styled in the site's
            own footer tokens (addendum §3f). */}
        <div className="mt-8 border-t border-white/10 pt-6 text-center">
          <p className="text-xs text-white/40">
            Powered by{' '}
            <a
              href="https://tyashin.com"
              target="_blank"
              rel="noopener"
              className="transition-colors hover:text-white hover:underline"
            >
              Tyashin
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
