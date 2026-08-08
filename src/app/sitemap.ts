import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/notion";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://nafisurrahman.dev";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // Dynamic blog post routes
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const posts = await getAllPosts();
    blogRoutes = posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.publishedDate),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  } catch {
    // Notion not configured — skip blog routes in sitemap
  }

  return [...staticRoutes, ...blogRoutes];
}
