import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getAllPosts, getPostBySlug } from '@/lib/mdx';
import { getAuthorBySlug } from '@/lib/authors';
import { getCategoryBySlug } from '@/lib/categories';
import { MDXRenderer } from '@/components/mdx/MDXRenderer';
import { TableOfContents } from '@/components/mdx/TableOfContents';
import { AdSlot } from '@/components/AdSlot';
import { DynamicGreeting } from '@/components/DynamicGreeting';
import { PopularPosts } from '@/components/PopularPosts';
import { AnimatedCard } from '@/components/AnimatedCard';
import { Calendar, Clock, Share2, Sparkles } from 'lucide-react';

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
          url: post.heroImage || 'https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=1200&auto=format&fit=crop',
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

  // Structured Data (JSON-LD)
  const jsonLdArticle = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: post.title,
    description: post.description,
    image: post.heroImage,
    datePublished: post.date,
    dateModified: post.lastUpdated || post.date,
    author: {
      '@type': 'Person',
      name: author.name,
      url: `https://playzy.me/author/${author.slug}`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'playzy.me',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
      />

      <article className="max-w-7xl mx-auto space-y-8 bg-white dark:bg-slate-950 min-h-screen min-w-0">
        {/* Top Greeting Badge matching screenshot */}
        <div className="space-y-4 min-w-0">
          <DynamicGreeting />

          {/* Breadcrumb matching screenshot */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
            <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">
              Home
            </Link>
            <span>/</span>
            <Link
              href={`/category/${post.category}`}
              className="hover:text-blue-600 dark:hover:text-blue-400 capitalize"
            >
              {category?.name || post.category}
            </Link>
            <span>/</span>
            <span className="text-slate-800 dark:text-slate-200 line-clamp-1 font-semibold">
              {post.title}
            </span>
          </nav>

          {/* Large Title matching screenshot */}
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight max-w-4xl">
            {post.title}
          </h1>

          {/* Metadata Card Pill matching screenshot */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-blue-500" />
              <span>{post.date}</span>
              <span>·</span>
              <Clock className="w-3.5 h-3.5 text-blue-500" />
              <span>Estimated read time: {post.readingTime}</span>
            </div>
            <button
              aria-label="Share article"
              className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Hero Image Section */}
        {post.heroImage && (
          <AnimatedCard className="relative w-full h-[320px] sm:h-[460px] rounded-3xl overflow-hidden shadow-md border border-slate-200 dark:border-slate-800">
            <Image
              src={post.heroImage}
              alt={post.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </AnimatedCard>
        )}

        {/* Layout Grid: Article Content on Left, Popular Posts on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4 min-w-0">
          {/* Main Article Body */}
          <div className="lg:col-span-8 space-y-8 min-w-0">
            {/* Direct Answer Summary Box */}
            <div className="tldr-box space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-bold text-blue-600 dark:text-blue-400">
                <Sparkles className="w-4 h-4" />
                Key Takeaway / Direct Answer Summary
              </div>
              <p className="text-slate-900 dark:text-slate-100 text-base font-semibold leading-relaxed">
                {post.tldr}
              </p>
            </div>

            {/* MDX Content Renderer */}
            <MDXRenderer content={post.content} />

            {/* Author Credentials Card */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-lg shadow-xs">
                  {author.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Written by {author.name}
                  </h3>
                  <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                    {author.role}
                  </p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {author.bio}
              </p>
            </div>

            {/* Bottom Ad Slot */}
            <AdSlot position="bottom" />
          </div>

          {/* Right Floating Sidebar matching screenshot */}
          <aside className="lg:col-span-4 space-y-6 min-w-0">
            <div className="sticky top-20 space-y-6 min-w-0">
              {/* Popular Posts Floating Card with Thumbnails */}
              <PopularPosts />

              {/* Table of Contents */}
              <TableOfContents content={post.content} />

              {/* Sidebar Ad Slot */}
              <AdSlot position="sidebar" />
            </div>
          </aside>
        </div>
      </article>
    </>
  );
}
