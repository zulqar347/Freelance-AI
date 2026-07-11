import { blogPosts } from "@/lib/blog-content";
import { createPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = createPageMetadata({
  title: "Craftyn AI Blog for Better Client Outreach",
  description:
    "Read practical freelance growth tips, proposal writing advice, and profile optimization guidance powered by Craftyn AI.",
  path: "/blog",
  keywords: [
    "freelance blog",
    "proposal writing tips",
    "freelance profile tips",
  ],
});

export default function BlogPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How freelancers can improve proposals and profiles with AI",
    description:
      "A practical guide for freelancers using AI to improve proposals, profiles, resumes, and cover letters.",
    author: {
      "@type": "Organization",
      name: "Craftyn AI",
    },
    publisher: {
      "@type": "Organization",
      name: "Craftyn AI",
      logo: {
        "@type": "ImageObject",
        url: "https://freelanceai.app/og-image.svg",
      },
    },
    url: "https://freelanceai.app/blog",
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col px-6 py-16 text-zinc-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className="mb-8">
        <p className="text-sm font-medium uppercase tracking-[0.25em] text-cyan-300">
          Craftyn AI blog
        </p>
        <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">
          Practical advice for freelancers who want better client results
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-zinc-400">
          Learn how AI can support proposal writing, profile positioning, resume
          optimization, and cover letter creation for stronger freelance
          outreach.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {blogPosts.map((post) => (
          <article
            key={post.slug}
            className="rounded-2xl border border-white/10 bg-white/5 p-6"
          >
            <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">
              {post.category}
            </p>
            <h2 className="mt-2 text-xl font-semibold text-white">
              {post.title}
            </h2>
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              {post.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {post.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-zinc-400"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
