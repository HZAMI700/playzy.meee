'use client';

import React, { useEffect, useState } from 'react';
import { List } from 'lucide-react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents({ content }: { content: string }) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Extract H2 and H3 headings from markdown content
    const lines = content.split('\n');
    const extracted: Heading[] = [];

    lines.forEach((line) => {
      const match = line.match(/^(#{2,3})\s+(.+)$/);
      if (match) {
        const level = match[1].length;
        const rawText = match[2].trim();
        const text = rawText.replace(/[*_`]/g, '');
        const id = text
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-');
        extracted.push({ id, text, level });
      }
    });

    setHeadings(extracted);
  }, [content]);

  if (headings.length === 0) return null;

  return (
    <nav className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3">
      <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400">
        <List className="w-4 h-4 text-indigo-500" />
        Table of Contents
      </div>
      <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
        {headings.map((h) => (
          <li key={h.id} className={h.level === 3 ? 'pl-3 border-l border-slate-200 dark:border-slate-800' : ''}>
            <a
              href={`#${h.id}`}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors line-clamp-1"
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
