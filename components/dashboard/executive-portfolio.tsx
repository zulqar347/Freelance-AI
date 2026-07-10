"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Menu,
  X,
  Sparkles,
  Heart,
  Palette,
  Compass,
  GraduationCap,
} from "lucide-react";
import { PortfolioData } from "@/types/portfolio";
import Image from "next/image";

// Elegant Minimalist SVG Icons
const GithubIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
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
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export function ExecutivePortfolio({ data }: { data: PortfolioData }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { hero, about, skills, projects, experience, education, contact } =
    data;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isValidAvatar = (url?: string) =>
    url && url.startsWith("http") && !url.includes("profile/picture/0");

  const navItems = [
    { label: "About", href: "#about" },
    ...(skills?.categories ? [{ label: "Skills", href: "#skills" }] : []),
    ...(projects?.length ? [{ label: "Projects", href: "#projects" }] : []),
    ...(experience?.length
      ? [{ label: "Experience", href: "#experience" }]
      : []),
    ...(education?.length ? [{ label: "Education", href: "#education" }] : []),
  ];

  return (
    <div className="bg-[#0b0a0a] text-zinc-300 font-sans min-h-screen selection:bg-[#ebd3be]/20 selection:text-white antialiased relative">
      {/* Decorative Subtle Ambient Glows */}
      <div className="absolute top-0 right-1/4 w-125 h-125 bg-[#ebd3be]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-[30%] left-10 w-75 h-75 bg-amber-500/3 blur-[100px] rounded-full pointer-events-none" />

      {/* HEADER NAVIGATION */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0b0a0a]/90 backdrop-blur-md border-b border-zinc-900/50 py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
          <Link
            href="#"
            className="font-serif italic text-white tracking-wide text-lg"
          >
            {hero.name}
          </Link>

          <div className="hidden md:flex items-center gap-8 text-xs tracking-wider uppercase">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-zinc-400 hover:text-white transition-colors"
              >
                {item.label}
              </a>
            ))}
            {contact.email && (
              <a
                href={`mailto:${contact.email}`}
                className="border border-[#ebd3be]/30 text-[#ebd3be] px-4 py-2 hover:bg-[#ebd3be] hover:text-[#0b0a0a] transition-all rounded-full"
              >
                Get In Touch
              </a>
            )}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-zinc-400 hover:text-white"
          >
            {mobileMenuOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </button>
        </div>
      </nav>

      {/* MOBILE NAV OVERLAY */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="fixed inset-x-0 top-17 bg-[#0b0a0a] border-b border-zinc-900 z-40 p-6 flex flex-col gap-3 md:hidden"
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm py-2 text-zinc-300 hover:text-white border-b border-zinc-900"
              >
                {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <header className="max-w-5xl mx-auto pt-36 pb-24 px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div
            className={
              isValidAvatar(hero.image)
                ? "md:col-span-7 space-y-6"
                : "md:col-span-12 space-y-6"
            }
          >
            <div className="inline-flex items-center gap-2 text-[#ebd3be] text-xs uppercase tracking-widest font-medium">
              <Sparkles className="size-3.5" /> Creative Portfolio
            </div>

            <h1 className="text-4xl sm:text-6xl font-serif italic text-white tracking-tight leading-[1.15]">
              {hero.name}
            </h1>

            <p className="text-zinc-400 text-base sm:text-lg font-light leading-relaxed max-w-xl">
              {hero.title}. {hero.subtitle}
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              {contact.email && (
                <a
                  href={`mailto:${contact.email}`}
                  className="bg-[#ebd3be] text-[#0b0a0a] font-medium text-xs tracking-wider uppercase px-6 py-3.5 rounded-full hover:bg-white transition-all shadow-lg"
                >
                  Let&apos;s Work Together
                </a>
              )}
              <a
                href="#projects"
                className="inline-flex items-center gap-2 border border-zinc-800 text-zinc-300 px-6 py-3.5 rounded-full text-xs tracking-wider uppercase hover:bg-zinc-900/40 transition-all"
              >
                Review Projects
              </a>
            </div>
          </div>

          {/* Profile Picture Frame (Designer Gallery Vibe) */}
          {isValidAvatar(hero.image) && (
            <div className="md:col-span-5 flex justify-center md:justify-end">
              <div className="relative group p-2">
                {/* Editorial shadow & glow behind image */}
                <div className="absolute inset-0 bg-[#ebd3be]/10 blur-2xl rounded-full" />
                <div className="relative size-64 sm:size-72 rounded-2xl overflow-hidden border border-zinc-800/80 bg-zinc-900 p-2 shadow-2xl">
                  <Image
                    src={hero?.image || ""}
                    alt={hero.name}
                    height={5}
                    width={5}
                    className="w-full h-full object-cover rounded-xl grayscale contrast-[1.1] hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-5xl mx-auto px-6 space-y-32 pb-40">
        {/* ABOUT SECTION */}
        <section
          id="about"
          className="grid grid-cols-1 md:grid-cols-12 gap-8 border-t border-zinc-900/60 pt-16"
        >
          <div className="md:col-span-4">
            <h2 className="text-xs uppercase tracking-[0.2em] text-[#ebd3be] font-medium flex items-center gap-2">
              <Palette className="size-3.5" /> Introduction
            </h2>
          </div>
          <div className="md:col-span-8 space-y-4">
            <h3 className="text-xl sm:text-2xl text-white font-serif italic leading-snug">
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
            className="grid grid-cols-1 md:grid-cols-12 gap-8 border-t border-zinc-900/60 pt-16"
          >
            <div className="md:col-span-4">
              <h2 className="text-xs uppercase tracking-[0.2em] text-[#ebd3be] font-medium flex items-center gap-2">
                <Compass className="size-3.5" /> Core Skills
              </h2>
            </div>
            <div className="md:col-span-8 grid gap-6 sm:grid-cols-2">
              {skills.categories.map((cat, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-zinc-950/40 border border-zinc-900/60"
                >
                  <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
                    {cat.name}
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.items.map((item, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800/40 text-zinc-400"
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
            className="border-t border-zinc-900/60 pt-16 space-y-12"
          >
            <div className="flex flex-col sm:flex-row justify-between items-baseline gap-2">
              <h2 className="text-xs uppercase tracking-[0.2em] text-[#ebd3be] font-medium flex items-center gap-2">
                <Heart className="size-3.5" /> Selected Creations
              </h2>
              <span className="text-xs text-zinc-500 font-light">
                Recent architectural & digital projects
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="group flex flex-col justify-between p-8 rounded-2xl bg-zinc-950/40 border border-zinc-900/80 hover:border-zinc-800 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)]"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg text-white font-serif italic group-hover:text-[#ebd3be] transition-colors">
                        {proj.title}
                      </h4>
                      {proj.link && (
                        <Link
                          href={proj.link}
                          target="_blank"
                          className="text-zinc-500 hover:text-white transition-colors"
                        >
                          <ArrowUpRight className="size-4" />
                        </Link>
                      )}
                    </div>
                    <p className="text-zinc-400 text-sm leading-relaxed line-clamp-4">
                      {proj.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-6">
                    {proj.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] uppercase tracking-wider text-zinc-500"
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

        {/* WORK HISTORY SECTION */}
        {experience && experience.length > 0 && (
          <section
            id="experience"
            className="grid grid-cols-1 md:grid-cols-12 gap-8 border-t border-zinc-900/60 pt-16"
          >
            <div className="md:col-span-4">
              <h2 className="text-xs uppercase tracking-[0.2em] text-[#ebd3be] font-medium">
                Professional Path
              </h2>
            </div>
            <div className="md:col-span-8 space-y-4">
              {experience.map((exp) => (
                <div
                  key={exp.id}
                  className="p-6 rounded-xl bg-zinc-950/10 border border-zinc-900/80 hover:bg-zinc-950/40 transition-all grid grid-cols-1 sm:grid-cols-4 gap-4"
                >
                  <span className="text-xs text-zinc-500">{exp.period}</span>
                  <div className="sm:col-span-3 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h4 className="text-sm font-semibold text-white">
                        {exp.role}
                      </h4>
                      <span className="text-xs font-medium text-[#ebd3be] bg-[#ebd3be]/5 px-2.5 py-0.5 rounded-full border border-[#ebd3be]/20 w-fit">
                        {exp.company}
                      </span>
                    </div>
                    <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* BEAUTIFUL DESIGNER EDUCATION SECTION */}
        {education && education.length > 0 && (
          <section
            id="education"
            className="grid grid-cols-1 md:grid-cols-12 gap-8 border-t border-zinc-900/60 pt-16"
          >
            <div className="md:col-span-4">
              <h2 className="text-xs uppercase tracking-[0.2em] text-[#ebd3be] font-medium flex items-center gap-2">
                <GraduationCap className="size-3.5" /> Education
              </h2>
            </div>
            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {education.map((edu) => (
                <div
                  key={edu.id}
                  className="p-6 rounded-2xl bg-zinc-950/40 border border-zinc-900/80 hover:border-zinc-800 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest bg-zinc-900 px-2.5 py-1 rounded w-fit block">
                      {edu.year}
                    </span>
                    <h4 className="text-white font-medium text-sm leading-snug">
                      {edu.degree}
                    </h4>
                  </div>
                  <div className="text-xs text-zinc-500 mt-4 border-t border-zinc-900 pt-3">
                    {edu.school}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CALL TO ACTION */}
        <section id="contact" className="border-t border-zinc-900/60 pt-16">
          <div className="rounded-3xl bg-zinc-950 p-8 sm:p-12 text-center space-y-6 max-w-2xl mx-auto border border-zinc-900">
            <h3 className="text-2xl sm:text-3xl font-serif italic text-white">
              Let&apos;s connect
            </h3>
            <p className="text-zinc-400 text-sm max-w-sm mx-auto leading-relaxed">
              Have an exciting project or looking to grow your creative
              engineering team? I&apos;d love to join the conversation.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
              {contact.email && (
                <a
                  href={`mailto:${contact.email}`}
                  className="w-full sm:w-auto bg-[#ebd3be] hover:bg-white text-[#0b0a0a] text-xs uppercase tracking-wider font-medium px-6 py-3.5 rounded-full transition-all text-center"
                >
                  Email Me
                </a>
              )}
              <div className="flex items-center gap-4">
                {contact.github && (
                  <Link
                    href={contact.github}
                    target="_blank"
                    className="p-3 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-all"
                  >
                    <GithubIcon className="size-4" />
                  </Link>
                )}
                {contact.linkedin && (
                  <Link
                    href={contact.linkedin}
                    target="_blank"
                    className="p-3 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-all"
                  >
                    <LinkedinIcon className="size-4" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="max-w-5xl mx-auto py-12 px-6 border-t border-zinc-900/60 flex flex-col sm:flex-row gap-4 justify-between items-center text-xs text-zinc-600">
        <div>
          &copy; {new Date().getFullYear()} {hero.name}
        </div>
        <div className="flex items-center gap-6">
          {contact.github && (
            <Link
              href={contact.github}
              target="_blank"
              className="hover:text-white transition-colors"
            >
              GitHub
            </Link>
          )}
          {contact.linkedin && (
            <Link
              href={contact.linkedin}
              target="_blank"
              className="hover:text-white transition-colors"
            >
              LinkedIn
            </Link>
          )}
        </div>
      </footer>
    </div>
  );
}
