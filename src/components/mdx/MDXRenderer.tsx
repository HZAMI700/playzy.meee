import React from 'react';
import { ProsCons } from './ProsCons';
import { ComparisonTable } from './ComparisonTable';
import { Callout } from './Callout';
import { AdSlot } from '../AdSlot';

interface MDXRendererProps {
  content: string;
}

export function MDXRenderer({ content }: MDXRendererProps) {
  // Simple & safe custom markdown renderer to render structured MDX articles cleanly
  const paragraphs = content.split('\n\n');

  return (
    <div className="prose-custom space-y-6">
      {paragraphs.map((block, idx) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        // Custom Component Tags matching inside MDX
        if (trimmed.startsWith('<ProsCons')) {
          // Parse JSON props if available, else fallback
          try {
            const prosMatch = trimmed.match(/pros=\{(.*?)\}/s);
            const consMatch = trimmed.match(/cons=\{(.*?)\}/s);
            const pros = prosMatch ? JSON.parse(prosMatch[1].replace(/'/g, '"')) : [];
            const cons = consMatch ? JSON.parse(consMatch[1].replace(/'/g, '"')) : [];
            return <ProsCons key={idx} pros={pros} cons={cons} />;
          } catch {
            return null;
          }
        }

        if (trimmed.startsWith('<ComparisonTable')) {
          try {
            const headersMatch = trimmed.match(/headers=\{(.*?)\}/s);
            const rowsMatch = trimmed.match(/rows=\{(.*?)\}/s);
            const headers = headersMatch ? JSON.parse(headersMatch[1].replace(/'/g, '"')) : [];
            const rows = rowsMatch ? JSON.parse(rowsMatch[1].replace(/'/g, '"')) : [];
            return <ComparisonTable key={idx} headers={headers} rows={rows} />;
          } catch {
            return null;
          }
        }

        if (trimmed.startsWith('<Callout')) {
          try {
            const typeMatch = trimmed.match(/type="(.*?)"/);
            const titleMatch = trimmed.match(/title="(.*?)"/);
            const bodyMatch = trimmed.match(/>(.*?)<\/Callout>/s);
            const type = (typeMatch ? typeMatch[1] : 'info') as any;
            const title = titleMatch ? titleMatch[1] : undefined;
            const body = bodyMatch ? bodyMatch[1].trim() : '';
            return <Callout key={idx} type={type} title={title}>{body}</Callout>;
          } catch {
            return null;
          }
        }

        if (trimmed.startsWith('<AdSlot')) {
          const posMatch = trimmed.match(/position="(.*?)"/);
          const pos = (posMatch ? posMatch[1] : 'in-article-1') as any;
          return <AdSlot key={idx} position={pos} />;
        }

        // Headings
        if (trimmed.startsWith('## ')) {
          const headingText = trimmed.replace('## ', '').replace(/[*_`]/g, '');
          const id = headingText.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
          return (
            <h2 key={idx} id={id} className="text-2xl font-extrabold text-slate-900 dark:text-white pt-6 border-t border-slate-200/60 dark:border-slate-800/60">
              {headingText}
            </h2>
          );
        }

        if (trimmed.startsWith('### ')) {
          const headingText = trimmed.replace('### ', '').replace(/[*_`]/g, '');
          const id = headingText.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
          return (
            <h3 key={idx} id={id} className="text-xl font-bold text-slate-900 dark:text-slate-100 pt-4">
              {headingText}
            </h3>
          );
        }

        // Blockquotes
        if (trimmed.startsWith('> ')) {
          return (
            <blockquote key={idx} className="border-l-4 border-indigo-500 pl-4 py-2 my-4 italic text-slate-600 dark:text-slate-400 bg-indigo-50/30 dark:bg-indigo-950/20 rounded-r-lg">
              {trimmed.replace(/^>\s+/, '')}
            </blockquote>
          );
        }

        // Unordered lists
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          const items = trimmed.split('\n').map(l => l.replace(/^[-*]\s+/, ''));
          return (
            <ul key={idx} className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
              {items.map((item, i) => (
                <li key={i} dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(item) }} />
              ))}
            </ul>
          );
        }

        // Ordered lists
        if (/^\d+\.\s+/.test(trimmed)) {
          const items = trimmed.split('\n').map(l => l.replace(/^\d+\.\s+/, ''));
          return (
            <ol key={idx} className="list-decimal pl-6 space-y-2 text-slate-700 dark:text-slate-300">
              {items.map((item, i) => (
                <li key={i} dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(item) }} />
              ))}
            </ol>
          );
        }

        // Standard Paragraph
        return (
          <p
            key={idx}
            className="text-slate-700 dark:text-slate-300 leading-relaxed text-base sm:text-lg"
            dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(trimmed) }}
          />
        );
      })}
    </div>
  );
}

function formatInlineMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code className="px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 font-mono text-sm">$1</code>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" className="text-indigo-600 dark:text-indigo-400 font-medium underline underline-offset-4 hover:text-indigo-500 transition-colors">$1</a>');
}
