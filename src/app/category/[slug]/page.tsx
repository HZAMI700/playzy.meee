import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CATEGORIES, getCategoryBySlug } from '@/lib/categories';
import { getPostsByCategory } from '@/lib/mdx';
import { Calendar, Clock, ArrowRight, Bot, Cpu, Coins, Zap, Globe } from 'lucide-react';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};

  return {
    title: `${category.name} — Reviews & Guides`,
    description: category.description,
    alternates: {
      canonical: `https://playzy.me/category/${slug}`,
    },
  };
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Bot: <Bot className="w-6 h-6 text-violet-500" />,
  Cpu: <Cpu className="w-6 h-6 text-blue-500" />,
  Coins: <Coins className="w-6 h-6 text-emerald-500" />,
  Zap: <Zap className="w-6 h-6 text-amber-500" />,
  Globe: <Globe className="w-6 h-6 text-rose-500" />,
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const posts = getPostsByCategory(slug);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Category Banner */}
      <div className="p-8 rounded-3xl bg-slate-900 text-white shadow-xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-slate-800 border border-slate-700">
            {ICON_MAP[category.iconName] || <Bot className="w-6 h-6 text-indigo-400" />}
          </div>
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-semibold">
              Content Pillar
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              {category.name}
            </h1>
          </div>
        </div>
        <p className="text-base text-slate-300 max-w-3xl leading-relaxed">
          {category.description}
        </p>
      </div>

      {/* Posts Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Articles in {category.name} ({posts.length})
          </h2>
        </div>

        {posts.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500">
            No articles found in this category yet. Check back soon!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 transition-all group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                      {post.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-indigo-500" />
                      {post.readingTime}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                    {post.description}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-mono text-indigo-600 dark:text-indigo-400 font-semibold">
                    {post.author}
                  </span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="flex items-center gap-1 text-xs font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400"
                  >
                    Read Article <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
