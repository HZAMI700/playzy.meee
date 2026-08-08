const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, '../public/images/posts');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const articles = [
  { slug: 'claude-3-5-sonnet-vs-gpt-4o-developer-benchmark', title: 'Claude 3.5 Sonnet vs GPT-4o', cat: 'AI TOOLS', color1: '#6366f1', color2: '#a855f7' },
  { slug: 'best-ai-coding-assistants-cursor-copilot-supermaven', title: 'Best AI Coding Assistants', cat: 'AI TOOLS', color1: '#3b82f6', color2: '#1d4ed8' },
  { slug: 'midjourney-v6-vs-flux-1-ai-image-generation-review', title: 'Midjourney v6 vs Flux.1', cat: 'AI TOOLS', color1: '#ec4899', color2: '#8b5cf6' },
  { slug: 'notion-vs-obsidian-knowledge-os-comparison', title: 'Notion vs Obsidian PKM', cat: 'SOFTWARE', color1: '#10b981', color2: '#059669' },
  { slug: 'linear-vs-jira-modern-dev-team-issue-tracking', title: 'Linear vs Jira Issue Tracking', cat: 'SOFTWARE', color1: '#5b21b6', color2: '#4c1d95' },
  { slug: 'raycast-masterclass-15-workflows-replacing-10-apps', title: 'Raycast macOS Masterclass', cat: 'SOFTWARE', color1: '#f59e0b', color2: '#d97706' },
  { slug: 'build-monetize-micro-saas-ai-zero-to-1k-mrr', title: 'Micro-SaaS Zero to $1k MRR', cat: 'MONETIZATION', color1: '#10b981', color2: '#047857' },
  { slug: 'freelance-ai-consulting-pricing-pitching-deliverables', title: 'Freelance AI Consulting', cat: 'MONETIZATION', color1: '#3b82f6', color2: '#1e40af' },
  { slug: 'gumroad-vs-lemon-squeezy-vs-shopify-digital-products', title: 'Selling Digital Products', cat: 'MONETIZATION', color1: '#f43f5e', color2: '#be123c' },
  { slug: '80-20-automation-stack-zapier-make-python', title: 'The 80/20 Automation Stack', cat: 'PRODUCTIVITY', color1: '#8b5cf6', color2: '#6d28d9' },
  { slug: 'deep-work-zero-notification-setup-guide', title: 'Deep Work Zero Notification', cat: 'PRODUCTIVITY', color1: '#0284c7', color2: '#0369a1' },
  { slug: 'agentic-ai-workflows-impact-on-knowledge-workers', title: 'Rise of Agentic AI Workflows', cat: 'TECH NEWS', color1: '#6366f1', color2: '#4338ca' },
  { slug: 'open-source-ai-vs-proprietary-apis-cost-privacy', title: 'Open-Source AI vs APIs', cat: 'TECH NEWS', color1: '#0d9488', color2: '#0f766e' },
];

function generateSVG(title, category, color1, color2, isContent = false) {
  const typeText = isContent ? 'BENCHMARK DATA & ARCHITECTURE' : 'HANDS-ON REVIEW';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${color1}" />
      <stop offset="100%" stop-color="${color2}" />
    </linearGradient>
    <linearGradient id="overlay" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0f172a" stop-opacity="0.1" />
      <stop offset="100%" stop-color="#0f172a" stop-opacity="0.85" />
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="675" fill="url(#bgGrad)" />

  <!-- Abstract Tech Grid Lines -->
  <g stroke="#ffffff" stroke-opacity="0.12" stroke-width="1.5">
    <line x1="0" y1="135" x2="1200" y2="135" />
    <line x1="0" y1="270" x2="1200" y2="270" />
    <line x1="0" y1="405" x2="1200" y2="405" />
    <line x1="0" y1="540" x2="1200" y2="540" />
    <line x1="240" y1="0" x2="240" y2="675" />
    <line x1="480" y1="0" x2="480" y2="675" />
    <line x1="720" y1="0" x2="720" y2="675" />
    <line x1="960" y1="0" x2="960" y2="675" />
  </g>

  <!-- Dark Gradient Overlay -->
  <rect width="1200" height="675" fill="url(#overlay)" />

  <!-- Glass Card Frame -->
  <rect x="80" y="80" width="1040" height="515" rx="32" fill="#ffffff" fill-opacity="0.08" stroke="#ffffff" stroke-opacity="0.2" stroke-width="2" />

  <!-- Category Tag Pill -->
  <rect x="130" y="140" width="220" height="46" rx="23" fill="#ffffff" fill-opacity="0.9" />
  <text x="240" y="169" font-family="system-ui, sans-serif" font-size="16" font-weight="800" fill="${color1}" text-anchor="middle" letter-spacing="1">${category} ✓</text>

  <!-- Title Text -->
  <text x="130" y="270" font-family="system-ui, sans-serif" font-size="46" font-weight="900" fill="#ffffff" width="900">${title}</text>
  <text x="130" y="330" font-family="system-ui, sans-serif" font-size="24" font-weight="600" fill="#e2e8f0">${typeText}</text>

  <!-- Watermark Logo -->
  <text x="1010" y="530" font-family="system-ui, sans-serif" font-size="28" font-weight="900" fill="#ffffff" fill-opacity="0.7" text-anchor="end">playzy.me</text>
</svg>`;
}

articles.forEach(art => {
  const thumbPath = path.join(outputDir, `${art.slug}-thumb.svg`);
  const contentPath = path.join(outputDir, `${art.slug}-content.svg`);
  fs.writeFileSync(thumbPath, generateSVG(art.title, art.cat, art.color1, art.color2, false));
  fs.writeFileSync(contentPath, generateSVG(`${art.title} - Data & Architecture`, art.cat, art.color1, art.color2, true));
});

console.log('Successfully generated 26 unique images!');
