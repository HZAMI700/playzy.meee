import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts } from '@/lib/mdx';
import { PopularPosts } from '@/components/PopularPosts';
import { DynamicGreeting } from '@/components/DynamicGreeting';
import { AdSlot } from '@/components/AdSlot';
import { LayoutGrid, CheckCircle2, ArrowRight } from 'lucide-react';

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <div className="space-y-8">
      {/* Top Greeting Badge */}
      <DynamicGreeting />

      {/* Main Layout Grid: 3-column Cards Grid on Left (8 cols), Popular Posts on Right (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content Column */}
        <div className="lg:col-span-8 space-y-8">
          {/* Header Bar matching screenshot: "Latest Articles" + 6-dot grid icon */}
          <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800/80 pb-3">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-3">
              Latest Articles
              <span className="w-12 h-0.5 bg-slate-200 dark:bg-slate-800 rounded-full inline-block" />
            </h2>
            <LayoutGrid className="w-4 h-4 text-slate-400" />
          </div>

          {/* 3-Column Article Card Grid matching screenshot */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between space-y-4"
              >
                {/* Image Container with Centered Category Pill Badge matching screenshot */}
                <div className="relative w-full h-[180px] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  {post.heroImage ? (
                    <Image
                      src={post.heroImage}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 400px) 100vw, 400px"
                    />
                  ) : (
                    <span className="text-xs font-mono text-slate-400">No image</span>
                  )}

                  {/* Overlaid Pill Badge matching screenshot: CATEGORY ✔ */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-slate-200/60 dark:border-slate-700/60 shadow-sm flex items-center gap-1.5 text-[10px] font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                    <span>{post.category}</span>
                    <CheckCircle2 className="w-3 h-3 text-blue-500" />
                  </div>
                </div>

                {/* Article Info */}
                <div className="space-y-1.5 px-1">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                    {post.description}
                  </p>
                </div>

                {/* Card Footer matching screenshot: Published Date + Read more » */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] px-1">
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-md bg-indigo-500 text-white font-bold text-[10px]">
                      Published
                    </span>
                    <span className="text-slate-500 font-medium">{post.date}</span>
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-0.5"
                  >
                    Read more »
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Ad Slot */}
          <AdSlot position="bottom" />
        </div>

        {/* Right Floating Sidebar matching screenshot */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="sticky top-20 space-y-6">
            <PopularPosts />
            <AdSlot position="sidebar" />
          </div>
        </aside>
      </div>
    </div>
  );
}
