import { Warehouse, ShieldCheck, Truck, Workflow, Landmark, DraftingCompass } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { Reveal } from '@/components/Reveal';
import { whyChooseUs } from '@/data/company';

const icons = [Warehouse, ShieldCheck, Truck, Workflow, Landmark, DraftingCompass];

export function WhyChooseSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <SectionHeading
          eyebrow="Why choose us"
          title="India’s trusted scaffolding rental partner"
          intro="Reliable scaffolding and shuttering solutions for infrastructure, industrial, commercial and high-rise construction — delivered across India with consistency and accountability."
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {whyChooseUs.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal key={item.title} delay={(i % 3) * 80}>
                <div className="border-border hover:border-primary group h-full rounded-md border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_-16px_hsl(4_62%_37%/0.35)]">
                  <div className="bg-brick-tint text-primary mb-5 inline-flex rounded-md p-3">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
