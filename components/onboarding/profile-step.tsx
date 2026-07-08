"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserProfileSchema } from "@/lib/validators/zodValidations";
import { useProfileSave, useMe } from "@/hooks/use-app-data";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label, Input, Textarea } from "@/components/ui/field";
import { useEffect } from "react";

export function ProfileStep({ onNext }: { onNext: () => void }) {
  const { data: meData, isLoading: meLoading } = useMe();
  const profileSave = useProfileSave();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(UserProfileSchema),
    defaultValues: {
      headline: "",
      profession: "",
      bio: "",
      country: "",
      experience: "",
      hourlyRate: 0,
      languages: [""],
      skills: [""],
    },
  });

  useEffect(() => {
    if (meData?.profile) {
      reset({
        headline: meData.profile.headline || "",
        profession: meData.profile.profession || "",
        bio: meData.profile.bio || "",
        country: meData.profile.country || "",
        experience: meData.profile.experience || "",
        hourlyRate: meData.profile.hourlyRate || 0,
        languages: meData.profile.languages?.length
          ? meData.profile.languages
          : [""],
        skills: meData.profile.skills?.length ? meData.profile.skills : [""],
      });
    }
  }, [meData?.profile, reset]);

  const languages = watch("languages");
  const skills = watch("skills");

  const onSubmit = async (data: any) => {
    try {
      await profileSave.mutateAsync(data);
      onNext();
    } catch (error) {
      console.error(error);
    }
  };

  if (meLoading) {
    return (
      <div className="space-y-4">
        <p className="text-zinc-400">Loading profile...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="headline">Headline *</Label>
        <Input
          id="headline"
          placeholder="e.g., Experienced Full Stack Developer"
          {...register("headline")}
        />
        {errors.headline && (
          <p className="text-sm text-red-400">{errors.headline.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="profession">Profession *</Label>
        <Input
          id="profession"
          placeholder="e.g., Software Engineer"
          {...register("profession")}
        />
        {errors.profession && (
          <p className="text-sm text-red-400">{errors.profession.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Bio *</Label>
        <Textarea
          id="bio"
          placeholder="Tell us about yourself..."
          {...register("bio")}
        />
        {errors.bio && (
          <p className="text-sm text-red-400">{errors.bio.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="country">Country *</Label>
          <Input
            id="country"
            placeholder="e.g., United States"
            {...register("country")}
          />
          {errors.country && (
            <p className="text-sm text-red-400">{errors.country.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="experience">Years of Experience *</Label>
          <Input
            id="experience"
            placeholder="e.g., 5 years"
            {...register("experience")}
          />
          {errors.experience && (
            <p className="text-sm text-red-400">{errors.experience.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="hourlyRate">Hourly Rate (USD)</Label>
        <Input
          id="hourlyRate"
          type="number"
          placeholder="0"
          {...register("hourlyRate", { valueAsNumber: true })}
        />
        {errors.hourlyRate && (
          <p className="text-sm text-red-400">{errors.hourlyRate.message}</p>
        )}
      </div>

      <div className="space-y-3">
        <Label>Languages *</Label>
        {languages?.map((_, index) => (
          <div key={index} className="flex gap-2">
            <Input
              placeholder="e.g., English, Spanish"
              {...register(`languages.${index}`)}
            />
            {languages.length > 1 && (
              <Button
                type="button"
                variant="danger"
                onClick={() => {
                  const newLangs = languages.filter((_, i) => i !== index);
                  if (newLangs.length === 0) {
                    // Keep at least one empty field
                    reset({ ...watch(), languages: [""] });
                  }
                }}
                className="w-fit"
              >
                Remove
              </Button>
            )}
          </div>
        ))}
        <Button
          type="button"
          variant="secondary"
          onClick={() => reset({ ...watch(), languages: [...languages, ""] })}
          className="w-fit"
        >
          + Add Language
        </Button>
      </div>

      <div className="space-y-3">
        <Label>Skills *</Label>
        {skills?.map((_, index) => (
          <div key={index} className="flex gap-2">
            <Input
              placeholder="e.g., React, TypeScript, Node.js"
              {...register(`skills.${index}`)}
            />
            {skills.length > 1 && (
              <Button
                type="button"
                variant="danger"
                onClick={() => {
                  const newSkills = skills.filter((_, i) => i !== index);
                  if (newSkills.length === 0) {
                    reset({ ...watch(), skills: [""] });
                  }
                }}
                className="w-fit"
              >
                Remove
              </Button>
            )}
          </div>
        ))}
        <Button
          type="button"
          variant="secondary"
          onClick={() => reset({ ...watch(), skills: [...skills, ""] })}
          className="w-fit"
        >
          + Add Skill
        </Button>
      </div>

      <div className="flex justify-end pt-6">
        <Button type="submit" disabled={isSubmitting || profileSave.isPending}>
          {isSubmitting || profileSave.isPending
            ? "Saving..."
            : "Save & Continue"}
        </Button>
      </div>
    </form>
  );
}
