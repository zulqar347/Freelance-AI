export type PortfolioTemplate = "minimal" | "developer" | "executive";

export interface PortfolioData {
  hero: {
    name: string;
    title: string;
    subtitle: string;
    image?: string;
  };

  about: {
    headline: string;
    description: string;
  };

  skills?: {
    categories: {
      name: string;
      items: string[];
    }[];
  };

  projects?: {
    id: string;
    title: string;
    description: string;
    technologies: string[];
    image?: string;
    link?: string;
  }[];

  experience?: {
    id: string;
    company: string;
    role: string;
    period: string;
    description: string;
  }[];

  education?: {
    id: string;
    degree: string;
    school: string;
    year: string;
  }[];

  contact: {
    email?: string;
    github?: string;
    linkedin?: string;
    website?: string;
  };

  seo: {
    title: string;
    description: string;
  };
}
