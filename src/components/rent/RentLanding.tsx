import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronRight, MapPin, MessageCircle, Phone } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { ClientMarquee } from '@/components/home/ClientMarquee';
import { ProcessSection } from '@/components/home/ProcessSection';
import { RentVsBuySection } from '@/components/home/RentVsBuySection';
import { Estimator } from '@/components/rent/Estimator';
import { ContactForm } from '@/app/contact/ContactForm';
import { siteConfig } from '@/config/site';
import { landmarkProjects } from '@/data/company';
import { products } from '@/data/products';
import { catalogueFrom } from '@/lib/estimator';
import {
  rentComponents,
  rentEstimator,
  rentFaq,
  rentHero,
  rentProcessHeading,
} from '@/data/rent-landing';

/**
 * Body of /scaffolding-on-rent. Written as a template so the phase-2 city
 * variants (/scaffolding-on-rent/[city]) can reuse it with their own hero and
 * their own project photos: pass `proofCities` to choose which brochure
 * landmark projects appear as local proof.
 */
export function RentLanding({
  h1 = rentHero.h1,
  sub = rentHero.sub,
  breadcrumb = [{ name: 'Scaffolding on rent', path: '/scaffolding-on-rent' }],
  proofCities = ['Bengaluru', 'Chennai'],
}: {
  h1?: string;
  sub?: string;
  breadcrumb?: { name: string; path: string }[];
  proofCities?: string[];
}) {
  const catalogue = catalogueFrom(products);
  const proof = landmarkProjects.filter((p) => proofCities.includes(p.location));

  return (
    <>
      {/* Hero: text only, so the H1 is the LCP element */}
      <section className="steel-grid bg-charcoal text-white">
        <div className="container py-14 md:py-20">
          <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-1.5 text-sm text-white/60">
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>
            {breadcrumb.map((c, i) => (
              <span key={c.path} className="flex items-center gap-1.5">
                <ChevronRight className="h-3.5 w-3.5" />
                {i === breadcrumb.length - 1 ? (
                  <span className="font-medium text-white">{c.name}</span>
                ) : (
                  <Link href={c.path} className="transition-colors hover:text-white">
                    {c.name}
                  </Link>
                )}
              </span>
            ))}
          </nav>
          <h1 className="hero-rise max-w-4xl text-balance text-[clamp(2.25rem,5.5vw,4rem)] font-extrabold leading-[1.05]">
            {h1}
          </h1>
          <p
            className="hero-rise mt-5 max-w-2xl text-lg leading-relaxed text-white/70"
            style={{ '--rise-delay': '90ms' } as React.CSSProperties}
          >
            {sub}
          </p>
        </div>
      </section>

      {/* Estimator: directly under the hero */}
      <section id="estimator" className="paper-grid scroll-mt-20 py-14 md:py-20">
        <div className="container">
          <div className="mb-8 max-w-3xl">
            <h2 className="text-balance text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold leading-tight">
              {rentEstimator.heading}
            </h2>
            <p className="text-muted-foreground mt-3 text-lg leading-relaxed">{rentEstimator.helper}</p>
          </div>
          <Estimator catalogue={catalogue} />
        </div>
      </section>

      {/* Educational: how Cuplock goes together */}
      <section className="border-border border-y bg-white py-20 md:py-28">
        <div className="container">
          <SectionHeading eyebrow="Cuplock system" title={rentComponents.heading} intro={rentComponents.intro} />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rentComponents.items.map((c, i) => (
              <Reveal key={c.name} delay={(i % 3) * 80} className="h-full">
                <div className="border-border h-full rounded-md border bg-card p-7">
                  <h3 className="text-lg font-bold">{c.name}</h3>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{c.body}</p>
                  <ul className="mt-4 space-y-1">
                    {c.links.map((l) => (
                      <li key={l.href}>
                        <Link href={l.href} className="text-primary inline-flex items-center text-sm font-semibold hover:underline">
                          {l.label} <ArrowRight className="ml-1 h-3.5 w-3.5" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ProcessSection eyebrow="How we work" title={rentProcessHeading} />

      <RentVsBuySection />

      {/* Proof */}
      <ClientMarquee />
      {proof.length > 0 && (
        <section className="py-20 md:py-28">
          <div className="container">
            <SectionHeading eyebrow="Landmark projects" title={`On site in ${proofCities.join(' and ')}`} />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {proof.map((p, i) => (
                <Reveal key={`${p.name}-${p.location}`} delay={(i % 3) * 80}>
                  <div className="border-border h-full overflow-hidden rounded-md border bg-card">
                    <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                      <Image
                        src={p.image}
                        alt={`${p.name}, ${p.location} — Bharat Scaffolding project site`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-5">
                      <p className="eyebrow mb-1">{p.kind}</p>
                      <h3 className="text-lg font-extrabold">{p.name}</h3>
                      <p className="text-muted-foreground mt-1 flex items-center gap-1.5 text-sm">
                        <MapPin className="h-4 w-4" /> {p.location}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            <p className="mt-8">
              <Link href="/projects" className="text-primary inline-flex items-center font-semibold hover:underline">
                All landmark projects <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </p>
          </div>
        </section>
      )}

      {/* FAQ (mirrored in the FAQPage JSON-LD) */}
      <section className="border-border border-y bg-white py-20 md:py-28">
        <div className="container max-w-4xl">
          <SectionHeading eyebrow="FAQ" title="Questions contractors ask us" />
          <div className="divide-border border-border divide-y rounded-md border bg-card">
            {rentFaq.map((f) => (
              <details key={f.q} className="group p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                  {f.q}
                  <ChevronRight className="h-4 w-4 flex-shrink-0 transition-transform group-open:rotate-90" />
                </summary>
                <p className="text-muted-foreground mt-3 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 md:py-28">
        <div className="container grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <ContactForm />
          <div className="space-y-4">
            <a
              href={siteConfig.contact.phoneHref}
              className="border-border hover:border-primary flex items-center gap-4 rounded-md border bg-card p-6 transition-colors"
            >
              <Phone className="text-primary h-6 w-6" />
              <span>
                <span className="block text-sm text-muted-foreground">Call</span>
                <span className="font-display text-lg font-bold">{siteConfig.contact.phone}</span>
              </span>
            </a>
            <a
              href={siteConfig.contact.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="border-border hover:border-primary flex items-center gap-4 rounded-md border bg-card p-6 transition-colors"
            >
              <MessageCircle className="text-primary h-6 w-6" />
              <span>
                <span className="block text-sm text-muted-foreground">WhatsApp</span>
                <span className="font-display text-lg font-bold">{siteConfig.contact.phone}</span>
              </span>
            </a>
            <p className="text-muted-foreground text-sm">
              Depots in {siteConfig.cities.join(', ')}.{' '}
              <Link href="/contact" className="text-primary font-semibold hover:underline">
                Office addresses
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
