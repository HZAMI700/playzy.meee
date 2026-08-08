'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Moon, Sun } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { CATEGORIES } from '@/lib/categories';

export function TopBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery)}#articles`);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
      {/* Search Bar Pill matching screenshot */}
      <form onSubmit={handleSearch} className="relative w-full max-w-sm">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Try 'Sonnet vs GPT-4o' or 'Cursor'..."
          className="w-full pl-10 pr-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 placeholder-slate-400 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
        />
      </form>

      {/* Top Category Horizontal Menu matching screenshot */}
      <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-600 dark:text-slate-300">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.slug}
            href={`/category/${cat.slug}`}
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap"
          >
            {cat.name.split(' ')[0]} {/* Short category name */}
          </Link>
        ))}
        <Link
          href="/about"
          className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-semibold"
        >
          Review Standards
        </Link>
      </nav>

      {/* Far Right Theme Toggle */}
      <div className="flex items-center gap-2">
        <ThemeToggle />
      </div>
    </header>
  );
}
