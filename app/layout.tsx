import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title:
    "Craftyn AI - AI Freelance Assistant for Resumes, Proposals, Portfolios & Client Growth",

  description:
    "Craftyn AI helps freelancers create AI-powered resumes, ATS-friendly CVs, professional portfolios, Fiverr gigs, Upwork proposals, cover letters, LinkedIn profiles, and client-winning content to grow their freelance career.",

  path: "/",

  keywords: [
    // Brand
    "Craftyn AI",
    "Craftyn AI platform",
    "Craftyn AI freelance assistant",
    "Craftyn AI career platform",

    // AI freelancer tools
    "AI tools for freelancers",
    "AI assistant for freelancers",
    "AI freelance assistant",
    "AI productivity tools for freelancers",
    "AI career assistant",

    // Resume / CV
    "AI resume builder",
    "AI CV generator",
    "ATS resume generator",
    "ATS friendly resume builder",
    "professional resume builder",
    "freelancer resume generator",

    // Proposal generation
    "AI proposal generator",
    "freelance proposal generator",
    "Upwork proposal generator",
    "Fiverr proposal generator",
    "client proposal writing AI",

    // Portfolio
    "AI portfolio builder",
    "freelancer portfolio generator",
    "online portfolio builder",
    "professional portfolio website",

    // Freelancing platforms
    "Upwork freelancer tools",
    "Fiverr freelancer tools",
    "freelance profile optimization",
    "freelancer profile builder",
    "LinkedIn profile optimizer",

    // Career growth
    "get freelance clients",
    "grow freelance business",
    "freelancer branding tools",
    "personal branding for freelancers",
    "career growth AI",

    // General AI writing
    "AI writing assistant",
    "AI content generator",
    "AI copywriting assistant",
    "AI document generator",
  ],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
