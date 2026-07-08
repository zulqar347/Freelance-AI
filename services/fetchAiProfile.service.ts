import ConnectDB from "@/lib/db";
import Education from "@/lib/models/Education";
import Experience from "@/lib/models/Experience";
import Profile from "@/lib/models/Profile";
import Project from "@/lib/models/Project";
import User from "@/lib/models/User";
import { UserProfilePayload } from "@/lib/prompts/builder";

export const fetchAiProfile = async (userId: string) => {
  await ConnectDB();
  // 2. Concurrently fetch all related collections from MongoDB
  const [user, profile, experience, projects, education] = await Promise.all([
    User.findById(userId).select("-password"),
    Profile.findOne({ userId }),
    Experience.find({ userId }),
    Project.find({ userId }),
    Education.find({ userId }),
  ]);

  // 3. Fallback validation if the core profile doesn't exist yet
  if (!profile || !user) {
    throw new Error(
      "PROFILE_DATA_NOT_FOUND, Plz visit /career-profile to create your onboarding data",
    );
  }

  // 4. Build your clean, optimized aiProfile payload
  const aiProfile: UserProfilePayload = {
    personal: {
      name: user?.name,
      email: user?.email,
      country: profile?.country,
      image: user?.image || "",
      languages: Array.isArray(profile?.languages) ? profile.languages : [],
    },

    professional: {
      headline: profile?.headline,
      profession: profile?.profession,
      bio: profile?.bio,
      skills: Array.isArray(profile?.skills) ? profile.skills : [],
      hourlyRate: profile?.hourlyRate?.toString() || undefined,
    },

    experience: experience.map((exp) => ({
      company: String(exp.company || ""),
      role: String(exp.role || ""),
      description: String(exp.description || ""),
      startDate:
        exp.startDate instanceof Date
          ? exp.startDate.toISOString().split("T")[0]
          : String(exp.startDate || ""),
      endDate:
        exp.endDate instanceof Date
          ? exp.endDate.toISOString().split("T")[0]
          : String(exp.endDate || "Present"),
    })),

    projects: projects.map((p) => ({
      title: String(p.title || ""),
      description: String(p.description || ""),
      technologies: Array.isArray(p.technologies) ? p.technologies : [],
      liveUrl: p.liveUrl || undefined,
      githubUrl: p.githubUrl || undefined,
    })),

    education: education.map((edu) => ({
      institution: String(edu.institution || ""),
      degree: String(edu.degree || ""),
      fieldOfStudy: String(edu.fieldOfStudy || ""),
      description: String(edu.description || ""),
      startDate: String(edu.startDate || ""),
      endDate: String(edu.endDate || ""),
    })),
  };

  return aiProfile;
};
