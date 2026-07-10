"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Menu,
  X,
  Mail,
  Briefcase,
  GraduationCap,
  Code2,
  User2,
  Sparkles,
} from "lucide-react";
import { PortfolioData } from "@/types/portfolio";
import Image from "next/image";

// Custom SVG Icons
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

export function DeveloperPortfolio({ data }: { data: PortfolioData }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { hero, about, skills, projects, experience, education, contact } =
    data;

  const navLinks = [
    { name: "About", href: "#about" },
    ...(skills ? [{ name: "Skills", href: "#skills" }] : []),
    ...(projects ? [{ name: "Work", href: "#work" }] : []),
    ...(experience ? [{ name: "Experience", href: "#experience" }] : []),
    ...(education ? [{ name: "Education", href: "#education" }] : []),
  ];

  return (
    <div className="bg-[#050505] text-zinc-400 font-sans min-h-screen selection:bg-amber-500/30 selection:text-white antialiased">
      {/* Dynamic Background Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-500/5 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] right-[-5%] w-[30%] h-[30%] bg-blue-500/5 blur-[120px] rounded-full" />
      </div>

      {/* NAVIGATION */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-black/80 backdrop-blur-lg border-b border-zinc-900 py-4"
            : "bg-transparent py-8"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <Link
            href="#"
            className="text-white font-semibold tracking-tight flex items-center gap-2 group"
          >
            <div className="size-2 rounded-full bg-amber-500 group-hover:scale-125 transition-transform" />
            {hero.name}
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-medium hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
            {contact.email && (
              <a
                href={`mailto:${contact.email}`}
                className="text-xs font-semibold bg-white text-black px-4 py-2 rounded-full hover:bg-zinc-200 transition-all"
              >
                Let&apos;s Talk
              </a>
            )}
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-zinc-400 hover:text-white"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* MOBILE NAV */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-0 bg-black z-40 flex flex-col p-12 gap-6 md:hidden"
          >
            <div className="flex justify-end mb-8">
              <button onClick={() => setIsMenuOpen(false)}>
                <X size={24} />
              </button>
            </div>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl font-bold text-white"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <header className="max-w-6xl mx-auto pt-44 pb-32 px-6 relative">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:col-span-7 space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] font-bold tracking-widest text-amber-500 uppercase">
              <Sparkles size={12} /> Available for hire
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-[1.1]">
              Engineering for{" "}
              <span className="text-zinc-500">modern brands.</span>
            </h1>
            <p className="text-lg text-zinc-400 max-w-xl leading-relaxed">
              I am <span className="text-white">{hero.name}</span>, {hero.title}
              . {hero.subtitle}
            </p>
            <div className="flex items-center gap-6 pt-4">
              <a
                href="#work"
                className="bg-white text-black font-bold text-sm px-8 py-3.5 rounded-full hover:scale-105 transition-transform"
              >
                See my projects
              </a>
              <div className="flex items-center gap-4">
                {contact.github && (
                  <Link
                    href={contact.github}
                    className="hover:text-white transition-colors"
                  >
                    <GithubIcon className="size-5" />
                  </Link>
                )}
                {contact.linkedin && (
                  <Link
                    href={contact.linkedin}
                    className="hover:text-white transition-colors"
                  >
                    <LinkedinIcon className="size-5" />
                  </Link>
                )}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="md:col-span-5 flex justify-center md:justify-end"
          >
            {hero.image && (
              <div className="relative group">
                <div className="absolute inset-0 bg-amber-500 blur-3xl opacity-10 group-hover:opacity-20 transition-opacity" />
                <div className="relative size-72 md:size-80 rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900 p-3">
                  <Image
                    src={hero.image}
                    alt={hero.name}
                    width={5}
                    height={5}
                    className="w-full h-full object-cover rounded-2xl grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-6xl mx-auto px-6 space-y-40 pb-40">
        {/* ABOUT */}
        <section
          id="about"
          className="grid grid-cols-1 md:grid-cols-12 gap-12 border-t border-zinc-900 pt-20"
        >
          <div className="md:col-span-4 flex items-center gap-2 text-zinc-500 font-mono text-[10px] uppercase tracking-[0.2em]">
            <User2 size={14} /> Profile
          </div>
          <div className="md:col-span-8 space-y-6">
            <h2 className="text-2xl md:text-3xl text-white font-medium leading-snug">
              {about.headline}
            </h2>
            <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
              {about.description}
            </p>
          </div>
        </section>

        {/* SKILLS */}
        {skills?.categories && (
          <section
            id="skills"
            className="grid grid-cols-1 md:grid-cols-12 gap-12 border-t border-zinc-900 pt-20"
          >
            <div className="md:col-span-4 flex items-center gap-2 text-zinc-500 font-mono text-[10px] uppercase tracking-[0.2em]">
              <Code2 size={14} /> Technology
            </div>
            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
              {skills.categories.map((cat) => (
                <div key={cat.name} className="space-y-4">
                  <h3 className="text-white text-xs font-bold uppercase tracking-widest">
                    {cat.name}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {cat.items.map((item) => (
                      <span
                        key={item}
                        className="text-xs px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400"
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

        {/* PROJECTS */}
        {projects && (
          <section id="work" className="space-y-12">
            <div className="flex items-center gap-2 text-zinc-500 font-mono text-[10px] uppercase tracking-[0.2em] mb-12">
              <Briefcase size={14} /> Selected Work
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="group p-8 rounded-3xl bg-zinc-950 border border-zinc-900 hover:border-zinc-700 transition-all flex flex-col justify-between min-h-70"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xl text-white font-bold">
                        {proj.title}
                      </h4>
                      {proj.link && (
                        <Link
                          href={proj.link}
                          target="_blank"
                          className="text-zinc-500 hover:text-white transition-colors"
                        >
                          <ArrowUpRight size={20} />
                        </Link>
                      )}
                    </div>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      {proj.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3 mt-8">
                    {proj.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-bold text-zinc-600 uppercase tracking-wider"
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

        {/* IMPROVED EDUCATION SECTION */}
        {education && (
          <section
            id="education"
            className="grid grid-cols-1 md:grid-cols-12 gap-12 border-t border-zinc-900 pt-20"
          >
            <div className="md:col-span-4 flex items-center gap-2 text-zinc-500 font-mono text-[10px] uppercase tracking-[0.2em]">
              <GraduationCap size={14} /> Academic History
            </div>
            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {education.map((edu) => (
                <div
                  key={edu.id}
                  className="group p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800/50 hover:bg-zinc-900/50 transition-all"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="size-8 rounded-lg bg-zinc-800 flex items-center justify-center text-amber-500">
                      <GraduationCap size={16} />
                    </div>
                    <span className="text-[10px] font-bold text-zinc-500 bg-zinc-800 px-2 py-1 rounded">
                      {edu.year}
                    </span>
                  </div>
                  <h4 className="text-white font-bold text-sm mb-1">
                    {edu.degree}
                  </h4>
                  <p className="text-zinc-500 text-xs">{edu.school}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CONTACT */}
        <section id="contact" className="pt-20">
          <div className="bg-linear-to-b from-zinc-900 to-black rounded-4xl p-12 md:p-24 border border-zinc-800 text-center space-y-8 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-amber-500/50" />
            <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
              Ready to start a <br /> new project?
            </h3>
            <p className="text-zinc-400 max-w-md mx-auto text-sm md:text-base">
              I am currently looking for new roles and interesting projects. My
              inbox is always open.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              {contact.email && (
                <a
                  href={`mailto:${contact.email}`}
                  className="bg-white text-black font-bold px-10 py-4 rounded-full hover:scale-105 transition-transform flex items-center gap-2"
                >
                  <Mail size={18} /> Send an email
                </a>
              )}
              {contact.linkedin && (
                <Link
                  href={contact.linkedin}
                  target="_blank"
                  className="text-white border border-zinc-700 px-10 py-4 rounded-full hover:bg-zinc-900 transition-colors"
                >
                  LinkedIn
                </Link>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="max-w-6xl mx-auto px-6 py-12 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-[10px] text-zinc-600 font-mono uppercase tracking-widest">
          &copy; {new Date().getFullYear()} {hero.name}
        </p>
        <div className="flex items-center gap-6">
          {contact.github && (
            <Link
              href={contact.github}
              className="text-zinc-600 hover:text-white transition-colors"
            >
              <GithubIcon className="size-4" />
            </Link>
          )}
          {contact.linkedin && (
            <Link
              href={contact.linkedin}
              className="text-zinc-600 hover:text-white transition-colors"
            >
              <LinkedinIcon className="size-4" />
            </Link>
          )}
        </div>
      </footer>
    </div>
  );
}
