"use client";

import { AppShell } from "@/components/common/app-shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "../ui/field";
import { useGenerateProfile, useGeneratedProfiles } from "@/hooks/use-app-data";
import { cn } from "@/lib/utils";
import type { Generation } from "@/types/frontend";
import { FileText, Sparkles, Download, LayoutGrid, Target } from "lucide-react";
import React, { useMemo, useState } from "react";
import { ModernAtsResume, ResumeData, ThemeColor } from "./resume1";
import { ExecutiveSidebarResume } from "./resume2";
import { LuxuryATSResume } from "./resume3";

type LayoutType = "ats" | "sidebar" | "editorial";

// --- Configuration Constants ---
const themePresets: Array<{ id: ThemeColor; label: string; class: string }> = [
  { id: "indigo", label: "Classic Indigo", class: "bg-indigo-600" },
  { id: "emerald", label: "Mint Emerald", class: "bg-emerald-600" },
  { id: "blue", label: "Corporate Blue", class: "bg-blue-600" },
  { id: "amber", label: "Creative Amber", class: "bg-amber-600" },
  { id: "slate", label: "Minimal Slate", class: "bg-slate-800" },
];

const layoutPresets: Array<{ id: LayoutType; label: string }> = [
  { id: "ats", label: "ATS Standard" },
  { id: "sidebar", label: "Executive Sidebar" },
  { id: "editorial", label: "Minimalist Editorial" },
];

const mockResumeData: ResumeData = {
  fullName: "Jonathan Wright",
  title: "Senior Full-Stack Engineer",
  email: "jonathan.wright@email.com",
  phone: "+1 (555) 234-5678",
  location: "Austin, TX",
  summary:
    "Results-driven Software Engineer with over 5 years of experience designing, building, and scaling robust full-stack web applications.",
  skills: {
    categories: [
      { name: "Languages", items: ["TypeScript", "JavaScript", "SQL"] },
    ],
  },
  experience: [
    {
      id: "exp-1",
      role: "Senior Full-Stack Developer",
      company: "Apex Tech Solutions",
      location: "Austin, TX",
      period: "Jan 2024 — Present",
      highlights: [
        "Architected and deployed a multi-tenant SaaS onboarding platform using Next.js and PostgreSQL.",
      ],
    },
  ],
  projects: [
    {
      id: "proj-1",
      title: "LaunchLane AI Platform",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB"],
      description:
        "An AI-powered freelancer optimization tool that generates automated business roadmaps and dynamically generated bios based on variable target niches.",
      link: "https://github.com/jwright-demo/launchlane",
    },
    {
      id: "proj-2",
      title: "Automated Data Scraper Engine",
      technologies: ["Node.js", "Playwright", "PostgreSQL"],
      description:
        "A headless browser automation system built to extract, clean, and map target business information alongside official website metadata, handling pagination and rate-limits gracefully.",
    },
  ],
  education: [
    {
      id: "edu-1",
      degree: "Bachelor of Science in Computer Science",
      school: "State University of Technology",
      location: "Dallas, TX",
      period: "Sep 2017 — May 2021",
      details:
        "Graduated with Honors. Focus on Software Engineering and Computational Systems.",
    },
  ],
};

// Minimum characters before we treat pasted text as a "real" job description
const MIN_JD_LENGTH = 40;

export function ResumeGeneratorPage() {
  const [selectedLayout, setSelectedLayout] = useState<LayoutType>("ats");
  const [selectedTheme, setSelectedTheme] = useState<ThemeColor>("indigo");
  const [current, setCurrent] = useState<Generation | null>(null);
  const [jobDescription, setJobDescription] = useState("");

  const generate = useGenerateProfile();
  const history = useGeneratedProfiles();

  const selectedHistory = useMemo(
    () => history.data?.filter((item) => item.platform === "resume") ?? [],
    [history.data],
  );

  const isTailored = jobDescription.trim().length >= MIN_JD_LENGTH;

  // The generation to display
  const generationToDisplay = useMemo(() => {
    if (current) return current;

    if (selectedHistory.length > 0) {
      return selectedHistory[0];
    }

    return null;
  }, [current, selectedHistory]);

  const activeResumeData = useMemo<ResumeData>(() => {
    // No generated resume and no history
    if (!generationToDisplay) {
      return mockResumeData;
    }

    try {
      return typeof generationToDisplay.content === "string"
        ? (JSON.parse(generationToDisplay.content) as ResumeData)
        : generationToDisplay.content;
    } catch (error) {
      if (error instanceof Error) {
        console.error("Failed to parse resume:", error.message);
      }
      return mockResumeData;
    }
  }, [generationToDisplay]);

  const renderActiveTemplate = () => {
    if (!activeResumeData) return null;

    switch (selectedLayout) {
      case "sidebar":
        return (
          <ExecutiveSidebarResume
            data={activeResumeData}
            colorTheme={selectedTheme}
          />
        );
      case "editorial":
        return (
          <LuxuryATSResume data={activeResumeData} colorTheme={selectedTheme} />
        );
      default:
        return (
          <ModernAtsResume data={activeResumeData} colorTheme={selectedTheme} />
        );
    }
  };

  const handleGenerate = async () => {
    try {
      const newData = await generate.mutateAsync({
        platform: "resume",
        jobDescription: isTailored ? jobDescription.trim() : undefined,
      });

      setCurrent(newData);
    } catch (err) {
      if (err instanceof Error) {
        console.error("Generation failed:", err.message);
      }
    }
  };

  return (
    <AppShell>
      {/* Global CSS style injected cleanly using standard React props to avoid build errors */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @media print {
            body,
            html {
              background: white !important;
              color: #1e293b !important;
              padding: 0 !important;
              margin: 0 !important;
            }
            /* Ensure backgrounds (like the sidebar color layout) actually display when saving or printing */
            * {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
          }
        `,
        }}
      />

      {/* Grid container handles screen layouts fluidly, while print rules switch items off cleanly */}
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] print:block print:w-full">
        {/* LEFT COLUMN: Controls & Context (Hidden entirely on system print action) */}
        <div className="space-y-6 print:hidden">
          <div>
            <p className="text-sm text-cyan-300">Resume Builder Engine</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              Engineered to beat tracking systems.
            </h1>
          </div>

          {/* Job Description Targeting Box */}
          <Card className="p-5 border-white/10 bg-white/5">
            <h3 className="text-sm font-medium text-white flex items-center gap-2">
              <Target className="size-4 text-cyan-300" />
              Target Job Description
            </h3>
            <p className="mt-1 text-xs text-zinc-400">
              Paste a job posting and the generated resume will be tailored to
              match its keywords, skills, and priorities. Leave blank to
              generate a general-purpose resume.
            </p>
            <Textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here..."
              className="mt-4 min-h-40 resize-y border-white/10 bg-black/20 text-sm text-zinc-200 placeholder:text-zinc-500 focus-visible:ring-cyan-300/50"
            />
            <div className="mt-3 flex items-center justify-between text-xs">
              <span
                className={cn(
                  "font-medium",
                  isTailored ? "text-cyan-300" : "text-zinc-500",
                )}
              >
                {isTailored
                  ? "Tailoring enabled for this generation"
                  : "No job description added yet"}
              </span>
              {jobDescription.length > 0 && (
                <button
                  onClick={() => setJobDescription("")}
                  className="text-zinc-500 hover:text-zinc-300 transition"
                >
                  Clear
                </button>
              )}
            </div>
          </Card>

          {/* Layout Configuration Box */}
          <Card className="p-5 border-white/10 bg-white/5">
            <h3 className="text-sm font-medium text-white flex items-center gap-2">
              <LayoutGrid className="size-4 text-cyan-300" />
              Structural Layout Structure
            </h3>
            <div className="flex flex-col gap-2 mt-4">
              {layoutPresets.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => setSelectedLayout(preset.id)}
                  className={cn(
                    "w-full rounded-xl border p-3 text-left text-xs transition focus:outline-none",
                    selectedLayout === preset.id
                      ? "border-cyan-300/50 bg-cyan-300/10 text-white"
                      : "border-white/5 bg-black/20 text-zinc-400 hover:bg-white/5",
                  )}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </Card>

          {/* Theme Color Selector Box */}
          <Card className="p-5 border-white/10 bg-white/5">
            <h3 className="text-sm font-medium text-white">
              Accent Theme Style
            </h3>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 mt-4">
              {themePresets.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => setSelectedTheme(theme.id)}
                  className={cn(
                    "flex items-center gap-2 rounded-xl border p-2.5 text-left text-xs transition focus:outline-none",
                    selectedTheme === theme.id
                      ? "border-cyan-300/50 bg-cyan-300/10 text-white"
                      : "border-white/5 bg-black/20 text-zinc-400 hover:bg-white/5",
                  )}
                >
                  <span
                    className={cn(
                      "size-3.5 rounded-full shrink-0 shadow-sm",
                      theme.class,
                    )}
                  />
                  <span className="truncate">{theme.label}</span>
                </button>
              ))}
            </div>
          </Card>

          <Button
            onClick={handleGenerate}
            disabled={generate.isPending}
            className="w-full"
          >
            <Sparkles className="size-4" />
            {generate.isPending
              ? "Parsing Context..."
              : isTailored
                ? "Generate Tailored Resume"
                : "Generate Custom Resume"}
          </Button>
        </div>

        {/* RIGHT COLUMN: Live Render Canvas Area */}
        <div className="relative flex flex-col min-h-150 rounded-2xl border border-white/10 bg-zinc-900/40 backdrop-blur-md overflow-hidden print:border-none print:bg-white print:p-0 print:m-0">
          {/* Workspace Floating Ribbon Bar (Hidden cleanly on system print) */}
          <div className="z-10 flex items-center justify-between border-b border-white/10 bg-zinc-950/80 px-4 py-3 backdrop-blur-sm print:hidden">
            <span className="text-xs font-medium uppercase tracking-wider text-zinc-400">
              Live Preview Workspace
              {isTailored && (
                <span className="ml-2 rounded-full bg-cyan-300/10 px-2 py-0.5 text-[10px] normal-case tracking-normal text-cyan-300">
                  Tailored
                </span>
              )}
            </span>
            {activeResumeData && (
              <Button
                onClick={() => {
                  window.print();
                }}
                className="h-8 bg-cyan-400 text-zinc-950 hover:bg-cyan-300 gap-1.5 font-medium shadow-lg"
              >
                <Download className="size-3.5" />
                Export PDF
              </Button>
            )}
          </div>

          {/* Core Viewer Area */}
          <div
            id={"pdf-content"}
            className="flex-1 overflow-y-auto p-4 md:p-6 bg-zinc-950/20 print:p-0 print:bg-white"
          >
            {activeResumeData ? (
              <div className="rounded-lg shadow-2xl shadow-black/80 overflow-hidden bg-white print:shadow-none print:rounded-none">
                {renderActiveTemplate()}
              </div>
            ) : (
              <div className="flex h-full flex-col items-center justify-center text-center p-8 mt-20 print:hidden">
                <FileText className="size-8 text-zinc-500 animate-pulse" />
                <h3 className="text-sm font-semibold text-white mt-4">
                  No Document Active
                </h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
