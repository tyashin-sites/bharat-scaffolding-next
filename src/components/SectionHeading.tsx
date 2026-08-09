import { Reveal } from '@/components/Reveal';
import { cn } from '@/lib/utils';

export function SectionHeading({
  eyebrow,
  title,
  intro,
  dark = false,
  align = 'left',
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  dark?: boolean;
  align?: 'left' | 'center';
}) {
  return (
    <Reveal
      className={cn('mb-12 max-w-3xl md:mb-16', align === 'center' && 'mx-auto text-center')}
    >
      <p className={dark ? 'eyebrow-light mb-3' : 'eyebrow mb-3'}>{eyebrow}</p>
      <h2
        className={cn(
          'text-balance text-[clamp(1.75rem,3.5vw,2.75rem)] font-extrabold leading-tight',
          dark ? 'text-white' : 'text-foreground'
        )}
      >
        {title}
      </h2>
      {intro && (
        <p className={cn('mt-4 text-lg leading-relaxed', dark ? 'text-white/70' : 'text-muted-foreground')}>
          {intro}
        </p>
      )}
    </Reveal>
  );
}
