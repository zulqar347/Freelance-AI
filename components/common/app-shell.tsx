"use client";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { cn } from "@/lib/utils";
// Import your hook
import {
  BarChart3,
  CreditCard,
  FileClock,
  FileText,
  FileUser,
  Home,
  LayoutDashboard,
  Menu,
  PenLine,
  Settings,
  Sparkles,
  UserRound,
  X,
  CheckCircle2,
  ArrowRight,
  FolderKanban,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useProfileStatus } from "@/hooks/use-app-data";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/profile-generator", label: "Profile", icon: UserRound },
  { href: "/resume-generator", label: "Resume", icon: FileUser },
  { href: "/proposal-generator", label: "Proposal", icon: PenLine },
  { href: "/cover-letter-generator", label: "Cover Letter", icon: FileText },
  { href: "/history", label: "PortfolioSite", icon: FolderKanban },
  { href: "/billing", label: "Billing", icon: CreditCard },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  // 1. Fetch backend completeness state
  const { data: meData, isLoading } = useProfileStatus();

  // 2. Compute progress percentage based on structural items
  const hasProfile = !!meData?.profile;
  const hasExperience = !!(meData?.experience && meData.experience.length > 0);
  const hasProjects = !!(meData?.projects && meData.projects.length > 0);

  let completionPercentage = 0;
  if (hasProfile) completionPercentage += 40; // Base details carry heavy weight
  if (hasExperience) completionPercentage += 30;
  if (hasProjects) completionPercentage += 30;

  const isProfileComplete = completionPercentage === 100;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(34,211,238,0.16),transparent_32%),radial-gradient(circle_at_85%_0%,rgba(255,255,255,0.09),transparent_28%)]" />
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-72 border-r border-white/10 bg-zinc-950/92 p-4 backdrop-blur-xl transition-transform lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl bg-white text-zinc-950">
                <Sparkles className="size-5" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-white">
                  Freelance AI
                </span>
                <span className="text-xs text-zinc-500">Premium workspace</span>
              </span>
            </Link>
            <Button
              className="h-9 w-9 px-0 lg:hidden"
              variant="ghost"
              onClick={() => setOpen(false)}
            >
              <X className="size-4" />
            </Button>
          </div>

          <nav className="mt-8 space-y-1">
            {navItems.map((item) => {
              const active = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition",
                    active
                      ? "bg-white text-zinc-950"
                      : "text-zinc-400 hover:bg-white/6 hover:text-white",
                  )}
                >
                  <Icon className="size-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Sidebar Footer Section holding metrics */}
          <div className="mt-auto space-y-3">
            {/* 3. New Dynamic Profile Status Card */}
            {session && !isLoading && (
              <div className="rounded-2xl border border-white/10 bg-white/4 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    Profile Metric
                  </span>
                  <span
                    className={cn(
                      "text-xs font-bold px-2 py-0.5 rounded-full",
                      isProfileComplete
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-cyan-500/10 text-cyan-400",
                    )}
                  >
                    {completionPercentage}%
                  </span>
                </div>

                {isProfileComplete ? (
                  <div className="mt-3 flex items-center gap-2 text-emerald-400">
                    <CheckCircle2 className="size-4 shrink-0" />
                    <p className="text-xs font-medium text-white">
                      Profile 100% Ready
                    </p>
                  </div>
                ) : (
                  <div className="mt-3">
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-cyan-400 transition-all duration-500"
                        style={{ width: `${completionPercentage}%` }}
                      />
                    </div>
                    <Link href="/career-profile" className="block w-full mt-3">
                      <Button className="w-full h-8 text-xs bg-cyan-500 hover:bg-cyan-600 text-black font-medium group">
                        Complete Profile
                        <ArrowRight className="ml-1.5 size-3 transition-transform group-hover:translate-x-0.5" />
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            )}

            <div className="rounded-2xl border border-white/10 bg-white/4 p-4">
              <BarChart3 className="mb-3 size-5 text-cyan-300" />
              <p className="text-sm font-medium text-white">
                AI production mode
              </p>
              <p className="mt-1 text-xs leading-5 text-zinc-500">
                Profile-aware generation for proposals, cover letters, and
                marketplace copy.
              </p>
            </div>
          </div>
        </div>
      </aside>

      {open ? (
        <div
          className="fixed inset-0 z-30 bg-black/60 lg:hidden"
          onClick={() => setOpen(false)}
        />
      ) : null}

      <main className="relative z-10 lg:pl-72">
        <header className="sticky top-0 z-20 border-b border-white/10 bg-zinc-950/72 px-4 py-3 backdrop-blur-xl sm:px-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Button
                className="h-10 w-10 px-0 lg:hidden"
                variant="secondary"
                onClick={() => setOpen(true)}
              >
                <Menu className="size-4" />
              </Button>
              <Link
                href="/"
                className="hidden items-center gap-2 text-sm text-zinc-400 hover:text-white sm:flex"
              >
                <Home className="size-4" />
                Home
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Link href={"/career-profile"}>
                <div className="hidden rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-zinc-300 sm:block">
                  {session?.user?.email ?? "Guest"}
                </div>
              </Link>
              {session ? (
                <Button
                  variant="secondary"
                  className="h-10"
                  onClick={() => signOut()}
                >
                  Sign out
                </Button>
              ) : (
                <Button
                  className="h-10"
                  onClick={() => (window.location.href = "/auth")}
                >
                  Sign in
                </Button>
              )}
            </div>
          </div>
        </header>
        <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}
