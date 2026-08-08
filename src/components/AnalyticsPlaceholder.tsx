'use client';

import Script from 'next/script';

/**
 * ==============================================================================
 * GOOGLE ANALYTICS 4 & SEARCH CONSOLE PLACEHOLDER
 * ==============================================================================
 * TODO: Set NEXT_PUBLIC_GA_ID in .env.local to activate GA4 telemetry.
 */
export function AnalyticsPlaceholder() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  if (!gaId) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  );
}
