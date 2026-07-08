"use client";

import { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "../ui/progress";
import { Stepper } from "./stepper";

interface OnboardingLayoutProps {
  title: string;
  description: string;
  currentStep: number;
  totalSteps: number;
  percentage: number;
  children: ReactNode;
}

export function OnboardingLayout({
  title,
  description,
  currentStep,
  totalSteps,
  percentage,
  children,
}: OnboardingLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 py-10 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <p className="text-sm font-medium text-cyan-400">
            Career Profile Setup
          </p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight text-white">
            {title}
          </h1>

          <p className="mt-3 max-w-2xl text-zinc-400">{description}</p>
        </div>

        {/* Progress */}
        <Card className="mb-8 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-400">Progress</p>

              <p className="mt-1 text-lg font-semibold">
                Step {currentStep + 1} of {totalSteps}
              </p>
            </div>

            <div className="text-right">
              <p className="text-3xl font-bold text-cyan-400">
                {Math.round(percentage)}%
              </p>
            </div>
          </div>

          <Progress value={percentage} className="mt-5 h-2" />
          <Stepper currentStep={currentStep} />
        </Card>

        {/* Form */}
        <Card className="flex-1 rounded-3xl p-8">{children}</Card>
      </div>
    </div>
  );
}
