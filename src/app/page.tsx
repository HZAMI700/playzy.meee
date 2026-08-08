import React from 'react';
import Link from 'next/link';
import { getAllPosts, getFeaturedPosts } from '@/lib/mdx';
import { CATEGORIES } from '@/lib/categories';
import { AdSlot } from '@/components/AdSlot';
import { NewsletterForm } from '@/components/NewsletterForm';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Bot,
  Cpu,
  Coins,
  Zap,
  Globe,
  Calendar,
  Clock,
  Mail,
  CheckCircle2,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ReactNode> = {
  Bot: <Bot className="w-6 h-6 text-violet-500" />,
  Cpu: <Cpu className="w-6 h-6 text-blue-500" />,
  Coins: <Coins className="w-6 h-6 text-emerald-500" />,
  Zap: <Zap className="w-6 h-6 text-amber-500" />,
  Globe: <Globe className="w-6 h-6 text-rose-500" />,
};

export default function HomePage() {
  const allPosts = getAllPosts();
  const featuredPosts = getFeaturedPosts();
  const primaryFeatured = featuredPosts[0] || allPosts[0];
  const secondaryFeatured = featuredPosts.slice(1, 3);
  const latestPosts = allPosts.slice(0, 9);

  return (
    <div className="space-y-16 pb-16">
      {/* Above the Fold Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-slate-200/80 dark:border-slate-800/80 bg-gradient-to-b from-indigo-50/50 via-transparent to-transparent dark:from-indigo-950/20 dark:via-transparent dark:to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="max-w-3xl space-y-6 text-center sm:text-left">
            {/* Standards Badge */}
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 shadow-sm hover:border-indigo-500 transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Independent Review Methodology & Testing Standards</span>
              <ArrowRight className="w-3.5 h-3.5 text-indigo-500" />
            </Link>

            <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1]">
              Smart, Playful Tech & AI Research for <span className="gradient-text">Doers</span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              Think a friend who actually did the 40-hour hands-on software research. Unbiased reviews, empirical benchmarks, and practical guides on AI tools, SaaS products, and legitimate digital monetization.
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2">
              <a
                href="#featured"
                className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-500/25 transition-all duration-200"
              >
                Explore Launch Articles
              </a>
              <Link
                href="/about"
                className="px-6 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200"
              >
                Our Testing Policy
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Content Pillars Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
            5 Core Content Pillars
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 hover:shadow-md transition-all duration-200 group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="p-2.5 w-fit rounded-xl bg-slate-50 dark:bg-slate-800/80 group-hover:scale-110 transition-transform">
                  {ICON_MAP[cat.iconName]}
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                  {cat.description}
                </p>
              </div>
              <div className="pt-3 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                Explore <ArrowRight className="w-3 h-3" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Header Ad Slot */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdSlot position="header" />
      </div>

      {/* Featured Articles Section */}
      <section id="featured" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Featured Research & Deep Dives
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Primary Featured Large Card */}
          {primaryFeatured && (
            <div className="lg:col-span-7 p-8 rounded-3xl bg-slate-900 text-white shadow-xl flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-xs font-mono text-indigo-300 font-semibold uppercase">
                    {primaryFeatured.category}
                  </span>
                  <span className="text-xs text-slate-400">{primaryFeatured.readingTime}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                  <Link href={`/blog/${primaryFeatured.slug}`} className="hover:text-indigo-300 transition-colors">
                    {primaryFeatured.title}
                  </Link>
                </h3>
                <p className="text-sm text-slate-300 line-clamp-3 leading-relaxed">
                  {primaryFeatured.description}
                </p>
              </div>
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-mono">By {primaryFeatured.author}</span>
                <Link
                  href={`/blog/${primaryFeatured.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 hover:text-indigo-300"
                >
                  Read Full Benchmark <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}

          {/* Secondary Featured Cards Stack */}
          <div className="lg:col-span-5 space-y-6">
            {secondaryFeatured.map((post) => (
              <article
                key={post.slug}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 transition-all group flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400 uppercase">
                      {post.category}
                    </span>
                    <span>•</span>
                    <span>{post.readingTime}</span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                    {post.description}
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 flex items-center gap-1"
                  >
                    Read Article <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Articles Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
          Latest Research Articles
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestPosts.map((post) => (
            <article
              key={post.slug}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 transition-all group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[10px]">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-indigo-500" />
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
                <span className="text-xs text-slate-400 font-mono">By {post.author}</span>
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
      </section>

      {/* Newsletter & LLM Standard Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center lg:text-left max-w-xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-indigo-300 font-semibold">
              <Mail className="w-4 h-4 text-amber-400" />
              Weekly Research Dispatch
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Stay ahead of software & AI shifts
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Get our latest benchmarks, micro-SaaS breakdowns, and workflow guides delivered directly to your inbox every Tuesday. No spam, ever.
            </p>
          </div>

          <NewsletterForm />
        </div>
      </section>
    </div>
  );
}
