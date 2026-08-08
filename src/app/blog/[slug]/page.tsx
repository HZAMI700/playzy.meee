import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllPosts, getPostBySlug } from '@/lib/mdx';
import { getAuthorBySlug } from '@/lib/authors';
import { getCategoryBySlug } from '@/lib/categories';
import { MDXRenderer } from '@/components/mdx/MDXRenderer';
import { TableOfContents } from '@/components/mdx/TableOfContents';
import { AdSlot } from '@/components/AdSlot';
import { Calendar, Clock, ArrowLeft, ShieldCheck, Sparkles, CheckCircle2, User } from 'lucide-react';

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const author = getAuthorBySlug(post.author);

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: author.name, url: `https://playzy.me/author/${author.slug}` }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.lastUpdated || post.date,
      authors: [author.name],
      url: `https://playzy.me/blog/${post.slug}`,
      images: [
        {
          url: post.heroImage || 'https://playzy.me/og-image.jpg',
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
    alternates: {
      canonical: `https://playzy.me/blog/${post.slug}`,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const author = getAuthorBySlug(post.author);
  const category = getCategoryBySlug(post.category);
  const allPosts = getAllPosts();
  const relatedPosts = allPosts
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3);

  // Structured Data (JSON-LD)
  const jsonLdArticle = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.lastUpdated || post.date,
    author: {
      '@type': 'Person',
      name: author.name,
      url: `https://playzy.me/author/${author.slug}`,
      jobTitle: author.role,
    },
    publisher: {
      '@type': 'Organization',
      name: 'playzy.me',
      logo: {
        '@type': 'ImageObject',
        url: 'https://playzy.me/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://playzy.me/blog/${post.slug}`,
    },
  };

  const jsonLdBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://playzy.me',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: category?.name || post.category,
        item: `https://playzy.me/category/${post.category}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `https://playzy.me/blog/${post.slug}`,
      },
    ],
  };

  const jsonLdFaq = post.faq
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: post.faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      }
    : null;

  return (
    <>
      {/* Inject JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      {jsonLdFaq && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
        />
      )}

      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        {/* Breadcrumb Navigation */}
        <nav className="mb-6 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">
            Home
          </Link>
          <span>/</span>
          <Link
            href={`/category/${post.category}`}
            className="hover:text-indigo-600 dark:hover:text-indigo-400 font-medium capitalize"
          >
            {category?.name || post.category}
          </Link>
          <span>/</span>
          <span className="text-slate-700 dark:text-slate-200 line-clamp-1 font-semibold">
            {post.title}
          </span>
        </nav>

        {/* Article Header */}
        <header className="max-w-4xl space-y-4 mb-8">
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={`/category/${post.category}`}
              className="px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-900/60 text-xs font-semibold text-indigo-600 dark:text-indigo-400"
            >
              {category?.name || post.category}
            </Link>
            {post.lastUpdated && (
              <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900/60 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                Last Updated: {post.lastUpdated}
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            {post.title}
          </h1>

          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            {post.description}
          </p>

          {/* Author Byline Bar */}
          <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
            <Link href={`/author/${author.slug}`} className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-bold flex items-center justify-center text-sm shadow">
                {author.name.charAt(0)}
              </div>
              <div>
                <div className="font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {author.name}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">{author.role}</div>
              </div>
            </Link>

            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                Published {post.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-indigo-500" />
                {post.readingTime}
              </span>
            </div>
          </div>
        </header>

        {/* Ad Slot Header */}
        <AdSlot position="header" />

        {/* Main Content Layout (Grid with Sticky Sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Article Body */}
          <div className="lg:col-span-8 space-y-8">
            {/* Direct Answer Summary Box (AI Citation Optimized) */}
            <div className="tldr-box space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-bold text-indigo-600 dark:text-indigo-400">
                <Sparkles className="w-4 h-4" />
                Key Takeaway / Direct Answer Summary
              </div>
              <p className="text-slate-800 dark:text-slate-100 text-base font-medium leading-relaxed">
                {post.tldr}
              </p>
            </div>

            {/* Render MDX Content */}
            <MDXRenderer content={post.content} />

            {/* Author Credentials Footer Box */}
            <div className="mt-12 p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-lg">
                  {author.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Written by {author.name}
                  </h3>
                  <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                    {author.role}
                  </p>
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {author.bio}
              </p>
              <div className="pt-2">
                <Link
                  href={`/author/${author.slug}`}
                  className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  View complete author credentials & articles →
                </Link>
              </div>
            </div>

            {/* FAQ Section */}
            {post.faq && post.faq.length > 0 && (
              <div className="my-10 space-y-4">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-3">
                  {post.faq.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2"
                    >
                      <h4 className="text-base font-bold text-slate-900 dark:text-white">
                        {item.question}
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom Ad Slot */}
            <AdSlot position="bottom" />
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="sticky top-24 space-y-6">
              {/* Sticky TOC */}
              <TableOfContents content={post.content} />

              {/* Sidebar Ad Slot */}
              <AdSlot position="sidebar" />

              {/* Related Articles */}
              {relatedPosts.length > 0 && (
                <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
                  <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-slate-900 dark:text-white">
                    Related Articles
                  </h4>
                  <div className="space-y-3">
                    {relatedPosts.map((rPost) => (
                      <div key={rPost.slug} className="space-y-1">
                        <Link
                          href={`/blog/${rPost.slug}`}
                          className="text-sm font-semibold text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 line-clamp-2 transition-colors"
                        >
                          {rPost.title}
                        </Link>
                        <div className="text-[11px] text-slate-400">{rPost.readingTime}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </article>
    </>
  );
}
