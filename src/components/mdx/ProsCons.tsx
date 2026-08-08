import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

interface ProsConsProps {
  pros: string[];
  cons: string[];
}

export function ProsCons({ pros, cons }: ProsConsProps) {
  return (
    <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Pros Column */}
      <div className="p-5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-900/60">
        <h4 className="flex items-center gap-2 text-base font-bold text-emerald-800 dark:text-emerald-300 mb-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          What Works Great (Pros)
        </h4>
        <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
          {pros.map((pro, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-emerald-500 font-bold">•</span>
              <span>{pro}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Cons Column */}
      <div className="p-5 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/80 dark:border-rose-900/60">
        <h4 className="flex items-center gap-2 text-base font-bold text-rose-800 dark:text-rose-300 mb-3">
          <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
          Where It Falls Short (Cons)
        </h4>
        <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
          {cons.map((con, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-rose-500 font-bold">•</span>
              <span>{con}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
