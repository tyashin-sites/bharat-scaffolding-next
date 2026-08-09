import { SectionHeading } from '@/components/SectionHeading';
import { Reveal } from '@/components/Reveal';
import { process } from '@/data/company';

export function ProcessSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <SectionHeading
          eyebrow="How we work"
          title="From enquiry to pickup, one accountable process"
        />
        <ol className="relative grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {process.map((p, i) => (
            <Reveal key={p.step} delay={(i % 3) * 90}>
              <li className="border-border relative h-full rounded-md border bg-card p-7">
                <span className="font-display text-primary/15 absolute right-5 top-3 text-6xl font-extrabold">
                  {i + 1}
                </span>
                <p className="eyebrow mb-2">Step {i + 1}</p>
                <h3 className="text-lg font-bold">{p.step}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{p.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
