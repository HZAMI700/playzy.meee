'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Info, Mail, Menu, ShieldCheck, FileText, Sparkles } from 'lucide-react';

export function LeftSidebar() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Home', href: '/', icon: <Home className="w-4 h-4" /> },
    { label: 'About', href: '/about', icon: <Info className="w-4 h-4" /> },
    { label: 'Contact', href: '/about', icon: <Mail className="w-4 h-4" /> },
    { label: 'Review Standards', href: '/about', icon: <ShieldCheck className="w-4 h-4 text-emerald-500" /> },
  ];

  return (
    <aside className="w-64 shrink-0 hidden lg:flex flex-col justify-between min-h-screen p-6 border-r border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 h-screen transition-colors">
      <div className="space-y-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white font-extrabold text-lg shadow-md group-hover:scale-105 transition-transform">
            p
          </div>
          <span className="font-display font-extrabold text-2xl tracking-tight text-slate-900 dark:text-white">
            playzy<span className="text-blue-600 dark:text-blue-400">.me</span>
          </span>
        </Link>

        {/* Sidebar Nav Links */}
        <nav className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Bottom Footer & Social Icons */}
      <div className="space-y-4 pt-6 border-t border-slate-200/80 dark:border-slate-800/80">
        <div className="flex items-center flex-wrap gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
          <Link href="/sitemap.xml" className="hover:text-blue-600 dark:hover:text-blue-400">
            Sitemap
          </Link>
          <span>·</span>
          <Link href="/disclaimer" className="hover:text-blue-600 dark:hover:text-blue-400">
            Disclaimer
          </Link>
          <span>·</span>
          <Link href="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400">
            Privacy
          </Link>
        </div>

        {/* Social Icons matching screenshot */}
        <div className="flex items-center gap-3 text-slate-400 dark:text-slate-500 text-xs">
          <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition-colors" aria-label="Facebook">
            FB
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-pink-600 transition-colors" aria-label="Instagram">
            IG
          </a>
          <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="hover:text-slate-900 dark:hover:text-white transition-colors" aria-label="TikTok">
            TK
          </a>
          <a href="https://whatsapp.com" target="_blank" rel="noreferrer" className="hover:text-emerald-500 transition-colors" aria-label="WhatsApp">
            WA
          </a>
          <a href="https://telegram.org" target="_blank" rel="noreferrer" className="hover:text-sky-500 transition-colors" aria-label="Telegram">
            TG
          </a>
        </div>
      </div>
    </aside>
  );
}
