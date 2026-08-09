'use client';

import { Loader2, Send } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

type SubmitStatus = 'idle' | 'success' | 'error';

const inputClass =
  'border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-primary w-full rounded-md border px-4 py-3 focus:outline-none focus:ring-2';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    location: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<SubmitStatus>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = (await res.json().catch(() => null)) as { ok?: boolean } | null;

      if (res.ok && data?.ok) {
        setStatus('success');
        setFormData({ name: '', company: '', email: '', phone: '', location: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="border-border rounded-md border bg-card p-8 lg:p-10">
      <h2 className="font-display mb-6 text-2xl font-bold">Start your enquiry</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">Your name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={inputClass}
              placeholder="Full name"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">Company</label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className={inputClass}
              placeholder="Company / contractor name"
            />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">Phone *</label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={inputClass}
              placeholder="+91"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">Email *</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={inputClass}
              placeholder="you@company.com"
            />
          </div>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Project location</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className={inputClass}
            placeholder="City / site location"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Requirement *</label>
          <textarea
            required
            rows={5}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className={inputClass}
            placeholder="Material required, quantities if known, project duration…"
          />
        </div>

        {status === 'success' && (
          <p className="rounded-md bg-green-50 px-4 py-3 text-sm font-medium text-green-800">
            Thank you — your enquiry is with our team. We usually respond within one business day.
          </p>
        )}
        {status === 'error' && (
          <p className="bg-brick-tint text-primary rounded-md px-4 py-3 text-sm font-medium">
            Something went wrong. Please call us directly or email hire@preetbharat.com.
          </p>
        )}

        <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending…
            </>
          ) : (
            <>
              Send enquiry <Send className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
