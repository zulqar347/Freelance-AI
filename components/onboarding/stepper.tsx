"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { ONBOARDING_STEPS } from "@/lib/onboarding/step";

interface StepperProps {
  currentStep: number;
  onStepClick?: (step: number) => void;
}

export function Stepper({ currentStep, onStepClick }: StepperProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between overflow-x-auto pb-2">
        {ONBOARDING_STEPS.map((step, index) => {
          const completed = index < currentStep;
          const active = index === currentStep;

          return (
            <div key={step.id} className="flex min-w-fit flex-1 items-center">
              <button
                type="button"
                onClick={() => onStepClick?.(index)}
                disabled={!completed}
                className={cn(
                  "flex flex-col items-center transition-all",
                  completed && "cursor-pointer",
                  !completed && "cursor-default",
                )}
              >
                <div
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all",

                    completed && "border-emerald-500 bg-emerald-500 text-white",

                    active &&
                      "border-cyan-400 bg-cyan-400 text-black shadow-lg shadow-cyan-400/20",

                    !completed &&
                      !active &&
                      "border-zinc-700 bg-zinc-900 text-zinc-500",
                  )}
                >
                  {completed ? <Check className="h-5 w-5" /> : index + 1}
                </div>

                <span
                  className={cn(
                    "mt-3 text-xs font-medium",

                    active && "text-white",

                    completed && "text-zinc-300",

                    !completed && !active && "text-zinc-500",
                  )}
                >
                  {step.title}
                </span>
              </button>

              {index < ONBOARDING_STEPS.length - 1 && (
                <div
                  className={cn(
                    "mx-3 h-0.5 flex-1 rounded",

                    completed ? "bg-emerald-500" : "bg-zinc-800",
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
