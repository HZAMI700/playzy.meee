const fs = require('fs');
const path = require('path');

const postsDir = path.join(__dirname, '../src/content/posts');
const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.mdx'));

files.forEach(file => {
  const slug = file.replace('.mdx', '');
  const filePath = path.join(postsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  const pngThumb = `/images/posts/${slug}-thumb.png`;
  const pngContent = `/images/posts/${slug}-content.png`;

  // Update heroImage in frontmatter to .png
  content = content.replace(/heroImage: ".*?"/, `heroImage: "${pngThumb}"`);

  // Update inline content image to .png
  content = content.replace(/\/images\/posts\/[a-z0-9-]+\-content\.(svg|png)/g, pngContent);

  fs.writeFileSync(filePath, content);
  console.log(`Updated ${file} to reference crisp PNG thumbnail: ${pngThumb}`);
});
