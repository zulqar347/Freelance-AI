"use client";

import { useCallback, useMemo, useState } from "react";

import type { OnboardingStep } from "@/lib/onboarding/types";
import { ONBOARDING_STEPS } from "@/lib/onboarding/step";

export function useOnboarding() {
  const [currentStep, setCurrentStep] = useState(0);

  const totalSteps = ONBOARDING_STEPS.length;

  const current = ONBOARDING_STEPS[currentStep];

  const percentage = useMemo(() => {
    return ((currentStep + 1) / totalSteps) * 100;
  }, [currentStep, totalSteps]);

  const isFirstStep = currentStep === 0;

  const isLastStep = currentStep === totalSteps - 1;

  const next = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1));
  }, [totalSteps]);

  const previous = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }, []);

  const goToStep = useCallback(
    (step: number) => {
      if (step < 0 || step >= totalSteps) return;

      setCurrentStep(step);
    },
    [totalSteps],
  );

  const goToStepById = useCallback((id: OnboardingStep) => {
    const index = ONBOARDING_STEPS.findIndex((step) => step.id === id);

    if (index !== -1) {
      setCurrentStep(index);
    }
  }, []);

  return {
    currentStep,

    current,

    totalSteps,

    percentage,

    isFirstStep,

    isLastStep,

    next,

    previous,

    goToStep,

    goToStepById,
  };
}
