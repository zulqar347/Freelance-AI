import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Freelance AI",
  description:
    "AI-powered profile, proposal, resume, and cover letter generator for freelancers who want faster client wins.",
  path: "/",
  keywords: [
    "freelance AI platform",
    "AI writing assistant for freelancers",
    "freelance client acquisition tools",
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
