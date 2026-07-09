"use client";

import React from "react";
import { useLandingPage } from "@/hooks/use-app-data";
import { PortfolioData, PortfolioTemplate } from "@/types/portfolio";
import { MinimalPortfolio } from "@/components/dashboard/minimal-portfolio";
import { ExecutivePortfolio } from "@/components/dashboard/executive-portfolio";
import { DeveloperPortfolio } from "@/components/dashboard/developer-portfolio";

// High fidelity UI components matching your generator workspace

interface ClientProps {
  slug: string;
  initialContent: PortfolioData;
  initialTemplate: PortfolioTemplate;
}

function isPortfolioData(content: unknown): content is PortfolioData {
  if (!content || typeof content !== "object") {
    return false;
  }

  const data = content as Partial<PortfolioData>;

  return !!data.hero && !!data.about && !!data.contact && !!data.seo;
}

export function PublicPortfolioClient({
  initialContent,
  initialTemplate,
}: ClientProps) {
  // Pull fresh state from hook cache if available
  const { data } = useLandingPage();
  console.log(data);

  // If your client hook holds data for this page, read from it.
  // Otherwise, fallback flawlessly to the server-hydrated content.
  const activeContent = isPortfolioData(data?.content)
    ? data.content
    : initialContent;
  const activeTemplate = data?.content.template || initialTemplate;

  return (
    <div className="min-h-screen bg-zinc-950 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#27272a05_1px,transparent_1px),linear-gradient(to_bottom,#27272a05_1px,transparent_1px)] bg-position-[2rem_2rem]" />
      <main>
        {activeTemplate === "minimal" && (
          <MinimalPortfolio data={activeContent} />
        )}
        {activeTemplate === "executive" && (
          <ExecutivePortfolio data={activeContent} />
        )}
        {activeTemplate === "developer" && (
          <DeveloperPortfolio data={activeContent} />
        )}
      </main>
      <footer className="py-12 border-t border-zinc-900/60 text-center text-[10px] font-mono text-zinc-600">
        Powered by Identity Engines // Secure Entry Node
      </footer>
    </div>
  );
}
