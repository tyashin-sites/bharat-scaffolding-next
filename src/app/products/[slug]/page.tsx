import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowRight, ChevronRight, Check, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { JsonLd } from '@/components/JsonLd';
import { Reveal } from '@/components/Reveal';
import { ProductCard } from '@/components/ProductCard';
import { pageMetadata } from '@/lib/seo';
import { siteConfig } from '@/config/site';
import { getProduct, relatedProducts } from '@/data/products';
import { productStaticParams } from '@/lib/site-routes';

// Prerender every product page from the SAME list the sitemap uses.
export function generateStaticParams() {
  return productStaticParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return pageMetadata({
    title: `${product.name} on Hire`,
    description: `${product.summary} Specifications, sizes and applications — available on rental pan-India from Bharat Scaffolding.`,
    path: `/products/${product.slug}`,
    image: product.image,
  });
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = relatedProducts(slug, 4);

  return (
    <>
      <JsonLd
        path={`/products/${product.slug}`}
        title={product.name}
        description={product.summary}
        breadcrumb={[
          { name: 'Products', path: '/products' },
          { name: product.name, path: `/products/${product.slug}` },
        ]}
      />

      <div className="container py-10 md:py-14">
        {/* Breadcrumb (mirrors the BreadcrumbList JSON-LD) */}
        <nav aria-label="Breadcrumb" className="text-muted-foreground mb-8 flex flex-wrap items-center gap-1.5 text-sm">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href="/products" className="hover:text-primary transition-colors">
            Products
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground font-medium">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Brochure spec card */}
          <Reveal>
            <div className="border-border overflow-hidden rounded-md border bg-white">
              <Image
                src={product.image}
                alt={`${product.name} — official specification sheet`}
                width={717}
                height={1076}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="h-auto w-full"
                priority
              />
            </div>
            <p className="text-muted-foreground mt-2 text-xs">
              Official specification sheet from the Bharat Scaffolding product catalogue.
            </p>
          </Reveal>

          {/* Content */}
          <div>
            <Reveal>
              <p className="eyebrow mb-3">{product.group}</p>
              <h1 className="text-balance text-[clamp(1.9rem,3.5vw,2.75rem)] font-extrabold leading-tight">
                {product.name}
              </h1>
              <p className="text-muted-foreground mt-4 text-lg leading-relaxed">
                {product.description}
              </p>
            </Reveal>

            <Reveal delay={80} className="mt-8">
              <h2 className="mb-3 text-sm font-bold uppercase tracking-[0.15em]">
                Key applications
              </h2>
              <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {product.applications.map((a) => (
                  <li key={a} className="flex items-start gap-2 text-sm">
                    <Check className="text-primary mt-0.5 h-4 w-4 flex-shrink-0" />
                    {a}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={120} className="mt-8">
              <h2 className="mb-3 text-sm font-bold uppercase tracking-[0.15em]">
                Specifications
              </h2>
              <dl className="border-border divide-border divide-y rounded-md border bg-card">
                {product.specs.map((s) => (
                  <div key={s.label} className="grid grid-cols-[40%_60%] gap-4 px-5 py-3 text-sm">
                    <dt className="text-muted-foreground font-medium">{s.label}</dt>
                    <dd className="font-medium">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={160} className="mt-8">
              <h2 className="mb-3 text-sm font-bold uppercase tracking-[0.15em]">
                Available sizes
              </h2>
              <div className="border-border overflow-x-auto rounded-md border">
                <table className="w-full min-w-[320px] border-collapse bg-card text-sm">
                  <thead>
                    <tr className="bg-charcoal text-left text-white">
                      {product.sizes.columns.map((c) => (
                        <th key={c} className="px-5 py-3 font-semibold">
                          {c}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-border divide-y">
                    {product.sizes.rows.map((row, i) => (
                      <tr key={i} className="hover:bg-brick-tint/50 transition-colors">
                        {row.map((cell, j) => (
                          <td key={j} className="px-5 py-3">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {product.sizesNote && (
                <p className="text-muted-foreground mt-2 text-xs">{product.sizesNote}</p>
              )}
            </Reveal>

            <Reveal delay={200} className="mt-10">
              <div className="bg-charcoal steel-grid rounded-md p-7 text-white">
                <h2 className="text-lg font-bold">Hire {product.shortName} for your project</h2>
                <p className="mt-2 text-sm text-white/70">
                  Quality-inspected before every dispatch. Pan-India availability. Pricing by
                  written quotation — share your BOQ or site requirement.
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-4">
                  <Button asChild>
                    <Link href="/contact">
                      Get a Quote <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <a
                    href={siteConfig.contact.phoneHref}
                    className="flex items-center gap-2 text-sm font-semibold text-white/80 transition-colors hover:text-white"
                  >
                    <Phone className="h-4 w-4" /> {siteConfig.contact.phone}
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Related products — link mesh */}
        <section className="mt-20">
          <Reveal className="mb-8">
            <h2 className="text-2xl font-extrabold">You may also need</h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 4) * 70} className="h-full">
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
