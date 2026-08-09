/**
 * Site-native blog data access (port skill §4a).
 *
 * SERVER-ONLY: reads TYASHIN_API_KEY from the Worker's runtime secrets. This
 * module must only be imported by Server Components — never ship the key to
 * the client bundle.
 *
 * Fetches the platform's public blog API CROSS-ORIGIN on
 * website-api.tyashin.com. Never fetch the site's own hostname from the
 * Worker — a CF-dispatched Worker fetching its own host re-enters the
 * platform dispatch Worker and 500s.
 */

const API_URL = process.env.TYASHIN_API_URL || 'https://website-api.tyashin.com';

export interface BlogPost {
  slug: string;
  title: string;
  excerpt?: string;
  content?: string;
  featuredImage?: string;
  pinned?: boolean;
  publishedAt?: string;
  updatedAt?: string;
  author?: { name?: string };
  categories?: string[];
  tags?: string[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: string;
  };
}

interface BlogListResult {
  posts: BlogPost[];
  total: number;
  totalPages: number;
  page: number;
}

function apiKey(): string {
  return process.env.TYASHIN_API_KEY || '';
}

export async function getBlogPosts(page = 1, limit = 12): Promise<BlogListResult> {
  const empty: BlogListResult = { posts: [], total: 0, totalPages: 0, page };
  const key = apiKey();
  if (!key) return empty;
  try {
    const res = await fetch(
      `${API_URL}/api/v1/public/blog/posts?page=${page}&limit=${limit}`,
      { headers: { 'X-API-Key': key }, cache: 'no-store' }
    );
    if (!res.ok) return empty;
    const data = (await res.json()) as {
      success?: boolean;
      data?: BlogPost[] | { posts?: BlogPost[] };
      meta?: { total?: number; totalPages?: number; page?: number };
    };
    const raw = data?.data;
    const posts = Array.isArray(raw) ? raw : (raw?.posts ?? []);
    return {
      posts: Array.isArray(posts) ? posts : [],
      total: data?.meta?.total ?? posts.length,
      totalPages: data?.meta?.totalPages ?? 1,
      page: data?.meta?.page ?? page,
    };
  } catch {
    return empty;
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const key = apiKey();
  if (!key) return null;
  try {
    const res = await fetch(
      `${API_URL}/api/v1/public/blog/posts/${encodeURIComponent(slug)}`,
      { headers: { 'X-API-Key': key }, cache: 'no-store' }
    );
    if (!res.ok) return null;
    const data = (await res.json()) as { success?: boolean; data?: BlogPost };
    return data?.data ?? null;
  } catch {
    return null;
  }
}

/**
 * Whether the blog has any published posts — drives the gated nav link in
 * Header/Footer. Cached briefly (revalidate) so it doesn't deopt every page
 * to fully dynamic.
 */
export async function getBlogHasPosts(): Promise<boolean> {
  const key = apiKey();
  if (!key) return false;
  try {
    const res = await fetch(`${API_URL}/api/v1/public/blog/posts?page=1&limit=1`, {
      headers: { 'X-API-Key': key },
      next: { revalidate: 300 },
    });
    if (!res.ok) return false;
    const data = (await res.json()) as {
      data?: unknown[] | { posts?: unknown[] };
      meta?: { total?: number };
    };
    if ((data?.meta?.total ?? 0) > 0) return true;
    const raw = data?.data;
    const posts = Array.isArray(raw) ? raw : (raw as { posts?: unknown[] })?.posts;
    return Array.isArray(posts) && posts.length > 0;
  } catch {
    return false;
  }
}
