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
    <aside className="w-16 sm:w-20 shrink-0 hidden md:flex flex-col justify-between min-h-screen py-6 items-center border-r border-slate-200 bg-white sticky top-0 h-screen transition-colors z-30">
      <div className="space-y-8 flex flex-col items-center">
        {/* Top Menu Icon */}
        <Link
          href="/"
          aria-label="Home Logo"
          className="p-2.5 rounded-xl hover:bg-slate-100 text-slate-700 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </Link>

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
                    ? 'bg-blue-50 text-blue-600 font-bold shadow-xs'
                    : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
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
          className="p-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors shadow-xs cursor-pointer"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
    </aside>
  );
}
