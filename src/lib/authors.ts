import { Author } from './types';

export const AUTHORS: Author[] = [
  {
    slug: 'alex-rivera',
    name: 'Alex Rivera',
    role: 'Lead Tech Editor & AI Research Fellow',
    bio: 'Former senior software engineer turned independent AI researcher. Alex has tested over 300+ SaaS applications and AI models in real production setups, focusing on benchmark accuracy and developer workflow integration.',
    avatar: '/images/authors/alex-rivera.jpg',
    credentials: [
      'B.S. in Computer Science (MIT)',
      '8+ Years Senior Full-Stack Engineering',
      'Contributor to Open-Source AI Benchmarking Repos',
    ],
    socials: {
      twitter: 'https://twitter.com/playzyme',
      github: 'https://github.com/playzyme',
      linkedin: 'https://linkedin.com/in/playzyme',
    },
  },
  {
    slug: 'maya-lin',
    name: 'Maya Lin',
    role: 'Digital Economy & Monetization Strategist',
    bio: 'Maya analyzes creator monetization frameworks, micro-SaaS economics, and digital product distribution. She previously led growth at a developer tooling startup that scaled to $4M ARR.',
    avatar: '/images/authors/maya-lin.jpg',
    credentials: [
      'M.S. in Applied Economics & Data Science',
      'Built 3 Profitable Micro-SaaS Products',
      'Advisor to Early-Stage Developer Founders',
    ],
    socials: {
      twitter: 'https://twitter.com/playzyme',
      linkedin: 'https://linkedin.com/in/playzyme',
    },
  },
];

export function getAuthorBySlug(slug: string): Author {
  return (
    AUTHORS.find((author) => author.slug === slug) || {
      slug: 'playzy-team',
      name: 'Playzy Editorial Team',
      role: 'Research & Review Committee',
      bio: 'The Playzy Editorial Team consists of experienced software engineers, product strategists, and productivity researchers committed to rigorous, evidence-based software testing.',
      avatar: '/images/authors/editorial-team.jpg',
      credentials: ['Comprehensive Hands-On Software Testing Standard'],
      socials: {},
    }
  );
}
