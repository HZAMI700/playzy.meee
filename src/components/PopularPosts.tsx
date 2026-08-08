import React from 'react';
import Link from 'next/link';
import { getAllPosts } from '@/lib/mdx';
import { LayoutGrid } from 'lucide-react';

export function PopularPosts() {
  const posts = getAllPosts().slice(0, 5);

  return (
    <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-lg space-y-6">
      {/* Popular Posts Header with 6-dot icon */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
          Popular Posts
          <span className="w-6 h-0.5 bg-slate-200 dark:bg-slate-800 rounded-full inline-block" />
        </h3>
        <LayoutGrid className="w-4 h-4 text-slate-400" />
      </div>

      {/* Ranked List 01 to 05 */}
      <div className="space-y-5">
        {posts.map((post, idx) => {
          const numStr = String(idx + 1).padStart(2, '0');
          return (
            <article key={post.slug} className="space-y-1.5 group">
              <div className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
                {post.date} —
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                <Link href={`/blog/${post.slug}`} className="flex items-start gap-2">
                  <span className="text-slate-400 dark:text-slate-500 font-mono font-normal">
                    {numStr}
                  </span>
                  <span>{post.title}</span>
                </Link>
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                {post.description}
              </p>
            </article>
          );
        })}
      </div>
    </div>
  );
}
