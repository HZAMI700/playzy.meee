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

  // Replace or add heroImage in frontmatter
  if (content.includes('heroImage:')) {
    content = content.replace(/heroImage: ".*?"/, `heroImage: "${thumbUrl}"`);
  } else {
    content = content.replace('featured: ', `heroImage: "${thumbUrl}"\nfeatured: `);
  }

  // Inject content image inside the MDX if not already present
  if (!content.includes('![Content Diagram]')) {
    content = content.replace(
      '<AdSlot position="in-article-1" />',
      `![Content Diagram](${contentUrl})\n\n<AdSlot position="in-article-1" />`
    );
  }

  fs.writeFileSync(filePath, content);
  console.log(`Updated ${file} with unique thumbnail and content image.`);
});
