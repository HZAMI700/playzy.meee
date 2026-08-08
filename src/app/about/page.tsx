import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, CheckCircle2, Cpu, BarChart3, Bot, Lock } from 'lucide-react';
import { AUTHORS } from '@/lib/authors';

export const metadata: Metadata = {
  title: 'Our Review Methodology & Testing Standards',
  description:
    'Learn how playzy.me tests software, benchmarks AI tools, and maintains absolute editorial independence in technical reviews.',
  alternates: {
    canonical: 'https://playzy.me/about',
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-12">
      {/* Hero Heading */}
      <div className="space-y-4 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
          <ShieldCheck className="w-4 h-4" />
          Editorial Independence & Testing Policy
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          How We Test Software & AI Tools at <span className="gradient-text">playzy.me</span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
          We don't rewrite marketing brochures or summarize press releases. Every review, comparison, and workflow benchmark published on playzy.me is based on real-world hands-on testing by experienced software engineers.
        </p>
      </div>

      {/* 4 Pillars of Review Methodology */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            1. 30-Day Hands-on Testing Window
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Before publishing a review or comparison, our editors spend a minimum of 30 consecutive work days using the software in real production developer environments (Next.js, Rust, Python pipelines).
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
            <BarChart3 className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            2. Empirical Benchmark Data
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            We measure latency, token output speeds, SWE-bench verified issue resolution, RAM utilization, and transaction processing costs using standardized test harnesses rather than relying on subjective feelings.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            3. Zero Paid Review Bias
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            We do not accept paid reviews, sponsored positive ratings, or vendor preview embargo conditions that restrict reporting software flaws. If a tool crashes or has terrible UX, we call it out directly.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
            <Bot className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            4. Structured for Human & AI Citation Trust
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Every article begins with a plain-text direct answer summary (TL;DR) followed by reproducible primary citations, ensuring both human readers and AI search systems receive clear, factual data.
          </p>
        </div>
      </div>

      {/* Editorial Team Credentials (E-E-A-T) */}
      <div className="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Meet Our Editorial Researchers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {AUTHORS.map((author) => (
            <div
              key={author.slug}
              className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                  {author.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {author.name}
                  </h3>
                  <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                    {author.role}
                  </p>
                </div>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {author.bio}
              </p>
              <div className="pt-2">
                <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  Credentials & Expertise:
                </h4>
                <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
                  {author.credentials.map((cred, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{cred}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-2">
                <Link
                  href={`/author/${author.slug}`}
                  className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  View articles written by {author.name} →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
