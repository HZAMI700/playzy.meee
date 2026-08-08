'use client';

import React, { useState } from 'react';
import { Mail, CheckCircle2 } from 'lucide-react';

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  if (subscribed) {
    return (
      <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm py-2 px-4 rounded-xl bg-emerald-950/40 border border-emerald-900/60">
        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
        <span>Thank you for subscribing! Check your inbox next Tuesday.</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email..."
        className="px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 min-w-[280px]"
      />
      <button
        type="submit"
        className="px-6 py-3 rounded-2xl bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-sm transition-colors shadow-lg cursor-pointer"
      >
        Subscribe Free
      </button>
    </form>
  );
}
