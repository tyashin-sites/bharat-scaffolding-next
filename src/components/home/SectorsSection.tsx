import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { Reveal } from '@/components/Reveal';
import { sectors } from '@/data/company';

export function SectorsSection() {
  return (
    <section className="steel-grid bg-charcoal py-20 text-white md:py-28">
      <div className="container">
        <SectionHeading
          dark
          eyebrow="Market sectors"
          title="Wherever India builds, we hold it up"
        />
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-md border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {sectors.map((s, i) => (
            <Reveal key={s.title} delay={(i % 4) * 70} className="h-full">
              <div className="bg-charcoal/95 hover:bg-steel/90 group h-full p-7 transition-colors duration-300">
                <p className="text-primary-foreground/40 font-display text-sm font-bold">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-3 text-base font-bold text-white">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10">
          <Link
            href="/projects"
            className="text-white/80 hover:text-white inline-flex items-center gap-2 text-sm font-semibold transition-colors"
          >
            See the landmark projects we support <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
