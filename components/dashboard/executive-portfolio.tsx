"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { PortfolioData } from "./portfolioGenerator-page";

interface TemplateProps {
  data: PortfolioData;
}

const slideUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.25, 1, 0.5, 1] },
  },
};

export const ExecutivePortfolio = React.memo(({ data }: TemplateProps) => {
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
    <div className="w-full bg-[#0B111E] text-slate-100 min-h-full font-sans p-6 md:p-14 space-y-16 selection:bg-amber-500/10">
      {/* CORPORATE EXECUTIVE PANEL HERO HEADER */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={slideUp}
        className="border-b border-slate-800/60 pb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
      >
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-white font-serif">
            {hero.name}
          </h1>
          <p className="text-sm font-medium text-amber-400 tracking-wide uppercase font-sans text-xs">
            {hero.title}
          </p>
          <p className="text-xs text-slate-400 max-w-xl font-light">
            {hero.subtitle}
          </p>
        </div>
        <div className="text-left md:text-right text-xs space-y-1 text-slate-400 font-mono shrink-0">
          {contact.email && (
            <div className="text-slate-300">{contact.email}</div>
          )}
          {contact.website && (
            <div className="text-amber-500/80">{contact.website}</div>
          )}
        </div>
      </motion.div>

      {/* BRIEF SYNOPSIS CASE */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={slideUp}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 border-l-2 border-amber-500 pl-3 h-fit">
          Executive Summary
        </h3>
        <div className="md:col-span-2 space-y-2">
          <h4 className="text-base font-semibold text-white">
            {about.headline}
          </h4>
          <p className="text-slate-300 text-xs font-light leading-relaxed">
            {about.description}
          </p>
        </div>
      </motion.section>

      {/* EXPERIENCE LEADERSHIP TIMELINE */}
      {hasExperience && (
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={slideUp}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 border-l-2 border-amber-500 pl-3 h-fit">
            Track Record
          </h3>
          <div className="md:col-span-2 space-y-8">
            {experience?.map((exp) => (
              <div key={exp.id} className="space-y-1 relative group">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h4 className="text-sm font-bold text-white">{exp.role}</h4>
                  <span className="text-xs font-mono text-amber-400 bg-amber-500/5 px-2 py-0.5 rounded border border-amber-500/10">
                    {exp.period}
                  </span>
                </div>
                <div className="text-xs font-medium text-slate-400">
                  {exp.company}
                </div>
                <p className="text-slate-300 text-xs font-light leading-relaxed pt-2">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* VENTURES AND CASE PROJECTS */}
      {hasProjects && (
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={slideUp}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 border-l-2 border-amber-500 pl-3 h-fit">
            Key Initiatives
          </h3>
          <div className="md:col-span-2 grid grid-cols-1 gap-4">
            {projects?.map((proj) => (
              <div
                key={proj.id}
                className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/40 hover:border-amber-500/20 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    {proj.title}
                  </h4>
                  {proj.link && (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-amber-400 hover:underline"
                    >
                      Review Brief
                    </a>
                  )}
                </div>
                <p className="text-slate-400 text-xs font-light mt-2 leading-relaxed">
                  {proj.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {proj.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800/60"
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

      {/* CORE EXPERTISE FIELD MATRIX */}
      {hasSkills && (
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={slideUp}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 border-l-2 border-amber-500 pl-3 h-fit">
            Expertise Matrix
          </h3>
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {skills?.categories.map((cat, idx) => (
              <div key={idx} className="space-y-1.5">
                <span className="text-xs font-semibold text-slate-200 block">
                  {cat.name}
                </span>
                <div className="text-xs text-slate-400 font-light leading-normal">
                  {cat.items.join(" / ")}
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* CREDENTIALS HIGHER ED */}
      {hasEducation && (
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={slideUp}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 border-l-2 border-amber-500 pl-3 h-fit">
            Credentials
          </h3>
          <div className="md:col-span-2 space-y-3">
            {education?.map((edu) => (
              <div
                key={edu.id}
                className="flex justify-between items-start text-xs border-b border-slate-900 pb-2"
              >
                <div>
                  <h4 className="font-bold text-white">{edu.degree}</h4>
                  <span className="text-slate-400 font-light">
                    {edu.school}
                  </span>
                </div>
                <span className="text-slate-500 font-mono">{edu.year}</span>
              </div>
            ))}
          </div>
        </motion.section>
      )}
    </div>
  );
});
ExecutivePortfolio.displayName = "ExecutivePortfolio";
