"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CareerProfilePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the new onboarding flow
    router.replace("/onboarding");
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-zinc-400">Redirecting to onboarding...</p>
    </div>
  );
}
