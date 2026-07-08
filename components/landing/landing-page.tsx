"use client";

import { SectionHeading } from "@/components/common/section-heading";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Layers3,
  Sparkles,
  Wand2,
  Briefcase,
  Globe,
  FileText,
  Send,
  Eye,
} from "lucide-react";
import Link from "next/link";
import { PLANS } from "@/lib/payments/plans";
import { SignInOut } from "../signin-outButton";

const features = [
  [
    "Profile intelligence",
    "Turn your freelance positioning into platform-ready professional identities.",
  ],
  [
    "Proposal drafting",
    "Generate sharp, client-specific proposals structured directly from project criteria.",
  ],
  [
    "Cover letters",
    "Create polished application letters native to your core strengths and technical narrative.",
  ],
  [
    "Live portfolios",
    "Turn your profile data into a public, discoverable digital node with a single click.",
  ],
];

const faqs = [
  [
    "How does this differ from typical isolated document tools?",
    "Traditional tools generate disconnected files that drift out of sync immediately. This platform creates a primary career model that maps data into live web architectures alongside matching documents, keeping everything current simultaneously.",
  ],
  [
    "Can I configure variations for different niches?",
    "Yes. The interface supports multiple workflow states, allowing you to prioritize specific skills or projects depending on whether you are pitching an enterprise client or applying to an internal team.",
  ],
  [
    "Is billing fully connected?",
    "The pricing architecture is dynamic and ready; backend payment logic is intentionally isolated within staging layers.",
  ],
];

export function LandingPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Freelance AI",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "Turn your professional experience into a unified, discoverable career identity platform featuring portfolios, resumes, and client proposals.",
    url: "https://freelanceai.app",
    offers: {
      "@type": "Offer",
      price: PLANS.FREE.price.toString(),
      priceCurrency: "USD",
    },
  };

  return (
    <div className="min-h-screen overflow-hidden bg-zinc-950 text-zinc-50 antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Ambient Radial Mesh Background */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-0 left-1/2 h-[600px] w-[1000px] -translate-x-1/2 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.08),transparent_60%)]" />
        <div className="absolute top-[40%] right-10 h-[400px] w-[400px] bg-[radial-gradient(circle,rgba(34,211,238,0.03),transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <header className="sticky top-0 z-50 border-b border-zinc-800/60 bg-zinc-950/80 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-3 transition-opacity hover:opacity-90"
          >
            <span className="grid size-9 place-items-center rounded-xl bg-zinc-50 text-zinc-950 shadow-sm">
              <Sparkles className="size-4.5" />
            </span>
            <span className="font-semibold tracking-tight text-zinc-100">
              Freelance AI
            </span>
          </Link>
          <div className="hidden items-center gap-8 text-sm font-medium text-zinc-400 md:flex">
            <a
              href="#features"
              className="transition-colors hover:text-zinc-100"
            >
              Platform
            </a>
            <a
              href="#portfolio"
              className="transition-colors hover:text-zinc-100"
            >
              The Live Link
            </a>
            <a
              href="#pricing"
              className="transition-colors hover:text-zinc-100"
            >
              Pricing
            </a>
            <Link
              href="/profile-generator"
              className="transition-colors hover:text-zinc-100"
            >
              Profiles
            </Link>
            <Link
              href="/proposal-generator"
              className="transition-colors hover:text-zinc-100"
            >
              Proposals
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <SignInOut />
          </div>
        </nav>
      </header>

      <main className="relative z-10">
        {/* HERO SECTION */}
        <section className="mx-auto grid min-h-[calc(100vh-76px)] max-w-7xl items-center gap-16 px-4 py-12 sm:px-6 lg:grid-cols-12 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8 lg:col-span-7"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-3 py-1.5 text-xs font-medium text-cyan-400">
              <Wand2 className="size-3.5" />
              The Next Evolution of Career Management
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl lg:text-6xl lg:leading-[1.12]">
                Turn your experience into a professional{" "}
                <span className="bg-gradient-to-r inline-block from-cyan-400 via-emerald-400 to-cyan-500 bg-clip-text text-transparent">
                  online presence
                </span>{" "}
                that recruiters and clients discover.
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
                Stop creating single-use documents. Build a cohesive career
                profile that instantly generates context-aware portfolios,
                matching ATS applications, and tailored pitches from one source.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/dashboard" className="w-full sm:w-auto">
                <Button className="w-full bg-zinc-50 px-6 py-5 text-zinc-950 hover:bg-zinc-200 sm:w-auto">
                  Create your career profile{" "}
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </Link>
              <a href="#portfolio" className="w-full sm:w-auto">
                <Button className="w-full border-zinc-800 bg-zinc-900/50 px-6 py-5 text-zinc-300 hover:bg-zinc-800 sm:w-auto">
                  See example portfolio
                </Button>
              </a>
            </div>

            <div className="border-t border-zinc-900 pt-6">
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-medium text-zinc-500">
                <span className="text-zinc-400">Ecosystem Routing:</span>
                <Link
                  href="/profile-generator"
                  className="hover:text-cyan-400 transition-colors"
                >
                  Identity Studio
                </Link>
                <Link
                  href="/resume-generator"
                  className="hover:text-cyan-400 transition-colors"
                >
                  Resume Engine
                </Link>
                <Link
                  href="/proposal-generator"
                  className="hover:text-cyan-400 transition-colors"
                >
                  Proposal Workspace
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Premium UI Mockup Elements */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.12, duration: 0.5 }}
            className="relative lg:col-span-5"
          >
            <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/10 p-4 shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-sm">
              <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 shadow-xl">
                <div className="mb-4 flex items-center justify-between border-b border-zinc-900 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-mono text-zinc-500">
                      freelanceai.app/live-node
                    </span>
                  </div>
                  <span className="rounded bg-zinc-900 px-1.5 py-0.5 text-[10px] font-medium text-zinc-400">
                    Public Link
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="size-9 rounded-full bg-gradient-to-tr from-cyan-500 to-emerald-400" />
                    <div>
                      <div className="h-3 w-24 rounded bg-zinc-800 mb-1" />
                      <div className="h-2 w-32 rounded bg-zinc-900" />
                    </div>
                  </div>

                  {/* Stakeholder Telemetry Overlay */}
                  <div className="rounded-lg border border-cyan-500/20 bg-cyan-500/5 p-3">
                    <div className="flex items-center gap-1.5 text-[11px] font-medium text-cyan-400 mb-1">
                      <Eye className="size-3.5" /> Recruiter Viewing Node
                    </div>
                    <div className="h-2 w-full rounded bg-zinc-900/60 mb-1" />
                    <div className="h-2 w-4/5 rounded bg-zinc-900/60" />
                  </div>
                </div>
              </div>

              {/* Connected Asset Layers */}
              <div className="mt-3 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-zinc-800/80 bg-zinc-950 p-3">
                  <div className="mb-2 flex items-center gap-1.5 text-[10px] font-medium text-zinc-400">
                    <FileText className="size-3 text-cyan-400" /> Optimized
                    Resume
                  </div>
                  <div className="space-y-1">
                    <div className="h-1 w-full rounded bg-zinc-900" />
                    <div className="h-1 w-5/6 rounded bg-zinc-900" />
                  </div>
                </div>
                <div className="rounded-xl border border-zinc-800/80 bg-zinc-950 p-3">
                  <div className="mb-2 flex items-center gap-1.5 text-[10px] font-medium text-zinc-400">
                    <Send className="size-3 text-emerald-400" /> Active Pitch
                  </div>
                  <div className="space-y-1">
                    <div className="h-1 w-full rounded bg-zinc-900" />
                    <div className="h-1 w-2/3 rounded bg-zinc-900" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* FEATURE JOURNEY SECTION */}
        <section
          id="features"
          className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 border-t border-zinc-900"
        >
          <SectionHeading
            eyebrow="The Journey Architecture"
            title="Continuous reputation asset loops."
            description="Ditch disjointed generation pipelines. Anchor your absolute professional capabilities onto a single source page."
          />

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/10 p-6 transition-all hover:border-zinc-800 hover:bg-zinc-900/20">
              <div className="mb-5 flex size-10 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 text-cyan-400">
                <Briefcase className="size-5" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400">
                Step One
              </span>
              <h3 className="mt-2 text-lg font-semibold text-zinc-100">
                Build Your Career Identity
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                Consolidate execution history, project parameters, and core
                proficiencies inside a unified dashboard layer.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/10 p-6 transition-all hover:border-zinc-800 hover:bg-zinc-900/20">
              <div className="mb-5 flex size-10 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 text-emerald-400">
                <Layers3 className="size-5" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400">
                Step Two
              </span>
              <h3 className="mt-2 text-lg font-semibold text-zinc-100">
                Apply Everywhere Faster
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                Instantly process clean, perfectly calibrated ATS resumes,
                tailored cover letters, and precision outreach proposals.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/10 p-6 transition-all hover:border-zinc-800 hover:bg-zinc-900/20">
              <div className="mb-5 flex size-10 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 text-purple-400">
                <Globe className="size-5" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400">
                Step Three
              </span>
              <h3 className="mt-2 text-lg font-semibold text-zinc-100">
                One Link. Every Opportunity.
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                Distribute an evergreen public destination URL. Update
                background details once to apply shifts globally across all
                nodes.
              </p>
            </div>
          </div>

          {/* Core Feature Bento Grid */}
          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(([title, description]) => (
              <Card key={title} className="border-zinc-900 bg-zinc-950/40 p-6">
                <h3 className="text-base font-semibold text-zinc-100">
                  {title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                  {description}
                </p>
              </Card>
            ))}
          </div>
        </section>

        {/* THE MAIN DIFFERENTIATOR: DEDICATED PORTFOLIO SECTOR */}
        <section
          id="portfolio"
          className="border-y border-zinc-900 bg-zinc-900/20 py-24"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-5 lg:items-center">
              <div className="space-y-6 lg:col-span-2">
                <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-emerald-400">
                  <span className="size-1.5 rounded-full bg-emerald-400" />{" "}
                  Platform Core Concept
                </div>
                <h2 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
                  Your resume gets you noticed. <br />
                  Your portfolio gets you remembered.
                </h2>
                <p className="text-sm leading-relaxed text-zinc-400">
                  Static document formats live isolated inside download trees. A
                  live platform node provides external teams an immediate window
                  into project records, technical capabilities, and explicit
                  business positioning.
                </p>
                <div className="space-y-2.5 pt-2 text-sm text-zinc-300">
                  <div className="flex items-center gap-2.5">
                    <Check className="size-4 text-emerald-400" />
                    <span>Dynamic responsive portfolio routing URL</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="size-4 text-emerald-400" />
                    <span>Structured experience documentation modules</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="size-4 text-emerald-400" />
                    <span>
                      Direct connection parameters for talent acquisition
                    </span>
                  </div>
                </div>
              </div>

              {/* Live Render Asset Mockup Frame */}
              <div className="lg:col-span-3">
                <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl">
                  <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="size-2 rounded-full bg-zinc-800" />
                        <div className="size-2 rounded-full bg-zinc-800" />
                        <div className="size-2 rounded-full bg-zinc-800" />
                      </div>
                    </div>
                    <div className="rounded bg-zinc-900 px-3 py-1 text-xs font-mono text-zinc-500">
                      freelanceai.app/identity/profile_preview
                    </div>
                  </div>

                  <div className="mt-6 space-y-6">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <div className="h-4 w-32 rounded bg-zinc-800 mb-1.5" />
                        <div className="h-2.5 w-48 rounded bg-zinc-900" />
                      </div>
                      <div className="h-8 w-24 rounded border border-zinc-800 bg-zinc-900" />
                    </div>

                    <div className="grid gap-3 sm:grid-cols-3">
                      <div className="rounded-lg border border-zinc-900 bg-zinc-900/30 p-3">
                        <div className="h-2 w-12 rounded bg-zinc-800 mb-2" />
                        <div className="h-3 w-20 rounded bg-zinc-900" />
                      </div>
                      <div className="rounded-lg border border-zinc-900 bg-zinc-900/30 p-3">
                        <div className="h-2 w-16 rounded bg-zinc-800 mb-2" />
                        <div className="h-3 w-16 rounded bg-zinc-900" />
                      </div>
                      <div className="rounded-lg border border-zinc-900 bg-zinc-900/30 p-3">
                        <div className="h-2 w-10 rounded bg-zinc-800 mb-2" />
                        <div className="h-3 w-24 rounded bg-zinc-900" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* METRICS PLATFORM INTEGRATION HOOK BAR */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-zinc-900 bg-zinc-900/10 p-6 backdrop-blur-sm">
            <div className="grid gap-8 text-center sm:grid-cols-3">
              <div className="space-y-1">
                <span className="block font-mono text-[10px] text-zinc-500 uppercase tracking-wider">
                  Active Identities
                </span>
                <div className="text-2xl font-semibold tracking-tight text-zinc-100 font-mono">
                  {/* Bind directly via state pipeline components or API metrics fields */}
                  [Telemetry Active]
                </div>
              </div>
              <div className="space-y-1">
                <span className="block font-mono text-[10px] text-zinc-500 uppercase tracking-wider">
                  Asset Generation Loads
                </span>
                <div className="text-2xl font-semibold tracking-tight text-zinc-100 font-mono">
                  [Processing Engine Online]
                </div>
              </div>
              <div className="space-y-1">
                <span className="block font-mono text-[10px] text-zinc-500 uppercase tracking-wider">
                  Success Vectors Recorded
                </span>
                <div className="text-2xl font-semibold tracking-tight text-zinc-100 font-mono">
                  [Verified Node Activity]
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* VALUE-DRIVEN DYNAMIC PRICING MATRIX */}
        <section
          id="pricing"
          className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 border-t border-zinc-900"
        >
          <SectionHeading
            eyebrow="Pricing Matrix"
            title="Value-focused deployment paths."
            description="Select an access parameters configuration optimized for your delivery scale."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {/* Dynamic Free Card */}
            <Card className="flex flex-col justify-between border-zinc-900 bg-zinc-950 p-6">
              <div className="space-y-4">
                <h3 className="text-sm font-mono uppercase tracking-wider text-zinc-400">
                  {PLANS.FREE.name}
                </h3>
                <div className="flex items-baseline gap-1 text-zinc-50">
                  <span className="text-4xl font-semibold font-mono">
                    ${PLANS.FREE.price.toFixed(2)}
                  </span>
                  <span className="text-xs text-zinc-500">/ month</span>
                </div>
                <p className="text-xs leading-relaxed text-zinc-400">
                  Configure your master identity profile and deploy foundational
                  career assets.
                </p>
                <div className="space-y-2.5 pt-4 text-xs text-zinc-400">
                  <div className="flex items-center gap-2">
                    <Check className="size-3.5 text-cyan-400" /> Create your
                    primary identity profile
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="size-3.5 text-cyan-400" /> Limited career
                    asset generation
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="size-3.5 text-cyan-400" /> No public
                    portfolio index link
                  </div>
                  <div className="text-cyan-300/80 font-mono text-[11px] pt-1">
                    Allocation: {PLANS.FREE.credits} units
                  </div>
                </div>
              </div>

              <Button className="mt-8 border-zinc-800 bg-zinc-900/40 text-zinc-300 hover:bg-zinc-800">
                <Link href={"/billing"}>Initialize Free Profile</Link>
              </Button>
            </Card>

            {/* Dynamic Pro Card */}
            <Card className="relative flex flex-col justify-between border-cyan-500/30 bg-zinc-900/20 p-6 shadow-xl">
              <div className="space-y-4">
                <h3 className="text-sm font-mono uppercase tracking-wider text-cyan-400">
                  {PLANS.PRO.name}
                </h3>
                <div className="flex items-baseline gap-1 text-zinc-50">
                  <span className="text-4xl font-semibold font-mono">
                    ${PLANS.PRO.price.toFixed(2)}
                  </span>
                  <span className="text-xs text-zinc-500">/ month</span>
                </div>
                <p className="text-xs leading-relaxed text-zinc-400">
                  Unrestricted access frameworks built for active professional
                  expansion and heavy pipeline conversion.
                </p>
                <div className="space-y-2.5 pt-4 text-xs text-zinc-300">
                  <div className="flex items-center gap-2">
                    <Check className="size-3.5 text-cyan-400" /> Unlimited
                    persistent career assets
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="size-3.5 text-cyan-400" /> Premium
                    custom-tailored portfolio designs
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="size-3.5 text-cyan-400" /> Comprehensive
                    context-aware generations
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="size-3.5 text-cyan-400" /> Advanced data
                    profile structures
                  </div>
                  <div className="text-cyan-400 font-mono text-[11px] pt-1">
                    Allocation: {PLANS.PRO.credits} units
                  </div>
                </div>
              </div>

              <Button className="mt-8 bg-zinc-50 text-zinc-950 hover:bg-zinc-200">
                <Link href={"/billing"}>Unlock Pro Framework</Link>
              </Button>
            </Card>

            {/* Dynamic Enterprise Card */}
            <Card className="flex flex-col justify-between border-zinc-900 bg-zinc-950 p-6">
              <div className="space-y-4">
                <h3 className="text-sm font-mono uppercase tracking-wider text-zinc-400">
                  {PLANS.ENTERPRISE.name}
                </h3>
                <div className="flex items-baseline gap-1 text-zinc-50">
                  <span className="text-4xl font-semibold font-mono">
                    ${PLANS.ENTERPRISE.price.toFixed(2)}
                  </span>
                  <span className="text-xs text-zinc-500">/ month</span>
                </div>
                <p className="text-xs leading-relaxed text-zinc-400">
                  Orchestrated solutions designed to power multi-seat agency
                  setups and recruiting network tracking.
                </p>
                <div className="space-y-2.5 pt-4 text-xs text-zinc-400">
                  <div className="flex items-center gap-2">
                    <Check className="size-3.5 text-cyan-400" /> Unlimited
                    persistent career assets
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="size-3.5 text-cyan-400" /> Premium
                    custom-tailored portfolio designs
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="size-3.5 text-cyan-400" /> Comprehensive
                    context-aware generations
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="size-3.5 text-cyan-400" /> Advanced data
                    profile structures
                  </div>

                  <div className="text-cyan-300/80 font-mono text-[11px] pt-1">
                    Allocation: {PLANS.ENTERPRISE.credits} units
                  </div>
                </div>
              </div>

              <Button className="mt-8 border-zinc-800 bg-zinc-900/40 text-zinc-300 hover:bg-zinc-800">
                <Link href={"/billing"}>Contact Enterprise Operations</Link>
              </Button>
            </Card>
          </div>
        </section>

        {/* PRODUCTION-GRADE FAQS */}
        <section
          id="faq"
          className="mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8 border-t border-zinc-900"
        >
          <SectionHeading
            eyebrow="Platform Mechanics"
            title="Frequently Reviewed Queries"
          />
          <div className="mt-12 space-y-3">
            {faqs.map(([question, answer]) => (
              <Card key={question} className="border-zinc-900 bg-zinc-950 p-5">
                <h3 className="text-sm font-medium text-zinc-200">
                  {question}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                  {answer}
                </p>
              </Card>
            ))}
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-zinc-900 bg-zinc-950 px-4 py-12 text-zinc-600">
        <div className="mx-auto max-w-7xl text-center sm:flex sm:items-center sm:justify-between">
          <div className="flex flex-wrap justify-center gap-6 text-xs font-medium text-zinc-500 sm:justify-start">
            <Link
              href="/profile-generator"
              className="hover:text-cyan-400 transition-colors"
            >
              Identity Framework
            </Link>
            <Link
              href="/resume-generator"
              className="hover:text-cyan-400 transition-colors"
            >
              Resume Infrastructure
            </Link>
            <Link
              href="/proposal-generator"
              className="hover:text-cyan-400 transition-colors"
            >
              Proposal Engine
            </Link>
            <Link
              href="/blog"
              className="hover:text-cyan-400 transition-colors"
            >
              Intelligence Journal
            </Link>
          </div>
          <p className="mt-4 text-xs text-zinc-500 sm:mt-0">
            &copy; {new Date().getFullYear()} Freelance AI. Career Asset Node
            Operations.
          </p>
        </div>
      </footer>
    </div>
  );
}
