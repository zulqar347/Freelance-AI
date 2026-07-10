"use client";

import { ThemeToggle } from "@/components/common/theme-toggle";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/field";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Sparkles } from "lucide-react";

const EMAIL_VERIFICATION_HINT =
  "Check your inbox for a verification link. If you need another one, use the resend option below.";

type AuthForm = {
  name: string;
  email: string;
  password: string;
};

export function AuthPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { register, handleSubmit, getValues } = useForm<AuthForm>();

  const verificationMessage = useMemo(() => {
    const verified = searchParams.get("verified");

    if (verified === "1") {
      return "Email verified successfully. You can sign in now.";
    }

    if (verified === "0") {
      return "That verification link is invalid or has expired.";
    }

    return "";
  }, [searchParams]);

  async function submit(values: AuthForm) {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (mode === "signup") {
        const response = await fetch("/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          throw new Error("Could not create account");
        }

        setSuccess(EMAIL_VERIFICATION_HINT);
        setMode("signin");
        return;
      }

      // Existing users
      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(
          "Check your email verification link before signing in.",
        );
      }

      router.push("/dashboard");
    } catch (caught) {
      setError(
        caught instanceof Error ? caught.message : "Authentication failed",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.2),transparent_35%)]" />
      <header className="relative z-10 flex items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3 text-white">
          <span className="grid size-10 place-items-center rounded-xl bg-white text-zinc-950">
            <Sparkles className="size-5" />
          </span>
          <span className="font-semibold">Rah AI</span>
        </Link>
        <ThemeToggle />
      </header>
      <main className="relative z-10 mx-auto grid min-h-[calc(100vh-76px)] max-w-6xl items-center gap-8 px-4 py-10 sm:px-6 lg:grid-cols-2">
        <div className="hidden lg:block">
          <p className="text-sm text-cyan-300">Premium access</p>
          <h1 className="mt-3 text-6xl font-semibold tracking-tight text-white">
            Write like the obvious choice.
          </h1>
          <p className="mt-5 max-w-xl text-zinc-400">
            Sign in to generate client-ready freelance assets with your saved
            profile context.
          </p>
        </div>
        <Card className="mx-auto w-full max-w-md">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-white">
              {mode === "signin" ? "Welcome back" : "Create account"}
            </h2>
            <p className="mt-2 text-sm text-zinc-500">
              Continue with Google or email credentials.
            </p>
          </div>
          <Button
            variant="secondary"
            className="mb-4 w-full"
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          >
            Continue with Google
          </Button>
          <form onSubmit={handleSubmit(submit)} className="space-y-4">
            {mode === "signup" ? (
              <div className="space-y-2">
                <Label>Name</Label>
                <Input {...register("name")} placeholder="Jane Cooper" />
              </div>
            ) : null}
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                {...register("email", { required: true })}
                placeholder="you@company.com"
              />
            </div>
            <div className="space-y-2">
              <Label>Password</Label>
              <Input
                type="password"
                {...register("password", { required: true })}
                placeholder="••••••••"
              />
            </div>
            {error ? <p className="text-sm text-red-300">{error}</p> : null}
            {success || verificationMessage ? (
              <p className="text-sm text-cyan-300">
                {success || verificationMessage}
              </p>
            ) : null}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading
                ? "Please wait..."
                : mode === "signin"
                  ? "Sign in"
                  : "Create account"}
            </Button>
          </form>
          {mode === "signin" ? (
            <button
              type="button"
              className="mt-3 w-full text-sm text-zinc-400 hover:text-white"
              onClick={async () => {
                const email = getValues("email");
                if (!email) {
                  setError("Enter your email address first.");
                  return;
                }

                const response = await fetch("/api/auth/resend-verification", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ email }),
                });

                const payload = await response.json();
                setSuccess(payload.message || "Verification email sent.");
                setError("");
              }}
            >
              Resend verification email
            </button>
          ) : null}
          <button
            className="mt-5 w-full text-sm text-zinc-400 hover:text-white"
            onClick={() => {
              setError("");
              setSuccess("");
              setMode(mode === "signin" ? "signup" : "signin");
            }}
          >
            {mode === "signin"
              ? "Need an account? Create one"
              : "Already have an account? Sign in"}
          </button>
        </Card>
      </main>
    </div>
  );
}
