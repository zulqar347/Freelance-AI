"use client";

import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavigationProps {
  isFirstStep: boolean;
  isLastStep: boolean;
  isLoading?: boolean;
  onPrevious: () => void;
  onNext: () => void;
  nextLabel?: string;
}

export function Navigation({
  isFirstStep,
  isLastStep,
  isLoading = false,
  onPrevious,
  onNext,
  nextLabel,
}: NavigationProps) {
  return (
    <div className="mt-10 flex items-center justify-between border-t border-zinc-800 pt-6">
      <Button
        type="button"
        variant="secondary"
        onClick={onPrevious}
        disabled={isFirstStep || isLoading}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Previous
      </Button>

      <Button type="button" onClick={onNext} disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : (
          <>
            {nextLabel ?? (isLastStep ? "Finish" : "Save & Continue")}
            <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </div>
  );
}
