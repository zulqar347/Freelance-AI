import { auth } from "@/auth";
import { ResumeGeneratorPage } from "@/components/resume/resume-generator-page";
import { createPageMetadata } from "@/lib/seo";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = createPageMetadata({
  title: "AI Resume Builder for Freelancers and ATS Success",
  description:
    "Build ATS-friendly freelance resumes with AI that improve clarity, role targeting, and recruiter readability.",
  path: "/resume-generator",
  keywords: [
    "AI resume builder",
    "ATS resume builder",
    "freelance resume generator",
    "resume optimization",
  ],
});

export default async function ResumeGenerator() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth");
  }

  return <ResumeGeneratorPage />;
}
