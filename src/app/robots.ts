import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'ClaudeBot',
          'Claude-Web',
          'PerplexityBot',
          'Google-Extended',
          'CCBot',
          'cohere-ai',
          'Bytespider',
        ],
        allow: '/',
      },
    ],
    sitemap: 'https://playzy.me/sitemap.xml',
    host: 'https://playzy.me',
  };
}
