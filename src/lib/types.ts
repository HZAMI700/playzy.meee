export type ContentCategory =
  | 'ai-tools'
  | 'software-saas'
  | 'make-money-online'
  | 'productivity'
  | 'tech-news';

export interface CategoryInfo {
  slug: ContentCategory;
  name: string;
  description: string;
  iconName: string;
  color: string;
}

export interface Author {
  slug: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  credentials: string[];
  socials: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

export interface PostFrontmatter {
  title: string;
  description: string;
  date: string;
  lastUpdated?: string;
  category: ContentCategory;
  author: string; // author slug
  featured?: boolean;
  heroImage?: string;
  tags?: string[];
  tldr: string; // Direct-answer summary box for humans and AI crawlers
  faq?: Array<{ question: string; answer: string }>;
}

export interface Post extends PostFrontmatter {
  slug: string;
  readingTime: string;
  content: string;
}
