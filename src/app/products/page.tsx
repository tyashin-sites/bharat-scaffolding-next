import Link from 'next/link';
import { ArrowRight, FileDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { JsonLd } from '@/components/JsonLd';
import { Reveal } from '@/components/Reveal';
import { ProductCard } from '@/components/ProductCard';
import { pageMetadata } from '@/lib/seo';
import { siteConfig } from '@/config/site';
import { PRODUCT_GROUPS, products } from '@/data/products';

export const metadata = pageMetadata({
  title: 'Products — Scaffolding, Shuttering & Formwork Systems',
  description:
    'Cuplock verticals and ledgers, telescopic props, acro spans, jacks, shuttering plates, MS pipes and channels, walkway platforms, toe boards, ladders and couplers — manufactured in-house and available on hire pan-India.',
  path: '/products',
});

export default function ProductsPage() {
  return (
    <>
      <JsonLd
        path="/products"
        title="Products"
        description="All scaffolding, shuttering and formwork systems available on hire from Bharat Scaffolding."
        breadcrumb={[{ name: 'Products', path: '/products' }]}
        itemList={products.map((p) => ({ name: p.name, path: `/products/${p.slug}` }))}
      />

      {/* Page hero */}
      <section className="steel-grid bg-charcoal py-16 text-white md:py-20">
        <div className="container">
          <p className="eyebrow-light hero-rise mb-4">Products</p>
          <h1 className="hero-rise max-w-3xl text-balance text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold leading-tight" style={{ '--rise-delay': '80ms' } as React.CSSProperties}>
            Every major scaffolding system in use today
          </h1>
          <p className="hero-rise mt-4 max-w-2xl text-lg text-white/70" style={{ '--rise-delay': '160ms' } as React.CSSProperties}>
            Manufactured across 5 units at 750 tonnes/day, quality-inspected before every
            dispatch, and available on hire from depots in {siteConfig.cities.join(', ')}.
          </p>
          <div className="hero-rise mt-8 flex flex-wrap gap-4" style={{ '--rise-delay': '240ms' } as React.CSSProperties}>
            <Button asChild>
              <Link href="/contact">
                Get a Quote <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant="outline"
              className="border-white/25 text-white hover:bg-white/10 hover:text-white"
              asChild
            >
              <Link href="/catalog">
                <FileDown className="mr-2 h-4 w-4" /> Download catalogue
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Grouped grid */}
      <section className="py-16 md:py-24">
        <div className="container space-y-16">
          {PRODUCT_GROUPS.map((group) => {
            const items = products.filter((p) => p.group === group);
            if (items.length === 0) return null;
            return (
              <div key={group}>
                <Reveal className="mb-8">
                  <h2 className="eyebrow mb-2">{group}</h2>
                  <div className="bg-border h-px w-full" />
                </Reveal>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {items.map((p, i) => (
                    <Reveal key={p.slug} delay={(i % 4) * 70} className="h-full">
                      <ProductCard product={p} />
                    </Reveal>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
