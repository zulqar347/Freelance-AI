import { AuthPage } from "@/components/common/auth-page";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Sign In | Craftyn AI",
  description: "Sign in to your Craftyn AI account.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Auth() {
  return (
    <Suspense fallback={null}>
      <AuthPage />
    </Suspense>
  );
}
