import type { Metadata } from "next";

export const siteConfig = {
  name: "Freelance AI",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://freelanceai.app",
  description:
    "AI-powered profile, resume, proposal, and cover letter generation for freelancers.",
};

export const defaultKeywords = [
  "AI proposal generator",
  "Upwork proposal generator",
  "Fiverr profile generator",
  "LinkedIn profile generator",
  "AI resume builder",
  "AI cover letter generator",
  "freelance AI",
  "AI for freelancers",
  "resume optimization",
  "freelance tools",
  "ATS resume builder",
  "proposal writing software",
  "freelance profile optimization",
  "client pitch generator",
  "AI job application tool",
  "freelance portfolio copy",
  "cover letter builder",
  "AI freelancer toolkit",
  "freelance client outreach AI",
  "AI profile generator",
];

export function createPageMetadata({
  title,
  description,
  path = "/",
  keywords = [],
  image = "/og-image.svg",
}: {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  image?: string;
}): Metadata {
  const resolvedTitle = title.includes(siteConfig.name)
    ? title
    : `${title} | ${siteConfig.name}`;
  const canonical = `${siteConfig.url}${path}`;

  return {
    metadataBase: new URL(siteConfig.url),
    title: resolvedTitle,
    description,
    keywords: [...defaultKeywords, ...keywords],
    alternates: {
      canonical,
    },
    openGraph: {
      title: resolvedTitle,
      description,
      url: canonical,
      siteName: siteConfig.name,
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: resolvedTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
