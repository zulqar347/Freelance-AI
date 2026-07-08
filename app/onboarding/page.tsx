"use client";

import { useOnboarding } from "@/hooks/use-onboarding";
import { OnboardingLayout } from "@/components/onboarding/onboarding-layout";
import { Navigation } from "@/components/onboarding/navigation";
import { ProfileStep } from "@/components/onboarding/profile-step";
import { EducationStep } from "@/components/onboarding/education-step";
import { ExperienceStep } from "@/components/onboarding/experience-step";
import { ProjectsStep } from "@/components/onboarding/projects-step";
import { ReviewStep } from "@/components/onboarding/review-step";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
  const onboarding = useOnboarding();
  const router = useRouter();

  const handleNext = () => {
    if (onboarding.isLastStep) {
      // Redirect to dashboard after completing onboarding
      router.push("/dashboard");
    } else {
      onboarding.next();
    }
  };

  const handlePrevious = () => {
    onboarding.previous();
  };

  const handleEditStep = (step: number) => {
    onboarding.goToStep(step);
  };

  const renderStepContent = () => {
    switch (onboarding.currentStep) {
      case 0:
        return <ProfileStep onNext={handleNext} />;
      case 1:
        return <EducationStep onNext={handleNext} />;
      case 2:
        return <ExperienceStep onNext={handleNext} />;
      case 3:
        return <ProjectsStep onNext={handleNext} />;
      case 4:
        return <ReviewStep onNext={handleNext} onEditStep={handleEditStep} />;
      default:
        return null;
    }
  };

  return (
    <OnboardingLayout
      title={onboarding.current.title}
      description={onboarding.current.description}
      currentStep={onboarding.currentStep}
      totalSteps={onboarding.totalSteps}
      percentage={onboarding.percentage}
    >
      <div className="space-y-4">
        {renderStepContent()}

        {onboarding.currentStep !== 4 && (
          <Navigation
            isFirstStep={onboarding.isFirstStep}
            isLastStep={false}
            onPrevious={handlePrevious}
            onNext={handleNext}
            nextLabel="Save & Continue"
          />
        )}
      </div>
    </OnboardingLayout>
  );
}
