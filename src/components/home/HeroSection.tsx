import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Counter } from '@/components/Counter';
import { siteConfig } from '@/config/site';
import { stats } from '@/data/company';

export function HeroSection() {
  return (
    <section className="steel-grid bg-charcoal relative overflow-hidden text-white">
      {/* Brick accent glow, top-right */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full opacity-25"
        style={{ background: 'radial-gradient(circle, hsl(4 62% 37%) 0%, transparent 65%)' }}
      />
      <div className="container relative py-24 md:py-32">
        <p className="eyebrow-light hero-rise mb-6" style={{ '--rise-delay': '0ms' } as React.CSSProperties}>
          {siteConfig.services.join('  ·  ')}
        </p>
        <h1
          className="hero-rise max-w-4xl text-balance text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold leading-[1.05]"
          style={{ '--rise-delay': '90ms' } as React.CSSProperties}
        >
          India builds higher on <span className="text-[hsl(4_75%_62%)]">Bharat Scaffolding</span>.
        </h1>
        <p
          className="hero-rise mt-6 max-w-2xl text-lg leading-relaxed text-white/70"
          style={{ '--rise-delay': '180ms' } as React.CSSProperties}
        >
          Built on trust. Backed by strength. Delivering since 1981 — scaffolding, shuttering,
          centering and formwork on hire, manufactured in-house and mobilised pan-India.
        </p>
        <div
          className="hero-rise mt-10 flex flex-wrap items-center gap-4"
          style={{ '--rise-delay': '270ms' } as React.CSSProperties}
        >
          <Button size="lg" asChild>
            <Link href="/contact">
              Get a Quote <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white"
            asChild
          >
            <Link href="/products">Explore Products</Link>
          </Button>
          <a
            href={siteConfig.contact.phoneHref}
            className="flex items-center gap-2 text-sm font-medium text-white/70 transition-colors hover:text-white"
          >
            <Phone className="h-4 w-4" /> {siteConfig.contact.phone}
          </a>
        </div>

        {/* Stat bar */}
        <div
          className="hero-rise mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-white/10 bg-white/10 md:grid-cols-4"
          style={{ '--rise-delay': '360ms' } as React.CSSProperties}
        >
          {stats.map((s) => (
            <div key={s.label} className="bg-charcoal/95 px-6 py-6">
              <p className="font-display text-3xl font-extrabold text-white md:text-4xl">
                <Counter value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-1 text-sm font-medium text-white/80">{s.label}</p>
              <p className="text-xs text-white/50">{s.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
