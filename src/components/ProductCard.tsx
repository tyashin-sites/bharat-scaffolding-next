import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import type { Product } from '@/data/products';

export function ProductCard({ product, eager = false }: { product: Product; eager?: boolean }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="border-border hover:border-primary group flex h-full flex-col overflow-hidden rounded-md border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_-16px_hsl(4_62%_37%/0.35)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-white">
        <Image
          src={product.image}
          alt={`${product.name} — specification sheet`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          loading={eager ? 'eager' : 'lazy'}
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">
          {product.group}
        </p>
        <h3 className="mt-1 text-base font-bold">{product.name}</h3>
        <p className="text-muted-foreground mt-2 flex-1 text-sm leading-relaxed">
          {product.summary}
        </p>
        <span className="text-primary mt-4 inline-flex items-center gap-1.5 text-sm font-semibold">
          View specifications
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
