import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts } from '@/lib/mdx';
import { LayoutGrid } from 'lucide-react';

export function PopularPosts() {
  const posts = getAllPosts().slice(0, 5);

  return (
    <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md space-y-6 min-w-0">
      {/* Popular Posts Header */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
          Popular Posts
          <span className="w-6 h-0.5 bg-slate-200 dark:bg-slate-800 rounded-full inline-block" />
        </h3>
        <LayoutGrid className="w-4 h-4 text-slate-400" />
      </div>

      {/* Ranked List 01 to 05 with PNG Thumbnail Images */}
      <div className="space-y-4 min-w-0">
        {posts.map((post, idx) => {
          const numStr = String(idx + 1).padStart(2, '0');
          return (
            <article key={post.slug} className="flex items-start gap-3 group min-w-0">
              {/* Thumbnail Image matching request */}
              {post.heroImage && (
                <div className="relative w-14 h-14 shrink-0 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 shadow-xs">
                  <Image
                    src={post.heroImage}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-200"
                    sizes="56px"
                  />
                </div>
              )}

              <div className="space-y-1 min-w-0 flex-1">
                <div className="text-[10px] font-mono text-slate-400 dark:text-slate-400 whitespace-nowrap">
                  {post.date} —
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                  <Link href={`/blog/${post.slug}`} className="flex items-start gap-1">
                    <span className="text-slate-400 font-mono font-normal shrink-0">
                      {numStr}
                    </span>
                    <span className="line-clamp-2">{post.title}</span>
                  </Link>
                </h4>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
