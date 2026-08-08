'use client';

import React, { useEffect, useState } from 'react';

export function DynamicGreeting() {
  const [greeting, setGreeting] = useState('😀 Good Afternoon!');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting('🌅 Good Morning!');
    } else if (hour < 18) {
      setGreeting('😀 Good Afternoon!');
    } else {
      setGreeting('🌙 Good Evening!');
    }
  }, []);

  return (
    <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 border border-slate-200/60 dark:border-slate-700/60 shadow-sm">
      <span>{greeting}</span>
    </div>
  );
}
