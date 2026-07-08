"use client";

import { AppShell } from "@/components/common/app-shell";
import { OutputViewer } from "@/components/common/output-viewer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useGenerateProfile, useGeneratedProfiles } from "@/hooks/use-app-data";
import { cn } from "@/lib/utils";
import type { Generation, Platform } from "@/types/frontend";
import { FileText, Link2, MonitorUp, Sparkles, Store } from "lucide-react";
import { useMemo, useState } from "react";

const platforms: Array<{
  value: Platform;
  label: string;
  icon: React.ElementType;
  description: string;
}> = [
  {
    value: "resume",
    label: "Resume",
    icon: FileText,
    description: "Recruiter-ready summary and positioning.",
  },
  {
    value: "linkedin",
    label: "LinkedIn",
    icon: Link2,
    description: "Professional profile copy and headline.",
  },
  {
    value: "upwork",
    label: "Upwork",
    icon: MonitorUp,
    description: "Marketplace profile for premium clients.",
  },
  {
    value: "fiverr",
    label: "Fiverr",
    icon: Store,
    description: "Gig-focused copy and searchable language.",
  },
];

export function ProfileGeneratorPage() {
  const [platform, setPlatform] = useState<Platform>("upwork");
  const [current, setCurrent] = useState<Generation | null>(null);
  const generate = useGenerateProfile();
  const history = useGeneratedProfiles();

  const selectedHistory = useMemo(
    () => history.data?.filter((item) => item.platform === platform) ?? [],
    [history.data, platform],
  );

  async function submit() {
    const result = await generate.mutateAsync(platform);
    setCurrent(result);
  }

  return (
    <AppShell>
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6">
          <div>
            <p className="text-sm text-cyan-300">Profile generator</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              Build a sharper first impression.
            </h1>
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              Select a destination and generate profile copy from your saved
              freelancer context.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {platforms.map((item) => {
              const Icon = item.icon;
              const active = platform === item.value;
              return (
                <button
                  key={item.value}
                  onClick={() => setPlatform(item.value)}
                  className={cn(
                    "rounded-2xl border p-4 text-left transition focus:outline-none focus:ring-2 focus:ring-cyan-300/60",
                    active
                      ? "border-cyan-300/50 bg-cyan-300/8"
                      : "border-white/10 bg-white/4 hover:bg-white/[0.07]",
                  )}
                >
                  <Icon className="mb-4 size-5 text-cyan-300" />
                  <p className="font-medium text-white">{item.label}</p>
                  <p className="mt-2 text-xs leading-5 text-zinc-500">
                    {item.description}
                  </p>
                </button>
              );
            })}
          </div>
          <Button
            onClick={submit}
            disabled={generate.isPending}
            className="w-full sm:w-auto"
          >
            <Sparkles className="size-4" />
            {generate.isPending ? "Generating..." : "Generate profile"}
          </Button>
          {generate.error ? (
            <p className="text-sm text-red-300">{generate.error.message}</p>
          ) : null}
          <Card>
            <h2 className="text-lg font-semibold text-white">History</h2>
            <div className="mt-4 space-y-3">
              {selectedHistory.map((item) => (
                <button
                  key={item._id}
                  onClick={() => setCurrent(item)}
                  className="w-full rounded-xl border border-white/10 bg-black/20 p-4 text-left text-sm text-zinc-300 transition hover:bg-white/6"
                >
                  {item.platform} profile
                </button>
              ))}
              {selectedHistory.length === 0 ? (
                <p className="text-sm text-zinc-500">
                  No saved profiles for this platform yet.
                </p>
              ) : null}
            </div>
          </Card>
        </div>
        <OutputViewer
          generation={current}
          title={`${platforms.find((item) => item.value === platform)?.label} output`}
          onRegenerate={submit}
          regenerating={generate.isPending}
        />
      </div>
    </AppShell>
  );
}
