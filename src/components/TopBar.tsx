'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, User, Menu, X, Home, Info, Mail, Folder, ShieldCheck } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { CATEGORIES } from '@/lib/categories';

export function TopBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery)}`);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs transition-colors">
      <div className="px-4 sm:px-8 py-3.5 flex items-center justify-between gap-3">
        {/* Mobile Menu Toggle + Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Toggle Mobile Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-extrabold text-base shadow-xs">
              p
            </div>
            <span className="font-display font-extrabold text-2xl tracking-tight text-slate-900">
              playzy
            </span>
          </Link>
        </div>

        {/* Search Pill Input matching screenshot (Visible on desktop & tablet) */}
        <form onSubmit={handleSearch} className="relative hidden sm:block w-56 md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Try 'Adventure'..."
            className="w-full pl-10 pr-4 py-2 rounded-full bg-slate-100 text-slate-800 placeholder-slate-400 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
          />
        </form>

        {/* Top Category Tag Links matching screenshot (Desktop) */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-medium text-slate-600">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="hover:text-blue-600 transition-colors whitespace-nowrap"
            >
              {cat.name.split(' ')[0]}
            </Link>
          ))}
        </nav>

        {/* Top Right Controls (User Icon + Theme Toggle) */}
        <div className="flex items-center gap-2 text-slate-600">
          <Link
            href="/about"
            className="p-2 rounded-xl hover:bg-slate-100 transition-colors"
            aria-label="User Profile"
          >
            <User className="w-4 h-4" />
          </Link>
          <ThemeToggle />
        </div>
      </div>

      {/* Horizontal Scrollable Category Bar for Mobile & Tablet */}
      <div className="flex lg:hidden overflow-x-auto px-4 py-2 bg-slate-50 border-t border-slate-100 gap-2 scrollbar-none text-xs font-medium text-slate-600">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.slug}
            href={`/category/${cat.slug}`}
            className="px-3 py-1 rounded-full bg-white border border-slate-200 whitespace-nowrap hover:text-blue-600 shadow-2xs"
          >
            {cat.name.split(' ')[0]}
          </Link>
        ))}
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 py-6 space-y-4 shadow-lg animate-in slide-in-from-top duration-200">
          {/* Mobile Search Input */}
          <form onSubmit={handleSearch} className="relative w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-100 text-slate-800 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </form>

          {/* Nav Items */}
          <div className="space-y-1">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              <Home className="w-4 h-4 text-blue-600" />
              Home
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              <Info className="w-4 h-4 text-indigo-600" />
              About
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Review Standards
            </Link>
          </div>

          {/* Categories Section */}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <div className="text-xs uppercase font-mono tracking-wider font-bold text-slate-400">
              Content Pillars
            </div>
            <div className="grid grid-cols-2 gap-2">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-xl bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-700 hover:text-blue-600"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
