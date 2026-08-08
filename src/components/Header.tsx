'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';
import { CATEGORIES } from '@/lib/categories';
import { Search, Sparkles, Menu, X, ShieldCheck } from 'lucide-react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="font-display font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
            playzy<span className="text-indigo-600 dark:text-indigo-400">.me</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            Home
          </Link>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors whitespace-nowrap"
            >
              {cat.name.split(' ')[0]} {/* Short category title */}
            </Link>
          ))}
          <Link
            href="/about"
            className="flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-semibold text-slate-800 dark:text-slate-200"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            Our Standards
          </Link>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-lg px-4 py-6 space-y-4">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-semibold text-slate-900 dark:text-slate-100"
          >
            Home
          </Link>
          <div className="text-xs uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500 pt-2">
            Categories
          </div>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              {cat.name}
            </Link>
          ))}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 py-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Review Methodology & Standards
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
