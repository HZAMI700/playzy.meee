import type { Metadata } from 'next';
import { Outfit, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { LeftSidebar } from '@/components/LeftSidebar';
import { TopBar } from '@/components/TopBar';
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
    'vLLM vs Ollama',
    'Cursor vs Windsurf',
    'Developer Tools',
    'Agentic AI',
    'playzy.me',
  ],
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  authors: [{ name: 'Playzy Editorial Team', url: 'https://playzy.me/about' }],
  creator: 'playzy.me',
  publisher: 'playzy.me',
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
        url: '/logo.svg',
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
    <html lang="en" className={`light ${outfit.variable} ${plusJakarta.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-slate-50 text-slate-900 flex flex-col md:flex-row antialiased selection:bg-blue-500 selection:text-white">
        <ThemeProvider>
          {/* Left Sidebar */}
          <LeftSidebar />

          {/* Main Content Column */}
          <div className="flex-1 flex flex-col min-w-0 bg-white">
            <TopBar />
            <main className="flex-1 px-4 sm:px-8 py-6 md:py-8 bg-white">{children}</main>
            <Footer />
          </div>

          <AnalyticsPlaceholder />
        </ThemeProvider>
      </body>
    </html>
  );
}
