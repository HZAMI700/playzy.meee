'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, User, Mail, Folder, Plus, Menu } from 'lucide-react';

export function LeftSidebar() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Home', href: '/', icon: <Home className="w-5 h-5" /> },
    { label: 'About', href: '/about', icon: <User className="w-5 h-5" /> },
    { label: 'Contact', href: '/about', icon: <Mail className="w-5 h-5" /> },
    { label: 'Custom menu', href: '/about', icon: <Folder className="w-5 h-5" /> },
  ];

  return (
    <aside className="w-16 sm:w-20 shrink-0 flex flex-col justify-between min-h-screen py-6 items-center border-r border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 sticky top-0 h-screen transition-colors">
      <div className="space-y-8 flex flex-col items-center">
        {/* Top Menu Icon */}
        <button
          aria-label="Menu Toggle"
          className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Vertical Icon Navigation matching screenshot */}
        <nav className="flex flex-col items-center gap-6">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                title={item.label}
                className={`p-2.5 rounded-xl transition-all ${
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {item.icon}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Plus Icon Button matching screenshot */}
      <div className="flex flex-col items-center">
        <button
          aria-label="Add Action"
          className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors shadow-sm"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
    </aside>
  );
}
