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
    "Smart profile",
    "Fill out your experience once. Everything else is generated from it.",
  ],
  [
    "Proposal writer",
    "Paste a job posting and get a tailored proposal in seconds.",
  ],
  [
    "Cover letters",
    "A polished cover letter matched to your skills and the role, every time.",
  ],
  [
    "Public portfolio",
    "A shareable link that shows your work, always up to date.",
  ],
];

const faqs = [
  [
    "How is this different from a resume template?",
    "A template gives you one static document. Here, you fill out your profile once and we generate your resume, cover letter, proposals, and portfolio from it — so updating one thing updates everywhere it's used.",
  ],
  [
    "Can I tailor it for different types of work?",
    "Yes. You can create different versions of your profile to emphasize different skills or projects, depending on who you're applying to.",
  ],
  [
    "Do I need a credit card to try it?",
    "No. The free plan lets you build your profile and try core features with no card required. Upgrade only when you're ready for unlimited use.",
  ],
];

export function LandingPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Craftyn AI",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "Build one career profile and automatically generate your resume, cover letters, client proposals, and a public portfolio page.",
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
        <div className="absolute top-0 left-1/2 h-150 w-250 -translate-x-1/2 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.08),transparent_60%)]" />
        <div className="absolute top-[40%] right-10 h-100 w-100 bg-[radial-gradient(circle,rgba(34,211,238,0.03),transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-size-[4rem_4rem]" />
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
              Craftyn AI
            </span>
          </Link>
          <div className="hidden items-center gap-8 text-sm font-medium text-zinc-400 md:flex">
            <a
              href="#features"
              className="transition-colors hover:text-zinc-100"
            >
              Features
            </a>
            <a
              href="#portfolio"
              className="transition-colors hover:text-zinc-100"
            >
              Portfolio
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
              Profile builder
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
              Built for freelancers who apply often
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl lg:text-6xl lg:leading-[1.12]">
                One profile. A{" "}
                <span className="bg-linear-to-r inline-block from-cyan-400 via-emerald-400 to-cyan-500 bg-clip-text text-transparent">
                  resume, cover letter, and portfolio
                </span>{" "}
                that write themselves.
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
                Stop rewriting the same experience for every application. Fill
                out your profile once, and get a matching resume, cover letter,
                and client proposal — plus a portfolio page you can share with
                one link.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/dashboard" className="w-full sm:w-auto">
                <Button className="w-full bg-zinc-50 px-6 py-5 text-zinc-950 hover:bg-zinc-200 sm:w-auto">
                  Build your profile — free{" "}
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </Link>
              <a href="#portfolio" className="w-full sm:w-auto">
                <Button className="w-full border-zinc-800 bg-zinc-900/50 px-6 py-5 text-zinc-300 hover:bg-zinc-800 sm:w-auto">
                  See an example portfolio
                </Button>
              </a>
            </div>

            <div className="border-t border-zinc-900 pt-6">
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-medium text-zinc-500">
                <span className="text-zinc-400">Jump to:</span>
                <Link
                  href="/profile-generator"
                  className="hover:text-cyan-400 transition-colors"
                >
                  Profile builder
                </Link>
                <Link
                  href="/resume-generator"
                  className="hover:text-cyan-400 transition-colors"
                >
                  Resume builder
                </Link>
                <Link
                  href="/proposal-generator"
                  className="hover:text-cyan-400 transition-colors"
                >
                  Proposal writer
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
                      freelanceai.app/yourname
                    </span>
                  </div>
                  <span className="rounded bg-zinc-900 px-1.5 py-0.5 text-[10px] font-medium text-zinc-400">
                    Public Link
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="size-9 rounded-full bg-linear-to-tr from-cyan-500 to-emerald-400" />
                    <div>
                      <div className="h-3 w-24 rounded bg-zinc-800 mb-1" />
                      <div className="h-2 w-32 rounded bg-zinc-900" />
                    </div>
                  </div>

                  <div className="rounded-lg border border-cyan-500/20 bg-cyan-500/5 p-3">
                    <div className="flex items-center gap-1.5 text-[11px] font-medium text-cyan-400 mb-1">
                      <Eye className="size-3.5" /> Someone viewed your profile
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
                    <FileText className="size-3 text-cyan-400" /> Resume ready
                  </div>
                  <div className="space-y-1">
                    <div className="h-1 w-full rounded bg-zinc-900" />
                    <div className="h-1 w-5/6 rounded bg-zinc-900" />
                  </div>
                </div>
                <div className="rounded-xl border border-zinc-800/80 bg-zinc-950 p-3">
                  <div className="mb-2 flex items-center gap-1.5 text-[10px] font-medium text-zinc-400">
                    <Send className="size-3 text-emerald-400" /> Proposal sent
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
            eyebrow="How it works"
            title="Everything comes from one profile."
            description="Fill it out once, and it powers every document and page you need to apply for work."
          />

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/10 p-6 transition-all hover:border-zinc-800 hover:bg-zinc-900/20">
              <div className="mb-5 flex size-10 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 text-cyan-400">
                <Briefcase className="size-5" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400">
                Step 1
              </span>
              <h3 className="mt-2 text-lg font-semibold text-zinc-100">
                Build your profile
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                Add your experience, projects, and skills once in a simple
                dashboard.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/10 p-6 transition-all hover:border-zinc-800 hover:bg-zinc-900/20">
              <div className="mb-5 flex size-10 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 text-emerald-400">
                <Layers3 className="size-5" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400">
                Step 2
              </span>
              <h3 className="mt-2 text-lg font-semibold text-zinc-100">
                Apply faster
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                Generate a clean resume, tailored cover letter, and client
                proposal in seconds.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/10 p-6 transition-all hover:border-zinc-800 hover:bg-zinc-900/20">
              <div className="mb-5 flex size-10 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 text-purple-400">
                <Globe className="size-5" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400">
                Step 3
              </span>
              <h3 className="mt-2 text-lg font-semibold text-zinc-100">
                Share one link
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                Send your public portfolio link anywhere. Update your profile
                once and it updates everywhere.
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
                  <span className="size-1.5 rounded-full bg-emerald-400" /> Your
                  public portfolio
                </div>
                <h2 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
                  Your resume gets you noticed. <br />
                  Your portfolio gets you remembered.
                </h2>
                <p className="text-sm leading-relaxed text-zinc-400">
                  A downloaded resume gets buried in someone&apos;s folder. A
                  live portfolio link gives clients and recruiters an easy way
                  to see your work, skills, and experience whenever they want.
                </p>
                <div className="space-y-2.5 pt-2 text-sm text-zinc-300">
                  <div className="flex items-center gap-2.5">
                    <Check className="size-4 text-emerald-400" />
                    <span>
                      A clean, shareable link that&apos;s always current
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="size-4 text-emerald-400" />
                    <span>Your projects and experience laid out clearly</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="size-4 text-emerald-400" />
                    <span>An easy way for clients to reach out directly</span>
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
                      freelanceai.app/jane-doe
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

        {/* VALUE-DRIVEN DYNAMIC PRICING MATRIX */}
        <section
          id="pricing"
          className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 border-t border-zinc-900"
        >
          <SectionHeading
            eyebrow="Pricing"
            title="Simple plans that scale with you."
            description="Start free. Upgrade only when you need more."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {/* Free Card */}
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
                  Build your profile and try the core features, no card
                  required.
                </p>
                <div className="space-y-2.5 pt-4 text-xs text-zinc-400">
                  <div className="flex items-center gap-2">
                    <Check className="size-3.5 text-cyan-400" /> Create your
                    profile
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="size-3.5 text-cyan-400" /> A limited
                    number of generations per month
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="size-3.5 text-cyan-400" /> No public
                    portfolio link yet
                  </div>
                  <div className="text-cyan-300/80 font-mono text-[11px] pt-1">
                    {PLANS.FREE.credits} generations included
                  </div>
                </div>
              </div>

              <Link href={"/billing"}>
                <Button className="mt-8 w-full border-zinc-800 bg-zinc-900/40 text-zinc-300 hover:bg-zinc-800">
                  Start free
                </Button>
              </Link>
            </Card>

            {/* Pro Card */}
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
                  For freelancers applying regularly and want a polished public
                  presence.
                </p>
                <div className="space-y-2.5 pt-4 text-xs text-zinc-300">
                  <div className="flex items-center gap-2">
                    <Check className="size-3.5 text-cyan-400" /> Unlimited
                    resumes, letters, and proposals
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="size-3.5 text-cyan-400" /> Public
                    portfolio with premium designs
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="size-3.5 text-cyan-400" /> Tailored
                    generation for every job posting
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="size-3.5 text-cyan-400" /> Multiple
                    profile versions
                  </div>
                  <div className="text-cyan-400 font-mono text-[11px] pt-1">
                    {PLANS.PRO.credits} generations included
                  </div>
                </div>
              </div>

              <Link href={"/billing"}>
                <Button className="mt-8 w-full bg-zinc-50 text-zinc-950 hover:bg-zinc-200">
                  Upgrade to Pro
                </Button>
              </Link>
            </Card>

            {/* Enterprise Card */}
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
                  For agencies and teams managing multiple freelancer profiles.
                </p>
                <div className="space-y-2.5 pt-4 text-xs text-zinc-400">
                  <div className="flex items-center gap-2">
                    <Check className="size-3.5 text-cyan-400" /> Everything in
                    Pro
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="size-3.5 text-cyan-400" /> Multiple team
                    member seats
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="size-3.5 text-cyan-400" /> Priority
                    support
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="size-3.5 text-cyan-400" /> Custom
                    onboarding
                  </div>
                  <div className="text-cyan-300/80 font-mono text-[11px] pt-1">
                    {PLANS.ENTERPRISE.credits} generations included
                  </div>
                </div>
              </div>

              <Link href={"/billing"}>
                <Button className="mt-8 w-full border-zinc-800 bg-zinc-900/40 text-zinc-300 hover:bg-zinc-800">
                  Contact us
                </Button>
              </Link>
            </Card>
          </div>
        </section>

        {/* PRODUCTION-GRADE FAQS */}
        <section
          id="faq"
          className="mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8 border-t border-zinc-900"
        >
          <SectionHeading
            eyebrow="Questions"
            title="Frequently asked questions"
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
              Profile builder
            </Link>
            <Link
              href="/resume-generator"
              className="hover:text-cyan-400 transition-colors"
            >
              Resume builder
            </Link>
            <Link
              href="/proposal-generator"
              className="hover:text-cyan-400 transition-colors"
            >
              Proposal writer
            </Link>
            <Link
              href="/blog"
              className="hover:text-cyan-400 transition-colors"
            >
              Blog
            </Link>
          </div>
          <p className="mt-4 text-xs text-zinc-500 sm:mt-0">
            &copy; {new Date().getFullYear()} Craftyn AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
