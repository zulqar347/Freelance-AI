import type {
  FreelancerProfile,
  ExperienceType,
  ProjectType,
} from "@/hooks/use-app-data";

/*
|--------------------------------------------------------------------------
| Education
|--------------------------------------------------------------------------
*/

export interface EducationType {
  id?: string;
  school: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate?: string | null;
  isCurrent: boolean;
  description?: string;
}

/*
|--------------------------------------------------------------------------
| Step Names
|--------------------------------------------------------------------------
*/

export type OnboardingStep =
  | "profile"
  | "education"
  | "experience"
  | "projects"
  | "review";

/*
|--------------------------------------------------------------------------
| Complete Onboarding State
|--------------------------------------------------------------------------
*/

export interface OnboardingData {
  profile: FreelancerProfile;

  education: EducationType[];

  experience: ExperienceType[];

  projects: ProjectType[];
}

/*
|--------------------------------------------------------------------------
| Step Component Props
|--------------------------------------------------------------------------
*/

export interface StepProps {
  onNext: () => void;
  onBack: () => void;
}

/*
|--------------------------------------------------------------------------
| Progress
|--------------------------------------------------------------------------
*/

export interface ProgressState {
  currentStep: number;
  totalSteps: number;
  percentage: number;
}
