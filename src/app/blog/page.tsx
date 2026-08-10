import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBlogPosts } from '@/lib/blog';
import { pageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';

export const dynamic = 'force-dynamic';

const description =
  'Guides and insights on scaffolding, shuttering and formwork — from the Bharat Scaffolding team.';

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata({
    title: 'Our Blog',
    description,
    path: '/blog',
  });
}

function formatDate(date?: string): string {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const parsed = Number.parseInt(params.page ?? '1', 10);
  const pageNum = Number.isFinite(parsed) && parsed > 0 ? parsed : 1;

  const { posts, totalPages, page } = await getBlogPosts(pageNum, 9);

  if (page === 1 && posts.length === 0) {
    notFound();
  }

  return (
    <>
      <JsonLd
        path="/blog"
        title="Our Blog"
        description={description}
        breadcrumb={[{ name: 'Blog', path: '/blog' }]}
      />
      {/* Hero */}
      <section className="steel-grid bg-charcoal py-20 text-white">
        <div className="container mx-auto text-center">
          <h1 className="font-display mb-6 text-4xl font-extrabold md:text-5xl">
            Our <span className="text-[hsl(4_75%_62%)]">Blog</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-white/70">
            Guides and insights on scaffolding, shuttering, formwork and safe construction — from 45+ years in the field.
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="bg-background py-16">
        <div className="container mx-auto">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(posts ?? []).map((post) => (
              <a
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="bg-card border-border hover:border-primary group block overflow-hidden rounded-md border transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_-16px_hsl(4_62%_37%/0.35)]"
              >
                {post.featuredImage ? (
                  <div className="aspect-[16/9] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="bg-brick-tint text-primary flex aspect-[16/9] items-center justify-center font-display text-sm font-bold uppercase tracking-[0.2em]">Bharat Scaffolding</div>
                )}
                <div className="p-6">
                  {post.pinned && (
                    <span className="bg-primary text-primary-foreground mb-3 inline-block rounded-sm px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                      Featured
                    </span>
                  )}
                  <h2 className="font-display text-foreground mb-2 text-lg font-bold">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="text-muted-foreground mb-4 line-clamp-3 text-sm leading-relaxed">
                      {post.excerpt}
                    </p>
                  )}
                  {post.publishedAt && (
                    <p className="text-muted-foreground text-sm">{formatDate(post.publishedAt)}</p>
                  )}
                </div>
              </a>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <nav
              aria-label="Blog pagination"
              className="mt-12 flex flex-wrap items-center justify-center gap-2"
            >
              {page > 1 && (
                <a
                  href={`?page=${page - 1}`}
                  className="bg-muted text-muted-foreground hover:bg-brick-tint hover:text-primary rounded-md px-5 py-2.5 font-medium transition-colors"
                >
                  Previous
                </a>
              )}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <a
                  key={n}
                  href={`?page=${n}`}
                  aria-current={n === page ? 'page' : undefined}
                  className={`rounded-full px-4 py-2.5 font-medium transition-colors ${
                    n === page
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-brick-tint hover:text-primary'
                  }`}
                >
                  {n}
                </a>
              ))}
              {page < totalPages && (
                <a
                  href={`?page=${page + 1}`}
                  className="bg-muted text-muted-foreground hover:bg-brick-tint hover:text-primary rounded-md px-5 py-2.5 font-medium transition-colors"
                >
                  Next
                </a>
              )}
            </nav>
          )}
        </div>
      </section>
    </>
  );
}
