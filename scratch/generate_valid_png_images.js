const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const outputDir = path.join(__dirname, '../public/images/posts');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const articles = [
  { slug: 'claude-3-5-sonnet-vs-gpt-4o-developer-benchmark', title: 'Claude 3.5 Sonnet vs GPT-4o', cat: 'AI TOOLS', color1: '#4f46e5', color2: '#7c3aed', icon: '⚡' },
  { slug: 'best-ai-coding-assistants-cursor-copilot-supermaven', title: 'Best AI Coding Assistants', cat: 'AI TOOLS', color1: '#2563eb', color2: '#1d4ed8', icon: '💻' },
  { slug: 'midjourney-v6-vs-flux-1-ai-image-generation-review', title: 'Midjourney v6 vs Flux.1', cat: 'AI TOOLS', color1: '#db2777', color2: '#9333ea', icon: '🎨' },
  { slug: 'notion-vs-obsidian-knowledge-os-comparison', title: 'Notion vs Obsidian PKM', cat: 'SOFTWARE', color1: '#059669', color2: '#047857', icon: '📝' },
  { slug: 'linear-vs-jira-modern-dev-team-issue-tracking', title: 'Linear vs Jira Issue Tracking', cat: 'SOFTWARE', color1: '#6d28d9', color2: '#4c1d95', icon: '📐' },
  { slug: 'raycast-masterclass-15-workflows-replacing-10-apps', title: 'Raycast macOS Masterclass', cat: 'SOFTWARE', color1: '#d97706', color2: '#b45309', icon: '🚀' },
  { slug: 'build-monetize-micro-saas-ai-zero-to-1k-mrr', title: 'Micro-SaaS Zero to $1k MRR', cat: 'MONETIZATION', color1: '#059669', color2: '#065f46', icon: '💰' },
  { slug: 'freelance-ai-consulting-pricing-pitching-deliverables', title: 'Freelance AI Consulting', cat: 'MONETIZATION', color1: '#1d4ed8', color2: '#1e40af', icon: '📊' },
  { slug: 'gumroad-vs-lemon-squeezy-vs-shopify-digital-products', title: 'Selling Digital Products', cat: 'MONETIZATION', color1: '#e11d48', color2: '#9f1239', icon: '🛒' },
  { slug: '80-20-automation-stack-zapier-make-python', title: 'The 80/20 Automation Stack', cat: 'PRODUCTIVITY', color1: '#7c3aed', color2: '#5b21b6', icon: '⚙️' },
  { slug: 'deep-work-zero-notification-setup-guide', title: 'Deep Work Zero Notification', cat: 'PRODUCTIVITY', color1: '#0284c7', color2: '#0369a1', icon: '🧘' },
  { slug: 'agentic-ai-workflows-impact-on-knowledge-workers', title: 'Rise of Agentic AI Workflows', cat: 'TECH NEWS', color1: '#4338ca', color2: '#312e81', icon: '🤖' },
  { slug: 'open-source-ai-vs-proprietary-apis-cost-privacy', title: 'Open-Source AI vs APIs', cat: 'TECH NEWS', color1: '#0f766e', color2: '#115e59', icon: '🌐' },
  { slug: 'vllm-vs-ollama-local-ai-model-inference-benchmark', title: 'vLLM vs Ollama Inference', cat: 'AI TOOLS', color1: '#2563eb', color2: '#7c3aed', icon: '🧠' },
  { slug: 'cursor-vs-windsurf-vs-bolt-new-ai-builder-battle', title: 'Cursor vs Windsurf vs Bolt', cat: 'AI TOOLS', color1: '#4f46e5', color2: '#2563eb', icon: '⚡' },
  { slug: 'supabase-vs-firebase-vs-neon-postgres-stack', title: 'Supabase vs Firebase vs Neon', cat: 'SOFTWARE', color1: '#059669', color2: '#0284c7', icon: '🗄️' },
  { slug: 'earn-5k-month-selling-prompt-kits-gpt-agents', title: 'Earn $5k Selling GPT Agents', cat: 'MONETIZATION', color1: '#d97706', color2: '#059669', icon: '💵' },
  { slug: 'apple-vision-pro-productivity-stack-apps', title: 'Apple Vision Pro Workflows', cat: 'PRODUCTIVITY', color1: '#0284c7', color2: '#4f46e5', icon: '🥽' },
];

function escapeXML(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function generateSVG(title, category, color1, color2, icon, isContent = false) {
  const typeText = isContent ? 'BENCHMARK DATA &amp; ARCHITECTURE' : 'HANDS-ON REVIEW &amp; TESTING';
  const safeTitle = escapeXML(title);
  const safeCat = escapeXML(category);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675">
  <defs>
    <linearGradient id="bgGrad_${safeCat.replace(/\s+/g, '_')}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${color1}" />
      <stop offset="100%" stop-color="${color2}" />
    </linearGradient>
    <linearGradient id="cardBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.15" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0.05" />
    </linearGradient>
  </defs>

  <rect width="1200" height="675" fill="url(#bgGrad_${safeCat.replace(/\s+/g, '_')})" />

  <g stroke="#ffffff" stroke-opacity="0.1" stroke-width="2">
    <line x1="0" y1="135" x2="1200" y2="135" />
    <line x1="0" y1="270" x2="1200" y2="270" />
    <line x1="0" y1="405" x2="1200" y2="405" />
    <line x1="0" y1="540" x2="1200" y2="540" />
    <line x1="200" y1="0" x2="200" y2="675" />
    <line x1="400" y1="0" x2="400" y2="675" />
    <line x1="600" y1="0" x2="600" y2="675" />
    <line x1="800" y1="0" x2="800" y2="675" />
    <line x1="1000" y1="0" x2="1000" y2="675" />
  </g>

  <rect x="70" y="70" width="1060" height="535" rx="36" fill="url(#cardBg)" stroke="#ffffff" stroke-opacity="0.25" stroke-width="2" />

  <circle cx="160" cy="170" r="40" fill="#ffffff" fill-opacity="0.95" />
  <text x="160" y="182" font-family="system-ui, sans-serif" font-size="36" text-anchor="middle">${icon}</text>

  <rect x="220" y="146" width="240" height="48" rx="24" fill="#ffffff" fill-opacity="0.95" />
  <text x="340" y="176" font-family="system-ui, sans-serif" font-size="16" font-weight="900" fill="${color1}" text-anchor="middle" letter-spacing="1.5">${safeCat} ✓</text>

  <text x="130" y="290" font-family="system-ui, sans-serif" font-size="44" font-weight="900" fill="#ffffff">${safeTitle}</text>
  <text x="130" y="350" font-family="system-ui, sans-serif" font-size="22" font-weight="700" fill="#f1f5f9" letter-spacing="1">${typeText}</text>

  <rect x="900" y="500" width="180" height="44" rx="22" fill="#ffffff" fill-opacity="0.2" stroke="#ffffff" stroke-opacity="0.4" />
  <text x="990" y="529" font-family="system-ui, sans-serif" font-size="20" font-weight="900" fill="#ffffff" text-anchor="middle">playzy.me</text>
</svg>`;
}

async function run() {
  console.log('Generating valid SVG and converting to binary PNG images...');

  for (const art of articles) {
    const thumbSvg = path.join(outputDir, `${art.slug}-thumb.svg`);
    const contentSvg = path.join(outputDir, `${art.slug}-content.svg`);
    const thumbPng = path.join(outputDir, `${art.slug}-thumb.png`);
    const contentPng = path.join(outputDir, `${art.slug}-content.png`);

    const svgThumbContent = generateSVG(art.title, art.cat, art.color1, art.color2, art.icon, false);
    const svgContentContent = generateSVG(`${art.title} - Benchmark`, art.cat, art.color1, art.color2, art.icon, true);

    fs.writeFileSync(thumbSvg, svgThumbContent);
    fs.writeFileSync(contentSvg, svgContentContent);

    // Convert to PNG with sharp
    await sharp(Buffer.from(svgThumbContent)).resize(1200, 675).png().toFile(thumbPng);
    await sharp(Buffer.from(svgContentContent)).resize(1200, 675).png().toFile(contentPng);

    console.log(`Generated PNG + SVG for ${art.slug}`);
  }

  console.log('All 36 PNG and SVG images successfully generated!');
}

run();
