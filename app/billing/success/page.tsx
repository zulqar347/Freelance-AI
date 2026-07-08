"use client";

import { useRouter } from "next/navigation";

export default function BillingSuccessPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-bold">Payment received!</h1>

      <button
        onClick={() => router.push("/dashboard")}
        className="rounded-lg bg-black px-6 py-3 text-white hover:bg-gray-800 transition"
      >
        Go to Dashboard
      </button>
    </div>
  );
}
