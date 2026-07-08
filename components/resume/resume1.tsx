import React from "react";

// --- Type Definitions updated to match optional/omitted fields ---
export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  highlights: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  school: string;
  location: string;
  period: string;
  details?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  technologies: string[];
  description: string;
  link?: string;
}

export interface ResumeData {
  fullName: string;
  title: string;
  email?: string; // Optional based on backend prompt
  phone?: string; // Optional based on backend prompt
  location?: string; // Optional based on backend prompt
  avatarUrl?: string; // Optional based on backend prompt
  website?: string; // Optional based on backend prompt
  linkedin?: string; // Optional based on backend prompt
  github?: string; // Optional based on backend prompt
  summary: string;
  skills?: {
    // Section omitted completely if empty
    categories: { name: string; items: string[] }[];
  };
  experience?: ExperienceItem[]; // Section omitted completely if empty
  education?: EducationItem[]; // Section omitted completely if empty
  projects?: ProjectItem[]; // Section omitted completely if empty
}

export type ThemeColor = "indigo" | "emerald" | "slate" | "amber" | "blue";

interface ResumeTemplateProps {
  data: ResumeData;
  colorTheme?: ThemeColor;
}

const themeStyles: Record<
  ThemeColor,
  { text: string; border: string; bg: string; pill: string }
> = {
  indigo: {
    text: "text-indigo-600",
    border: "border-indigo-600",
    bg: "bg-indigo-50",
    pill: "bg-indigo-50 text-indigo-700 border-indigo-200",
  },
  emerald: {
    text: "text-emerald-600",
    border: "border-emerald-600",
    bg: "bg-emerald-50",
    pill: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  slate: {
    text: "text-slate-800",
    border: "border-slate-800",
    bg: "bg-slate-100",
    pill: "bg-slate-100 text-slate-800 border-slate-300",
  },
  amber: {
    text: "text-amber-700",
    border: "border-amber-700",
    bg: "bg-amber-50",
    pill: "bg-amber-50 text-amber-800 border-amber-200",
  },
  blue: {
    text: "text-blue-600",
    border: "border-blue-600",
    bg: "bg-blue-50",
    pill: "bg-blue-50 text-blue-700 border-blue-200",
  },
};

export const ModernAtsResume: React.FC<ResumeTemplateProps> = ({
  data,
  colorTheme = "indigo",
}) => {
  const activeTheme = themeStyles[colorTheme];

  // Helper utility to safely construct contact items without hanging/trailing separator lines
  const contactItems = [
    data.email,
    data.phone,
    data.location,
    data.website ? (
      <a
        key="web"
        href={data.website}
        target="_blank"
        rel="noreferrer"
        className="hover:underline"
      >
        {data.website.replace(/^https?:\/\//, "")}
      </a>
    ) : null,
    data.linkedin ? (
      <a
        key="li"
        href={data.linkedin}
        target="_blank"
        rel="noreferrer"
        className="hover:underline"
      >
        LinkedIn
      </a>
    ) : null,
    data.github ? (
      <a
        key="gh"
        href={data.github}
        target="_blank"
        rel="noreferrer"
        className="hover:underline"
      >
        GitHub
      </a>
    ) : null,
  ].filter(Boolean);

  return (
    <div
      id="resume-print-canvas"
      className="w-full max-w-4xl mx-auto p-8 md:p-12 bg-white text-slate-800 shadow-sm font-sans selection:bg-slate-200 print:p-0 print:shadow-none"
    >
      {/* HEADER SECTION */}
      <header className="border-b pb-6 border-slate-200">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
          {data.fullName}
        </h1>
        <p className={`text-xl font-medium mt-1 ${activeTheme.text}`}>
          {data.title}
        </p>

        {/* Dynamic Contact Row (clean separator handling) */}
        {contactItems.length > 0 && (
          <div className="flex flex-wrap gap-y-2 gap-x-4 mt-4 text-sm text-slate-600">
            {contactItems.map((item, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && (
                  <span className="text-slate-300 select-none">•</span>
                )}
                <span>{item}</span>
              </React.Fragment>
            ))}
          </div>
        )}
      </header>

      {/* SUMMARY */}
      {data.summary && (
        <section className="mt-6">
          <p className="text-sm leading-relaxed text-slate-700 whitespace-pre-line">
            {data.summary}
          </p>
        </section>
      )}

      {/* WORK EXPERIENCE */}
      {data.experience && data.experience.length > 0 && (
        <section className="mt-8">
          <h2
            className={`text-sm font-bold tracking-wider uppercase border-b-2 pb-1 ${activeTheme.border} ${activeTheme.text}`}
          >
            Professional Experience
          </h2>
          <div className="mt-4 space-y-6">
            {data.experience.map((exp) => (
              <div key={exp.id} className="group">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                  <h3 className="text-base font-bold text-slate-900">
                    {exp.role}{" "}
                    <span className="font-normal text-slate-500">at</span>{" "}
                    {exp.company}
                  </h3>
                  <span className="text-sm font-medium text-slate-500 sm:text-right shrink-0">
                    {exp.period}
                  </span>
                </div>
                <p className="text-xs text-slate-500 italic mt-0.5">
                  {exp.location}
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1.5 text-sm text-slate-700">
                  {exp.highlights.map((bullet, idx) => (
                    <li key={idx}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* KEY PROJECTS */}
      {data.projects && data.projects.length > 0 && (
        <section className="mt-8">
          <h2
            className={`text-sm font-bold tracking-wider uppercase border-b-2 pb-1 ${activeTheme.border} ${activeTheme.text}`}
          >
            Featured Projects
          </h2>
          <div className="mt-4 space-y-4">
            {data.projects.map((project) => (
              <div key={project.id}>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                  <h3 className="text-base font-bold text-slate-900">
                    {project.title}
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-normal ml-2 text-slate-400 hover:underline"
                      >
                        [Link]
                      </a>
                    )}
                  </h3>
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1 sm:mt-0">
                      {project.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="text-xs font-mono bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <p className="text-sm text-slate-700 mt-1.5">
                  {project.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SKILLS SECTION */}
      {data.skills?.categories && data.skills.categories.length > 0 && (
        <section className="mt-8">
          <h2
            className={`text-sm font-bold tracking-wider uppercase border-b-2 pb-1 ${activeTheme.border} ${activeTheme.text}`}
          >
            Skills & Core Competencies
          </h2>
          <div className="mt-4 space-y-2.5">
            {data.skills.categories.map((category, idx) => (
              <div
                key={idx}
                className="text-sm grid grid-cols-1 md:grid-cols-12 gap-1 md:gap-4"
              >
                <span className="font-bold text-slate-800 md:col-span-3">
                  {category.name}:
                </span>
                <span className="text-slate-700 md:col-span-9">
                  {category.items.join(", ")}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* EDUCATION */}
      {data.education && data.education.length > 0 && (
        <section className="mt-8">
          <h2
            className={`text-sm font-bold tracking-wider uppercase border-b-2 pb-1 ${activeTheme.border} ${activeTheme.text}`}
          >
            Education
          </h2>
          <div className="mt-4 space-y-4">
            {data.education.map((edu) => (
              <div
                key={edu.id}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline"
              >
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {edu.degree}
                  </h3>
                  <p className="text-sm text-slate-700">{edu.school}</p>
                  {edu.details && (
                    <p className="text-xs text-slate-500 mt-0.5">
                      {edu.details}
                    </p>
                  )}
                </div>
                <div className="text-sm font-medium text-slate-500 sm:text-right mt-1 sm:mt-0 shrink-0">
                  <div>{edu.period}</div>
                  <div className="text-xs font-normal italic">
                    {edu.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
