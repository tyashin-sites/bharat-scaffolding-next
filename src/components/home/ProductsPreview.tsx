import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/SectionHeading';
import { Reveal } from '@/components/Reveal';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/data/products';

const FEATURED_SLUGS = [
  'cuplock-vertical-standard',
  'cuplock-horizontal-ledger',
  'adjustable-telescopic-prop',
  'ms-shuttering-plate',
  'steel-walkway-platform',
  'adjustable-acro-span',
];

export function ProductsPreview() {
  const featured = FEATURED_SLUGS.map((s) => products.find((p) => p.slug === s)!).filter(Boolean);

  return (
    <section className="paper-grid py-20 md:py-28">
      <div className="container">
        <SectionHeading
          eyebrow="Products"
          title="Every major scaffolding system, ready to deploy"
          intro="Cuplock systems, shuttering, props, platforms and formwork — manufactured in our five units and maintained across a pan-India rental inventory."
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 80} className="h-full">
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10 text-center">
          <Button size="lg" variant="outline" asChild>
            <Link href="/products">
              View all {products.length} products <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
