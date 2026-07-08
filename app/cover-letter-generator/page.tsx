import { auth } from "@/auth";
import { WriterPage } from "@/components/proposal/writer-page";
import { createPageMetadata } from "@/lib/seo";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = createPageMetadata({
  title: "AI Cover Letter Generator for Freelancers",
  description:
    "Generate tailored cover letters for freelance applications and client pitches with AI in minutes.",
  path: "/cover-letter-generator",
  keywords: [
    "AI cover letter generator",
    "cover letter builder",
    "freelance cover letter writer",
    "AI job application tool",
  ],
});

export default async function CoverLetterGenerator() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth");
  }

  return <WriterPage kind="cover-letter" />;
}
