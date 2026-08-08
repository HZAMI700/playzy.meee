import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAuthorBySlug, AUTHORS } from '@/lib/authors';
import { getPostsByAuthor } from '@/lib/mdx';
import { CheckCircle2, Calendar, Clock, ArrowRight } from 'lucide-react';

interface AuthorPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return AUTHORS.map((author) => ({ slug: author.slug }));
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);
  return {
    title: `${author.name} — Author Profile & Research`,
    description: author.bio,
    alternates: {
      canonical: `https://playzy.me/author/${slug}`,
    },
  };
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);

  if (!author || author.slug === 'playzy-team') {
    notFound();
  }

  const posts = getPostsByAuthor(slug);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Author Bio Header Card */}
      <div className="p-8 rounded-3xl bg-slate-900 text-white shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-extrabold text-3xl shrink-0 shadow-lg">
            {author.name.charAt(0)}
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-extrabold tracking-tight">{author.name}</h1>
            <p className="text-sm font-semibold text-indigo-400">{author.role}</p>
            <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">{author.bio}</p>
          </div>
        </div>

        {/* Credentials Badges */}
        <div className="pt-4 border-t border-slate-800">
          <h2 className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-3">
            E-E-A-T Verified Credentials & Expertise
          </h2>
          <div className="flex flex-wrap gap-3">
            {author.credentials.map((cred, i) => (
              <div
                key={i}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-xs font-medium text-slate-200 border border-slate-700"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>{cred}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Articles List */}
      <div className="space-y-6">
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
          Articles & Research by {author.name} ({posts.length})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 transition-all group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                    {post.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-indigo-500" />
                    {post.readingTime}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {post.description}
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                  {post.category}
                </span>
                <Link
                  href={`/blog/${post.slug}`}
                  className="flex items-center gap-1 text-xs font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400"
                >
                  Read Article <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
