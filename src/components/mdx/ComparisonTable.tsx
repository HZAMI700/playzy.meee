import React from 'react';

interface ComparisonTableProps {
  headers: string[];
  rows: string[][];
}

export function ComparisonTable({ headers, rows }: ComparisonTableProps) {
  return (
    <div className="my-8 overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <table className="w-full text-left text-sm text-slate-700 dark:text-slate-300">
        <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-900 dark:text-white font-display font-semibold border-b border-slate-200 dark:border-slate-800">
          <tr>
            {headers.map((header, idx) => (
              <th key={idx} className="px-5 py-3.5 whitespace-nowrap">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900">
          {rows.map((row, rIdx) => (
            <tr key={rIdx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
              {row.map((cell, cIdx) => (
                <td
                  key={cIdx}
                  className={`px-5 py-4 ${
                    cIdx === 0
                      ? 'font-semibold text-slate-900 dark:text-white whitespace-nowrap'
                      : 'text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
