"use client";

import { AppShell } from "@/components/common/app-shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input, Label, Textarea } from "@/components/ui/field";
import { useMe, useProfileSave } from "@/hooks/use-app-data";
import type { FreelancerProfile } from "@/types/frontend";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

type ProfileForm = Omit<FreelancerProfile, "languages" | "skills"> & {
  languages: string;
  skills: string;
};

const defaultProfile: ProfileForm = {
  headline: "",
  profession: "",
  bio: "",
  country: "",
  languages: "",
  experience: "",
  hourlyRate: 0,
  skills: "",
};

export function SettingsPage() {
  const me = useMe();
  const save = useProfileSave();

  const { register, handleSubmit, reset } = useForm<ProfileForm>({
    defaultValues: defaultProfile,
  });

  useEffect(() => {
    if (!me.data?.profile) return;

    reset({
      ...me.data.profile,
      languages: me.data.profile.languages.join(", "),
      skills: me.data.profile.skills.join(", "),
    });
  }, [me.data?.profile, reset]);

  const onSubmit = (values: ProfileForm) => {
    save.mutate({
      ...values,
      languages: values.languages
        .split(",")
        .map((x) => x.trim())
        .filter(Boolean),
      skills: values.skills
        .split(",")
        .map((x) => x.trim())
        .filter(Boolean),
    });
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <p className="text-sm text-cyan-300">Settings</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            Profile and account controls.
          </h1>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-6 lg:grid-cols-[1fr_0.8fr]"
        >
          <Card className="space-y-4">
            <h2 className="text-lg font-semibold text-white">
              Freelancer profile
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Headline</Label>
                <Input {...register("headline", { required: true })} />
              </div>

              <div className="space-y-2">
                <Label>Profession</Label>
                <Input {...register("profession", { required: true })} />
              </div>

              <div className="space-y-2">
                <Label>Country</Label>
                <Input {...register("country", { required: true })} />
              </div>

              <div className="space-y-2">
                <Label>Experience</Label>
                <Input {...register("experience")} />
              </div>

              <div className="space-y-2">
                <Label>Hourly Rate</Label>
                <Input
                  type="number"
                  {...register("hourlyRate", { valueAsNumber: true })}
                />
              </div>

              <div className="space-y-2">
                <Label>Languages</Label>
                <Input
                  {...register("languages")}
                  placeholder="English, Spanish"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Skills</Label>
              <Input {...register("skills")} placeholder="React, Next.js, UX" />
            </div>

            <div className="space-y-2">
              <Label>Bio</Label>
              <Textarea {...register("bio", { required: true })} />
            </div>

            <Button type="submit" disabled={save.isPending}>
              {save.isPending ? "Saving..." : "Save profile"}
            </Button>

            {save.error && (
              <p className="text-sm text-red-300">{save.error.message}</p>
            )}
          </Card>

          <div className="space-y-6">
            <Card className="space-y-3">
              <h2 className="text-lg font-semibold text-white">Password</h2>
              <Input type="password" placeholder="Current password" />
              <Input type="password" placeholder="New password" />
              <Button variant="secondary">Update password</Button>
            </Card>

            <Card className="space-y-4 border-red-400/20">
              <h2 className="text-lg font-semibold text-white">Danger zone</h2>

              <p className="text-sm leading-6 text-zinc-500">
                Delete account controls are UI-only until backend support is
                added.
              </p>

              <Button variant="danger">Delete account</Button>
            </Card>
          </div>
        </form>
      </div>
    </AppShell>
  );
}
