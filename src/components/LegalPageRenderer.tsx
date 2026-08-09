import { notFound } from 'next/navigation';
import { getLegalPageHtml } from '@/lib/legal';

/**
 * Renders an admin-edited legal page (HTML from the platform API) inside the
 * site's own chrome. 404s while the page is unconfigured in the admin.
 */
export async function LegalPageRenderer({ slug }: { slug: string }) {
  const page = await getLegalPageHtml(slug);
  if (!page) notFound();

  return (
    <section className="py-16">
      <div className="container mx-auto max-w-3xl">
        <h1 className="mb-8 text-4xl">{page.title}</h1>
        <div
          className="space-y-4 leading-relaxed [&_a]:text-primary [&_a]:underline [&_h2]:mt-8 [&_h2]:text-2xl [&_h3]:mt-6 [&_h3]:text-xl [&_li]:ml-6 [&_ol]:list-decimal [&_ul]:list-disc"
          dangerouslySetInnerHTML={{ __html: page.html }}
        />
      </div>
    </section>
  );
}
