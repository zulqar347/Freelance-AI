import { BillingPage } from "@/components/billing/billing-page";
import { createPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = createPageMetadata({
  title: "Craftyn AI Pricing and Plans",
  description:
    "Explore Craftyn AI pricing for freelancers who want AI-powered proposals, profiles, resumes, and cover letters.",
  path: "/billing",
  keywords: [
    "Craftyn AI pricing",
    "AI freelancer toolkit pricing",
    "proposal generator pricing",
  ],
});

export default function Billing() {
  return <BillingPage />;
}
