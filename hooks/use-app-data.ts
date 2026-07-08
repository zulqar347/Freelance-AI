"use client";

import {
  createBillingPortal,
  createCheckoutSession,
  createEducation,
  createExperience,
  createProject,
  deleteEducation,
  deleteExperienceItem,
  deleteProjectItem,
  generateCoverLetter,
  generateLandingPage,
  generateProfile,
  generateProposal,
  getCoverLetters,
  getLandingPage,
  getEducation,
  getExperience,
  getMe,
  getProfiles,
  getProposals,
  getProjects,
  saveProfile,
  updateEducation,
  updateExperience,
  updateProjectItem,
} from "@/services/frontend-api.service";
import type { Platform } from "@/types/frontend";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false,
  });
}

export function useProfileSave() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (profile: FreelancerProfile) => saveProfile(profile),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
}

export function useGeneratedProfiles() {
  return useQuery({
    queryKey: ["generations", "profiles"],
    queryFn: getProfiles,
    retry: false,
  });
}

export function useGenerateProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (platform: Platform) => generateProfile(platform),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["generations"] });
      void queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
}

export function useProposals() {
  return useQuery({
    queryKey: ["generations", "proposals"],
    queryFn: getProposals,
    retry: false,
  });
}

export function useGenerateProposal() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (jobDescription: string) => generateProposal(jobDescription),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["generations"] });
      void queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
}

export function useCoverLetters() {
  return useQuery({
    queryKey: ["generations", "coverLetters"],
    queryFn: getCoverLetters,
    retry: false,
  });
}

export function useGenerateCoverLetter() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (jobDescription: string) => generateCoverLetter(jobDescription),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["generations"] });
      void queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
}

export function useLandingPage() {
  return useQuery({
    queryKey: ["landing-page"],
    queryFn: getLandingPage,
    retry: false,
  });
}

export function useGenerateLandingPage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => generateLandingPage(),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["landing-page"] });
      void queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
}

export function useCreateExperience() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createExperience,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ["experience"],
      });
    },
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ["project"],
      });
      void queryClient.invalidateQueries({
        queryKey: ["me"],
      });
    },
  });
}

// Education hooks
export function useEducation() {
  return useQuery({
    queryKey: ["education"],
    queryFn: getEducation,
    retry: false,
  });
}

export function useEducationCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createEducation,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ["education"],
      });
      void queryClient.invalidateQueries({
        queryKey: ["me"],
      });
    },
  });
}

export function useEducationUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: EducationType }) =>
      updateEducation(id, data),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ["education"],
      });
      void queryClient.invalidateQueries({
        queryKey: ["me"],
      });
    },
  });
}

export function useEducationDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteEducation,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ["education"],
      });
      void queryClient.invalidateQueries({
        queryKey: ["me"],
      });
    },
  });
}

// Experience hooks
export function useExperienceList() {
  return useQuery({
    queryKey: ["experience"],
    queryFn: getExperience,
    retry: false,
  });
}

export function useExperienceCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createExperience,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ["experience"],
      });
      void queryClient.invalidateQueries({
        queryKey: ["me"],
      });
    },
  });
}

export function useExperienceUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ExperienceType }) =>
      updateExperience(id, data),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ["experience"],
      });
      void queryClient.invalidateQueries({
        queryKey: ["me"],
      });
    },
  });
}

export function useExperienceDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteExperienceItem,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ["experience"],
      });
      void queryClient.invalidateQueries({
        queryKey: ["me"],
      });
    },
  });
}

// Project hooks
export function useProjectsList() {
  return useQuery({
    queryKey: ["project"],
    queryFn: getProjects,
    retry: false,
  });
}

export function useProjectCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ["project"],
      });
      void queryClient.invalidateQueries({
        queryKey: ["me"],
      });
    },
  });
}

export function useProjectUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ProjectType }) =>
      updateProjectItem(id, data),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ["project"],
      });
      void queryClient.invalidateQueries({
        queryKey: ["me"],
      });
    },
  });
}

export function useProjectDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProjectItem,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ["project"],
      });
      void queryClient.invalidateQueries({
        queryKey: ["me"],
      });
    },
  });
}

export interface FreelancerProfile {
  id?: string;
  userId?: string;
  headline: string;
  profession: string;
  bio: string;
  country: string;
  experience: string;
  hourlyRate: number;
  languages: string[];
  skills: string[];
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface ExperienceType {
  id?: string;
  _id?: string;
  profileId?: string;
  company: string;
  role: string;
  description?: string;
  startDate: string | Date;
  endDate?: string | Date | null;
  isCurrent: boolean;
}

export interface ProjectType {
  id?: string;
  _id?: string;
  profileId?: string;
  title: string;
  description?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface EducationType {
  id?: string;
  _id?: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string | Date;
  endDate?: string | Date | null;
  isCurrent: boolean;
  description?: string;
}

// The clean, fully typed Response interface
export interface MeResponse {
  profile?: FreelancerProfile | null;
  experience?: ExperienceType[];
  projects?: ProjectType[];
}

export function useProfileStatus() {
  return useQuery<MeResponse>({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await fetch("/api/me");
      if (!res.ok) throw new Error("Failed to fetch profile overview");

      const json = await res.json();
      // Directly return the underlying payload object
      return json.data;
    },
  });
}

export function useCheckout() {
  return useMutation({
    mutationFn: createCheckoutSession,
  });
}

export function useBillingPortal() {
  return useMutation({
    mutationFn: createBillingPortal,
  });
}
