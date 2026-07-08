// LuxuryATSResume.tsx
// Premium ATS-friendly resume template.
// Uses the same ResumeData interface as resume1.tsx.

import React from "react";
import Image from "next/image";
import { ResumeData, ThemeColor } from "./resume1";

interface Props {
  data: ResumeData;
  colorTheme: ThemeColor;
}

const accent: Record<ThemeColor, string> = {
  indigo: "border-indigo-600 text-indigo-600 bg-indigo-50",
  emerald: "border-emerald-600 text-emerald-600 bg-emerald-50",
  blue: "border-blue-600 text-blue-600 bg-blue-50",
  amber: "border-amber-700 text-amber-700 bg-amber-50",
  slate: "border-slate-700 text-slate-700 bg-slate-100",
};

export const LuxuryATSResume: React.FC<Props> = ({ data, colorTheme }) => {
  const a = accent[colorTheme];

  return (
    <div
      id="resume-print-canvas"
      className="mx-auto w-full max-w-[8.5in] bg-white text-slate-800 shadow-sm print:shadow-none"
    >
      <div className="p-10">
        <header className="border-b-2 border-slate-200 pb-8">
          <div className="flex items-center gap-6">
            {data.avatarUrl && (
              <Image
                src={data.avatarUrl}
                alt={data.fullName}
                width={92}
                height={92}
                className="rounded-xl object-cover border border-slate-200"
              />
            )}

            <div className="flex-1">
              <h1 className="text-4xl font-bold tracking-tight">
                {data.fullName}
              </h1>
              <p className={`mt-2 text-lg font-medium ${a.split(" ")[1]}`}>
                {data.title}
              </p>

              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm text-slate-600">
                <span>{data.email}</span>
                <span>{data.phone}</span>
                <span>{data.location}</span>
                {data.linkedin && <span>{data.linkedin}</span>}
                {data.github && <span>{data.github}</span>}
              </div>
            </div>
          </div>
        </header>

        <section className="mt-8 rounded-xl border border-slate-200 p-5 break-inside-avoid-page">
          <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-slate-500">
            Professional Summary
          </h2>
          <p className="text-sm leading-7 whitespace-pre-line">
            {data.summary}
          </p>
        </section>

        <div className="mt-8 grid grid-cols-12 gap-8">
          <aside className="col-span-4">
            <section className="rounded-xl border border-slate-200 p-5">
              <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-slate-500">
                Skills
              </h2>
              <div className="space-y-4">
                {data.skills.categories.map((c, i) => (
                  <div key={i}>
                    <h3 className="mb-2 text-sm font-semibold">{c.name}</h3>
                    <div className="flex flex-wrap gap-2">
                      {c.items.map((s, j) => (
                        <span
                          key={j}
                          className={`rounded-full border px-3 py-1 text-xs ${a}`}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-6 rounded-xl border border-slate-200 p-5 break-inside-avoid-page">
              <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-slate-500">
                Education
              </h2>
              {data.education.map((e) => (
                <div key={e.id} className="mb-4">
                  <h3 className="font-semibold">{e.degree}</h3>
                  <p className="text-sm text-slate-600">{e.school}</p>
                  <p className="text-xs text-slate-500">{e.period}</p>
                </div>
              ))}
            </section>
          </aside>

          <main className="col-span-8">
            <section className="rounded-xl border border-slate-200 p-5">
              <h2 className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-slate-500">
                Experience
              </h2>
              <div className="space-y-7">
                {data.experience.map((exp) => (
                  <div key={exp.id} className="break-inside-avoid-page">
                    <div className="flex justify-between gap-4">
                      <div>
                        <h3 className="font-bold">{exp.role}</h3>
                        <p className="text-sm text-slate-600">
                          {exp.company} • {exp.location}
                        </p>
                      </div>
                      <span className="text-xs whitespace-nowrap text-slate-500">
                        {exp.period}
                      </span>
                    </div>
                    <ul className="mt-3 list-disc pl-5 space-y-1 text-sm">
                      {exp.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-6 rounded-xl border border-slate-200 p-5">
              <h2 className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-slate-500">
                Featured Projects
              </h2>
              <div className="space-y-5">
                {data.projects.map((p) => (
                  <div
                    key={p.id}
                    className="rounded-lg bg-slate-50 p-4 break-inside-avoid-page"
                  >
                    <div className="flex justify-between gap-3">
                      <h3 className="font-semibold">{p.title}</h3>
                      <div className="flex flex-wrap gap-1">
                        {p.technologies.map((t, i) => (
                          <span
                            key={i}
                            className={`rounded border px-2 py-0.5 text-[10px] ${a}`}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-slate-600">
                      {p.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};
