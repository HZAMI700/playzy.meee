import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Affiliate & Advertising Disclaimer',
  description: 'Full disclosure regarding monetization, affiliate links, and Google AdSense placement policies on playzy.me.',
  alternates: {
    canonical: 'https://playzy.me/disclaimer',
  },
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6 prose-custom">
      <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
        Affiliate & Advertising Disclaimer
      </h1>
      <p className="text-sm text-slate-500">Effective Date: August 1, 2026</p>
      
      <h2>1. Monetization Disclosure</h2>
      <p>
        In accordance with FTC guidelines, please assume that certain links on playzy.me may be affiliate links. If you purchase a software product or service through an affiliate link, playzy.me may earn a small referral commission at zero additional cost to you.
      </p>

      <h2>2. Google AdSense & Display Ads</h2>
      <p>
        playzy.me displays contextual advertisements served via Google AdSense. These ads are clearly demarcated from editorial content. Ad placement does not constitute an endorsement by playzy.me of the advertised product or service.
      </p>

      <h2>3. Absolute Editorial Integrity</h2>
      <p>
        Monetization mechanisms never influence our software benchmarks, review ratings, or pros/cons evaluation. If a tool fails our technical benchmarks, we report the finding transparently regardless of commercial partnerships.
      </p>
    </div>
  );
}
