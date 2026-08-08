import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for playzy.me detailing user data collection, cookie usage, and analytics policies.',
  alternates: {
    canonical: 'https://playzy.me/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6 prose-custom">
      <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Privacy Policy</h1>
      <p className="text-sm text-slate-500">Effective Date: August 1, 2026</p>
      
      <h2>1. Information We Collect</h2>
      <p>
        At playzy.me, we respect your privacy. We collect non-personally identifiable information such as browser type, operating system, and referral URLs via Google Analytics 4 to understand website traffic patterns and improve content quality.
      </p>

      <h2>2. Cookies & Advertising</h2>
      <p>
        We use cookies to enhance navigation and display relevant advertisements via Google AdSense. Google and third-party vendors use cookies to serve ads based on users' prior visits to playzy.me or other websites.
      </p>

      <h2>3. Newsletter Subscriptions</h2>
      <p>
        If you voluntarily subscribe to our newsletter, we store your email address securely solely for delivering weekly article updates. We never sell or share email lists with third parties.
      </p>

      <h2>4. Contact Us</h2>
      <p>
        For inquiries regarding this privacy policy, contact us at <code className="font-mono">privacy@playzy.me</code>.
      </p>
    </div>
  );
}
