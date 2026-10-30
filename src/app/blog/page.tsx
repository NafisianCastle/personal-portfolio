import Link from "next/link";
import { getAllPosts } from "@/lib/notion";
import Navbar from "@/components/layout/Navbar";
import PageLayout from "@/components/layout/PageLayout";
import Container from "@/components/layout/Container";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Nafisur Rahman",
  description:
    "Articles on .NET, Azure, real-time systems, DevOps, and software engineering by Nafisur Rahman.",
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

  return (
    <PageLayout>
      <Navbar />
      <main className="pt-24">
        <Container>
          {/* Header */}
          <div className="mb-12 max-w-2xl pt-12">
            <span className="mb-3 inline-block font-mono text-xs font-semibold uppercase tracking-[0.2em] text-brand-500">
              Writing
            </span>
            <h1
              className="mb-4 font-display text-4xl font-black text-text-primary sm:text-5xl"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Blog
            </h1>
            <p className="text-base leading-relaxed text-text-secondary sm:text-lg">
              Thoughts on .NET, Azure, real-time systems, DevOps, and
              engineering in general — written as I learn and build.
            </p>
          </div>

          {/* Post list */}
          {posts.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="divide-y divide-surface-700/50">
              {posts.map((post) => (
                <article key={post.id} className="group py-8">
                  <Link href={`/blog/${post.slug}`} className="block">
                    {/* Tags */}
                    {post.tags.length > 0 && (
                      <div className="mb-3 flex flex-wrap gap-2">
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
                    <h2
                      className="mb-2 font-display text-xl font-bold text-text-primary transition-colors duration-200 group-hover:text-brand-400 sm:text-2xl"
                      style={{ fontFamily: "var(--font-space-grotesk)" }}
                    >
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    {post.excerpt && (
                      <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-text-secondary sm:text-base">
                        {post.excerpt}
                      </p>
                    )}

                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-4 text-xs text-text-muted">
                      <time dateTime={post.publishedDate}>
                        {formatDate(post.publishedDate)}
                      </time>
                      <span aria-hidden="true">·</span>
                      <span>{post.readingTime} min read</span>
                      <span
                        className="ml-auto flex items-center gap-1 text-brand-400 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                        aria-hidden="true"
                      >
                        Read article
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path
                            d="M2.5 6h7M6.5 3l3 3-3 3"
                            stroke="currentColor"
                            strokeWidth="1.3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </Container>
      </main>
    </PageLayout>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="mb-4 text-5xl" aria-hidden="true">✍️</div>
      <h2
        className="mb-2 font-display text-xl font-bold text-text-primary"
        style={{ fontFamily: "var(--font-space-grotesk)" }}
      >
        No posts yet
      </h2>
      <p className="text-sm text-text-secondary">
        Blog posts will appear here once published in Notion.
      </p>
      <p className="mt-2 text-xs text-text-muted">
        Make sure <code className="rounded bg-surface-800 px-1.5 py-0.5 font-mono">NOTION_API_KEY</code> and{" "}
        <code className="rounded bg-surface-800 px-1.5 py-0.5 font-mono">NOTION_DATABASE_ID</code> are set.
      </p>
    </div>
  );
}
