"use client";

import React, { useMemo } from "react";
import { AppShell } from "@/components/common/app-shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useBillingPortal, useCheckout, useMe } from "@/hooks/use-app-data";
import { PLANS } from "@/lib/payments/plans";
import {
  Check,
  CreditCard,
  Zap,
  Shield,
  Sparkles,
  Calendar,
  ArrowUpRight,
  FileText,
  Clock,
} from "lucide-react";

// Local static features mapping matching target plan names
const PLAN_FEATURES: Record<string, string[]> = {
  Free: [
    "Profile-aware AI",
    "Generation history",
    "Standard community support",
  ],
  Pro: [
    "Profile-aware AI",
    "Generation history",
    "Premium rapid editor",
    "Priority queue access",
    "100 monthly credits",
  ],
  Enterprise: [
    "Everything in Pro",
    "Unlimited history logs",
    "Custom API endpoints",
    "Dedicated account rep",
    "300 monthly credits",
  ],
};

const fallbackPlans = [
  { name: "Free", price: "$0", credits: "10 credits", featured: false },
  { name: "Pro", price: "$8.99", credits: "100 credits", featured: true },
  {
    name: "Enterprise",
    price: "$18.99",
    credits: "300 credits",
    featured: false,
  },
];

export function BillingPage() {
  const me = useMe();
  const user = me.data?.user;
  const checkout = useCheckout();

  // Standard plan ranks for relative up/down comparison logic
  const planRank: Record<string, number> = {
    Free: 0,
    Pro: 1,
    Enterprise: 2,
  };

  const currentPlanName = user?.plan ?? "Free";
  const currentPlanIndex = planRank[currentPlanName] ?? 0;
  const maxCredits =
    currentPlanName === "Enterprise"
      ? 300
      : currentPlanName === "Pro"
        ? 100
        : 10;
  const currentCredits = user?.credits ?? 0;

  const creditPercentage = useMemo(() => {
    if (maxCredits <= 0) return 0;
    return Math.min(Math.max((currentCredits / maxCredits) * 100, 0), 100);
  }, [currentCredits, maxCredits]);

  // Safe deduction of the plan array layout based on the structure of your imported PLANS variable
  const compiledPlans = useMemo(() => {
    if (!PLANS) return fallbackPlans;
    if (Array.isArray(PLANS)) return PLANS;
    if (typeof PLANS === "object") return Object.values(PLANS);
    return fallbackPlans;
  }, []);

  const handlePlanAction = async (planName: string) => {
    if (planName === "Free") return;
    try {
      const session = await checkout.mutateAsync(
        planName as "Pro" | "Enterprise",
      );
      if (session?.url) {
        window.location.href = session.url;
      }
    } catch (error) {
      console.error("Checkout redirection failed:", error);
    }
  };

  const portal = useBillingPortal();

  return (
    <AppShell>
      <div className="mx-auto max-w-6xl space-y-10 px-4 py-8 text-zinc-100 sm:px-6 lg:px-8">
        {/* 1. Hero Header */}
        <header className="relative overflow-hidden rounded-2xl bg-linear-to-b from-zinc-900 via-zinc-950 to-black p-6 border border-zinc-800/60 sm:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.08),transparent_50%)]" />
          <div className="relative z-10">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 px-2.5 py-0.5 text-xs font-medium text-cyan-400">
              Workspace Billing
            </span>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl bg-linear-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text">
              Billing & Subscriptions
            </h1>
            <p className="mt-2 max-w-2xl text-base text-zinc-400">
              Manage your corporate subscription, real-time AI usage limits, and
              commercial invoice history.
            </p>
          </div>
        </header>

        {/* 2. Subscription Overview & 7. Free Plan Callout Zone */}
        <section aria-label="Subscription Overview">
          <Card className="relative overflow-hidden border-zinc-800 bg-zinc-950 p-6 shadow-xl rounded-2xl">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
              <div className="space-y-4 flex-1">
                <div>
                  <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    Active Membership
                  </h2>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-2xl font-bold tracking-tight text-white">
                      {currentPlanName} Plan
                    </span>
                    <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
                      Active
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-400 font-medium">
                      AI Allocation Balance
                    </span>
                    <span className="font-semibold text-zinc-200">
                      {currentCredits} / {maxCredits} credits
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-zinc-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-linear-to-r from-cyan-500 to-blue-500 transition-all duration-500 ease-out"
                      style={{ width: `${creditPercentage}%` }}
                      role="progressbar"
                      aria-valuenow={currentCredits}
                      aria-valuemin={0}
                      aria-valuemax={maxCredits}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
                <Button
                  disabled={portal.isPending || user?.plan === "Free"}
                  onClick={async () => {
                    const session = await portal.mutateAsync();

                    window.location.href = session.url;
                  }}
                >
                  {portal.isPending ? "Opening..." : "Manage Subscription"}
                </Button>
                {currentPlanName === "Free" && (
                  <Button
                    onClick={() => handlePlanAction("Pro")}
                    disabled={checkout.isPending}
                    className="bg-linear-to-r from-cyan-500 to-blue-600 font-medium text-white shadow-lg shadow-cyan-500/20 hover:from-cyan-400 hover:to-blue-500 transition-all active:scale-[0.98]"
                  >
                    Upgrade Now
                    <ArrowUpRight className="ml-1.5 size-4" />
                  </Button>
                )}
              </div>
            </div>

            <div className="mt-6 grid gap-4 border-t border-zinc-900 pt-6 sm:grid-cols-2 text-sm text-zinc-400">
              <div className="flex items-center gap-2">
                <Calendar className="size-4 text-zinc-500" />
                <span>
                  Next Renewal Date:{" "}
                  <strong className="text-zinc-300">July 30, 2026</strong>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="size-4 text-zinc-500" />
                <span>
                  Auto-Renew: <strong className="text-zinc-300">Enabled</strong>
                </span>
              </div>
            </div>
          </Card>
        </section>

        {/* 3. Statistics Cards */}
        <section
          aria-label="Usage Metrics"
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          <Card className="group border-zinc-800/80 bg-zinc-950 p-5 shadow-md rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700/80 hover:shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-zinc-400">
                Current Tier
              </span>
              <Sparkles className="size-5 text-cyan-400 transition-transform group-hover:rotate-12" />
            </div>
            <p className="mt-3 text-2xl font-bold text-white tracking-tight">
              {currentPlanName}
            </p>
            <p className="mt-1 text-xs text-zinc-500">Tier access profile</p>
          </Card>

          <Card className="group border-zinc-800/80 bg-zinc-950 p-5 shadow-md rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700/80 hover:shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-zinc-400">
                Credits Left
              </span>
              <Zap className="size-5 text-amber-400 transition-transform group-hover:scale-110" />
            </div>
            <p className="mt-3 text-2xl font-bold text-white tracking-tight">
              {currentCredits}
            </p>
            <p className="mt-1 text-xs text-zinc-500">Resets next cycle</p>
          </Card>

          <Card className="group border-zinc-800/80 bg-zinc-950 p-5 shadow-md rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700/80 hover:shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-zinc-400">
                Account Status
              </span>
              <CreditCard className="size-5 text-emerald-400 transition-transform group-hover:translate-x-0.5" />
            </div>
            <p className="mt-3 text-2xl font-bold text-emerald-400 tracking-tight">
              Healthy
            </p>
            <p className="mt-1 text-xs text-zinc-500">Good standing</p>
          </Card>

          <Card className="group border-zinc-800/80 bg-zinc-950 p-5 shadow-md rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700/80 hover:shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-zinc-400">
                Renewal Cycle
              </span>
              <Calendar className="size-5 text-purple-400 transition-transform group-hover:rotate-6" />
            </div>
            <p className="mt-3 text-2xl font-bold text-white tracking-tight">
              Monthly
            </p>
            <p className="mt-1 text-xs text-zinc-500">July 30, 2026</p>
          </Card>
        </section>

        {/* 4. Pricing Section */}
        <section aria-label="Available Tiers" className="space-y-6">
          <div className="text-center sm:text-left">
            <h2 className="text-xl font-bold tracking-tight text-white">
              Upgrade Plans & Options
            </h2>
            <p className="text-sm text-zinc-400">
              Select the allocation limits appropriate for your generation
              workflows.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {compiledPlans.map((plan: any) => {
              const targetRank = planRank[plan.name] ?? 0;
              const isCurrent = plan.name === currentPlanName;
              const isHigher = targetRank > currentPlanIndex;
              const featuresList = PLAN_FEATURES[plan.name] || [
                "Advanced AI Generation",
                "History Tracking",
                "Dedicated Console",
              ];

              return (
                <Card
                  key={plan.name}
                  className={`relative flex flex-col justify-between border p-6 rounded-2xl transition-all duration-300 shadow-md ${
                    plan.featured
                      ? "border-cyan-500/50 bg-zinc-950/90 ring-1 ring-cyan-500/30 md:scale-[1.02]"
                      : "border-zinc-800 bg-zinc-950"
                  }`}
                >
                  {plan.featured && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center rounded-full bg-cyan-500 px-3 py-0.5 text-xs font-semibold text-black shadow-md tracking-wider uppercase">
                      Popular Choice
                    </span>
                  )}

                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-white tracking-tight">
                        {plan.name}
                      </h3>
                      {plan.name === "Enterprise" && (
                        <span className="rounded bg-zinc-800 px-2 py-0.5 text-[10px] font-semibold text-zinc-300 uppercase tracking-wider">
                          Enterprise
                        </span>
                      )}
                    </div>

                    <div className="mt-4 flex items-baseline text-white">
                      <span className="text-4xl font-extrabold tracking-tight">
                        {plan.price}
                      </span>
                      <span className="ml-1 text-sm font-medium text-zinc-500">
                        /mo
                      </span>
                    </div>

                    <p className="mt-1.5 text-xs font-medium text-cyan-400 bg-cyan-500/5 inline-block px-2 py-0.5 rounded-md border border-cyan-500/10">
                      {plan.credits ||
                        (plan.name === "Free"
                          ? "10 credits"
                          : plan.name === "Pro"
                            ? "100 credits"
                            : "300 credits")}
                    </p>

                    <ul
                      className="mt-6 space-y-3.5 text-sm text-zinc-400"
                      role="list"
                    >
                      {featuresList.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5">
                          <Check
                            className="mt-0.5 size-4 shrink-0 text-cyan-400"
                            aria-hidden="true"
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 5. Dynamic Action Buttons */}
                  <div className="mt-8">
                    {checkout.isPending ? (
                      <Button
                        disabled
                        className="w-full bg-zinc-800 text-zinc-500 cursor-not-allowed"
                      >
                        <Clock className="mr-2 size-4 animate-spin" />
                        Processing...
                      </Button>
                    ) : isCurrent ? (
                      <Button
                        disabled
                        className="w-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 font-semibold cursor-default hover:bg-emerald-500/10"
                      >
                        ✔ Current Plan
                      </Button>
                    ) : isHigher ? (
                      <Button
                        className="w-full bg-zinc-100 font-semibold text-zinc-900 hover:bg-white transition-all shadow-md duration-200 active:scale-[0.99]"
                        onClick={() => handlePlanAction(plan.name)}
                      >
                        Upgrade Tier
                      </Button>
                    ) : (
                      <Button
                        variant="secondary"
                        className="w-full border border-zinc-800 bg-zinc-900 font-semibold text-zinc-300 hover:bg-zinc-800 hover:text-white transition-all duration-200"
                        onClick={() => handlePlanAction(plan.name)}
                      >
                        Downgrade Tier
                      </Button>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* 6. Billing History Section */}
        <section aria-label="Invoice Archive">
          <Card className="border-zinc-800 bg-zinc-950 p-6 rounded-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-zinc-900 pb-4">
              <div>
                <h2 className="text-lg font-bold tracking-tight text-white">
                  Billing History
                </h2>
                <p className="text-xs text-zinc-500">
                  Invoices will appear after your first premium gateway payment
                  cycle clears.
                </p>
              </div>
              <div>
                <span className="inline-flex items-center rounded-full bg-zinc-800/80 px-2.5 py-0.5 text-xs font-medium text-zinc-400 ring-1 ring-inset ring-zinc-700/50">
                  Coming Soon
                </span>
              </div>
            </div>

            {/* Empty State Illustration Container */}
            <div
              className="flex flex-col items-center justify-center py-12 text-center"
              role="region"
              aria-label="No invoices found"
            >
              <div className="rounded-full bg-zinc-900 p-4 ring-8 ring-zinc-950">
                <FileText className="size-8 text-zinc-600" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-sm font-semibold text-zinc-300">
                No active invoices
              </h3>
              <p className="mt-1 max-w-xs text-xs text-zinc-500">
                You have not been charged any real-time standard settlement
                cycles on this workspace dashboard profile yet.
              </p>
            </div>
          </Card>
        </section>
      </div>
    </AppShell>
  );
}
