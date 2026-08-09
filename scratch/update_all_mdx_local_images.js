const fs = require('fs');
const path = require('path');

const postsDir = path.join(__dirname, '../src/content/posts');
const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.mdx'));

files.forEach(file => {
  const slug = file.replace('.mdx', '');
  const filePath = path.join(postsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  const thumbUrl = `/images/posts/${slug}-thumb.svg`;
  const contentUrl = `/images/posts/${slug}-content.svg`;

  // Replace heroImage in frontmatter
  if (content.includes('heroImage:')) {
    content = content.replace(/heroImage: ".*?"/, `heroImage: "${thumbUrl}"`);
  }

  fs.writeFileSync(filePath, content);
  console.log(`Updated ${file} with local image paths.`);
});
