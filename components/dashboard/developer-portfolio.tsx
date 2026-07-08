"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PortfolioData } from "./portfolioGenerator-page";

interface TemplateProps {
  data: PortfolioData;
}

const animationVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export const DeveloperPortfolio = React.memo(({ data }: TemplateProps) => {
  const { hero, about, skills, projects, experience, education, contact } =
    data;

  const hasSkills = useMemo(
    () => !!(skills?.categories && skills.categories.length > 0),
    [skills],
  );
  const hasProjects = useMemo(
    () => !!(projects && projects.length > 0),
    [projects],
  );
  const hasExperience = useMemo(
    () => !!(experience && experience.length > 0),
    [experience],
  );
  const hasEducation = useMemo(
    () => !!(education && education.length > 0),
    [education],
  );

  return (
    <div className="w-full bg-black text-zinc-100 min-h-full font-mono selection:bg-cyan-500/20 text-xs p-6 md:p-12 space-y-16">
      {/* HERO SECTION */}
      <motion.header
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={animationVariants}
        className="space-y-4 max-w-2xl"
      >
        <div className="text-cyan-400 font-mono text-xs tracking-widest uppercase">
          ROOT INITIALIZATION
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white font-sans">
          {hero.name}
        </h1>
        <p className="text-sm font-medium text-zinc-300">
          {hero.title} <span className="text-zinc-600">—</span> {hero.subtitle}
        </p>
      </motion.header>

      {/* ABOUT LAYER */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={animationVariants}
        className="space-y-2 max-w-3xl"
      >
        <div className="text-zinc-500 text-[10px] uppercase tracking-widest font-bold">
          01 / OVERVIEW
        </div>
        <h2 className="text-base font-bold text-white font-sans">
          {about.headline}
        </h2>
        <p className="text-zinc-400 leading-relaxed font-sans text-sm">
          {about.description}
        </p>
      </motion.section>

      {/* TECH STACK MODULE */}
      {hasSkills && (
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={animationVariants}
          className="space-y-4"
        >
          <div className="text-zinc-500 text-[10px] uppercase tracking-widest font-bold">
            02 / CAPABILITIES MATRIX
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skills?.categories.map((cat, idx) => (
              <div
                key={idx}
                className="border border-zinc-900 bg-zinc-950 p-4 rounded-xl"
              >
                <span className="text-zinc-400 font-bold block mb-2">
                  {cat.name}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {cat.items.map((item, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 rounded bg-zinc-900 text-[11px] text-cyan-400 border border-zinc-800"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* APP PRODUCTION REPOSITORIES */}
      {hasProjects && (
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={animationVariants}
          className="space-y-4"
        >
          <div className="text-zinc-500 text-[10px] uppercase tracking-widest font-bold">
            03 / FUNCTIONAL SOURCE ARTIFACTS
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects?.map((proj) => (
              <div
                key={proj.id}
                className="border border-zinc-950 bg-gradient-to-br from-zinc-950 to-black p-5 rounded-xl flex flex-col justify-between group hover:border-zinc-800 transition-all duration-300"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <h4 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors font-sans">
                      {proj.title}
                    </h4>
                    {proj.link && (
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-zinc-600 hover:text-white transition"
                      >
                        <ArrowUpRight className="size-4" />
                      </a>
                    )}
                  </div>
                  <p className="text-zinc-400 text-xs font-sans leading-relaxed">
                    {proj.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1 mt-4">
                  {proj.technologies.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] text-zinc-500 bg-zinc-900 px-1.5 py-0.5 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* TIMELINE ARCHITECTURE */}
      {hasExperience && (
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={animationVariants}
          className="space-y-4"
        >
          <div className="text-zinc-500 text-[10px] uppercase tracking-widest font-bold">
            04 / SYSTEM EXP HISTORY
          </div>
          <div className="border-l border-zinc-900 ml-2 pl-6 space-y-6">
            {experience?.map((exp) => (
              <div key={exp.id} className="relative group">
                <span className="absolute -left-[31px] top-1.5 size-2 rounded-full bg-zinc-800 group-hover:bg-cyan-500 transition-colors" />
                <div className="text-[11px] text-zinc-500 font-mono mb-1">
                  {exp.period}
                </div>
                <h4 className="text-sm font-bold text-white font-sans">
                  {exp.role}
                </h4>
                <div className="text-xs text-cyan-400 mb-2">{exp.company}</div>
                <p className="text-zinc-400 font-sans text-xs leading-relaxed max-w-2xl">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* EDUCATION */}
      {hasEducation && (
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={animationVariants}
          className="space-y-4"
        >
          <div className="text-zinc-500 text-[10px] uppercase tracking-widest font-bold">
            05 / SCHOLASTIC ROSTER
          </div>
          <div className="grid grid-cols-1 gap-3">
            {education?.map((edu) => (
              <div
                key={edu.id}
                className="flex justify-between items-start border-b border-zinc-900 pb-2"
              >
                <div>
                  <h4 className="text-xs font-bold text-white font-sans">
                    {edu.degree}
                  </h4>
                  <p className="text-zinc-500 text-xs font-sans">
                    {edu.school}
                  </p>
                </div>
                <span className="text-zinc-500 text-xs font-mono">
                  {edu.year}
                </span>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* CONTACT METADATA BRACKET */}
      <motion.footer
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={animationVariants}
        className="pt-8 border-t border-zinc-900 flex flex-wrap gap-4 items-center justify-between text-zinc-500 text-xs"
      >
        <span> CHANNEL STREAMS RECOVERY READY</span>
        <div className="flex items-center gap-4">
          {contact.email && (
            <a
              href={`mailto:${contact.email}`}
              className="hover:text-cyan-400 transition"
              title="Email"
            >
              <svg
                className="size-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </a>
          )}
          {contact.github && (
            <a
              href={contact.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-cyan-400 transition"
              title="GitHub"
            >
              <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                />
              </svg>
            </a>
          )}
          {contact.linkedin && (
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-cyan-400 transition"
              title="LinkedIn"
            >
              <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                />
              </svg>
            </a>
          )}
          {contact.website && (
            <a
              href={contact.website}
              target="_blank"
              rel="noreferrer"
              className="hover:text-cyan-400 transition"
              title="Website"
            >
              <svg
                className="size-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="2" x2="22" y1="12" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </a>
          )}
        </div>
      </motion.footer>
    </div>
  );
});
DeveloperPortfolio.displayName = "DeveloperPortfolio";
