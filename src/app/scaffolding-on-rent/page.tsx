import type { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { RentLanding } from '@/components/rent/RentLanding';
import { pageMetadata } from '@/lib/seo';
import { rentFaq, rentMeta } from '@/data/rent-landing';
import { ESTIMATOR_SIGNED_OFF } from '@/config/launch-gates';

const PATH = '/scaffolding-on-rent';

export const metadata: Metadata = {
  ...pageMetadata({ title: rentMeta.title, description: rentMeta.description, path: PATH }),
  // The supplied title already carries the brand; skip the layout's "· Bharat Scaffolding".
  title: { absolute: rentMeta.title },
  // Unsigned estimator formula: keep the page out of search even after the domain cutover.
  ...(ESTIMATOR_SIGNED_OFF ? {} : { robots: { index: false, follow: false } }),
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
