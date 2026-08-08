import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/mdx';
import { CATEGORIES } from '@/lib/categories';
import { AUTHORS } from '@/lib/authors';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://playzy.me';
  const posts = getAllPosts();

  // Static Pages
  const staticPages = [
    '',
    '/about',
    '/privacy',
    '/terms',
    '/disclaimer',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Category Pages
  const categoryPages = CATEGORIES.map((cat) => ({
    url: `${baseUrl}/category/${cat.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Author Pages
  const authorPages = AUTHORS.map((author) => ({
    url: `${baseUrl}/author/${author.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Article Pages
  const postPages = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.lastUpdated || post.date).toISOString(),
    changeFrequency: 'weekly' as const,
    priority: post.featured ? 0.9 : 0.8,
  }));

  return [...staticPages, ...categoryPages, ...authorPages, ...postPages];
}
