import type { Metadata } from 'next';
import { Outfit, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AnalyticsPlaceholder } from '@/components/AnalyticsPlaceholder';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://playzy.me'),
  title: {
    default: 'playzy.me — Smart, Playful Tech & AI Research',
    template: '%s | playzy.me',
  },
  description:
    'Evidence-based reviews, deep-dive benchmarks, and how-to guides on AI tools, SaaS products, productivity workflows, and legitimate digital monetization.',
  keywords: [
    'AI Tools',
    'SaaS Reviews',
    'Make Money Online',
    'Productivity Workflows',
    'Claude vs GPT-4o',
    'Developer Tools',
    'Agentic AI',
    'playzy.me',
  ],
  authors: [{ name: 'Playzy Editorial Team', url: 'https://playzy.me/about' }],
  creator: 'playzy.me',
  publisher: 'playzy.me',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://playzy.me',
    siteName: 'playzy.me',
    title: 'playzy.me — Smart, Playful Tech & AI Research',
    description:
      'Evidence-based reviews and hands-on benchmarks of AI tools, productivity software, and digital monetization strategies.',
    images: [
      {
        url: 'https://playzy.me/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'playzy.me — Smart Tech & AI Research',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'playzy.me — Smart, Playful Tech & AI Research',
    description:
      'Evidence-based reviews and hands-on benchmarks of AI tools, productivity software, and digital monetization strategies.',
    creator: '@playzyme',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://playzy.me',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${plusJakarta.variable}`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col antialiased selection:bg-indigo-500 selection:text-white">
        <ThemeProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <AnalyticsPlaceholder />
        </ThemeProvider>
      </body>
    </html>
  );
}
