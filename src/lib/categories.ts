import { CategoryInfo } from './types';

export const CATEGORIES: CategoryInfo[] = [
  {
    slug: 'ai-tools',
    name: 'AI Tool Reviews & Comparisons',
    description: 'In-depth benchmarks, real-world testing, and direct comparisons of LLMs, code assistants, and generative AI tools.',
    iconName: 'Bot',
    color: 'from-violet-500 to-indigo-600',
  },
  {
    slug: 'software-saas',
    name: 'Software & SaaS Deep Dives',
    description: 'Hands-on breakdowns of developer tools, knowledge management systems, and modern workplace software.',
    iconName: 'Cpu',
    color: 'from-blue-500 to-cyan-600',
  },
  {
    slug: 'make-money-online',
    name: 'Digital Money-Making',
    description: 'Legitimate, tested strategies for micro-SaaS, freelance consulting, digital product sales, and creator monetization.',
    iconName: 'Coins',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    slug: 'productivity',
    name: 'Productivity & Workflows',
    description: 'Automation frameworks, time-blocking methods, and notification-free setups to compound your daily output.',
    iconName: 'Zap',
    color: 'from-amber-500 to-orange-600',
  },
  {
    slug: 'tech-news',
    name: 'Industry News & Trends',
    description: 'Context-rich explainers on open-source AI models, tech market shifts, and agentic workflow developments.',
    iconName: 'Globe',
    color: 'from-rose-500 to-pink-600',
  },
];

export function getCategoryBySlug(slug: string): CategoryInfo | undefined {
  return CATEGORIES.find((cat) => cat.slug === slug);
}
