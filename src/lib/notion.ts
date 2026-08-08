import { Client } from "@notionhq/client";
import { NotionAPI } from "notion-client";
import type {
  PageObjectResponse,
  QueryDatabaseResponse,
} from "@notionhq/client/build/src/api-endpoints";

/* ── Clients ─────────────────────────────────────────────────────────────── */

/** Official Notion client — used to query the database */
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

/** react-notion-x unofficial client — used to fetch full page blocks */
const notionX = new NotionAPI();

/* ── Types ───────────────────────────────────────────────────────────────── */

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  publishedDate: string;
  coverImage: string | null;
  readingTime: number; // minutes
}

/* ── Helpers ─────────────────────────────────────────────────────────────── */

function getText(property: PageObjectResponse["properties"][string]): string {
  if (property.type === "title") {
    return property.title.map((t) => t.plain_text).join("");
  }
  if (property.type === "rich_text") {
    return property.rich_text.map((t) => t.plain_text).join("");
  }
  return "";
}

function getDate(property: PageObjectResponse["properties"][string]): string {
  if (property.type === "date" && property.date?.start) {
    return property.date.start;
  }
  return new Date().toISOString().split("T")[0];
}

function getMultiSelect(
  property: PageObjectResponse["properties"][string],
): string[] {
  if (property.type === "multi_select") {
    return property.multi_select.map((s) => s.name);
  }
  return [];
}

function getCheckbox(
  property: PageObjectResponse["properties"][string],
): boolean {
  if (property.type === "checkbox") {
    return property.checkbox;
  }
  return false;
}

function getCover(page: PageObjectResponse): string | null {
  if (!page.cover) return null;
  if (page.cover.type === "external") return page.cover.external.url;
  if (page.cover.type === "file") return page.cover.file.url;
  return null;
}

function estimateReadingTime(excerpt: string): number {
  const wordsPerMinute = 200;
  const wordCount = excerpt.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

function pageToPost(page: PageObjectResponse): BlogPost {
  const props = page.properties;
  const title = getText(props["Title"] ?? props["Name"] ?? { type: "title", title: [] });
  const slug = getText(props["Slug"] ?? { type: "rich_text", rich_text: [] }) || slugify(title);
  const excerpt = getText(props["Excerpt"] ?? { type: "rich_text", rich_text: [] });
  const tags = getMultiSelect(props["Tags"] ?? { type: "multi_select", multi_select: [] });
  const publishedDate = getDate(props["Date"] ?? { type: "date", date: null });

  return {
    id: page.id,
    slug,
    title,
    excerpt,
    tags,
    publishedDate,
    coverImage: getCover(page),
    readingTime: estimateReadingTime(excerpt),
  };
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

/* ── Public API ──────────────────────────────────────────────────────────── */

/**
 * Fetch all published blog posts from the Notion database, sorted by date descending.
 */
export async function getAllPosts(): Promise<BlogPost[]> {
  if (!process.env.NOTION_DATABASE_ID || !process.env.NOTION_API_KEY) {
    console.warn("Notion env vars not set — returning empty post list.");
    return [];
  }

  const response: QueryDatabaseResponse = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
    filter: {
      property: "Published",
      checkbox: { equals: true },
    },
    sorts: [{ property: "Date", direction: "descending" }],
  });

  return (response.results as PageObjectResponse[])
    .filter((page) => page.object === "page")
    .map(pageToPost);
}

/**
 * Fetch a single blog post's metadata by slug.
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getAllPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}

/**
 * Fetch the full Notion page block map for react-notion-x rendering.
 * Uses the page ID (not slug).
 */
export async function getPageBlocks(pageId: string) {
  return notionX.getPage(pageId);
}

/**
 * Get all slugs — used by generateStaticParams.
 */
export async function getAllSlugs(): Promise<string[]> {
  const posts = await getAllPosts();
  return posts.map((p) => p.slug);
}
