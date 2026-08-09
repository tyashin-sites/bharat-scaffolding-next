import { LegalPageRenderer } from '@/components/LegalPageRenderer';
import { pageMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export const metadata = pageMetadata({
  title: 'Terms & Conditions',
  description: 'Terms governing enquiries and the hire of scaffolding, shuttering and formwork from Bharat Scaffolding Pvt. Ltd.',
  path: '/terms-and-conditions',
});

export default function TermsPage() {
  return <LegalPageRenderer slug="terms-and-conditions" />;
}
