import { HeroSection } from '@/components/home/HeroSection';
import { ClientMarquee } from '@/components/home/ClientMarquee';
import { WhyChooseSection } from '@/components/home/WhyChooseSection';
import { SectorsSection } from '@/components/home/SectorsSection';
import { ProductsPreview } from '@/components/home/ProductsPreview';
import { ProcessSection } from '@/components/home/ProcessSection';
import { RentVsBuySection } from '@/components/home/RentVsBuySection';
import { SustainabilitySection } from '@/components/home/SustainabilitySection';
import { CTASection } from '@/components/home/CTASection';
import { JsonLd } from '@/components/JsonLd';
import { pageMetadata } from '@/lib/seo';
import { siteConfig } from '@/config/site';

export const metadata = pageMetadata({
  title: 'Bharat Scaffolding — Scaffolding, Shuttering, Centering & Formwork on Hire',
  description: siteConfig.description,
  path: '/',
});

export default function HomePage() {
  return (
    <>
      <JsonLd path="/" title="Bharat Scaffolding" description={siteConfig.description} />
      <HeroSection />
      <ClientMarquee />
      <WhyChooseSection />
      <SectorsSection />
      <ProductsPreview />
      <ProcessSection />
      <RentVsBuySection />
      <SustainabilitySection />
      <CTASection />
    </>
  );
}
