"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Menu,
  X,
  Terminal,
  Layers,
  Briefcase,
  GraduationCap,
  Mail,
  ExternalLink,
} from "lucide-react";
import { PortfolioData } from "@/types/portfolio";

// ============================================================================
// SIMPLE CLEAN SVG ICONS
// ============================================================================

const GithubIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export function MinimalPortfolio({ data }: { data: PortfolioData }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { hero, about, skills, projects, experience, education, contact } =
    data;

  const sections = [
    { label: "About", id: "#about", icon: Briefcase },
    ...(skills?.categories
      ? [{ label: "Skills", id: "#skills", icon: Terminal }]
      : []),
    ...(projects?.length
      ? [{ label: "Projects", id: "#projects", icon: Layers }]
      : []),
    ...(experience?.length
      ? [{ label: "Experience", id: "#experience", icon: Briefcase }]
      : []),
    ...(education?.length
      ? [{ label: "Education", id: "#education", icon: GraduationCap }]
      : []),
  ];

  return (
    <div className="bg-[#0b0b0c] text-zinc-400 font-sans min-h-screen selection:bg-zinc-800 selection:text-white antialiased relative">
      {/* Background soft glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-125 bg-linear-to-b from-emerald-500/5 via-transparent to-transparent blur-[120px] pointer-events-none" />

      {/* FIXED NAVBAR */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-200 border-b ${
          scrolled
            ? "bg-[#0b0b0c]/80 backdrop-blur-md border-zinc-900 py-4"
            : "bg-transparent border-transparent py-6"
        }`}
      >
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
          <Link
            href="#"
            className="text-white text-sm font-medium tracking-tight flex items-center gap-2"
          >
            <span className="size-2 rounded-full bg-emerald-500" />
            {hero.name}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {sections.map((sec) => (
              <a
                key={sec.label}
                href={sec.id}
                className="text-xs font-medium text-zinc-400 hover:text-white transition-colors"
              >
                {sec.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center">
            {contact.email && (
              <a
                href={`mailto:${contact.email}`}
                className="text-xs font-medium text-black bg-white px-4 py-2 rounded-md hover:bg-zinc-200 transition-all"
              >
                Contact Me
              </a>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-zinc-400 hover:text-white p-2 rounded-md bg-zinc-900 border border-zinc-800"
          >
            {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </nav>

      {/* MOBILE NAV OVERLAY */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="fixed inset-x-0 top-16.25 bg-[#0b0b0c] border-b border-zinc-800 z-40 p-6 flex flex-col gap-2 md:hidden"
          >
            {sections.map((sec) => (
              <a
                key={sec.label}
                href={sec.id}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium py-2 px-3 rounded-md hover:bg-zinc-900 text-zinc-300 hover:text-white transition-all flex items-center gap-3"
              >
                {sec.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <header className="max-w-5xl mx-auto pt-36 pb-24 px-6">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 bg-zinc-900/60 border border-zinc-800 px-3 py-1 rounded-full text-xs text-zinc-300">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            Open to new opportunities
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
            Hi, I am {hero.name}. <br />
            <span className="text-zinc-500">{hero.title}</span>
          </h1>

          <p className="text-zinc-400 text-base sm:text-lg max-w-2xl leading-relaxed">
            {hero.subtitle}
          </p>

          <div className="pt-2 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-zinc-800 transition-all group"
            >
              View My Work
              <ArrowUpRight className="size-4 text-zinc-500 group-hover:text-white transition-colors" />
            </a>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT SECTION */}
      <main className="max-w-5xl mx-auto px-6 space-y-24 pb-32">
        {/* ABOUT SECTION */}
        <section
          id="about"
          className="border-t border-zinc-900 pt-16 grid grid-cols-1 md:grid-cols-12 gap-8"
        >
          <div className="md:col-span-4">
            <h2 className="text-xs font-mono tracking-wider text-zinc-500 uppercase">
              About Me
            </h2>
          </div>
          <div className="md:col-span-8 space-y-4">
            <h3 className="text-lg sm:text-xl text-white font-medium">
              {about.headline}
            </h3>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
              {about.description}
            </p>
          </div>
        </section>

        {/* SKILLS SECTION */}
        {skills?.categories && skills.categories.length > 0 && (
          <section
            id="skills"
            className="border-t border-zinc-900 pt-16 grid grid-cols-1 md:grid-cols-12 gap-8"
          >
            <div className="md:col-span-4">
              <h2 className="text-xs font-mono tracking-wider text-zinc-500 uppercase">
                Skills & Tools
              </h2>
            </div>
            <div className="md:col-span-8 grid gap-6 sm:grid-cols-2">
              {skills.categories.map((cat, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-zinc-950 border border-zinc-900"
                >
                  <h4 className="text-xs font-mono text-white uppercase tracking-wider mb-3">
                    {cat.name}
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.items.map((item, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2.5 py-1 rounded bg-zinc-900 text-zinc-400 border border-zinc-800/40"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* PROJECTS SECTION */}
        {projects && projects.length > 0 && (
          <section
            id="projects"
            className="border-t border-zinc-900 pt-16 space-y-12"
          >
            <div className="flex justify-between items-baseline">
              <h2 className="text-xs font-mono tracking-wider text-zinc-500 uppercase">
                Featured Projects
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="group flex flex-col justify-between p-6 rounded-xl bg-zinc-950 border border-zinc-900 hover:border-zinc-800 transition-all overflow-hidden"
                >
                  <div className="space-y-4">
                    {/* Render Image from Backend if it exists */}
                    {/* {proj.image && (
                      <div className="w-full h-44 mb-4 overflow-hidden rounded-lg bg-zinc-900 relative">
                        <Image
                          src={proj.image}
                          alt={proj.title}
                          width={5}
                          height={5}
                          className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                        />
                      </div>
                    )} */}

                    <div className="flex items-center justify-between gap-4">
                      <h4 className="text-base text-white font-medium group-hover:text-emerald-400 transition-colors">
                        {proj.title}
                      </h4>
                      {proj.link && (
                        <Link
                          href={proj.link}
                          target="_blank"
                          className="text-zinc-500 hover:text-white transition p-1.5 rounded bg-zinc-900 border border-zinc-800"
                        >
                          <ExternalLink className="size-3.5" />
                        </Link>
                      )}
                    </div>

                    <p className="text-zinc-400 text-sm leading-relaxed line-clamp-3">
                      {proj.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-zinc-900 flex flex-wrap gap-1.5">
                    {proj.technologies.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-500 border border-zinc-800/60"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* EXPERIENCE SECTION */}
        {experience && experience.length > 0 && (
          <section
            id="experience"
            className="border-t border-zinc-900 pt-16 grid grid-cols-1 md:grid-cols-12 gap-8"
          >
            <div className="md:col-span-4">
              <h2 className="text-xs font-mono tracking-wider text-zinc-500 uppercase">
                Work History
              </h2>
            </div>
            <div className="md:col-span-8 space-y-4">
              {experience.map((exp) => (
                <div
                  key={exp.id}
                  className="p-5 rounded-xl bg-zinc-950/40 border border-zinc-900 grid grid-cols-1 sm:grid-cols-4 gap-2"
                >
                  <span className="text-xs font-mono text-zinc-500">
                    {exp.period}
                  </span>
                  <div className="sm:col-span-3 space-y-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h4 className="text-sm font-medium text-white">
                        {exp.role}
                      </h4>
                      <span className="text-xs font-medium text-emerald-400 bg-emerald-950/30 px-2 py-0.5 rounded border border-emerald-900/30 w-fit">
                        {exp.company}
                      </span>
                    </div>
                    <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed pt-1">
                      {exp.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* REDESIGNED EDUCATION SECTION */}
        {education && education.length > 0 && (
          <section
            id="education"
            className="border-t border-zinc-900 pt-16 grid grid-cols-1 md:grid-cols-12 gap-8"
          >
            <div className="md:col-span-4">
              <h2 className="text-xs font-mono tracking-wider text-zinc-500 uppercase">
                Education
              </h2>
            </div>
            <div className="md:col-span-8 relative border-v border-zinc-900 pl-4 space-y-8 before:absolute before:top-0 before:bottom-0 before:left-0 before:w-1px before:bg-zinc-800">
              {education.map((edu) => (
                <div key={edu.id} className="relative space-y-1 group">
                  {/* Timeline dot accent */}
                  <div className="absolute -left-5 top-1.5 size-2 rounded-full bg-zinc-700 group-hover:bg-emerald-500 transition-colors border border-[#0b0b0c]" />

                  <span className="text-xs font-mono text-zinc-500 block">
                    {edu.year}
                  </span>
                  <h4 className="text-sm font-medium text-white">
                    {edu.degree}
                  </h4>
                  <div className="text-xs text-zinc-400">{edu.school}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CONTACT FOOTER */}
        <section id="contact" className="border-t border-zinc-900 pt-20">
          <div className="rounded-2xl bg-zinc-950 border border-zinc-900 p-8 text-center space-y-6">
            <h3 className="text-xl sm:text-2xl font-medium text-white">
              Let&apos;s work together
            </h3>
            <p className="text-zinc-400 text-sm max-w-md mx-auto">
              If you are looking for a reliable, detail-oriented developer, feel
              free to reach out via email or connect on social platforms.
            </p>

            <div className="flex justify-center items-center gap-3 pt-2">
              {contact.github && (
                <Link
                  href={contact.github}
                  target="_blank"
                  className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-all"
                >
                  <GithubIcon className="size-4" />
                </Link>
              )}
              {contact.linkedin && (
                <Link
                  href={contact.linkedin}
                  target="_blank"
                  className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-all"
                >
                  <LinkedinIcon className="size-4" />
                </Link>
              )}
              {contact.email && (
                <a
                  href={`mailto:${contact.email}`}
                  className="inline-flex items-center gap-2 bg-white text-black font-medium text-xs px-4 py-2.5 rounded-lg hover:bg-zinc-200 transition-all"
                >
                  <Mail className="size-3.5" /> Email Me
                </a>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
