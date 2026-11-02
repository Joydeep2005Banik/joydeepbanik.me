import type { Metadata } from "next";
import { Suspense } from "react";
import { getAllPosts } from "@/lib/posts";
import BlogContent from "./BlogContent";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Blog",
  description: "Articles about software engineering, web performance, and developer tooling by Joydeep Banik.",
  alternates: {
    canonical: "https://joydeepbanik.me/blog",
  },
  openGraph: {
    title: "Blog | Joydeep Banik",
    description: "Articles about software engineering, web performance, and developer tooling by Joydeep Banik.",
    url: "https://joydeepbanik.me/blog",
  },
  twitter: {
    title: "Blog | Joydeep Banik",
    description: "Articles about software engineering, web performance, and developer tooling by Joydeep Banik.",
  },
};

export default function Blog() {
  const posts = getAllPosts();
  return (
    <Suspense fallback={null}>
      <BlogContent posts={posts} />
    </Suspense>
  );
}
