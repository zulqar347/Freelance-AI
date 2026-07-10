import React from "react";
import Image from "next/image";
import { ResumeData, ThemeColor } from "./resume1";

interface TemplateProps {
  data: ResumeData;
  colorTheme: ThemeColor;
}

const themeBgClasses: Record<ThemeColor, string> = {
  indigo: "bg-indigo-950 text-indigo-100",
  emerald: "bg-emerald-950 text-emerald-100",
  blue: "bg-blue-950 text-blue-100",
  amber: "bg-amber-950 text-amber-100",
  slate: "bg-slate-900 text-slate-100",
};

const themeTextClasses: Record<ThemeColor, string> = {
  indigo: "text-indigo-500 border-indigo-300",
  emerald: "text-emerald-500 border-emerald-300",
  blue: "text-blue-500 border-blue-300",
  amber: "text-amber-600 border-amber-300",
  slate: "text-slate-700 border-slate-300",
};

// ATS-safe font stack used specifically at export/print time. Some ATS PDF
// parsers mis-map glyphs with unusual or web fonts; Arial/Helvetica/Calibri
// are the safest, most universally recognized fallbacks.
const ATS_SAFE_FONT_STACK =
  "Arial, Helvetica, 'Liberation Sans', Calibri, sans-serif";

export const ExecutiveSidebarResume: React.FC<TemplateProps> = ({
  data,
  colorTheme,
}) => {
  const hasSkills =
    data.skills?.categories && data.skills.categories.length > 0;
  const hasExperience = data.experience && data.experience.length > 0;
  const hasProjects = data.projects && data.projects.length > 0;
  const hasEducation = data.education && data.education.length > 0;

  return (
    <div
      id="resume-print-canvas"
      className="w-full max-w-[8.5in] mx-auto bg-white text-slate-800 font-sans
      grid grid-cols-1 md:grid-cols-12 print:grid-cols-12
      shadow-sm print:shadow-none overflow-hidden"
    >
      {/* Printed/exported output intentionally matches the on-screen preview
          exactly (same columns, colors, and photo). The only print-only tweak
          is an invisible font-family fallback for ATS text parsing. */}
      <style>{`
        @media print {
          #resume-print-canvas, #resume-print-canvas * {
            font-family: ${ATS_SAFE_FONT_STACK} !important;
          }
        }
      `}</style>

      <aside
        className={`ats-sidebar col-span-12 md:col-span-4 print:col-span-4
        p-8 flex flex-col gap-6
        ${themeBgClasses[colorTheme]}
        print:[-webkit-print-color-adjust:exact]
        print:[print-color-adjust:exact]`}
      >
        {data.avatarUrl && (
          <div className="flex justify-center md:justify-start">
            <Image
              src={data.avatarUrl}
              alt={data.fullName}
              width={112}
              height={112}
              className="rounded-full object-cover border-2 border-white/20 shadow-md"
            />
          </div>
        )}

        <div>
          <h1 className="text-2xl font-bold text-white">{data.fullName}</h1>
          <p className="mt-1 text-sm opacity-90">{data.title}</p>
        </div>

        <div className="space-y-2 border-t border-white/10 pt-4 text-xs">
          {data.email && <p className="break-all">{data.email}</p>}
          {data.phone && <p>{data.phone}</p>}
          {data.location && <p>{data.location}</p>}
          {data.website && (
            <p className="break-all">
              {data.website.replace(/^https?:\/\//, "")}
            </p>
          )}
          {data.linkedin && <p className="break-all">{data.linkedin}</p>}
          {data.github && <p className="break-all">{data.github}</p>}
        </div>

        {hasSkills && (
          <div className="border-t border-white/10 pt-4">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wider">
              Skills
            </h3>

            <div className="space-y-4">
              {data.skills!.categories.map((cat, idx) => (
                <div key={idx}>
                  <p className="text-xs font-semibold opacity-80">{cat.name}</p>
                  <p className="mt-1 text-xs leading-relaxed">
                    {cat.items.join(", ")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>

      <main className="col-span-12 md:col-span-8 print:col-span-8 p-8 md:p-10 flex flex-col gap-8">
        {data.summary && (
          <section>
            <h2
              className={`mb-3 border-b pb-1 text-xs font-bold uppercase tracking-wider ${themeTextClasses[colorTheme]}`}
            >
              Professional Profile
            </h2>
            <p className="text-sm leading-7 text-slate-600 whitespace-pre-line">
              {data.summary}
            </p>
          </section>
        )}

        {hasExperience && (
          <section>
            <h2
              className={`mb-4 border-b pb-1 text-xs font-bold uppercase tracking-wider ${themeTextClasses[colorTheme]}`}
            >
              Experience
            </h2>

            <div className="space-y-6">
              {data.experience!.map((exp) => (
                <div key={exp.id} className="break-inside-avoid-page">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h3 className="font-bold text-slate-900">{exp.role}</h3>
                      <p className="text-xs text-slate-500">
                        {exp.company}
                        {exp.location ? ` | ${exp.location}` : ""}
                      </p>
                    </div>
                    <span className="text-xs text-slate-400 whitespace-nowrap">
                      {exp.period}
                    </span>
                  </div>

                  <ul className="mt-3 list-disc pl-5 text-sm text-slate-600 space-y-1">
                    {exp.highlights.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {hasProjects && (
          <section>
            <h2
              className={`mb-4 border-b pb-1 text-xs font-bold uppercase tracking-wider ${themeTextClasses[colorTheme]}`}
            >
              Projects
            </h2>

            <div className="space-y-5">
              {data.projects!.map((project) => (
                <div key={project.id} className="break-inside-avoid-page">
                  <div className="flex justify-between gap-4 items-start">
                    <h3 className="font-semibold">{project.title}</h3>
                    {project.technologies &&
                      project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1 justify-end">
                          {project.technologies.map((tech, i) => (
                            <span
                              key={i}
                              className="rounded bg-slate-100 px-2 py-0.5 text-[10px]"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                  </div>

                  <p className="mt-2 text-sm text-slate-600">
                    {project.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {hasEducation && (
          <section>
            <h2
              className={`mb-4 border-b pb-1 text-xs font-bold uppercase tracking-wider ${themeTextClasses[colorTheme]}`}
            >
              Education
            </h2>

            <div className="space-y-4">
              {data.education!.map((edu) => (
                <div
                  key={edu.id}
                  className="flex justify-between items-start gap-4 break-inside-avoid-page"
                >
                  <div>
                    <h3 className="font-bold">{edu.degree}</h3>
                    <p className="text-sm text-slate-600">{edu.school}</p>
                    {edu.details && (
                      <p className="mt-1 text-xs text-slate-500">
                        {edu.details}
                      </p>
                    )}
                  </div>

                  <div className="text-right text-xs text-slate-500 whitespace-nowrap">
                    <p>{edu.period}</p>
                    <p>{edu.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};
