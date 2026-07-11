import { Metadata } from "next";
import { PortfolioGeneratorPage } from "@/components/dashboard/portfolioGenerator-page";

export const metadata: Metadata = {
  title: "Portfolio Generator | Craftyn AI",
  description:
    "View and manage your portfolios with Craftyn AI. Create professional portfolios optimized for your freelancing and career growth.",
  keywords: [
    "portfolio generator",
    "AI portfolio builder",
    "freelancer portfolio",
    "developer portfolio",
    "professional portfolio",
  ],
  robots: {
    index: false,
    follow: true,
  },
};

export default function History() {
  return <PortfolioGeneratorPage />;
}
