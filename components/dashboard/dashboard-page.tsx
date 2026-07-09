"use client";

import { AppShell } from "@/components/common/app-shell";
import { Card } from "@/components/ui/card";
import {
  useGeneratedProfiles,
  useLandingPage,
  useMe,
  useProposals,
  useCoverLetters,
  useGenerateLandingPage,
} from "@/hooks/use-app-data";
import {
  ArrowUpRight,
  CreditCard,
  FileText,
  PenLine,
  Sparkles,
  UserRound,
  Wand2,
} from "lucide-react";
import Link from "next/link";

const actions = [
  { href: "/profile-generator", label: "Profile", icon: UserRound },
  { href: "/proposal-generator", label: "Proposal", icon: PenLine },
  { href: "/cover-letter-generator", label: "Cover Letter", icon: FileText },
];

export function DashboardPage() {
  const me = useMe();
  const profiles = useGeneratedProfiles();
  const proposals = useProposals();
  const covers = useCoverLetters();
  const landingPage = useLandingPage();
  const generateLandingPage = useGenerateLandingPage();
  const user = me.data?.user;
  const total =
    (profiles.data?.length ?? 0) +
    (proposals.data?.length ?? 0) +
    (covers.data?.length ?? 0);
  const isPaidPlan = true;
  //  user?.plan === "Pro" || user?.plan === "Enterprise";

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <p className="text-sm text-cyan-300">Dashboard</p>
          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            Welcome back{user?.name ? `, ${user.name.split(" ")[0]}` : ""}.
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-zinc-400">
            Generate premium freelance assets, track your history, and keep your
            positioning sharp.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CreditCard className="mb-4 size-5 text-cyan-300" />
            <p className="text-sm text-zinc-500">Credits remaining</p>
            <p className="mt-2 text-4xl font-semibold text-white">
              {user?.credits ?? "..."}
            </p>
          </Card>
          <Card>
            <Sparkles className="mb-4 size-5 text-cyan-300" />
            <p className="text-sm text-zinc-500">Plan</p>
            <p className="mt-2 text-4xl font-semibold text-white">
              {user?.plan ?? "Free"}
            </p>
          </Card>
          <Card>
            <FileText className="mb-4 size-5 text-cyan-300" />
            <p className="text-sm text-zinc-500">Generations</p>
            <p className="mt-2 text-4xl font-semibold text-white">{total}</p>
          </Card>
        </div>
        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-4">
            <Card>
              <h2 className="text-lg font-semibold text-white">
                Quick actions
              </h2>
              <div className="mt-4 grid gap-3">
                {actions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <Link
                      key={action.href}
                      href={action.href}
                      className="flex items-center justify-between rounded-xl border border-white/10 bg-white/4 p-4 transition hover:bg-white/8"
                    >
                      <span className="flex items-center gap-3 text-sm text-white">
                        <Icon className="size-4 text-cyan-300" />
                        {action.label}
                      </span>
                      <ArrowUpRight className="size-4 text-zinc-500" />
                    </Link>
                  );
                })}
              </div>
            </Card>
            <Card>
              <div className="flex items-center gap-2">
                <Wand2 className="size-5 text-cyan-300" />
                <h2 className="text-lg font-semibold text-white">
                  AI Landing Pages
                </h2>
              </div>
              <p className="mt-3 text-sm leading-6 text-zinc-400">
                Turn your profile into a public, SEO-friendly landing page.
              </p>
              {landingPage.data?.slug ? (
                <div className="mt-4 space-y-3 rounded-xl border border-white/10 bg-black/20 p-4">
                  <p className="text-sm text-white">
                    Your landing page is ready.
                  </p>
                  <Link
                    href={`/lp/${landingPage.data.slug}`}
                    className="inline-flex items-center gap-2 text-sm text-cyan-300 hover:text-cyan-200"
                  >
                    Preview page <ArrowUpRight className="size-4" />
                  </Link>
                </div>
              ) : (
                <div className="mt-4 rounded-xl border border-dashed border-white/10 p-4 text-sm text-zinc-500">
                  {isPaidPlan
                    ? "Generate your landing page"
                    : "Upgrade to Pro to generate your landing page"}
                </div>
              )}
              <button
                type="button"
                onClick={() =>
                  void generateLandingPage.mutateAsync({
                    template: "developer",
                  })
                }
                disabled={!isPaidPlan || generateLandingPage.isPending}
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-cyan-300 px-4 py-2 text-sm font-medium text-zinc-950 transition disabled:cursor-not-allowed disabled:opacity-60"
              >
                {generateLandingPage.isPending
                  ? "Generating..."
                  : landingPage.data?.slug
                    ? "Generate again"
                    : "Generate landing page"}
              </button>
              {!isPaidPlan ? (
                <p className="mt-3 text-sm text-zinc-500">
                  Paid access is required to create AI landing pages.
                </p>
              ) : null}
            </Card>
          </div>
          <Card>
            <h2 className="text-lg font-semibold text-white">
              Recent generations
            </h2>
            <div className="mt-4 space-y-3">
              {[
                ...(proposals.data ?? []),
                ...(covers.data ?? []),
                ...(profiles.data ?? []),
              ]
                .slice(0, 5)
                .map((item) => (
                  <div
                    key={`${item.type}-${item.platform}-${item._id}`}
                    className="rounded-xl border border-white/10 bg-black/20 p-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-medium capitalize text-white">
                        {item.type}
                      </p>
                      <p className="text-xs text-zinc-500">{item.platform}</p>
                    </div>
                    <p className="mt-2 line-clamp-2 text-xs leading-5 text-zinc-500">
                      {item.jobDescription ?? "Generated marketplace profile"}
                    </p>
                  </div>
                ))}
              {total === 0 ? (
                <p className="rounded-xl border border-dashed border-white/10 p-6 text-sm text-zinc-500">
                  No generations yet. Start with a profile or proposal.
                </p>
              ) : null}
            </div>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
