export type Platform = "resume" | "linkedin" | "upwork" | "fiverr";

export type UserAccount = {
  _id?: string;
  id?: string;
  name?: string;
  email?: string;
  image?: string;
  plan?: "Free" | "Pro" | "Enterprise";
  credits?: number;
};

export type FreelancerProfile = {
  _id?: string;
  headline: string;
  profession: string;
  bio: string;
  country: string;
  languages: string[];
  experience: string;
  hourlyRate: number;
  skills: string[];
};

export type EducationType = {
  _id?: string;
  id?: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: Date | string;
  endDate?: Date | string | null;
  isCurrent: boolean;
  description?: string;
};

export type ExperienceType = {
  _id?: string;
  id?: string;
  company: string;
  role: string;
  description?: string;
  startDate: Date | string;
  endDate?: Date | string | null;
  isCurrent?: boolean;
};

export type ProjectType = {
  _id?: string;
  id?: string;
  title: string;
  description?: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
};

export type Generation = {
  _id: string;
  type: "profile" | "proposal" | "cover-letter" | string;
  platform: string;
  jobDescription?: string;
  content: Record<string, unknown> | string;
  createdAt?: string;
  updatedAt?: string;
};

export type LandingPageSummary = {
  slug: string;
  url: string;
  content: Record<string, unknown>;
};

export type MeResponse = {
  user?: UserAccount | null;
  profile?: FreelancerProfile | null;
  experience?: ExperienceType[];
  projects?: ProjectType[];
  education?: EducationType[];
};

export type ApiSuccessResponse<T> = {
  success: true;
  data: T;
};

export type ApiFailureResponse = {
  success: false;
  error: string;
};

export type ApiError = {
  success?: false;
  error?: string | unknown[];
  message?: string;
};
