import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { JsonLd } from '@/components/JsonLd';
import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { Counter } from '@/components/Counter';
import { pageMetadata } from '@/lib/seo';
import { landmarkProjects, clientGroups, secondaryStats, stats } from '@/data/company';

export const metadata = pageMetadata({
  title: 'Landmark Projects & Clients',
  description:
    'From the metro corridors of Bengaluru, Chennai and Bhopal to GIFT City, Gwalior Airport and India’s leading industrial facilities — the projects and clients Bharat Scaffolding supports.',
  path: '/projects',
});

export default function ProjectsPage() {
  return (
    <>
      <JsonLd
        path="/projects"
        title="Landmark Projects"
        description="Landmark infrastructure and industrial projects supported by Bharat Scaffolding."
        breadcrumb={[{ name: 'Projects', path: '/projects' }]}
      />

      <section className="steel-grid bg-charcoal py-16 text-white md:py-20">
        <div className="container">
          <p className="eyebrow-light hero-rise mb-4">Landmark projects</p>
          <h1
            className="hero-rise max-w-3xl text-balance text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold leading-tight"
            style={{ '--rise-delay': '80ms' } as React.CSSProperties}
          >
            The silent force behind India’s metros, airports and landmarks
          </h1>
          <p
            className="hero-rise mt-4 max-w-2xl text-lg text-white/70"
            style={{ '--rise-delay': '160ms' } as React.CSSProperties}
          >
            Each of these projects carried enormous responsibility — and we carried ours with
            pride.
          </p>
        </div>
      </section>

      {/* Projects grid */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {landmarkProjects.map((p, i) => (
              <Reveal key={`${p.name}-${p.location}`} delay={(i % 3) * 80}>
                <div className="border-border hover:border-primary group h-full overflow-hidden rounded-md border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_-16px_hsl(4_62%_37%/0.35)]">
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    <Image
                      src={p.image}
                      alt={`${p.name}, ${p.location} — Bharat Scaffolding project site`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="p-6">
                    <p className="eyebrow mb-2">{p.kind}</p>
                    <h2 className="text-xl font-extrabold">{p.name}</h2>
                    <p className="text-muted-foreground mt-2 flex items-center gap-1.5 text-sm">
                      <MapPin className="h-4 w-4" /> {p.location}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Numbers strip */}
      <section className="border-border border-y bg-white py-14">
        <div className="container grid grid-cols-2 gap-8 text-center md:grid-cols-7">
          {[...stats, ...secondaryStats].map((s) => (
            <div key={s.label}>
              <p className="font-display text-primary text-3xl font-extrabold">
                <Counter value={s.value} suffix={s.suffix} />
              </p>
              <p className="text-muted-foreground mt-1 text-xs font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Client wall */}
      <section className="py-16 md:py-24">
        <div className="container">
          <SectionHeading
            eyebrow="Esteemed clients"
            title="Trusted by the institutions that build India"
          />
          <div className="space-y-10">
            {clientGroups.map((g) => (
              <Reveal key={g.title}>
                <h3 className="text-muted-foreground mb-5 text-xs font-semibold uppercase tracking-[0.2em]">
                  {g.title}
                </h3>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                  {g.clients.map((c) => (
                    <div
                      key={c.name}
                      title={c.name}
                      className="border-border hover:border-primary flex h-24 items-center justify-center rounded-md border bg-card p-5 transition-colors"
                    >
                      <Image
                        src={c.logo}
                        alt={c.name}
                        width={180}
                        height={72}
                        className="max-h-14 w-auto max-w-full object-contain"
                      />
                    </div>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-14">
            <div className="bg-brick-tint rounded-md p-8 text-center">
              <h3 className="text-xl font-extrabold">Planning a project of national scale?</h3>
              <p className="text-muted-foreground mx-auto mt-2 max-w-xl">
                Our technical team supports material planning from the tendering stage onwards.
              </p>
              <Button className="mt-6" asChild>
                <Link href="/contact">
                  Talk to our team <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
