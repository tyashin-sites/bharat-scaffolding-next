import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CalendarDays, ChevronLeft, Clock, User } from 'lucide-react';
import { getBlogPost, getBlogPosts } from '@/lib/blog';
import { pageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';

export const dynamic = 'force-dynamic';

function formatDate(date?: string): string {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function readingTimeMinutes(html?: string): number {
  const words = (html ?? '')
    .replace(/<[^>]*>/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return {};
  return pageMetadata({
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt || '',
    path: `/blog/${post.slug}`,
    image: post.seo?.ogImage || post.featuredImage,
    type: 'article',
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  const recent = await getBlogPosts(1, 4);
  const morePosts = (recent.posts ?? []).filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <JsonLd
        path={`/blog/${post.slug}`}
        title={post.title}
        description={post.excerpt || ''}
        breadcrumb={[
          { name: 'Blog', path: '/blog' },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
        article={{
          headline: post.title,
          datePublished: post.publishedAt,
          dateModified: post.updatedAt,
          image: post.seo?.ogImage || post.featuredImage,
          authorName: post.author?.name,
        }}
      />

      <section className="bg-background py-16">
        <div className="container mx-auto">
          {/* Back Link */}
          <a
            href="/blog"
            className="text-primary hover:text-coral-dark mb-8 inline-flex items-center gap-2 font-medium transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
            Back to Blog
          </a>

          <article className="mx-auto max-w-3xl">
            {/* Featured Image */}
            {post.featuredImage && (
              <div className="mb-8 overflow-hidden rounded-3xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={post.featuredImage} alt={post.title} className="h-auto w-full" />
              </div>
            )}

            {/* Title */}
            <h1 className="font-display text-foreground mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="text-muted-foreground mb-8 flex flex-wrap items-center gap-4">
              {post.author?.name && (
                <span className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  {post.author.name}
                </span>
              )}
              {post.publishedAt && (
                <span className="flex items-center gap-2">
                  <CalendarDays className="h-5 w-5" />
                  {formatDate(post.publishedAt)}
                </span>
              )}
              {post.content && (
                <span className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  {readingTimeMinutes(post.content)} min read
                </span>
              )}
            </div>

            {/* Content */}
            <div
              className="blog-content space-y-4 leading-relaxed [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-8 [&_h3]:font-display [&_h3]:text-xl [&_h3]:mt-6 [&_p]:text-foreground/90 [&_a]:text-primary [&_a]:underline [&_ul]:list-disc [&_ul]:ml-6 [&_ol]:list-decimal [&_ol]:ml-6 [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:italic [&_img]:rounded-2xl"
              dangerouslySetInnerHTML={{ __html: post.content || '' }}
            />
          </article>

          {/* More Posts */}
          {morePosts.length > 0 && (
            <div className="mx-auto mt-16 max-w-5xl">
              <div className="mb-8 flex items-center justify-between">
                <h2 className="font-display text-foreground text-2xl font-bold">More Posts</h2>
                <a href="/blog" className="text-primary font-medium hover:underline">
                  View all posts
                </a>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {morePosts.map((p) => (
                  <a
                    key={p.slug}
                    href={`/blog/${p.slug}`}
                    className="bg-card shadow-soft hover:shadow-medium group block overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-2"
                  >
                    {p.featuredImage ? (
                      <div className="aspect-[16/9] overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={p.featuredImage}
                          alt={p.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    ) : (
                      <div className="bg-teal-light flex aspect-[16/9] items-center justify-center">
                        <span className="text-6xl">📖</span>
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="font-display text-foreground mb-2 text-lg font-bold">
                        {p.title}
                      </h3>
                      {p.publishedAt && (
                        <p className="text-muted-foreground text-sm">{formatDate(p.publishedAt)}</p>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
