import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for playzy.me.',
  alternates: {
    canonical: 'https://playzy.me/terms',
  },
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6 prose-custom">
      <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Terms of Service</h1>
      <p className="text-sm text-slate-500">Effective Date: August 1, 2026</p>
      
      <h2>1. Acceptance of Terms</h2>
      <p>
        By accessing playzy.me, you agree to be bound by these Terms of Service. All content provided on this website is for informational and educational purposes.
      </p>

      <h2>2. Intellectual Property</h2>
      <p>
        All original reviews, comparison matrices, benchmarks, and articles published on playzy.me are protected by copyright law. Reproduction without explicit written attribution is prohibited.
      </p>

      <h2>3. Disclaimer of Warranty</h2>
      <p>
        Information is provided "as is" without warranty of any kind. Pricing, feature specifications, and software availability may change over time.
      </p>
    </div>
  );
}
