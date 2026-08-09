'use client';

import { useEffect, useState } from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { siteConfig } from '@/config/site';

/**
 * Floating enquiry dock — call + WhatsApp (DESIGN-SPEC signature component).
 * Appears after the first viewport of scroll so it never covers the hero CTA.
 */
export function EnquiryDock() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    // Bottom-LEFT: the platform-injected chatbot widget owns the bottom-right
    // corner — sharing it stacks the bubbles on top of each other.
    <div
      className={`fixed bottom-5 left-5 z-40 flex flex-col gap-3 transition-all duration-300 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <a
        href={siteConfig.contact.whatsappHref}
        target="_blank"
        rel="noopener"
        aria-label="Chat on WhatsApp"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:-translate-y-0.5"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
      <a
        href={siteConfig.contact.phoneHref}
        aria-label={`Call ${siteConfig.contact.phone}`}
        className="bg-primary text-primary-foreground hover:bg-brick-deep flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-all hover:-translate-y-0.5"
      >
        <Phone className="h-6 w-6" />
      </a>
    </div>
  );
}
