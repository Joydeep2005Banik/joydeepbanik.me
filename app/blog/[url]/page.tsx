import Link from "next/link";
import { Calendar, Clock, Tag, ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import { renderMarkdown } from "@/lib/markdown";
import { getPostBySlug } from "@/lib/posts";
import ReadingProgress from "@/app/components/ReadingProgress";

export const dynamic = "force-static";

interface BlogPostProps {
  params: Promise<{ url: string }>;
}

export async function generateStaticParams() {
  try {
    const { getAllPosts } = await import("@/lib/posts");
    return getAllPosts().map((post) => ({
      url: post.slug,
    }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: BlogPostProps): Promise<Metadata> {
  const { url } = await params;
  const post = await getPostBySlug(url);

  if (!post) {
    return {
      title: "Blog Post Not Found",
    };
  }

  const baseUrl = "https://joydeepbanik.me";

  return {
    title: post.title,
    description: post.desc,
    alternates: {
      canonical: `${baseUrl}/blog/${url}`,
    },
    openGraph: {
      title: post.title,
      description: post.desc,
      type: "article",
      publishedTime: post.date,
      url: `${baseUrl}/blog/${url}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.desc,
    },
  };
}

export default async function BlogPost({ params }: BlogPostProps) {
  const { url } = await params;
  const post = getPostBySlug(url);

  if (!post) {
    return (
      <div className="py-4">
        <Link href="/" className="btn-ghost">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </Link>

        <div className="text-center py-16">
          <h1 className="text-2xl font-display font-bold text-primary mb-4">
            Post Not Found
          </h1>
          <p className="text-secondary">
            The blog post you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>
      </div>
    );
  }

  const htmlContent = await renderMarkdown(post.content);

  return (
    <div className="py-4">
      <ReadingProgress />
      <div className="mb-8">
        <Link href="/blog" className="btn-ghost">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to experiences</span>
        </Link>
      </div>

      <article className="blog-article space-y-8">
        <header className="space-y-4">
          <h1 className="text-[1.6rem] sm:text-4xl md:text-5xl font-display font-bold text-primary tracking-tight leading-tight">
            {post.title}
          </h1>
          <p className="text-xl sm:text-2xl text-secondary leading-relaxed">
            {post.desc}
          </p>

          <div
            className="flex flex-wrap items-center gap-4 text-base"
            style={{ color: "var(--text-tertiary)" }}
          >
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>{post.date}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
            </div>

            {post.tags && post.tags.length > 0 && (
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4" />
                <div className="flex gap-2">
                  {post.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-full text-sm"
                      style={{
                        backgroundColor: "var(--bg-elevated)",
                        color: "var(--text-tertiary)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </header>

        <div
          className="prose-custom leading-relaxed"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </article>
    </div>
  );
}
