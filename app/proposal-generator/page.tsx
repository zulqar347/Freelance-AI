import { auth } from "@/auth";
import { WriterPage } from "@/components/proposal/writer-page";
import { createPageMetadata } from "@/lib/seo";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = createPageMetadata({
  title: "AI Proposal Generator for Upwork and Freelance Clients",
  description:
    "Create persuasive freelance proposals in seconds with AI using your profile context and the client brief.",
  path: "/proposal-generator",
  keywords: [
    "AI proposal generator",
    "Upwork proposal generator",
    "freelance proposal writer",
    "proposal writing software",
  ],
});

export default async function ProposalGenerator() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth");
  }

  return <WriterPage kind="proposal" />;
}
