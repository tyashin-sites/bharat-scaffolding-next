'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Loader2, Minus, Plus, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  BAY_SIZES_M,
  DEFAULT_INPUT,
  LIMITS,
  estimate,
  estimateMessage,
  fmtM,
  normaliseInput,
  tonnes,
  type Catalogue,
  type EstimatorInput,
} from '@/lib/estimator';
import { layoutScaffold } from '@/lib/scaffold-layout';
import { ScaffoldViewer } from '@/components/rent/ScaffoldViewer';
import { cn } from '@/lib/utils';

const inputClass =
  'border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-primary w-full rounded-md border px-4 py-3 focus:outline-none focus:ring-2';

function Stepper({
  label,
  value,
  min,
  max,
  step = 1,
  unit,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (v: number) => void;
}) {
  const id = `est-${label.replace(/\W+/g, '-').toLowerCase()}`;
  // Draft text while typing, so "7." on the way to "7.5" is not snapped away.
  const [draft, setDraft] = useState<string | null>(null);
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium">
        {label}
      </label>
      <div className="border-border flex h-12 items-stretch overflow-hidden rounded-md border bg-card">
        <button
          type="button"
          aria-label={`Decrease ${label.toLowerCase()}`}
          className="hover:bg-brick-tint flex w-12 items-center justify-center disabled:opacity-40"
          disabled={value <= min}
          onClick={() => onChange(value - step)}
        >
          <Minus className="h-4 w-4" />
        </button>
        <div className="relative flex-1">
          <input
            id={id}
            type="text"
            inputMode={step < 1 ? 'decimal' : 'numeric'}
            value={draft ?? String(value)}
            onFocus={() => setDraft(String(value))}
            onChange={(e) => {
              setDraft(e.target.value);
              if (/^\d+(\.\d+)?$/.test(e.target.value)) {
                const n = Number(e.target.value);
                if (n >= min && n <= max) onChange(n);
              }
            }}
            onBlur={() => {
              if (draft !== null && /^\d+(\.\d+)?$/.test(draft)) onChange(Number(draft));
              setDraft(null);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') (e.target as HTMLInputElement).blur();
            }}
            className="h-full w-full bg-transparent text-center text-base font-semibold focus:outline-none"
          />
        {unit && (
            <span className="text-muted-foreground pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs">
              {unit}
            </span>
          )}
        </div>
        <button
          type="button"
          aria-label={`Increase ${label.toLowerCase()}`}
          className="hover:bg-brick-tint flex w-12 items-center justify-center disabled:opacity-40"
          disabled={value >= max}
          onClick={() => onChange(value + step)}
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function Segmented<T extends string | number>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-2 block text-sm font-medium">{label}</legend>
      <div className="border-border grid auto-cols-fr grid-flow-col overflow-hidden rounded-md border bg-card">
        {options.map((o) => (
          <button
            key={String(o.value)}
            type="button"
            aria-pressed={o.value === value}
            onClick={() => onChange(o.value)}
            className={cn(
              'h-12 px-2 text-sm font-semibold transition-colors',
              o.value === value ? 'bg-primary text-primary-foreground' : 'hover:bg-brick-tint'
            )}
          >
            {o.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

type SendStatus = 'idle' | 'sending' | 'sent' | 'error';

export function Estimator({ catalogue }: { catalogue: Catalogue }) {
  const [raw, setRaw] = useState<EstimatorInput>(DEFAULT_INPUT);
  const [touched, setTouched] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [status, setStatus] = useState<SendStatus>('idle');
  const [form, setForm] = useState({ name: '', phone: '', email: '', company: '', location: '', note: '' });

  const result = useMemo(() => estimate(raw, catalogue), [raw, catalogue]);
  const layout = useMemo(() => layoutScaffold(result), [result]);

  const set = (patch: Partial<EstimatorInput>) => {
    setTouched(true);
    setRaw((r) => normaliseInput({ ...r, ...patch }));
    if (status === 'sent') setStatus('idle');
  };

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          company: form.company,
          location: form.location,
          message: estimateMessage(result, form.note),
          source: 'estimator',
        }),
      });
      const data = (await res.json().catch(() => null)) as { ok?: boolean } | null;
      setStatus(res.ok && data?.ok ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  };

  const { input } = result;

  return (
    <div onPointerDown={() => setTouched(true)} onFocusCapture={() => setTouched(true)}>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-10">
        {/* Inputs */}
        <div className="space-y-5">
          <Segmented
            label="Scaffold type"
            value={input.type}
            onChange={(type) => set({ type })}
            options={[
              { value: 'access', label: 'Access' },
              { value: 'support', label: 'Support (formwork)' },
            ]}
          />
          <Segmented
            label="Bay length"
            value={input.bayM}
            onChange={(bayM) => set({ bayM })}
            options={BAY_SIZES_M.map((b) => ({ value: b as number, label: fmtM(b) }))}
          />
          <div className="grid grid-cols-2 gap-4">
            <Stepper
              label="Bays long"
              value={input.baysLong}
              min={LIMITS.baysLong.min}
              max={LIMITS.baysLong.max}
              onChange={(baysLong) => set({ baysLong })}
            />
            <Stepper
              label="Width in bays"
              value={input.baysWide}
              min={LIMITS.baysWide.min}
              max={LIMITS.baysWide.max}
              onChange={(baysWide) => set({ baysWide })}
            />
          </div>
          <Stepper
            label="Working height"
            value={input.heightM}
            min={LIMITS.heightM.min}
            max={LIMITS.heightM.max}
            step={LIMITS.heightM.step}
            unit="m"
            onChange={(heightM) => set({ heightM })}
          />
          <p className="text-muted-foreground text-sm">
            {result.posts} posts · {result.lifts} lift{result.lifts === 1 ? '' : 's'} ·{' '}
            {fmtM(input.baysLong * input.bayM)} × {fmtM(input.baysWide * input.bayM)} on plan
          </p>
        </div>

        {/* 3D */}
        <ScaffoldViewer layout={layout} activate={touched} />
      </div>

      {/* Component table: server-rendered for the default configuration */}
      <div className="mt-10">
        <div className="border-border overflow-x-auto rounded-md border bg-card">
          <table className="w-full min-w-[560px] text-left text-sm">
            <caption className="sr-only">
              Indicative Cuplock component list for the configuration above
            </caption>
            <thead className="bg-charcoal text-white">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold">Component</th>
                <th scope="col" className="px-4 py-3 font-semibold">Size</th>
                <th scope="col" className="px-4 py-3 text-right font-semibold">Quantity</th>
                <th scope="col" className="px-4 py-3 text-right font-semibold">Weight (kg)</th>
              </tr>
            </thead>
            <tbody>
              {result.rows.map((r) => (
                <tr key={`${r.key}-${r.size}`} className="border-border border-t">
                  <td className="px-4 py-3">
                    <Link href={`/products/${r.slug}`} className="hover:text-primary font-medium underline-offset-2 hover:underline">
                      {r.component}
                    </Link>
                  </td>
                  <td className="text-muted-foreground px-4 py-3">{r.size}</td>
                  <td className="px-4 py-3 text-right font-semibold tabular-nums">{r.qty}</td>
                  <td className="text-muted-foreground px-4 py-3 text-right tabular-nums">
                    {r.totalKg === null ? '—' : r.totalKg.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-border bg-brick-tint border-t">
                <th scope="row" colSpan={3} className="px-4 py-3 font-semibold">
                  Partial tonnage: verticals and ledgers only
                  {result.unweighed.length > 0 && (
                    <span className="text-brick mt-1 block text-xs font-semibold">
                      Not included: {result.unweighed.join(', ').toLowerCase()}. The brochure
                      prints no weight for these, so the full load is higher than this figure.
                      Do not plan transport on it.
                    </span>
                  )}
                </th>
                <td className="px-4 py-3 text-right align-top font-extrabold tabular-nums">
                  {tonnes(result.knownKg)} t
                  {result.unweighed.length > 0 && (
                    <span className="text-brick block text-xs font-semibold">partial</span>
                  )}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        <p className="text-muted-foreground mt-3 text-xs leading-relaxed">
          Indicative estimate, not a design. Weights are the brochure weights for verticals and
          ledgers; {result.unweighed.join(', ').toLowerCase()} have no printed weight and are
          counted but not weighed. Our technical team confirms quantities after a site visit.
        </p>

        <details className="text-muted-foreground mt-4 text-sm">
          <summary className="text-foreground cursor-pointer font-medium">How this list is worked out</summary>
          <ul className="mt-3 list-disc space-y-1.5 pl-5">
            <li>Posts: (bays long + 1) × (bays wide + 1). Each post is made up of 3.0 m verticals plus one shorter vertical to reach the working height.</li>
            <li>Ledgers: bays long × (bays wide + 1) + bays wide × (bays long + 1) at each level. One level every 2.0 m lift plus a base set at the first cup.</li>
            <li>One base jack under every post. Support scaffolds also get one U-head jack on every post.</li>
            <li>Access scaffolds: one working deck at the top lift, with 300 mm platforms across every bay, toe boards round the deck edge, and one 3.0 m ladder per lift in one access bay.</li>
            <li>Not included: guardrails above the deck, bracing, ties to the structure and spare material. These depend on the site and are planned at the site visit.</li>
          </ul>
        </details>
      </div>

      {/* Send for quotation */}
      <div className="mt-8">
        {!showForm ? (
          <Button size="lg" onClick={() => setShowForm(true)}>
            Send this list for a quotation <Send className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <form onSubmit={send} className="border-border space-y-4 rounded-md border bg-card p-6 md:p-8">
            <p className="font-display text-lg font-bold">Send this list for a quotation</p>
            <p className="text-muted-foreground text-sm">
              The component list above goes with your details, marked as an indicative estimate.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <input required aria-label="Your name" placeholder="Your name *" className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <input required type="tel" aria-label="Phone" placeholder="Phone *" className={inputClass} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              <input required type="email" aria-label="Email" placeholder="Email *" className={inputClass} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              <input aria-label="Company" placeholder="Company" className={inputClass} value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
            </div>
            <input aria-label="Site location" placeholder="Site location (city)" className={inputClass} value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
            <textarea rows={3} aria-label="Anything else" placeholder="Anything else: hire period, start date, site conditions" className={inputClass} value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} />
            {status === 'sent' && (
              <p className="rounded-md bg-green-50 px-4 py-3 text-sm font-medium text-green-800">
                Thank you. Your list is with our team. We usually respond within one business day.
              </p>
            )}
            {status === 'error' && (
              <p className="bg-brick-tint text-primary rounded-md px-4 py-3 text-sm font-medium">
                Something went wrong. Please call us directly or email hire@preetbharat.com.
              </p>
            )}
            <Button type="submit" size="lg" disabled={status === 'sending'}>
              {status === 'sending' ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending…
                </>
              ) : (
                <>
                  Send this list for a quotation <Send className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
