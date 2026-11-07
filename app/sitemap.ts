import { MetadataRoute } from "next";
import { getAllPosts } from "../lib/posts";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://joydeepbanik.me";

  const posts = getAllPosts();

  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/resume`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
  ];

  const blogPages = posts.map((post) => {
    const parsedDate = new Date(post.date);
    const lastModified = isNaN(parsedDate.getTime()) ? new Date() : parsedDate;
    return {
      url: `${baseUrl}/blog/${encodeURIComponent(post.slug)}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    };
  });

  return [...staticPages, ...blogPages];
}
