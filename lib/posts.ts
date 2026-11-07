import fs from "fs";
import path from "path";
import { parseFrontmatter, estimateReadTime } from "./markdown";

export interface BlogPost {
  title: string;
  desc: string;
  date: string;
  tags: string[];
  slug: string;
  readTime: string;
}

function getPostsDirectory(): string {
  const localPosts = path.join(process.cwd(), "posts");
  if (fs.existsSync(localPosts)) return localPosts;
  const nestedPosts = path.join(process.cwd(), "personal", "posts");
  if (fs.existsSync(nestedPosts)) return nestedPosts;
  return localPosts;
}

function parseSortDate(dateStr: string): number {
  if (!dateStr) return 0;
  if (/present/i.test(dateStr)) return Number.MAX_SAFE_INTEGER;
  const parts = dateStr.split(/[-–—]+/);
  const target = parts[0]?.trim();
  const parsed = new Date(target).getTime();
  if (!isNaN(parsed)) return parsed;
  const years = dateStr.match(/\b(19|20)\d{2}\b/g);
  if (years && years.length > 0) return new Date(years[0]).getTime();
  return 0;
}

export function getAllPosts(): BlogPost[] {
  try {
    const postsDirectory = getPostsDirectory();
    if (!fs.existsSync(postsDirectory)) return [];

    const filenames = fs.readdirSync(postsDirectory);
    const posts: BlogPost[] = [];

    for (const filename of filenames) {
      if (filename.endsWith(".mdx") || filename.endsWith(".md")) {
        const filePath = path.join(postsDirectory, filename);
        const fileContent = fs.readFileSync(filePath, "utf8");

        const parsed = parseFrontmatter(fileContent);
        if (parsed) {
          const slug = filename.replace(/\.(mdx|md)$/, "");
          posts.push({
            title: String(parsed.frontmatter.title || "Untitled"),
            desc: String(parsed.frontmatter.desc || ""),
            date: String(parsed.frontmatter.date || ""),
            tags: Array.isArray(parsed.frontmatter.tags) ? parsed.frontmatter.tags : [],
            slug,
            readTime: estimateReadTime(parsed.content),
          });
        }
      }
    }

    return posts.sort((a, b) => parseSortDate(b.date) - parseSortDate(a.date));
  } catch (error) {
    console.error("Error reading posts:", error);
    return [];
  }
}

export function getTopBlogPosts(limit = 2): BlogPost[] {
  return getAllPosts().slice(0, limit);
}

export function getPostBySlug(slug: string) {
  try {
    const postsDirectory = getPostsDirectory();
    const decodedSlug = decodeURIComponent(slug);
    let filePath = path.join(postsDirectory, `${decodedSlug}.mdx`);
    if (!fs.existsSync(filePath)) {
      filePath = path.join(postsDirectory, `${decodedSlug}.md`);
    }
    if (!fs.existsSync(filePath)) {
      filePath = path.join(postsDirectory, `${slug}.mdx`);
    }
    if (!fs.existsSync(filePath)) {
      filePath = path.join(postsDirectory, `${slug}.md`);
    }
    if (!fs.existsSync(filePath)) return null;

    const fileContent = fs.readFileSync(filePath, "utf8");
    const parsed = parseFrontmatter(fileContent);
    if (!parsed) return null;

    return {
      title: String(parsed.frontmatter.title || ""),
      desc: String(parsed.frontmatter.desc || ""),
      date: String(parsed.frontmatter.date || ""),
      tags: Array.isArray(parsed.frontmatter.tags) ? parsed.frontmatter.tags : [],
      content: parsed.content,
      readTime: estimateReadTime(parsed.content),
    };
  } catch {
    return null;
  }
}
