'use client';

import React, { useEffect } from 'react';

export type AdSlotPosition = 'header' | 'in-article-1' | 'in-article-2' | 'sidebar' | 'bottom';

interface AdSlotProps {
  position: AdSlotPosition;
  className?: string;
}

export function AdSlot({ position, className = '' }: AdSlotProps) {
  const ADSENSE_PUB_ID = 'ca-pub-1227503577553311';

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error('AdSense push error:', e);
    }
  }, []);

  return (
    <div
      className={`my-6 p-2 rounded-xl border border-slate-200 bg-slate-50 text-center transition-all ${className}`}
      data-ad-position={position}
    >
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_PUB_ID}
        data-ad-slot="1234567890"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
