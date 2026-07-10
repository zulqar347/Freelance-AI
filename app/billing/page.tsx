import { BillingPage } from "@/components/billing/billing-page";
import { createPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = createPageMetadata({
  title: "Rah AI Pricing and Plans",
  description:
    "Explore Rah AI pricing for freelancers who want AI-powered proposals, profiles, resumes, and cover letters.",
  path: "/billing",
  keywords: [
    "Rah AI pricing",
    "AI freelancer toolkit pricing",
    "proposal generator pricing",
  ],
});

export default function Billing() {
  return <BillingPage />;
}
