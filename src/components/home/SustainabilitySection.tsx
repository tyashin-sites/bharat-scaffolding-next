import { Recycle, Factory, Route } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { Reveal } from '@/components/Reveal';
import { sustainability } from '@/data/company';

const icons = [Recycle, Factory, Route];

export function SustainabilitySection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <SectionHeading
          eyebrow="Sustainability"
          title="A rental model that is, at its core, a sustainable model"
          intro="By providing high-quality scaffolding and shuttering on hire, we eliminate the need for every contractor to manufacture, store and eventually discard their own material."
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {sustainability.map((s, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal key={s.title} delay={i * 90}>
                <div className="border-border h-full rounded-md border-l-4 border-l-primary border bg-card p-7">
                  <Icon className="text-primary mb-4 h-6 w-6" />
                  <h3 className="mb-2 text-base font-bold">{s.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{s.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
