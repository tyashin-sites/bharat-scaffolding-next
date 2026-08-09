import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
import { Reveal } from '@/components/Reveal';
import { pageMetadata } from '@/lib/seo';
import { siteConfig } from '@/config/site';
import { offices } from '@/data/company';
import { ContactForm } from './ContactForm';

export const metadata = pageMetadata({
  title: 'Contact & Offices',
  description:
    'Reach Bharat Scaffolding for scaffolding, shuttering and formwork enquiries — offices and depots in Delhi, Gurugram, Mohali, Bengaluru, Mumbai and Ahmedabad.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        path="/contact"
        title="Contact Bharat Scaffolding"
        description="Contact details and office network of Bharat Scaffolding Pvt. Ltd."
        breadcrumb={[{ name: 'Contact', path: '/contact' }]}
      />

      <section className="steel-grid bg-charcoal py-16 text-white md:py-20">
        <div className="container">
          <p className="eyebrow-light hero-rise mb-4">Contact us</p>
          <h1
            className="hero-rise max-w-3xl text-balance text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold leading-tight"
            style={{ '--rise-delay': '80ms' } as React.CSSProperties}
          >
            Tell us your project requirement
          </h1>
          <p
            className="hero-rise mt-4 max-w-2xl text-lg text-white/70"
            style={{ '--rise-delay': '160ms' } as React.CSSProperties}
          >
            Call, email, WhatsApp or use the form — our technical team follows up with a site
            visit and an optimised material plan.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container grid grid-cols-1 gap-12 lg:grid-cols-5">
          {/* Form */}
          <Reveal className="lg:col-span-3">
            <ContactForm />
          </Reveal>

          {/* Direct channels */}
          <Reveal delay={100} className="lg:col-span-2">
            <div className="space-y-4">
              <a
                href={siteConfig.contact.phoneHref}
                className="border-border hover:border-primary flex items-start gap-4 rounded-md border bg-card p-5 transition-colors"
              >
                <Phone className="text-primary mt-0.5 h-5 w-5" />
                <span>
                  <span className="block font-bold">Call us</span>
                  <span className="text-muted-foreground text-sm">
                    {siteConfig.contact.phone} · {siteConfig.contact.phone2}
                    <br />
                    Landline: {siteConfig.contact.landline}
                  </span>
                </span>
              </a>
              <a
                href={siteConfig.contact.whatsappHref}
                target="_blank"
                rel="noopener"
                className="border-border hover:border-primary flex items-start gap-4 rounded-md border bg-card p-5 transition-colors"
              >
                <MessageCircle className="text-primary mt-0.5 h-5 w-5" />
                <span>
                  <span className="block font-bold">WhatsApp</span>
                  <span className="text-muted-foreground text-sm">{siteConfig.contact.phone}</span>
                </span>
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="border-border hover:border-primary flex items-start gap-4 rounded-md border bg-card p-5 transition-colors"
              >
                <Mail className="text-primary mt-0.5 h-5 w-5" />
                <span>
                  <span className="block font-bold">Email</span>
                  <span className="text-muted-foreground text-sm">{siteConfig.contact.email}</span>
                </span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Offices */}
      <section className="border-border border-t bg-white py-16 md:py-24">
        <div className="container">
          <Reveal className="mb-10">
            <p className="eyebrow mb-3">Pan-India presence</p>
            <h2 className="text-2xl font-extrabold md:text-3xl">Offices & depots</h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {offices.map((o, i) => (
              <Reveal key={o.city} delay={(i % 3) * 80}>
                <div className="border-border h-full rounded-md border bg-background p-6">
                  <div className="mb-3 flex items-center gap-2">
                    <MapPin className="text-primary h-4 w-4" />
                    <h3 className="font-bold">
                      {o.city}
                      {o.label ? (
                        <span className="bg-brick-tint text-primary ml-2 rounded-sm px-2 py-0.5 text-xs font-bold uppercase tracking-wide">
                          {o.label}
                        </span>
                      ) : null}
                    </h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{o.address}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
