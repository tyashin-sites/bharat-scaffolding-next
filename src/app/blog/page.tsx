import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBlogPosts } from '@/lib/blog';
import { pageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';

export const dynamic = 'force-dynamic';

const description =
  'Tips, tutorials, and insights about AR learning and early childhood education.';

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
      <section className="gradient-hero py-24">
        <div className="container mx-auto text-center">
          <h1 className="font-display text-foreground mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
            Our <span className="text-primary">Blog</span>
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg md:text-xl">
            Discover tips, tutorials, and insights about AR learning and early childhood education.
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
                className="bg-card shadow-soft hover:shadow-medium group block overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-2"
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
                  <div className="bg-coral-light flex aspect-[16/9] items-center justify-center">
                    <span className="text-6xl">📖</span>
                  </div>
                )}
                <div className="p-6">
                  {post.pinned && (
                    <span className="bg-accent text-accent-foreground mb-3 inline-block rounded-full px-3 py-1 text-xs font-semibold">
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
                  className="bg-muted text-muted-foreground hover:bg-coral-light hover:text-coral-dark rounded-full px-5 py-2.5 font-medium transition-colors"
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
                      ? 'bg-primary text-primary-foreground shadow-soft'
                      : 'bg-muted text-muted-foreground hover:bg-coral-light hover:text-coral-dark'
                  }`}
                >
                  {n}
                </a>
              ))}
              {page < totalPages && (
                <a
                  href={`?page=${page + 1}`}
                  className="bg-muted text-muted-foreground hover:bg-coral-light hover:text-coral-dark rounded-full px-5 py-2.5 font-medium transition-colors"
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
