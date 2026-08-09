import Link from 'next/link';
import { ArrowRight, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/Reveal';
import { siteConfig } from '@/config/site';

export function CTASection() {
  return (
    <section className="bg-primary relative overflow-hidden py-20 text-white md:py-24">
      <div
        aria-hidden
        className="steel-grid pointer-events-none absolute inset-0 opacity-60"
      />
      <div className="container relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance text-[clamp(1.9rem,4vw,3rem)] font-extrabold leading-tight">
            Let’s build India’s landmark together.
          </h2>
          <p className="mt-4 text-lg text-white/85">
            45 years of trust. Three generations of excellence. Tell us your project requirement —
            our technical team responds with a site visit and an optimised material plan.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90"
              asChild
            >
              <Link href="/contact">
                Get a Quote <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <a
              href={siteConfig.contact.phoneHref}
              className="flex items-center gap-2 font-semibold text-white/90 transition-colors hover:text-white"
            >
              <Phone className="h-4 w-4" /> {siteConfig.contact.phone}
            </a>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="flex items-center gap-2 font-semibold text-white/90 transition-colors hover:text-white"
            >
              <Mail className="h-4 w-4" /> {siteConfig.contact.email}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
