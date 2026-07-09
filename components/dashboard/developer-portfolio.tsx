"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Terminal, ExternalLink, Mail, Menu, X, Code2 } from "lucide-react";
import { PortfolioData } from "@/types/portfolio";

// Pure SVG Icons to eliminate dependency gaps
const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

export function DeveloperPortfolio({ data }: { data: PortfolioData }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { hero, about, skills, projects, experience, contact } = data;

  const isValidAvatar = (url?: string) =>
    url && url.startsWith("http") && !url.includes("profile/picture/0");

  const navItems = [
    { name: "// about", href: "#about" },
    ...(skills?.categories ? [{ name: "// skills", href: "#skills" }] : []),
    ...(projects ? [{ name: "// projects", href: "#projects" }] : []),
    ...(experience ? [{ name: "// experience", href: "#experience" }] : []),
    { name: "// contact", href: "#contact" },
  ];

  return (
    <div className="bg-zinc-950 text-zinc-300 font-mono min-h-screen selection:bg-purple-500/20 antialiased">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full bg-zinc-950/80 backdrop-blur-md border-b border-zinc-900 z-50 px-6 h-16 flex items-center justify-between">
        <Link href="#" className="font-bold text-white flex items-center gap-2">
          <Terminal className="size-4 text-purple-400" />
          <span>{hero.name.toLowerCase().replace(/\s+/g, "-")}</span>
        </Link>

        <div className="hidden md:flex items-center gap-6 text-xs">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="hover:text-purple-400 transition-colors"
            >
              {item.name}
            </a>
          ))}
          {contact.email && (
            <a
              href={`mailto:${contact.email}`}
              className="bg-purple-950/40 border border-purple-800 text-purple-300 px-3 py-1.5 rounded hover:bg-purple-900/40 transition text-xs font-sans"
            >
              Get in touch
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
      </nav>

      {mobileMenuOpen && (
        <div className="fixed inset-0 top-16 bg-zinc-950 z-40 flex flex-col p-6 gap-4 border-t border-zinc-900 md:hidden">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm py-2 border-b border-zinc-900 hover:text-purple-400"
            >
              {item.name}
            </a>
          ))}
        </div>
      )}

      {/* HERO SECTION */}
      <header className="max-w-5xl mx-auto pt-32 pb-20 px-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div
          className={
            isValidAvatar(hero.image)
              ? "md:col-span-8 space-y-4"
              : "md:col-span-12 space-y-4"
          }
        >
          <div className="text-purple-400 text-xs">
            connection pipeline authenticated
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight uppercase">
            {hero.name}
          </h1>
          <h2 className="text-zinc-400 font-sans font-medium text-lg md:text-xl">
            {hero.title}
          </h2>
          <p className="text-zinc-500 font-sans max-w-xl text-sm leading-relaxed">
            {hero.subtitle}
          </p>
          <div className="pt-4 flex flex-wrap gap-4">
            {contact.email && (
              <a
                href={`mailto:${contact.email}`}
                className="bg-white text-zinc-950 font-sans font-semibold text-xs px-5 py-3 rounded-lg hover:bg-zinc-200 transition"
              >
                Get in touch
              </a>
            )}
            {projects && projects.length > 0 && (
              <a
                href="#projects"
                className="border border-zinc-800 text-zinc-400 font-sans text-xs px-5 py-3 rounded-lg hover:bg-zinc-900/50 transition"
              >
                View Architecture
              </a>
            )}
          </div>
        </div>

        {isValidAvatar(hero.image) && (
          <div className="md:col-span-4 flex justify-center">
            <div className="relative size-56 rounded-2xl border-2 border-dashed border-purple-500/30 p-2">
              <img
                src={hero.image}
                alt={hero.name}
                className="w-full h-full object-cover rounded-xl filter grayscale contrast-125"
              />
            </div>
          </div>
        )}
      </header>

      {/* ABOUT NODE */}
      <section
        id="about"
        className="max-w-5xl mx-auto py-16 px-6 border-t border-zinc-900 scroll-mt-16"
      >
        <div className="text-zinc-500 text-xs mb-2">01. ABOUT_MODULE</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <h3 className="text-white text-base font-bold md:col-span-1">
            {about.headline}
          </h3>
          <p className="font-sans text-zinc-400 text-sm leading-relaxed md:col-span-2">
            {about.description}
          </p>
        </div>
      </section>

      {/* SKILLS NODES */}
      {skills?.categories && skills.categories.length > 0 && (
        <section
          id="skills"
          className="max-w-5xl mx-auto py-16 px-6 border-t border-zinc-900 scroll-mt-16"
        >
          <div className="text-zinc-500 text-xs mb-6">
            02. CORE_CAPABILITIES
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {skills.categories.map((cat, i) => (
              <div
                key={i}
                className="border border-zinc-900 bg-zinc-900/10 p-4 rounded-xl"
              >
                <h4 className="font-bold text-purple-400 mb-3 text-xs uppercase flex items-center gap-1.5">
                  <Code2 className="size-3.5" /> {cat.name}
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {cat.items.map((item, idx) => (
                    <span
                      key={idx}
                      className="bg-zinc-950 border border-zinc-800 px-2 py-1 rounded text-[11px] text-zinc-400"
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

      {/* PROJECTS MATRIX */}
      {projects && projects.length > 0 && (
        <section
          id="projects"
          className="max-w-5xl mx-auto py-16 px-6 border-t border-zinc-900 scroll-mt-16"
        >
          <div className="text-zinc-500 text-xs mb-6">
            03. EXECUTED_APPLICATIONS
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="border border-zinc-900 bg-zinc-950 p-5 rounded-xl flex flex-col justify-between space-y-4 hover:border-zinc-800 transition"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-white text-sm">
                      {proj.title}
                    </h4>
                    <div className="flex items-center gap-3 text-zinc-500">
                      {proj.link && (
                        <Link
                          href={proj.link}
                          target="_blank"
                          className="hover:text-purple-400 transition"
                        >
                          <ExternalLink className="size-4" />
                        </Link>
                      )}
                    </div>
                  </div>
                  <p className="font-sans text-zinc-400 text-xs leading-relaxed">
                    {proj.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {proj.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-zinc-600 text-[10px] font-mono"
                    >
                      • {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CHRONOLOGY HISTORY */}
      {experience && experience.length > 0 && (
        <section
          id="experience"
          className="max-w-5xl mx-auto py-16 px-6 border-t border-zinc-900 scroll-mt-16"
        >
          <div className="text-zinc-500 text-xs mb-6">
            04. TIMELINE_REGISTRY
          </div>
          <div className="space-y-8 border-l border-zinc-900 pl-4 ml-2">
            {experience.map((exp) => (
              <div key={exp.id} className="relative space-y-1">
                <div className="absolute -left-[21px] top-1.5 size-2 rounded-full bg-purple-500" />
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-zinc-300 text-xs gap-1">
                  <span className="font-bold text-white text-sm">
                    {exp.role}
                  </span>
                  <span className="text-zinc-500 text-[11px]">
                    {exp.period}
                  </span>
                </div>
                <div className="text-zinc-500 text-xs">{exp.company}</div>
                <p className="font-sans text-zinc-400 text-xs pt-2 leading-relaxed max-w-2xl">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CONTACT TIER */}
      <section
        id="contact"
        className="max-w-5xl mx-auto py-16 px-6 border-t border-zinc-900 mb-12 scroll-mt-16"
      >
        <div className="text-zinc-500 text-xs mb-6">05. DISPATCH_NODE</div>
        <div className="border border-purple-900/30 bg-purple-950/5 rounded-2xl p-6 md:p-8 text-center max-w-2xl mx-auto space-y-4">
          <h4 className="text-white text-base font-bold">
            Initiate Connection Sequence
          </h4>
          <p className="font-sans text-zinc-400 text-xs max-w-md mx-auto">
            Open for full-time engagements, scalable dashboard engineering
            setups, and technical partnerships.
          </p>
          <div className="pt-2 flex flex-wrap justify-center items-center gap-6 text-zinc-400">
            {contact.email && (
              <a
                href={`mailto:${contact.email}`}
                className="bg-purple-600 hover:bg-purple-500 text-white text-xs font-sans px-4 py-2.5 rounded-lg font-medium flex items-center gap-2 transition"
              >
                <Mail className="size-3.5" /> Email Node
              </a>
            )}
            <div className="flex items-center gap-4 text-zinc-500">
              {contact.github && (
                <Link
                  href={contact.github}
                  target="_blank"
                  className="hover:text-white transition"
                >
                  <GithubIcon className="size-5" />
                </Link>
              )}
              {contact.linkedin && (
                <Link
                  href={contact.linkedin}
                  target="_blank"
                  className="hover:text-white transition"
                >
                  <LinkedinIcon className="size-5" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
