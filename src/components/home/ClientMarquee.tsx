import Image from 'next/image';
import { allClients } from '@/data/company';

/**
 * Client logo marquee — logos as printed on the approved brochure's
 * "Esteemed Clients" page. CSS animation, paused on hover, static under
 * prefers-reduced-motion.
 */
export function ClientMarquee() {
  const row = [...allClients, ...allClients];
  return (
    <section aria-label="Clients" className="border-border border-y bg-white py-10">
      <div className="container mb-6">
        <p className="text-muted-foreground text-center text-xs font-semibold uppercase tracking-[0.2em]">
          Trusted on India&apos;s landmark projects
        </p>
      </div>
      <div className="overflow-hidden">
        <div className="marquee items-center gap-10 pr-10">
          {row.map((c, i) => (
            <Image
              key={`${c.name}-${i}`}
              src={c.logo}
              alt={c.name}
              width={160}
              height={64}
              aria-hidden={i >= allClients.length}
              className="h-10 w-auto max-w-[150px] object-contain opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 md:h-12"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
