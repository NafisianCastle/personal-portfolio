import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllSlugs, getPostBySlug, getPageBlocks } from "@/lib/notion";
import Navbar from "@/components/layout/Navbar";
import PageLayout from "@/components/layout/PageLayout";
import Container from "@/components/layout/Container";
import NotionRenderer from "@/components/blog/NotionRenderer";

/* ── Static generation ───────────────────────────────────────────────────── */

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post not found" };

  return {
    title: `${post.title} — Nafisur Rahman`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedDate,
      tags: post.tags,
      images: post.coverImage ? [{ url: post.coverImage }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

/* ── Helpers ─────────────────────────────────────────────────────────────── */

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/* ── Page ────────────────────────────────────────────────────────────────── */

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const recordMap = await getPageBlocks(post.id);

  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://nafisurrahman.dev";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedDate,
    author: {
      "@type": "Person",
      name: "Nafisur Rahman",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Person",
      name: "Nafisur Rahman",
      url: SITE_URL,
    },
    url: `${SITE_URL}/blog/${post.slug}`,
    ...(post.coverImage ? { image: post.coverImage } : {}),
    keywords: post.tags.join(", "),
  };

  return (
    <PageLayout>
      <Navbar />
      <main className="pt-24">
        <Container className="max-w-3xl">
          {/* Back link */}
          <div className="pt-10">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary transition-colors duration-200 hover:text-brand-400"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M10 13L5 8l5-5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              All posts
            </Link>
          </div>

          {/* Post header */}
          <header className="mt-8 mb-10 border-b border-surface-700/50 pb-10">
            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-brand-500/10 px-2.5 py-0.5 text-xs font-semibold text-brand-400 border border-brand-500/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h1
              className="mb-4 font-display text-3xl font-black leading-tight text-text-primary sm:text-4xl lg:text-5xl"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {post.title}
            </h1>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="mb-6 text-lg leading-relaxed text-text-secondary">
                {post.excerpt}
              </p>
            )}

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted">
              <span className="font-semibold text-text-secondary">
                Nafisur Rahman
              </span>
              <span aria-hidden="true">·</span>
              <time dateTime={post.publishedDate}>
                {formatDate(post.publishedDate)}
              </time>
              <span aria-hidden="true">·</span>
              <span>{post.readingTime} min read</span>
            </div>
          </header>

          {/* Notion content */}
          <div className="notion-content pb-20">
            <NotionRenderer recordMap={recordMap} />
          </div>
        </Container>
      </main>

      {/* Article structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </PageLayout>
  );
}
