const fs = require('fs');
const path = require('path');

const postsDir = path.join(__dirname, '../src/content/posts');

const imageMap = {
  'claude-3-5-sonnet-vs-gpt-4o-developer-benchmark': {
    thumb: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=1200&auto=format&fit=crop',
    content: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    alt: 'Claude 3.5 Sonnet vs GPT-4o AI Intelligence Benchmark'
  },
  'best-ai-coding-assistants-cursor-copilot-supermaven': {
    thumb: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop',
    content: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1200&auto=format&fit=crop',
    alt: 'Developer writing code with AI autocomplete IDE'
  },
  'midjourney-v6-vs-flux-1-ai-image-generation-review': {
    thumb: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=1200&auto=format&fit=crop',
    content: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1200&auto=format&fit=crop',
    alt: 'Generative AI Art and Typography Precision'
  },
  'notion-vs-obsidian-knowledge-os-comparison': {
    thumb: 'https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=1200&auto=format&fit=crop',
    content: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1200&auto=format&fit=crop',
    alt: 'Knowledge OS workspace setup'
  },
  'linear-vs-jira-modern-dev-team-issue-tracking': {
    thumb: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop',
    content: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1200&auto=format&fit=crop',
    alt: 'Modern engineering team sprint planning'
  },
  'raycast-masterclass-15-workflows-replacing-10-apps': {
    thumb: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop',
    content: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1200&auto=format&fit=crop',
    alt: 'Apple Mac desktop keyboard shortcuts setup'
  },
  'build-monetize-micro-saas-ai-zero-to-1k-mrr': {
    thumb: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
    content: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop',
    alt: 'Micro SaaS revenue analytics growth'
  },
  'freelance-ai-consulting-pricing-pitching-deliverables': {
    thumb: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop',
    content: 'https://images.unsplash.com/photo-1531538606174-0f929660a55d?q=80&w=1200&auto=format&fit=crop',
    alt: 'AI consulting presentation and client strategy'
  },
  'gumroad-vs-lemon-squeezy-vs-shopify-digital-products': {
    thumb: 'https://images.unsplash.com/photo-1556742049-0a67568d049f?q=80&w=1200&auto=format&fit=crop',
    content: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=1200&auto=format&fit=crop',
    alt: 'E-commerce digital payment checkout'
  },
  '80-20-automation-stack-zapier-make-python': {
    thumb: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop',
    content: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop',
    alt: 'Automated data pipeline CPU chip'
  },
  'deep-work-zero-notification-setup-guide': {
    thumb: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200&auto=format&fit=crop',
    content: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1200&auto=format&fit=crop',
    alt: 'Deep work focus desk environment'
  },
  'agentic-ai-workflows-impact-on-knowledge-workers': {
    thumb: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop',
    content: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    alt: 'Agentic AI neural network automation'
  },
  'open-source-ai-vs-proprietary-apis-cost-privacy': {
    thumb: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop',
    content: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1200&auto=format&fit=crop',
    alt: 'Open source AI datacenter server rack'
  }
};

Object.keys(imageMap).forEach(slug => {
  const filePath = path.join(postsDir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');
  const info = imageMap[slug];

  // Update heroImage in frontmatter
  content = content.replace(/heroImage: ".*?"/, `heroImage: "${info.thumb}"`);

  // Replace content image
  const contentImgMd = `![${info.alt}](${info.content})`;
  if (content.includes('![Content Diagram]')) {
    content = content.replace(/!\[Content Diagram\]\(.*?\)/, contentImgMd);
  } else if (content.includes('![') && content.includes('http')) {
    content = content.replace(/!\[.*?\]\(https:\/\/images\.unsplash\.com.*?\)/, contentImgMd);
  } else {
    content = content.replace(
      '<AdSlot position="in-article-1" />',
      `${contentImgMd}\n\n<AdSlot position="in-article-1" />`
    );
  }

  fs.writeFileSync(filePath, content);
  console.log(`Updated ${slug} with subject-specific Unsplash thumbnail and content photos.`);
});
