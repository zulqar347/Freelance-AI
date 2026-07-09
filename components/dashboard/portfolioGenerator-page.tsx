"use client";

import React, { useState, useMemo, useEffect } from "react";
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
} from "lucide-react";
import { cn } from "@/lib/utils";

// Shell & Hook Imports
import { AppShell } from "../common/app-shell";
import { useGenerateLandingPage, useLandingPage } from "@/hooks/use-app-data";
import { DeveloperPortfolio } from "./developer-portfolio";
import { ExecutivePortfolio } from "./executive-portfolio";
import { MinimalPortfolio } from "./minimal-portfolio";

export type PortfolioTemplate = "developer" | "minimal" | "executive";

const TEMPLATE_CARDS: Array<{
  id: PortfolioTemplate;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}> = [
  {
    id: "developer",
    title: "Developer",
    description:
      "Modern dark mode layout built with an interactive grid design and high-tech aesthetics.",
    icon: Terminal,
  },
  {
    id: "minimal",
    title: "Minimal",
    description:
      "Premium minimal typography maximizing elegant spacing and simple crisp structures.",
    icon: Layers,
  },
  {
    id: "executive",
    title: "Executive",
    description:
      "Sophisticated corporate layout optimized for experienced engineering leaders and managers.",
    icon: Briefcase,
  },
];

export function PortfolioGeneratorPage() {
  // Data fetching hooks
  const landingPage = useLandingPage();
  const content = landingPage.data?.content;
  const slug = landingPage.data?.slug;
  const backendTemplate = landingPage.data?.content.template as
    | PortfolioTemplate
    | undefined;

  const generateMutation = useGenerateLandingPage();

  // Keep local state for what template the user wants to generate next
  const [selectedTemplate, setSelectedTemplate] =
    useState<PortfolioTemplate>("developer");
  const [copied, setCopied] = useState(false);

  // Sync state with backend template settings whenever data updates
  useEffect(() => {
    if (backendTemplate) {
      setSelectedTemplate(backendTemplate);
    }
  }, [backendTemplate]);

  // Boolean helper to confirm data structure exists cleanly
  const hasPortfolioData = !!content;

  // Compute live URL on client side runtime environment dynamically
  const portfolioUrl = useMemo(() => {
    if (!slug || typeof window === "undefined") return "";
    return `${window.location.origin}/lp/${slug}`;
  }, [slug]);

  const handleCopy = async () => {
    if (!portfolioUrl) return;
    try {
      await navigator.clipboard.writeText(portfolioUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Clipboard copy failed", err);
    }
  };

  const handlePreviewRedirect = () => {
    if (portfolioUrl) {
      window.open(portfolioUrl, "_blank", "noopener,noreferrer");
    }
  };

  const handleShareAction = async () => {
    if (!portfolioUrl) return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Portfolio Landing Page",
          url: portfolioUrl,
        });
      } catch {
        handleCopy();
      }
    } else {
      handleCopy();
    }
  };

  const handleGeneratePortfolio = async () => {
    try {
      // Send the currently selected template option to your mutation hook payload
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
      <main className="min-h-screen w-full bg-zinc-950 text-zinc-50 font-sans antialiased selection:bg-white/10 selection:text-white overflow-x-hidden">
        {/* Ambient background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/50 via-zinc-950 to-zinc-950 pointer-events-none -z-10" />

        <div className="max-w-[1700px] mx-auto p-4 md:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:h-[calc(100vh-4rem)]">
          {/* LEFT PANEL CONTROLS */}
          <section className="lg:col-span-5 flex flex-col justify-between space-y-6 overflow-y-auto pr-0 lg:pr-4 scrollbar-thin">
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-400">
                  Portfolio Generator
                </h1>
                <p className="text-sm text-zinc-400 mt-1.5">
                  Generate and deploy a highly curated, premium portfolio
                  platform instantly.
                </p>
              </div>

              {/* Template Selectors */}
              <div className="space-y-3">
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 flex items-center gap-2">
                  <LayoutGrid className="size-3.5" /> Choose Template
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {TEMPLATE_CARDS.map((card) => {
                    const Icon = card.icon;
                    const isSelected = selectedTemplate === card.id;
                    return (
                      <button
                        key={card.id}
                        type="button"
                        onClick={() => setSelectedTemplate(card.id)}
                        className={cn(
                          "group relative w-full text-left rounded-2xl border p-4 transition-all duration-300 backdrop-blur-md outline-none",
                          isSelected
                            ? "bg-zinc-900/80 border-zinc-700 shadow-[0_0_30px_-5px_rgba(255,255,255,0.05)]"
                            : "bg-zinc-900/20 border-zinc-900 hover:border-zinc-800 hover:bg-zinc-900/40",
                        )}
                      >
                        {isSelected && (
                          <motion.div
                            layoutId="activeGlow"
                            className="absolute -inset-px rounded-2xl bg-white opacity-[0.02] blur-sm pointer-events-none -z-10"
                          />
                        )}
                        <div className="flex items-start gap-4">
                          <div
                            className={cn(
                              "p-2.5 rounded-xl border transition-colors",
                              isSelected
                                ? "bg-zinc-800 border-zinc-700 text-white"
                                : "bg-zinc-950 border-zinc-900 text-zinc-500 group-hover:text-zinc-400",
                            )}
                          >
                            <Icon className="size-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h3
                                className={cn(
                                  "text-sm font-medium transition-colors",
                                  isSelected ? "text-white" : "text-zinc-300",
                                )}
                              >
                                {card.title}
                              </h3>
                              {isSelected && (
                                <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded-md">
                                  Selected
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                              {card.description}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bottom Actions Toolbar */}
            <div className="pt-6 border-t border-zinc-900 bg-zinc-950/80 sticky bottom-0 backdrop-blur-xl space-y-4">
              <button
                type="button"
                onClick={handleGeneratePortfolio}
                disabled={generateMutation.isPending}
                className="w-full relative group h-12 flex items-center justify-center gap-2 bg-zinc-50 text-zinc-950 font-medium rounded-xl transition-all duration-300 hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden shadow-[0_4px_20px_rgba(255,255,255,0.1)]"
              >
                <Sparkles className="size-4 text-zinc-950" />
                <span>
                  {generateMutation.isPending
                    ? "Generating..."
                    : hasPortfolioData
                      ? "Regenerate Portfolio"
                      : "Generate Portfolio"}
                </span>
              </button>

              {hasPortfolioData && portfolioUrl && (
                <div className="border border-zinc-900 bg-zinc-900/30 backdrop-blur-xl p-4 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs font-mono text-zinc-400 truncate select-all">
                      {portfolioUrl}
                    </span>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={handleCopy}
                        className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white transition"
                        title="Copy Link"
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
                        className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white transition flex items-center gap-1.5 text-xs font-medium px-3"
                      >
                        <ExternalLink className="size-3.5" /> Preview
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* RIGHT PREVIEW WORKSPACE */}
          <section className="lg:col-span-7 rounded-2xl border border-zinc-900 bg-zinc-900/10 backdrop-blur-sm overflow-hidden flex flex-col h-[600px] lg:h-full relative shadow-[inner_0_1px_0_rgba(255,255,255,0.05)]">
            <div className="h-12 border-b border-zinc-900 bg-zinc-950/80 px-4 flex items-center justify-between shrink-0 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="size-2.5 rounded-full bg-zinc-800" />
                  <span className="size-2.5 rounded-full bg-zinc-800" />
                  <span className="size-2.5 rounded-full bg-zinc-800" />
                </div>
                <span className="text-[11px] font-mono tracking-wider text-zinc-500 uppercase ml-2">
                  Live Preview Workspace
                </span>
              </div>
              {hasPortfolioData && (
                <button
                  type="button"
                  onClick={handleShareAction}
                  className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white font-medium transition"
                >
                  <Share2 className="size-3.5" /> Share Portfolio
                </button>
              )}
            </div>

            {/* Viewport Frame Rendering */}
            <div className="flex-1 overflow-y-auto bg-zinc-950/40 relative">
              <AnimatePresence mode="wait">
                {!hasPortfolioData ? (
                  /* EMPTY STATE OVERLAY */
                  <motion.div
                    key="empty-state"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center"
                  >
                    <div className="size-16 rounded-2xl bg-zinc-900/50 border border-zinc-800 flex items-center justify-center mb-4 text-zinc-400">
                      <LayoutGrid className="size-8" />
                    </div>
                    <h3 className="text-lg font-medium text-white">
                      No portfolio generated yet
                    </h3>
                    <p className="text-sm text-zinc-400 max-w-sm mt-1.5 mb-6">
                      Choose a template style and click the button to generate
                      your customized portfolio landing page instantly.
                    </p>
                    <button
                      type="button"
                      onClick={handleGeneratePortfolio}
                      disabled={generateMutation.isPending}
                      className="inline-flex items-center gap-2 px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white text-sm font-medium rounded-xl transition"
                    >
                      <Sparkles className="size-4" />
                      Generate Portfolio
                    </button>
                  </motion.div>
                ) : (
                  /* LIVE ROUTED LIVE PREVIEW COMPONENT */
                  <motion.div
                    key={`${selectedTemplate}-${slug || "loaded"}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full w-full"
                  >
                    {/* The preview workspace renders based on the verified selection state */}
                    {selectedTemplate === "minimal" && (
                      <MinimalPortfolio data={content} />
                    )}
                    {selectedTemplate === "executive" && (
                      <ExecutivePortfolio data={content} />
                    )}
                    {selectedTemplate === "developer" && (
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
