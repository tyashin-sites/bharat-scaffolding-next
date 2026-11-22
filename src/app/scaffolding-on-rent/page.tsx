import type { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { RentLanding } from '@/components/rent/RentLanding';
import { pageMetadata } from '@/lib/seo';
import { rentFaq, rentMeta } from '@/data/rent-landing';

const PATH = '/scaffolding-on-rent';

export const metadata: Metadata = {
  ...pageMetadata({ title: rentMeta.title, description: rentMeta.description, path: PATH }),
  // The supplied title already carries the brand; skip the layout's "· Bharat Scaffolding".
  title: { absolute: rentMeta.title },
};

export default function ScaffoldingOnRentPage() {
  return (
    <>
      <JsonLd
        path={PATH}
        title={rentMeta.title}
        description={rentMeta.description}
        breadcrumb={[{ name: 'Scaffolding on rent', path: PATH }]}
        faq={rentFaq}
      />
      <RentLanding />
    </>
  );
}
