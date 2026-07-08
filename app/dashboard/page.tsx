import { auth } from "@/auth";
import { DashboardPage } from "@/components/dashboard/dashboard-page";
import ConnectDB from "@/lib/db";
import Profile from "@/lib/models/Profile";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard | Freelance AI",
  description:
    "Manage your AI-powered freelance workspace, generate proposals, optimize your Fiverr and Upwork profiles, and access all your saved content.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function Dashboard() {
  const session = await auth();

  await ConnectDB();

  const profile = await Profile.findOne({
    userId: session?.user?.id,
  });

  if (!profile) {
    redirect("/career-profile");
  }
  return <DashboardPage />;
}
