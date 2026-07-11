import { proposalPrompt } from "./proposal";
import { coverLetterPrompt } from "./coverLetter";
import {
  fiverrPrompt,
  linkedinPrompt,
  resumePrompt,
  upworkPrompt,
} from "./profile";
import { LandingPagePrompt } from "./landingPage";
import { PortfolioTemplate } from "@/types/portfolio";

export interface UserProfilePayload {
  personal: {
    name: string;
    email: string;
    country: string;
    image: string;
    languages: string[];
  };

  professional: {
    headline: string;
    profession: string;
    bio: string;
    skills: string[];
    hourlyRate?: string;
  };

  experience: Array<{
    company: string;
    role: string;
    description: string;
    startDate: string;
    endDate?: string;
    isCurrent?: boolean;
  }>;

  projects: Array<{
    title: string;
    description: string;
    technologies: string[];
    liveUrl?: string;
    githubUrl?: string;
  }>;

  education: Array<{
    institution: string;
    degree: string;
    fieldOfStudy: string;
    description?: string;
    startDate?: string;
    endDate?: string;
  }>;
}

export function buildProfilePrompt(
  platform: "linkedin" | "fiverr" | "upwork" | "resume",
  profile: UserProfilePayload,
  jobDescription?: string,
) {
  const prompts = {
    linkedin: linkedinPrompt,
    fiverr: fiverrPrompt,
    upwork: upworkPrompt,
    resume: resumePrompt,
  };

  let userContent = JSON.stringify(profile, null, 2);

  if (platform === "resume" && jobDescription?.trim()) {
    userContent += `

Job Description:
${jobDescription}

Instructions:
- Tailor the resume specifically to this job description.
- Naturally incorporate relevant ATS keywords from the job description.
- Prioritize the candidate's most relevant skills, experience, and projects.
- Do not invent qualifications or experience that are not present in the profile.
- Keep the resume ATS-friendly and truthful.
`;
  }

  return {
    systemInstruction: prompts[platform],
    userContent,
  };
}

export function buildProposalPrompt(
  profile: UserProfilePayload,
  jobDescription: string,
) {
  return {
    systemInstruction: proposalPrompt,
    userContent: `
Profile:
${JSON.stringify(profile, null, 2)}

Job Description:
${jobDescription}
`,
  };
}

export function buildCoverLetterPrompt(
  profile: UserProfilePayload,
  jobDescription: string,
) {
  return {
    systemInstruction: coverLetterPrompt,
    userContent: `
Profile:
${JSON.stringify(profile, null, 2)}

Job Description:
${jobDescription}
`,
  };
}

export function buildLandingPagePrompt(profile: UserProfilePayload) {
  return {
    systemInstruction: LandingPagePrompt,
    userContent: JSON.stringify(profile, null, 2),
  };
}
