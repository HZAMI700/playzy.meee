import React from 'react';
import { AlertCircle, Info, Lightbulb, CheckCircle2 } from 'lucide-react';

interface CalloutProps {
  type?: 'info' | 'tip' | 'warning' | 'success';
  title?: string;
  children: React.ReactNode;
}

export function Callout({ type = 'info', title, children }: CalloutProps) {
  const styles = {
    info: {
      bg: 'bg-blue-50 dark:bg-blue-950/40',
      border: 'border-blue-200 dark:border-blue-800',
      icon: <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />,
      titleColor: 'text-blue-950 dark:text-blue-100',
    },
    tip: {
      bg: 'bg-amber-50 dark:bg-amber-950/40',
      border: 'border-amber-200 dark:border-amber-800',
      icon: <Lightbulb className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />,
      titleColor: 'text-amber-950 dark:text-amber-100',
    },
    warning: {
      bg: 'bg-rose-50 dark:bg-rose-950/40',
      border: 'border-rose-200 dark:border-rose-800',
      icon: <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />,
      titleColor: 'text-rose-950 dark:text-rose-100',
    },
    success: {
      bg: 'bg-emerald-50 dark:bg-emerald-950/40',
      border: 'border-emerald-200 dark:border-emerald-800',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />,
      titleColor: 'text-emerald-950 dark:text-emerald-100',
    },
  };

  const current = styles[type];

  return (
    <div className={`my-6 p-5 rounded-2xl border ${current.bg} ${current.border} shadow-sm`}>
      <div className="flex items-start gap-3">
        {current.icon}
        <div className="space-y-1 text-sm sm:text-base text-slate-800 dark:text-slate-100 leading-relaxed">
          {title && <h5 className={`font-bold text-base ${current.titleColor}`}>{title}</h5>}
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
