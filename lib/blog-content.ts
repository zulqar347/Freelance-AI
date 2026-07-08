export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  category: "strategy" | "how-to" | "tooling" | "growth";
};

export const blogPosts: BlogPost[] = [
  {
    slug: "ai-proposal-generator-freelancers",
    title:
      "How Freelancers Can Use an AI Proposal Generator to Win More Clients",
    description:
      "Learn how AI proposal generators help freelancers write faster, more tailored proposals for Upwork and other platforms.",
    keywords: [
      "AI proposal generator",
      "freelance proposal writer",
      "Upwork proposal generator",
    ],
    category: "how-to",
  },
  {
    slug: "upwork-fiverr-linkedin-profile-generator",
    title:
      "The Best AI Profile Generator Workflow for Upwork, Fiverr, and LinkedIn",
    description:
      "Discover how to build stronger freelancer profiles that improve trust, clarity, and conversion across major platforms.",
    keywords: [
      "AI profile generator",
      "LinkedIn profile generator",
      "Fiverr profile generator",
    ],
    category: "strategy",
  },
  {
    slug: "ats-resume-builder-freelancers",
    title:
      "Why Freelancers Need an ATS Resume Builder for Better Job Applications",
    description:
      "See how ATS-friendly resume tools help freelancers present their experience more clearly and professionally.",
    keywords: [
      "ATS resume builder",
      "AI resume builder",
      "resume optimization",
    ],
    category: "tooling",
  },
  {
    slug: "cover-letter-generator-freelance-outreach",
    title: "Using an AI Cover Letter Generator for Better Freelance Outreach",
    description:
      "Learn how AI cover letters can speed up your applications while keeping your message specific and persuasive.",
    keywords: [
      "AI cover letter generator",
      "cover letter builder",
      "AI job application tool",
    ],
    category: "growth",
  },
];
