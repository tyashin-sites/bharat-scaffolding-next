import { allClients } from '@/data/company';

/**
 * Client wall marquee — text nameplates only (no logos: usage rights not
 * held; see ASSET-DEBT #4). CSS animation, paused on hover, static under
 * prefers-reduced-motion.
 */
export function ClientMarquee() {
  const row = [...allClients, ...allClients];
  return (
    <section aria-label="Clients" className="border-border border-y bg-white py-8">
      <div className="container mb-4">
        <p className="text-muted-foreground text-center text-xs font-semibold uppercase tracking-[0.2em]">
          Trusted on India&apos;s landmark projects
        </p>
      </div>
      <div className="overflow-hidden">
        <div className="marquee gap-4 pr-4">
          {row.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="border-border text-foreground/70 whitespace-nowrap rounded-sm border bg-background px-5 py-2 font-display text-sm font-semibold tracking-wide"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
