import React from "react";
import { Metadata } from "next";
import ConnectDB from "@/lib/db";
import LandingPage from "@/lib/models/PortfolioPage";
import { PortfolioData, PortfolioTemplate } from "@/types/portfolio";
import { PublicPortfolioClient } from "./public-portfolio-client";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  await ConnectDB();
  const pageRecord = (await LandingPage.findOne({ slug }).lean()) as {
    slug: string;
    template: PortfolioTemplate;
    content: PortfolioData;
  } | null;

  const title =
    pageRecord?.content?.seo?.title ||
    `${slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ")} | Portfolio`;
  const description =
    pageRecord?.content?.seo?.description ||
    "View my professional qualifications and dynamic project registry assets.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "profile",
    },
  };
}

export default async function PublicPortfolioPage({ params }: Props) {
  const { slug } = await params;
  await ConnectDB();

  // Explicitly casting the database response inline without needing an external DBRecord type
  const initialData = (await LandingPage.findOne({ slug }).lean()) as {
    slug: string;
    template: PortfolioTemplate;
    content: PortfolioData;
  } | null;

  if (!initialData || !initialData.content) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-center p-6">
        <div className="max-w-sm border border-zinc-900 bg-zinc-900/20 p-6 rounded-xl font-mono text-xs text-zinc-500">
          <p className="text-rose-400 font-bold mb-1">
            [404] Profile Not Distributed
          </p>
          <p>
            The directory pointer for &quot;{slug}&quot; is offline or has not
            been compiled yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <PublicPortfolioClient
      slug={slug}
      initialContent={initialData.content}
      initialTemplate={initialData.template}
    />
  );
}
