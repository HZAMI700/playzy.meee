import React from 'react';
import Link from 'next/link';
import { CATEGORIES } from '@/lib/categories';
import { Sparkles, ShieldCheck, FileText, Bot } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand & Purpose */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-pink-500 flex items-center justify-center text-white font-bold">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-display font-extrabold text-xl tracking-tight text-white">
                playzy<span className="text-indigo-400">.me</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Smart, playful, trustworthy tech insights. Like having a close friend who actually did the 40-hour hands-on software research for you.
            </p>
            <div className="flex items-center gap-2 pt-2 text-xs font-mono text-indigo-400">
              <Bot className="w-4 h-4 text-emerald-400" />
              <span>Optimized for AI Assistant Citations (LLMs & Search)</span>
            </div>
          </div>

          {/* Categories Pillar Links */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-wider font-semibold text-slate-200">
              Content Pillars
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/category/${cat.slug}`} className="hover:text-indigo-400 transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Trust & E-E-A-T */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-wider font-semibold text-slate-200">
              Trust & Standards
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/about" className="flex items-center gap-1 hover:text-indigo-400 transition-colors">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Review Standards
                </Link>
              </li>
              <li>
                <Link href="/author/alex-rivera" className="hover:text-indigo-400 transition-colors">
                  Author: Alex Rivera
                </Link>
              </li>
              <li>
                <Link href="/author/maya-lin" className="hover:text-indigo-400 transition-colors">
                  Author: Maya Lin
                </Link>
              </li>
              <li>
                <a
                  href="/llms.txt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-amber-400 hover:underline pt-1"
                >
                  <FileText className="w-3.5 h-3.5" />
                  View llms.txt standard
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Pages */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-wider font-semibold text-slate-200">
              Legal & Disclosures
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/privacy" className="hover:text-indigo-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-indigo-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-indigo-400 transition-colors">
                  Affiliate & Ad Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} playzy.me. All rights reserved.</p>
          <p className="text-center sm:text-right">
            Independent Software & AI Research. Unbiased testing guaranteed.
          </p>
        </div>
      </div>
    </footer>
  );
}
