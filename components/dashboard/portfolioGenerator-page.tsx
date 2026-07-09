"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ExternalLink,
  Copy,
  Check,
  Share2,
  Terminal,
  Layers,
  Briefcase,
  LayoutGrid,
  Loader2,
  Monitor,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Shell & Hook Imports
import { AppShell } from "../common/app-shell";
import { useGenerateLandingPage, useLandingPage } from "@/hooks/use-app-data";
import { DeveloperPortfolio } from "./developer-portfolio";
import { ExecutivePortfolio } from "./executive-portfolio";
import { MinimalPortfolio } from "./minimal-portfolio";

// Import core types directly from your type definition hub
import { type PortfolioData } from "@/types/portfolio";

export type PortfolioTemplate = "developer" | "minimal" | "executive";

interface TemplateCard {
  id: PortfolioTemplate;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const TEMPLATE_CARDS: Array<TemplateCard> = [
  {
    id: "developer",
    title: "Developer Tech Grid",
    description:
      "Built with an interactive dark terminal theme, bento layout grids, and fine-lined modern technical elements.",
    icon: Terminal,
  },
  {
    id: "minimal",
    title: "Premium Minimalist",
    description:
      "Maximizes editorial typography systems, curated spacing architecture, and clean high-contrast layouts.",
    icon: Layers,
  },
  {
    id: "executive",
    title: "Executive Leadership",
    description:
      "Sophisticated multi-tier structures custom-tailored for technical managers, directors, and corporate leaders.",
    icon: Briefcase,
  },
];

export function PortfolioGeneratorPage() {
  const landingPage = useLandingPage();

  // Safely cast data fields using direct type assertions to fit internal component contracts
  const content = landingPage.data?.content as PortfolioData | undefined;
  const slug = landingPage.data?.slug;

  const generateMutation = useGenerateLandingPage();

  // Local state for template selection, initialized strictly and cleanly to avoid hooks loop
  const [selectedTemplate, setSelectedTemplate] =
    useState<PortfolioTemplate>("developer");
  const [copied, setCopied] = useState<boolean>(false);

  const hasPortfolioData = !!content;

  const portfolioUrl = useMemo<string>(() => {
    if (!slug || typeof window === "undefined") return "";
    return `${window.location.origin}/lp/${slug}`;
  }, [slug]);

  const handleCopy = async (): Promise<void> => {
    if (!portfolioUrl) return;
    try {
      await navigator.clipboard.writeText(portfolioUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Clipboard copy failed", err);
    }
  };

  const handlePreviewRedirect = (): void => {
    if (portfolioUrl) {
      window.open(portfolioUrl, "_blank", "noopener,noreferrer");
    }
  };

  const handleShareAction = async (): Promise<void> => {
    if (!portfolioUrl) return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Portfolio Landing Page",
          url: portfolioUrl,
        });
      } catch {
        await handleCopy();
      }
    } else {
      await handleCopy();
    }
  };

  const handleGeneratePortfolio = async (): Promise<void> => {
    try {
      const payload = { template: selectedTemplate };
      if (typeof generateMutation.mutateAsync === "function") {
        await generateMutation.mutateAsync(payload);
      } else {
        generateMutation.mutate(payload);
      }
    } catch (err) {
      console.error("Generation workflow encountered an issue:", err);
    }
  };

  return (
    <AppShell>
      <main className="min-h-screen w-full bg-zinc-950 text-zinc-100 font-sans antialiased selection:bg-zinc-800 selection:text-white overflow-hidden relative">
        <div className="max-w-400 mx-auto p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:h-[calc(100vh-4rem)] items-stretch">
          {/* LEFT INTERACTIVE TOOL PANEL */}
          <section className="lg:col-span-5 flex flex-col justify-between space-y-8 overflow-y-auto pr-0 lg:pr-2 scrollbar-none">
            <div className="space-y-8">
              <div className="space-y-2">
                <span className="text-[10px] font-mono tracking-[0.15em] text-zinc-500 uppercase font-bold block">
                  Studio Sandbox Environment
                </span>
                <h1 className="text-3xl font-bold tracking-tight text-white">
                  Portfolio Engine
                </h1>
                <p className="text-sm text-zinc-400 leading-relaxed max-w-sm">
                  Choose a layout archetype framework below to instantly render,
                  configure, and publish your brand presence page to the edge.
                </p>
              </div>

              {/* Blueprint Layout Card Picker */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 border-b border-zinc-900 pb-2">
                  <LayoutGrid className="size-3.5 text-zinc-500" /> Archetype
                  Options
                </div>

                <div className="space-y-2.5">
                  {TEMPLATE_CARDS.map((card) => {
                    const Icon = card.icon;
                    const isSelected = selectedTemplate === card.id;
                    return (
                      <button
                        key={card.id}
                        type="button"
                        onClick={() => setSelectedTemplate(card.id)}
                        className={cn(
                          "w-full text-left rounded-xl border p-4 transition-all duration-150 outline-none flex items-start gap-4",
                          isSelected
                            ? "bg-zinc-900/60 border-zinc-700 shadow-sm"
                            : "bg-zinc-900/10 border-zinc-900/60 hover:border-zinc-800 hover:bg-zinc-900/30",
                        )}
                      >
                        <div
                          className={cn(
                            "p-2 rounded-lg border transition-colors shrink-0 mt-0.5",
                            isSelected
                              ? "bg-white border-white text-zinc-950"
                              : "bg-zinc-950 border-zinc-900 text-zinc-400",
                          )}
                        >
                          <Icon className="size-4" />
                        </div>

                        <div className="flex-1 min-w-0 space-y-1">
                          <div className="flex items-center justify-between gap-4">
                            <h3
                              className={cn(
                                "text-sm font-semibold transition-colors",
                                isSelected ? "text-white" : "text-zinc-300",
                              )}
                            >
                              {card.title}
                            </h3>
                            {isSelected && (
                              <span className="text-[9px] font-mono uppercase font-bold tracking-wider text-zinc-400 bg-zinc-800 px-1.5 py-0.5 rounded border border-zinc-700">
                                Active
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                            {card.description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Persistent Control Dock */}
            <div className="pt-4 border-t border-zinc-900 bg-zinc-950/80 sticky bottom-0 backdrop-blur-md space-y-3 z-10">
              <button
                type="button"
                onClick={handleGeneratePortfolio}
                disabled={generateMutation.isPending}
                className="w-full h-11 flex items-center justify-center gap-2 bg-white text-zinc-950 font-bold text-xs uppercase tracking-wider rounded-lg transition-colors duration-100 hover:bg-zinc-200 disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.99]"
              >
                {generateMutation.isPending ? (
                  <Loader2 className="size-3.5 animate-spin" />
                ) : (
                  <Sparkles className="size-3.5 fill-current" />
                )}
                <span>
                  {generateMutation.isPending
                    ? "Compiling Structure..."
                    : hasPortfolioData
                      ? "Regenerate Changes"
                      : "Compile Portfolio Page"}
                </span>
              </button>

              {hasPortfolioData && portfolioUrl && (
                <div className="border border-zinc-900 bg-zinc-900/10 p-3 rounded-lg flex items-center justify-between gap-4">
                  <div className="min-w-0 flex-1 space-y-0.5">
                    <span className="text-[9px] font-mono uppercase font-bold tracking-wider text-zinc-500">
                      Live Edge URL
                    </span>
                    <p className="text-xs font-mono text-zinc-300 truncate select-all bg-zinc-950/40 px-2 py-0.5 rounded border border-zinc-900/40">
                      {portfolioUrl}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0 self-end">
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="p-2 rounded-md bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white transition active:scale-95"
                      title="Copy URL"
                    >
                      {copied ? (
                        <Check className="size-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="size-3.5" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={handlePreviewRedirect}
                      className="h-7.5 rounded-md bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white transition flex items-center gap-1 text-xs font-medium px-2.5 active:scale-95"
                    >
                      <ExternalLink className="size-3" /> View
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* RIGHT PREVIEW CANVAS */}
          {/* Note: Added isolation utility and absolute height boundary constraints */}
          <section className="lg:col-span-7 rounded-xl border border-zinc-900 bg-zinc-950 overflow-hidden flex flex-col h-137.5 lg:h-full relative shadow-xl transform translate-z-0 isolate">
            {/* Top Viewport Header Tab */}
            <div className="h-11 border-b border-zinc-900 bg-zinc-900/10 px-4 flex items-center justify-between shrink-0 z-20 relative">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <span className="size-1.5 rounded-full bg-zinc-800" />
                  <span className="size-1.5 rounded-full bg-zinc-800" />
                  <span className="size-1.5 rounded-full bg-zinc-800" />
                </div>
                <div className="h-3 w-px bg-zinc-800" />
                <div className="flex items-center gap-1.5 text-zinc-500">
                  <Monitor className="size-3.5" />
                  <span className="text-[10px] font-mono tracking-wider uppercase font-bold">
                    Sandbox Live Monitor
                  </span>
                </div>
              </div>

              {hasPortfolioData && (
                <button
                  type="button"
                  onClick={handleShareAction}
                  className="inline-flex items-center gap-1.5 text-xs bg-zinc-900 border border-zinc-800 hover:border-zinc-700 px-2 py-1 rounded-md text-zinc-300 font-medium transition active:scale-95"
                >
                  <Share2 className="size-3 text-zinc-400" /> Share
                </button>
              )}
            </div>

            {/* Sandbox Canvas Mount Point */}
            {/* Note: Added "relative overflow-y-auto" containment to force sub-navbar items to anchor within this viewport frame */}
            <div className="flex-1 overflow-y-auto bg-zinc-950 relative scrollbar-thin scrollbar-thumb-zinc-900 scrollbar-track-transparent z-10 containment-layout">
              <AnimatePresence mode="wait">
                {!hasPortfolioData ? (
                  <motion.div
                    key="empty-state"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center"
                  >
                    <div className="size-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-4 text-zinc-500">
                      <LayoutGrid className="size-4" />
                    </div>
                    <h3 className="text-sm font-semibold text-zinc-200">
                      Viewport Empty
                    </h3>
                    <p className="text-xs text-zinc-400 max-w-xs mt-1 mb-5 leading-relaxed">
                      Pick your layout framework card from the setup workspace
                      to initialize the runtime portfolio view.
                    </p>
                    <button
                      type="button"
                      onClick={handleGeneratePortfolio}
                      disabled={generateMutation.isPending}
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-zinc-300 text-xs font-semibold uppercase tracking-wider rounded-md transition active:scale-95 disabled:opacity-40"
                    >
                      {generateMutation.isPending ? (
                        <Loader2 className="size-3 animate-spin" />
                      ) : (
                        <Sparkles className="size-3" />
                      )}
                      Compile Framework
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key={`${selectedTemplate}-${slug || "loaded"}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="h-full w-full relative"
                  >
                    {selectedTemplate === "minimal" && content && (
                      <MinimalPortfolio data={content} />
                    )}
                    {selectedTemplate === "executive" && content && (
                      <ExecutivePortfolio data={content} />
                    )}
                    {selectedTemplate === "developer" && content && (
                      <DeveloperPortfolio data={content} />
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>
        </div>
      </main>
    </AppShell>
  );
}
