const fs = require('fs');
const path = require('path');
const https = require('https');

const postsDir = path.join(__dirname, '../public/images/posts');
const mdxDir = path.join(__dirname, '../src/content/posts');

const photoMap = {
  'claude-3-5-sonnet-vs-gpt-4o-developer-benchmark': 'https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=1200&auto=format&fit=crop',
  'best-ai-coding-assistants-cursor-copilot-supermaven': 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop',
  'midjourney-v6-vs-flux-1-ai-image-generation-review': 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=1200&auto=format&fit=crop',
  'notion-vs-obsidian-knowledge-os-comparison': 'https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=1200&auto=format&fit=crop',
  'linear-vs-jira-modern-dev-team-issue-tracking': 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop',
  'raycast-masterclass-15-workflows-replacing-10-apps': 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop',
  'build-monetize-micro-saas-ai-zero-to-1k-mrr': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
  'freelance-ai-consulting-pricing-pitching-deliverables': 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop',
  'gumroad-vs-lemon-squeezy-vs-shopify-digital-products': 'https://images.unsplash.com/photo-1556742049-0a67568d049f?q=80&w=1200&auto=format&fit=crop',
  '80-20-automation-stack-zapier-make-python': 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop',
  'deep-work-zero-notification-setup-guide': 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200&auto=format&fit=crop',
  'agentic-ai-workflows-impact-on-knowledge-workers': 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop',
  'open-source-ai-vs-proprietary-apis-cost-privacy': 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop',
  'vllm-vs-ollama-local-ai-model-inference-benchmark': 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1200&auto=format&fit=crop',
  'cursor-vs-windsurf-vs-bolt-new-ai-builder-battle': 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1200&auto=format&fit=crop',
  'supabase-vs-firebase-vs-neon-postgres-stack': 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop',
  'earn-5k-month-selling-prompt-kits-gpt-agents': 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop',
  'apple-vision-pro-productivity-stack-apps': 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=1200&auto=format&fit=crop'
};

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        return downloadFile(response.headers.location, dest).then(resolve).catch(reject);
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  console.log('Downloading real Unsplash photography thumbnails for all 18 articles...');

  for (const slug of Object.keys(photoMap)) {
    const photoUrl = photoMap[slug];
    const destPath = path.join(postsDir, `${slug}-thumb.jpg`);

    try {
      await downloadFile(photoUrl, destPath);
      console.log(`Downloaded real photo for ${slug}`);

      // Update MDX frontmatter to use .jpg
      const mdxPath = path.join(mdxDir, `${slug}.mdx`);
      if (fs.existsSync(mdxPath)) {
        let content = fs.readFileSync(mdxPath, 'utf8');
        content = content.replace(/heroImage: ".*?"/, `heroImage: "/images/posts/${slug}-thumb.jpg"`);
        fs.writeFileSync(mdxPath, content);
      }
    } catch (err) {
      console.error(`Failed downloading for ${slug}:`, err);
    }
  }

  console.log('Finished downloading all real photographic thumbnails!');
}

run();
