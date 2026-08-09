import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, FileDown, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { JsonLd } from '@/components/JsonLd';
import { Reveal } from '@/components/Reveal';
import { pageMetadata } from '@/lib/seo';
import { siteConfig } from '@/config/site';
import { products } from '@/data/products';

export const metadata = pageMetadata({
  title: 'Product Catalogue',
  description:
    'Download the official Bharat Scaffolding product catalogue — complete specifications for Cuplock systems, props, shuttering, formwork, access and safety equipment.',
  path: '/catalog',
});

export default function CatalogPage() {
  return (
    <>
      <JsonLd
        path="/catalog"
        title="Product Catalogue"
        description="The official Bharat Scaffolding product catalogue."
        breadcrumb={[{ name: 'Catalogue', path: '/catalog' }]}
      />

      <section className="steel-grid bg-charcoal py-16 text-white md:py-20">
        <div className="container grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow-light hero-rise mb-4">Catalogue</p>
            <h1
              className="hero-rise text-balance text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold leading-tight"
              style={{ '--rise-delay': '80ms' } as React.CSSProperties}
            >
              The complete product catalogue
            </h1>
            <p
              className="hero-rise mt-4 max-w-xl text-lg text-white/70"
              style={{ '--rise-delay': '160ms' } as React.CSSProperties}
            >
              Every system, every size table, every specification — the same document our
              clients use for tendering and BOQ preparation.
            </p>
            <div
              className="hero-rise mt-8 flex flex-wrap items-center gap-4"
              style={{ '--rise-delay': '240ms' } as React.CSSProperties}
            >
              <Button asChild>
                <a href={siteConfig.catalogue.path} download>
                  <FileDown className="mr-2 h-4 w-4" /> Download PDF
                </a>
              </Button>
              <a
                href={siteConfig.contact.phoneHref}
                className="flex items-center gap-2 text-sm font-semibold text-white/70 transition-colors hover:text-white"
              >
                <Phone className="h-4 w-4" /> {siteConfig.contact.phone}
              </a>
            </div>
          </div>
          <Reveal className="mx-auto w-full max-w-sm">
            <a
              href={siteConfig.catalogue.path}
              download
              className="block overflow-hidden rounded-md border border-white/15 transition-transform hover:-translate-y-1"
            >
              <Image
                src="/og-cover.jpg"
                alt="Bharat Scaffolding catalogue cover"
                width={1264}
                height={842}
                className="h-auto w-full"
                priority
              />
            </a>
          </Reveal>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          <Reveal className="mb-10">
            <h2 className="text-2xl font-extrabold">What&apos;s inside</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl">
              {products.length} product systems with full specification and size tables, our
              manufacturing capabilities, landmark projects, safety commitment and the complete
              office network. Prefer the web version? Every product is also on this site.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 50}>
                <Link
                  href={`/products/${p.slug}`}
                  className="border-border hover:border-primary group flex items-center justify-between rounded-md border bg-card px-5 py-4 text-sm font-semibold transition-colors"
                >
                  {p.name}
                  <ArrowRight className="text-primary h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
