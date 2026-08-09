import Link from 'next/link';
import { Check, X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/SectionHeading';
import { Reveal } from '@/components/Reveal';
import { rentVsBuy } from '@/data/company';

export function RentVsBuySection() {
  return (
    <section className="border-border border-y bg-white py-20 md:py-28">
      <div className="container">
        <SectionHeading
          eyebrow="Rent vs buy"
          title="Owning scaffolding costs more than you think"
          intro="Renting from Bharat Scaffolding costs less than you expect. Rent smarter. Build better."
        />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="border-border h-full rounded-md border bg-background p-8">
              <h3 className="text-muted-foreground mb-6 text-lg font-bold">Owning scaffolding</h3>
              <ul className="space-y-4">
                {rentVsBuy.owning.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <X className="text-muted-foreground/60 mt-0.5 h-5 w-5 flex-shrink-0" />
                    <span className="text-muted-foreground text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="border-primary/40 relative h-full rounded-md border-2 bg-card p-8 shadow-[0_16px_40px_-20px_hsl(4_62%_37%/0.4)]">
              <span className="bg-primary text-primary-foreground absolute -top-3 left-8 rounded-sm px-3 py-1 text-xs font-bold uppercase tracking-wider">
                The Bharat way
              </span>
              <h3 className="mb-6 text-lg font-bold">Renting from Bharat Scaffolding</h3>
              <ul className="space-y-4">
                {rentVsBuy.renting.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="text-primary mt-0.5 h-5 w-5 flex-shrink-0" />
                    <span className="text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <Button className="mt-8" asChild>
                <Link href="/contact">
                  Start your enquiry <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
