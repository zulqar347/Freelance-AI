import type {
  ApiError,
  ApiSuccessResponse,
  EducationType,
  ExperienceType,
  FreelancerProfile,
  Generation,
  MeResponse,
  Platform,
  ProjectType,
} from "@/types/frontend";

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });
  const data = (await response.json().catch(() => ({}))) as unknown;
  const apiError = data as ApiError;

  if (!response.ok || apiError.success === false) {
    const message =
      typeof apiError.error === "string"
        ? apiError.error
        : typeof apiError.message === "string"
          ? apiError.message
          : "Request failed";
    throw new Error(message);
  }

  return data as T;
}

export async function getMe() {
  const response = await request<{ success: true; data: MeResponse }>(
    "/api/me",
  );
  return response.data;
}

export async function getProfile() {
  const response = await request<{
    success?: boolean;
    profile: FreelancerProfile | null;
  }>("/api/profile");
  return response.profile;
}

export async function saveProfile(profile: FreelancerProfile) {
  const existing = await getProfile().catch(() => null);
  const response = await request<{ profile: FreelancerProfile }>(
    "/api/profile",
    {
      method: existing ? "PATCH" : "POST",
      body: JSON.stringify(profile),
    },
  );
  return response.profile;
}

export async function deleteProfile() {
  return request<{ message: string }>("/api/profile", { method: "DELETE" });
}

export async function generateProfile(
  platform: Platform,
  jobDescription?: string,
) {
  const response = await request<ApiSuccessResponse<Generation>>(
    "/api/generate/profile",
    {
      method: "POST",
      body: JSON.stringify({ platform, jobDescription }),
    },
  );
  return response.data;
}

export async function getProfiles() {
  const response = await request<ApiSuccessResponse<Generation[]>>(
    "/api/generate/profile",
  );
  return response.data;
}

export async function generateProposal(jobDescription: string) {
  const response = await request<ApiSuccessResponse<Generation>>(
    "/api/generate/proposal",
    {
      method: "POST",
      body: JSON.stringify({ jobDescription }),
    },
  );
  return response.data;
}

export async function getProposals() {
  const response = await request<ApiSuccessResponse<Generation[]>>(
    "/api/generate/proposal",
  );
  return response.data;
}

export async function generateCoverLetter(jobDescription: string) {
  const response = await request<ApiSuccessResponse<Generation>>(
    "/api/generate/cover-letter",
    {
      method: "POST",
      body: JSON.stringify({ jobDescription }),
    },
  );
  return response.data;
}

export async function getCoverLetters() {
  const response = await request<ApiSuccessResponse<Generation[]>>(
    "/api/generate/cover-letter",
  );
  return response.data;
}

export async function generateLandingPage() {
  const response = await request<{
    success: true;
    slug: string;
    url: string;
  }>("/api/generate/landing-page", {
    method: "POST",
  });

  return response;
}

export async function getLandingPage() {
  const response = await request<{
    success: true;
    data: {
      slug: string;
      url: string;
      content: Record<string, unknown>;
    } | null;
  }>("/api/generate/landing-page");

  return response.data;
}

export async function createExperience(experience: ExperienceType) {
  const response = await request<{ success: true; experience: ExperienceType }>(
    "/api/experience",
    {
      method: "POST",
      body: JSON.stringify(experience),
    },
  );
  return response.experience;
}

export async function createProject(project: ProjectType) {
  const response = await request<{ success: true; project: ProjectType }>(
    "/api/project",
    {
      method: "POST",
      body: JSON.stringify(project),
    },
  );

  return response.project;
}

export async function createCheckoutSession(plan: "Pro" | "Enterprise") {
  const response = await fetch("/api/billing/checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ plan }),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message || "Unable to create checkout session.");
  }

  return json.data;
}

export async function createBillingPortal() {
  const response = await fetch("/api/billing/portal", {
    method: "POST",
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.data;
}

// Education CRUD
export async function getEducation() {
  const response = await request<{ success: true; education: EducationType[] }>(
    "/api/education",
  );
  return response.education;
}

export async function createEducation(education: EducationType) {
  const response = await request<{ success: true; education: EducationType }>(
    "/api/education",
    {
      method: "POST",
      body: JSON.stringify(education),
    },
  );
  return response.education;
}

export async function updateEducation(id: string, data: EducationType) {
  const response = await request<{ success: true; education: EducationType }>(
    `/api/education/${id}`,
    {
      method: "PATCH",
      body: JSON.stringify(data),
    },
  );
  return response.education;
}

export async function deleteEducation(id: string) {
  return request<{ success: true }>(`/api/education/${id}`, {
    method: "DELETE",
  });
}

// Experience CRUD
export async function getExperience() {
  const response = await request<{
    success: true;
    experience: ExperienceType[];
  }>("/api/experience");
  return response.experience;
}

export async function updateExperience(id: string, data: ExperienceType) {
  const response = await request<{ success: true; experience: ExperienceType }>(
    `/api/experience/${id}`,
    {
      method: "PATCH",
      body: JSON.stringify(data),
    },
  );
  return response.experience;
}

export async function deleteExperienceItem(id: string) {
  return request<{ success: true }>(`/api/experience/${id}`, {
    method: "DELETE",
  });
}

// Project CRUD
export async function getProjects() {
  const response = await request<{ success: true; projects: ProjectType[] }>(
    "/api/project",
  );
  return response.projects;
}

export async function updateProjectItem(id: string, data: ProjectType) {
  const response = await request<{ success: true; project: ProjectType }>(
    `/api/project/${id}`,
    {
      method: "PATCH",
      body: JSON.stringify(data),
    },
  );
  return response.project;
}

export async function deleteProjectItem(id: string) {
  return request<{ success: true }>(`/api/project/${id}`, {
    method: "DELETE",
  });
}
