import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts, getFeaturedPosts } from '@/lib/mdx';
import { CATEGORIES } from '@/lib/categories';
import { DynamicGreeting } from '@/components/DynamicGreeting';
import { PopularPosts } from '@/components/PopularPosts';
import { NewsletterForm } from '@/components/NewsletterForm';
import { AdSlot } from '@/components/AdSlot';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Clock,
  Mail,
  Bot,
  Cpu,
  Coins,
  Zap,
  Globe,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ReactNode> = {
  Bot: <Bot className="w-5 h-5 text-violet-500" />,
  Cpu: <Cpu className="w-5 h-5 text-blue-500" />,
  Coins: <Coins className="w-5 h-5 text-emerald-500" />,
  Zap: <Zap className="w-5 h-5 text-amber-500" />,
  Globe: <Globe className="w-5 h-5 text-rose-500" />,
};

export default function HomePage() {
  const allPosts = getAllPosts();
  const featuredPosts = getFeaturedPosts();
  const primaryFeatured = featuredPosts[0] || allPosts[0];
  const latestPosts = allPosts.slice(0, 8);

  return (
    <div className="space-y-12">
      {/* Top Bar Greeting */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <DynamicGreeting />
        <Link
          href="/about"
          className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
        >
          <ShieldCheck className="w-4 h-4" />
          Review Methodology & Standards
        </Link>
      </div>

      {/* Main Grid: Content on Left (8 cols), Popular Posts on Right (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Column */}
        <div className="lg:col-span-8 space-y-10">
          {/* Primary Featured Hero Card */}
          {primaryFeatured && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-6 group">
              {primaryFeatured.heroImage && (
                <div className="relative w-full h-[260px] sm:h-[340px] rounded-2xl overflow-hidden shadow-md">
                  <Image
                    src={primaryFeatured.heroImage}
                    alt={primaryFeatured.title}
                    fill
                    priority
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 800px) 100vw, 800px"
                  />
                </div>
              )}

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900/60 text-blue-600 dark:text-blue-400 font-semibold uppercase text-[10px]">
                    {primaryFeatured.category}
                  </span>
                  <span>•</span>
                  <span>{primaryFeatured.date}</span>
                  <span>•</span>
                  <span>{primaryFeatured.readingTime}</span>
                </div>

                <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                  <Link href={`/blog/${primaryFeatured.slug}`}>{primaryFeatured.title}</Link>
                </h1>

                <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                  {primaryFeatured.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-500">By {primaryFeatured.author}</span>
                <Link
                  href={`/blog/${primaryFeatured.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Read Benchmark <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}

          {/* Categories Horizontal Cards Grid */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Content Pillars
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-blue-500/50 hover:shadow-md transition-all group space-y-2"
                >
                  <div className="p-2 w-fit rounded-xl bg-slate-50 dark:bg-slate-800">
                    {ICON_MAP[cat.iconName]}
                  </div>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                    {cat.name}
                  </h3>
                </Link>
              ))}
            </div>
          </div>

          {/* Ad Slot Header */}
          <AdSlot position="header" />

          {/* Latest Research Articles Grid with Images */}
          <div className="space-y-6" id="articles">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Latest Research & Benchmarks
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {latestPosts.map((post) => (
                <article
                  key={post.slug}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-blue-500/50 transition-all group flex flex-col justify-between space-y-4"
                >
                  {post.heroImage && (
                    <div className="relative w-full h-[180px] rounded-xl overflow-hidden shadow-sm">
                      <Image
                        src={post.heroImage}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 400px) 100vw, 400px"
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[11px] text-slate-500">
                      <span className="font-semibold text-blue-600 dark:text-blue-400 uppercase">
                        {post.category}
                      </span>
                      <span>•</span>
                      <span>{post.readingTime}</span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>

                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {post.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-mono text-[11px]">{post.author}</span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 flex items-center gap-1"
                    >
                      Read <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* Right Floating Sidebar matching screenshot */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="sticky top-20 space-y-6">
            <PopularPosts />
            <AdSlot position="sidebar" />
          </div>
        </aside>
      </div>

      {/* Newsletter Dispatch Footer Banner */}
      <section className="p-8 sm:p-12 rounded-3xl bg-slate-900 text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="space-y-3 text-center lg:text-left max-w-xl">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-blue-400 font-semibold">
            <Mail className="w-4 h-4 text-amber-400" />
            Weekly Research Dispatch
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Stay ahead of software & AI shifts
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            Get our latest benchmarks, micro-SaaS breakdowns, and workflow guides delivered directly to your inbox.
          </p>
        </div>

        <NewsletterForm />
      </section>
    </div>
  );
}
