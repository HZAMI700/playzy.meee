'use client';

import React from 'react';

/**
 * ==============================================================================
 * GOOGLE ADSENSE PLACEHOLDER COMPONENT
 * ==============================================================================
 * TODO: Insert your Google AdSense Publisher ID and Ad Slot IDs below once approved.
 * Example Script tag insertion:
 * <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossorigin="anonymous"></script>
 *
 * Current mode: Visual placeholder in development/production until publisher ID is added.
 */

export type AdSlotPosition = 'header' | 'in-article-1' | 'in-article-2' | 'sidebar' | 'bottom';

interface AdSlotProps {
  position: AdSlotPosition;
  className?: string;
}

export function AdSlot({ position, className = '' }: AdSlotProps) {
  // Replace this placeholder check with your actual Google AdSense client ID when approved.
  const ADSENSE_PUB_ID = process.env.NEXT_PUBLIC_ADSENSE_PUB_ID || null;

  return (
    <div
      className={`my-8 p-4 rounded-xl border border-dashed border-indigo-300 dark:border-indigo-900 bg-indigo-50/40 dark:bg-indigo-950/20 text-center transition-all ${className}`}
      data-ad-position={position}
    >
      {ADSENSE_PUB_ID ? (
        /* Actual AdSense Code Block once Publisher ID is provided */
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={ADSENSE_PUB_ID}
          data-ad-slot="1234567890"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      ) : (
        /* Visual Placeholder during setup / AdSense Approval */
        <div className="flex flex-col items-center justify-center py-4 px-2">
          <div className="text-xs uppercase tracking-widest font-mono text-indigo-500 dark:text-indigo-400 font-semibold mb-1">
            Advertisement ({position})
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md">
            AdSense slot active. Replace <code className="text-indigo-600 dark:text-indigo-300 font-mono">NEXT_PUBLIC_ADSENSE_PUB_ID</code> in your <code className="font-mono">.env.local</code> file to display real ads.
          </p>
        </div>
      )}
    </div>
  );
}
