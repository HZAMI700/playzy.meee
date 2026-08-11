import React from 'react';
import { ProsCons } from './ProsCons';
import { ComparisonTable } from './ComparisonTable';
import { Callout } from './Callout';
import { AdSlot } from '../AdSlot';

interface MDXRendererProps {
  content: string;
}

export function MDXRenderer({ content }: MDXRendererProps) {
  const paragraphs = content.split('\n\n');

  return (
    <div className="prose-custom space-y-6 text-slate-800 dark:text-slate-200">
      {paragraphs.map((block, idx) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        // Custom Component Tags matching inside MDX
        if (trimmed.startsWith('<ProsCons')) {
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

        // Markdown Images: ![Alt Text](url)
        if (trimmed.startsWith('![')) {
          const imgMatch = trimmed.match(/^!\[(.*?)\]\((.*?)\)$/);
          if (imgMatch) {
            const alt = imgMatch[1];
            const src = imgMatch[2];
            return (
              <figure key={idx} className="my-8 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md bg-slate-100 dark:bg-slate-900">
                <img src={src} alt={alt} className="w-full h-auto object-cover max-h-[520px]" />
                {alt && (
                  <figcaption className="p-3 text-center text-xs font-medium text-slate-500 dark:text-slate-400 italic bg-slate-50 dark:bg-slate-900/80 border-t border-slate-100 dark:border-slate-800">
                    {alt}
                  </figcaption>
                )}
              </figure>
            );
          }
        }

        // Headings - High Contrast slate-900 / white
        if (trimmed.startsWith('## ')) {
          const headingText = trimmed.replace('## ', '').replace(/[*_`]/g, '');
          const id = headingText.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
          return (
            <h2 key={idx} id={id} className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white pt-6 border-t border-slate-200 dark:border-slate-800">
              {headingText}
            </h2>
          );
        }

        if (trimmed.startsWith('### ')) {
          const headingText = trimmed.replace('### ', '').replace(/[*_`]/g, '');
          const id = headingText.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
          return (
            <h3 key={idx} id={id} className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 pt-4">
              {headingText}
            </h3>
          );
        }

        // Blockquotes
        if (trimmed.startsWith('> ')) {
          return (
            <blockquote key={idx} className="border-l-4 border-blue-600 pl-4 py-3 my-6 italic text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-900/60 rounded-r-lg">
              {trimmed.replace(/^>\s+/, '')}
            </blockquote>
          );
        }

        // Unordered lists
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          const items = trimmed.split('\n').map(l => l.replace(/^[-*]\s+/, ''));
          return (
            <ul key={idx} className="list-disc pl-6 space-y-2 text-slate-800 dark:text-slate-200">
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
            <ol key={idx} className="list-decimal pl-6 space-y-2 text-slate-800 dark:text-slate-200">
              {items.map((item, i) => (
                <li key={i} dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(item) }} />
              ))}
            </ol>
          );
        }

        // Standard Paragraph - High Contrast slate-800 / dark:text-slate-200
        return (
          <p
            key={idx}
            className="text-slate-800 dark:text-slate-200 leading-relaxed text-base sm:text-lg"
            dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(trimmed) }}
          />
        );
      })}
    </div>
  );
}

function formatInlineMarkdown(text: string): string {
  let processed = text.replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" class="my-4 rounded-xl max-w-full h-auto border border-slate-200 dark:border-slate-800 shadow-sm" />');

  return processed
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-900 dark:text-white">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="italic text-slate-800 dark:text-slate-200">$1</em>')
    .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-blue-700 dark:text-blue-300 font-mono text-sm font-semibold border border-slate-200/60 dark:border-slate-700/60">$1</code>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 dark:text-blue-400 font-semibold underline underline-offset-4 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">$1</a>');
}
