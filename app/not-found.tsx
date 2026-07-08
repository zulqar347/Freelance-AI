import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-background px-4 text-center text-foreground">
      <div>
        <p className="text-sm text-cyan-300">404</p>
        <h1 className="mt-3 text-4xl font-semibold text-white">
          This page does not exist.
        </h1>
        <p className="mt-3 text-sm text-zinc-500">
          Return to the workspace and keep generating.
        </p>
        <Link href="/dashboard" className="mt-6 inline-flex">
          <Button>Back to dashboard</Button>
        </Link>
      </div>
    </main>
  );
}
