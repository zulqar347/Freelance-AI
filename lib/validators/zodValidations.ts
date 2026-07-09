import { z } from "zod";
export const ProfileGenerationSchema = z.object({
  platform: z.enum(["fiverr", "linkedin", "resume", "upwork"]),
});

export const ProposalGenerationSchema = z.object({
  jobDescription: z.string().min(20),
});

export const ExperienceGenerationSchema = z
  .object({
    company: z
      .string()
      .min(2, "Company name must be at least 2 characters long"),
    role: z.string().min(2, "Role must be at least 2 characters long"),
    description: z.string().optional(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().nullable().optional(),
    isCurrent: z.boolean(),
  })
  .superRefine((data, ctx) => {
    if (!data.isCurrent && !data.endDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["endDate"],
        message: "End date is required unless this is your current position.",
      });
    }
  });

export const ExperiencePatchSchema = z.object({
  company: z
    .string()
    .min(2, "Company name must be at least 2 characters long")
    .optional(),
  role: z
    .string()
    .min(2, "Role must be at least 2 characters loing")
    .optional(),
  description: z.string().optional(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional().nullable(),
  isCurrent: z.boolean().optional(),
});

export const ProjectGenerationSchema = z.object({
  title: z.string().min(2, "Project title must be at least 2 characters long"),
  description: z.string().optional(),
  technologies: z.preprocess((value) => {
    // console.log("preprocess:", value);
    if (typeof value === "string") {
      return value
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
    }

    return value;
  }, z.array(z.string()).optional()),
  liveUrl: z.string().url().optional(),
  githubUrl: z.string().url().optional(),
});

export const ProjectPatchSchema = z.object({
  title: z
    .string()
    .min(2, "Project title must be at least 2 characters long")
    .optional(),
  description: z.string().optional(),
  technologies: z.array(z.string()).optional(),
  liveUrl: z.string().url().optional(),
  githubUrl: z.string().url().optional(),
});

export const UserProfileSchema = z.object({
  headline: z.string().min(5, "Headline must be at least 5 characters long"),
  profession: z
    .string()
    .min(2, "Profession must be at least 2 characters long"),
  bio: z.string().min(10, "Bio must be at least 10 characters long"),
  country: z.string().min(2, "Country must be at least 2 characters long"),
  languages: z.array(z.string()).min(1, "At least one language is required"),
  experience: z.string().min(1, "Experience must be at least 1 character long"),
  hourlyRate: z.number().min(0, "Hourly rate must be a positive number"),
  skills: z.array(z.string()).min(1, "At least one skill is required"),
});

export const EducationGenerationSchema = z.object({
  institution: z
    .string()
    .min(2, "Institution name must be at least 2 characters long"),
  degree: z.string().min(2, "Degree must be at least 2 characters long"),
  fieldOfStudy: z
    .string()
    .min(2, "Field of study must be at least 2 characters long"),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().optional(),
  isCurrent: z.boolean(),
  description: z.string().optional(),
});

export const EducationPatchSchema = z.object({
  institution: z
    .string()
    .min(2, "Institution name must be at least 2 characters long")
    .optional(),
  degree: z
    .string()
    .min(2, "Degree must be at least 2 characters long")
    .optional(),
  fieldOfStudy: z
    .string()
    .min(2, "Field of study must be at least 2 characters long")
    .optional(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  isCurrent: z.boolean().optional(),
  description: z.string().optional(),
});
