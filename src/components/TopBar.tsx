'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, User } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { CATEGORIES } from '@/lib/categories';

export function TopBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
      {/* Brand Logo + Search Input Pill */}
      <div className="flex items-center gap-6">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-extrabold text-base shadow-sm">
            p
          </div>
          <span className="font-display font-extrabold text-2xl tracking-tight text-slate-900 dark:text-white">
            playzy
          </span>
        </Link>

        {/* Search Pill Input matching screenshot */}
        <form onSubmit={handleSearch} className="relative hidden sm:block w-64 md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Try 'Adventure'..."
            className="w-full pl-10 pr-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 placeholder-slate-400 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
          />
        </form>
      </div>

      {/* Top Category Tag Links matching screenshot */}
      <nav className="hidden lg:flex items-center gap-6 text-xs font-medium text-slate-600 dark:text-slate-300">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.slug}
            href={`/category/${cat.slug}`}
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap"
          >
            {cat.name.split(' ')[0]}
          </Link>
        ))}
      </nav>

      {/* Top Right Controls (User Icon + Theme Toggle) matching screenshot */}
      <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
        <Link
          href="/about"
          className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="User Profile"
        >
          <User className="w-4 h-4" />
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}
