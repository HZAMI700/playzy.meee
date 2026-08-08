import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { Post, PostFrontmatter } from './types';

const POSTS_PATH = path.join(process.cwd(), 'src/content/posts');

export function getPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_PATH)) {
    return [];
  }
  return fs.readdirSync(POSTS_PATH).filter((file) => /\.mdx?$/.test(file));
}

export function getPostBySlug(slug: string): Post | null {
  const realSlug = slug.replace(/\.mdx?$/, '');
  const filePath = path.join(POSTS_PATH, `${realSlug}.mdx`);
  const altFilePath = path.join(POSTS_PATH, `${realSlug}.md`);

  let fileContent = '';
  if (fs.existsSync(filePath)) {
    fileContent = fs.readFileSync(filePath, 'utf8');
  } else if (fs.existsSync(altFilePath)) {
    fileContent = fs.readFileSync(altFilePath, 'utf8');
  } else {
    return null;
  }

  const { data, content } = matter(fileContent);
  const frontmatter = data as PostFrontmatter;
  const stats = readingTime(content);

  return {
    ...frontmatter,
    slug: realSlug,
    readingTime: stats.text,
    content,
  };
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is Post => post !== null)
    .sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));

  return posts;
}

export function getPostsByCategory(categorySlug: string): Post[] {
  return getAllPosts().filter((post) => post.category === categorySlug);
}

export function getPostsByAuthor(authorSlug: string): Post[] {
  return getAllPosts().filter((post) => post.author === authorSlug);
}

export function getFeaturedPosts(): Post[] {
  return getAllPosts().filter((post) => post.featured);
}
