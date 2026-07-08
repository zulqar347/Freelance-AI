"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { PortfolioData } from "./portfolioGenerator-page";

interface TemplateProps {
  data: PortfolioData;
}

const faders = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1.0] },
  },
};

export const MinimalPortfolio = React.memo(({ data }: TemplateProps) => {
  const { hero, about, skills, projects, experience, contact } = data;

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

  return (
    <div className="w-full bg-white text-neutral-900 min-h-full font-sans tracking-tight p-8 md:p-16 space-y-20 selection:bg-neutral-100">
      {/* HERO SECTION */}
      <motion.header
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={faders}
        className="max-w-2xl space-y-3"
      >
        <h1 className="text-4xl font-light text-neutral-900 tracking-tighter">
          {hero.name}
        </h1>
        <p className="text-sm text-neutral-500 font-medium tracking-normal">
          {hero.title} &mdash; {hero.subtitle}
        </p>
      </motion.header>

      {/* CORE IDENTITY STATEMENT */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={faders}
        className="max-w-2xl space-y-2"
      >
        <span className="text-[10px] tracking-widest text-neutral-400 font-bold uppercase block">
          Statement
        </span>
        <p className="text-lg text-neutral-800 font-light leading-relaxed">
          {about.description}
        </p>
      </motion.section>

      {/* ARCHITECTURAL WORKS GRIDS */}
      {hasProjects && (
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={faders}
          className="space-y-6"
        >
          <span className="text-[10px] tracking-widest text-neutral-400 font-bold uppercase block">
            Selected Architecture
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects?.map((proj) => (
              <div
                key={proj.id}
                className="group border-t border-neutral-100 pt-4 space-y-2"
              >
                <div className="flex items-baseline justify-between">
                  <h3 className="text-sm font-medium text-neutral-900">
                    {proj.title}
                  </h3>
                  {proj.link && (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-neutral-400 hover:text-neutral-900 transition font-mono"
                    >
                      Index &rarr;
                    </a>
                  )}
                </div>
                <p className="text-xs text-neutral-500 leading-relaxed font-light">
                  {proj.description}
                </p>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* EXPERIENCE MATRIX INDEX */}
      {hasExperience && (
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={faders}
          className="space-y-4"
        >
          <span className="text-[10px] tracking-widest text-neutral-400 font-bold uppercase block">
            Chronological Index
          </span>
          <div className="divide-y divide-neutral-100">
            {experience?.map((exp) => (
              <div
                key={exp.id}
                className="py-4 grid grid-cols-1 md:grid-cols-4 gap-2 items-start"
              >
                <span className="text-xs font-mono text-neutral-400">
                  {exp.period}
                </span>
                <div className="md:col-span-3 space-y-1">
                  <h4 className="text-xs font-medium text-neutral-900">
                    {exp.role}
                  </h4>
                  <div className="text-xs text-neutral-500">{exp.company}</div>
                  <p className="text-xs text-neutral-400 leading-relaxed font-light mt-2 max-w-xl">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* SIMPLIFIED METHODICAL TAXONOMY SKILLS */}
      {hasSkills && (
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={faders}
          className="space-y-4"
        >
          <span className="text-[10px] tracking-widest text-neutral-400 font-bold uppercase block">
            Taxonomy Frameworks
          </span>
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            {skills?.categories.map((cat, idx) => (
              <div key={idx} className="space-y-1">
                <span className="text-xs font-medium text-neutral-900 block">
                  {cat.name}
                </span>
                <p className="text-xs text-neutral-400 font-light max-w-xs">
                  {cat.items.join(", ")}
                </p>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* MINIMAL SUB FOOTER BLOCK LINKAGES */}
      <motion.footer
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={faders}
        className="pt-8 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-400"
      >
        <span>Assigned Scope &copy; {new Date().getFullYear()}</span>
        <div className="flex items-center gap-4">
          {contact.email && (
            <a
              href={`mailto:${contact.email}`}
              className="hover:text-neutral-900 transition"
            >
              Email
            </a>
          )}
          {contact.github && (
            <a
              href={contact.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-neutral-900 transition"
            >
              GitHub
            </a>
          )}
          {contact.linkedin && (
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-neutral-900 transition"
            >
              LinkedIn
            </a>
          )}
        </div>
      </motion.footer>
    </div>
  );
});
MinimalPortfolio.displayName = "MinimalPortfolio";
