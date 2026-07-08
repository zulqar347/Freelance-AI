import type { OnboardingStep } from "./types";

export interface OnboardingStepConfig {
  id: OnboardingStep;
  title: string;
  description: string;
}

export const ONBOARDING_STEPS: OnboardingStepConfig[] = [
  {
    id: "profile",
    title: "Profile",
    description: "Tell us about yourself",
  },
  {
    id: "education",
    title: "Education",
    description: "Your academic background",
  },
  {
    id: "experience",
    title: "Experience",
    description: "Your work history",
  },
  {
    id: "projects",
    title: "Projects",
    description: "Showcase your best work",
  },
  {
    id: "review",
    title: "Review",
    description: "Review and finish",
  },
];
