import { LandingPage } from "@/components/landing/landing-page";
import { createPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = createPageMetadata({
  title:
    "Craftyn AI - AI Freelancer Toolkit for Profiles, Proposals, Resumes & Cover Letters",
  description:
    "Use Craftyn AI to create Upwork proposals, Fiverr profiles, LinkedIn profile copy, ATS resumes, and cover letters with AI tailored to your freelance niche.",
  path: "/",
  keywords: [
    "AI proposal generator",
    "Upwork proposal generator",
    "Fiverr profile generator",
    "LinkedIn profile generator",
    "AI resume builder",
    "AI cover letter generator",
    "freelance proposal writer",
    "ATS resume builder",
    "freelance profile optimization",
  ],
});

export default function Home() {
  return <LandingPage />;
}
