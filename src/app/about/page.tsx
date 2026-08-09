import Link from 'next/link';
import { ArrowRight, Factory, ShieldCheck, Cog } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { JsonLd } from '@/components/JsonLd';
import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { Counter } from '@/components/Counter';
import { pageMetadata } from '@/lib/seo';
import { chairmansDesk, manufacturing, stats, sustainability } from '@/data/company';

export const metadata = pageMetadata({
  title: 'About Us — 45 Years, Three Generations',
  description:
    'Since 1981, Bharat Scaffolding Pvt. Ltd. has grown across three generations into a pan-India enterprise: 5 manufacturing units, 750 tonnes/day capacity, and a rental inventory spanning every major scaffolding system.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        path="/about"
        title="About Bharat Scaffolding"
        description="The story of Bharat Scaffolding Pvt. Ltd. — since 1981."
        breadcrumb={[{ name: 'About', path: '/about' }]}
      />

      <section className="steel-grid bg-charcoal py-16 text-white md:py-20">
        <div className="container">
          <p className="eyebrow-light hero-rise mb-4">About us</p>
          <h1
            className="hero-rise max-w-3xl text-balance text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold leading-tight"
            style={{ '--rise-delay': '80ms' } as React.CSSProperties}
          >
            Not just a rental company. Your construction backbone.
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 md:py-24">
        <div className="container grid grid-cols-1 gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="prose-p:leading-relaxed space-y-5 text-lg">
              <p>
                For over 45 years, Bharat Scaffolding Pvt. Ltd. has stood as one of India&apos;s
                most trusted names in scaffolding, shuttering and formwork solutions. What began
                as a family vision in 1981 has grown — across three generations — into a
                pan-India enterprise serving the country&apos;s most ambitious infrastructure and
                construction projects.
              </p>
              <p>
                From the metro rail corridors of Delhi and Bengaluru to the industrial facilities
                of ISRO, Indian Navy and HPCL — from the campuses of IIT and AIIMS to the
                commercial towers of DLF, M3M and Prestige Group — Bharat Scaffolding has been
                the silent force enabling India to build higher, faster and safer.
              </p>
              <p>
                We believe the right scaffolding solution is not just about material — it is
                about timing, reliability, technical support, and a partner who shows up when it
                matters most.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s) => (
                <div key={s.label} className="border-border rounded-md border bg-card p-6">
                  <p className="font-display text-primary text-4xl font-extrabold">
                    <Counter value={s.value} suffix={s.suffix} />
                  </p>
                  <p className="mt-1 text-sm font-semibold">{s.label}</p>
                  <p className="text-muted-foreground text-xs">{s.note}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Chairman's desk */}
      <section className="border-border border-y bg-white py-16 md:py-24">
        <div className="container">
          <SectionHeading eyebrow="From the chairman’s desk" title="When our clients commit to a deadline, it becomes our deadline" />
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            <Reveal className="lg:col-span-2">
              <blockquote className="border-l-primary border-l-4 pl-6 text-lg leading-relaxed">
                “{chairmansDesk.quote}”
              </blockquote>
              <p className="text-muted-foreground mt-6 leading-relaxed">{chairmansDesk.body}</p>
              <p className="font-display mt-6 font-bold">{chairmansDesk.names}</p>
            </Reveal>
            <Reveal delay={120}>
              <div className="bg-brick-tint h-full rounded-md p-7">
                <ShieldCheck className="text-primary mb-4 h-7 w-7" />
                <h3 className="text-lg font-bold">Safety is not a procedure — it is a culture</h3>
                <ul className="text-muted-foreground mt-4 space-y-3 text-sm leading-relaxed">
                  <li>Designed for safe working at every height and load condition</li>
                  <li>Regular inspection and maintenance of all rental material before dispatch</li>
                  <li>Compliance with industry safety requirements and construction standards</li>
                  <li>Unwavering focus on worker safety and structural stability</li>
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Manufacturing */}
      <section className="py-16 md:py-24">
        <div className="container">
          <SectionHeading
            eyebrow="Advanced manufacturing"
            title="Five units. 750 tonnes a day. Always field-ready."
            intro={manufacturing.intro}
          />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <Reveal className="lg:col-span-2">
              <div className="border-border h-full rounded-md border bg-card p-8">
                <Factory className="text-primary mb-4 h-7 w-7" />
                <p className="leading-relaxed">{manufacturing.capacity}</p>
                <p className="text-muted-foreground mt-4 leading-relaxed">
                  Every unit is staffed by trained operators, maintained to consistent quality
                  standards, and subject to regular inspection — so that what leaves our facility
                  and reaches your site is always field-ready.
                </p>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="bg-charcoal steel-grid h-full rounded-md p-8 text-white">
                <Cog className="text-primary-foreground/60 mb-4 h-7 w-7" />
                <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.15em]">
                  Purpose-built machinery
                </h3>
                <ul className="space-y-2.5 text-sm text-white/70">
                  {manufacturing.machines.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Sustainability */}
      <section className="border-border border-t bg-white py-16 md:py-24">
        <div className="container">
          <SectionHeading
            eyebrow="Sustainability"
            title="How we build matters as much as what we build"
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {sustainability.map((s, i) => (
              <Reveal key={s.title} delay={i * 90}>
                <div className="border-border h-full rounded-md border bg-background p-7">
                  <h3 className="mb-2 text-base font-bold">{s.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-12 text-center">
            <Button asChild>
              <Link href="/contact">
                Work with us <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
