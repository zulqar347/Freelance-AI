import { auth } from "@/auth";
import { ProfileGeneratorPage } from "@/components/profile/profile-generator-page";
import { createPageMetadata } from "@/lib/seo";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = createPageMetadata({
  title: "AI Profile Generator for Upwork, Fiverr & LinkedIn",
  description:
    "Generate polished Upwork, Fiverr, and LinkedIn freelance profiles with AI to improve visibility and attract better clients.",
  path: "/profile-generator",
  keywords: [
    "AI profile generator",
    "freelance profile generator",
    "LinkedIn profile generator",
    "Upwork profile generator",
    "Fiverr profile generator",
  ],
});

export default async function ProfileGenerator() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth");
  }

  return <ProfileGeneratorPage />;
}
