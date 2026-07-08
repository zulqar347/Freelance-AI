"use client";

import { Button } from "@/components/ui/button";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main className="grid min-h-screen place-items-center bg-background px-4 text-center text-foreground">
      <div>
        <p className="text-sm text-red-300">Error</p>
        <h1 className="mt-3 text-4xl font-semibold text-white">
          Something went wrong.
        </h1>
        <p className="mt-3 text-sm text-zinc-500">
          The interface is intact; retry the current action.
        </p>
        <Button className="mt-6" onClick={reset}>
          Retry
        </Button>
      </div>
    </main>
  );
}
