import { AuthPage } from "@/components/common/auth-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | Freelance AI",
  description: "Sign in to your Freelance AI account.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Auth() {
  return <AuthPage />;
}
