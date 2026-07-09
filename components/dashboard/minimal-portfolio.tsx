"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { PortfolioData } from "@/types/portfolio";

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

export function MinimalPortfolio({ data }: { data: PortfolioData }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { hero, about, skills, projects, experience, contact } = data;

  const isValidAvatar = (url?: string) =>
    url && url.startsWith("http") && !url.includes("profile/picture/0");

  const sections = [
    { label: "About", id: "#about" },
    ...(skills?.categories
      ? [{ label: "Capabilities", id: "#capabilities" }]
      : []),
    ...(projects ? [{ label: "Works", id: "#works" }] : []),
    ...(experience ? [{ label: "History", id: "#history" }] : []),
    { label: "Contact", id: "#contact" },
  ];

  return (
    <div className="bg-white text-zinc-800 font-sans min-h-screen selection:bg-zinc-100 antialiased">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-zinc-100 px-6 md:px-12 h-20 flex items-center justify-between">
        <Link
          href="#"
          className="font-medium tracking-tight text-zinc-950 text-sm uppercase"
        >
          {hero.name}
        </Link>
        <div className="hidden md:flex items-center gap-8 text-xs font-medium tracking-wider uppercase text-zinc-500">
          {sections.map((sec) => (
            <a
              key={sec.label}
              href={sec.id}
              className="hover:text-zinc-950 transition-colors"
            >
              {sec.label}
            </a>
          ))}
          {contact.email && (
            <a
              href={`mailto:${contact.email}`}
              className="text-zinc-950 border border-zinc-950 px-3 py-1 hover:bg-zinc-950 hover:text-white transition"
            >
              Get in touch
            </a>
          )}
        </div>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-zinc-600"
        >
          {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 top-20 bg-white z-40 p-6 flex flex-col gap-4 border-t border-zinc-100 md:hidden">
          {sections.map((sec) => (
            <a
              key={sec.label}
              href={sec.id}
              onClick={() => setMenuOpen(false)}
              className="text-lg font-light py-2 border-b border-zinc-50"
            >
              {sec.label}
            </a>
          ))}
        </div>
      )}

      {/* HERO CONTAINER */}
      <header className="max-w-4xl mx-auto pt-44 pb-24 px-6 grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
        <div className="md:col-span-3 space-y-4">
          <h1 className="text-4xl md:text-6xl font-light tracking-tight text-zinc-950 leading-none">
            {hero.name}
          </h1>
          <p className="text-zinc-500 text-base max-w-xl font-light">
            {hero.title} — {hero.subtitle}
          </p>
          <div className="pt-2">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-sm font-medium border-b border-zinc-950 pb-0.5 hover:text-zinc-500 transition"
            >
              Let&apos;s Connect <ArrowUpRight className="size-4" />
            </a>
          </div>
        </div>
        {isValidAvatar(hero.image) ? (
          <div className="md:col-span-1 flex justify-start md:justify-end">
            <img
              src={hero.image}
              alt={hero.name}
              className="size-32 object-cover rounded-full bg-zinc-100 grayscale"
            />
          </div>
        ) : (
          <div className="md:col-span-1 flex justify-start md:justify-end">
            <div className="size-20 rounded-full bg-zinc-50 border border-zinc-200 flex items-center justify-center text-zinc-400 font-light text-xl">
              {hero.name.charAt(0)}
            </div>
          </div>
        )}
      </header>

      {/* ABOUT */}
      <section
        id="about"
        className="max-w-4xl mx-auto py-20 px-6 border-t border-zinc-100 scroll-mt-20"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
            About
          </h2>
          <div className="md:col-span-3 space-y-4">
            <h3 className="text-xl text-zinc-950 font-normal">
              {about.headline}
            </h3>
            <p className="text-zinc-600 text-sm leading-relaxed font-light">
              {about.description}
            </p>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      {skills?.categories && skills.categories.length > 0 && (
        <section
          id="capabilities"
          className="max-w-4xl mx-auto py-20 px-6 border-t border-zinc-100 scroll-mt-20"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
              Capabilities
            </h2>
            <div className="md:col-span-3 grid gap-6 sm:grid-cols-2">
              {skills.categories.map((cat, i) => (
                <div key={i} className="space-y-2">
                  <h4 className="text-xs font-medium text-zinc-950 uppercase">
                    {cat.name}
                  </h4>
                  <p className="text-zinc-500 text-sm font-light leading-relaxed">
                    {cat.items.join(", ")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SELECTED WORKS */}
      {projects && projects.length > 0 && (
        <section
          id="works"
          className="max-w-4xl mx-auto py-20 px-6 border-t border-zinc-100 scroll-mt-20"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
              Selected Works
            </h2>
            <div className="md:col-span-3 space-y-12">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="group border-b border-zinc-100 pb-8 flex flex-col justify-between space-y-2"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="text-base text-zinc-900 font-medium group-hover:text-zinc-600 transition-colors">
                        {proj.title}
                      </h4>
                      <p className="text-zinc-500 text-sm font-light mt-1 max-w-xl">
                        {proj.description}
                      </p>
                    </div>
                    {proj.link && (
                      <Link
                        href={proj.link}
                        target="_blank"
                        className="text-zinc-400 hover:text-zinc-950 transition pt-1"
                      >
                        <ArrowUpRight className="size-4" />
                      </Link>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs font-mono text-zinc-400 pt-2">
                    {proj.technologies.join("  /  ")}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CHRONOLOGY HISTORY */}
      {experience && experience.length > 0 && (
        <section
          id="history"
          className="max-w-4xl mx-auto py-20 px-6 border-t border-zinc-100 scroll-mt-20"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
              History
            </h2>
            <div className="md:col-span-3 space-y-8">
              {experience.map((exp) => (
                <div
                  key={exp.id}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-2"
                >
                  <span className="text-xs font-mono text-zinc-400">
                    {exp.period}
                  </span>
                  <div className="sm:col-span-2 space-y-1">
                    <h4 className="text-sm font-medium text-zinc-950">
                      {exp.role}
                    </h4>
                    <div className="text-xs text-zinc-400">{exp.company}</div>
                    <p className="text-zinc-500 text-xs font-light pt-1 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CONTACT */}
      <section
        id="contact"
        className="max-w-4xl mx-auto py-20 px-6 border-t border-zinc-100 mb-20 scroll-mt-20"
      >
        <div className="text-center py-8 space-y-6">
          <h3 className="text-2xl font-light text-zinc-950">
            Let&apos;s build together.
          </h3>
          <div className="flex justify-center items-center gap-6 text-zinc-400">
            {contact.github && (
              <Link
                href={contact.github}
                target="_blank"
                className="hover:text-zinc-950 transition"
              >
                <GithubIcon className="size-5" />
              </Link>
            )}
            {contact.linkedin && (
              <Link
                href={contact.linkedin}
                target="_blank"
                className="hover:text-zinc-950 transition"
              >
                <LinkedinIcon className="size-5" />
              </Link>
            )}
          </div>
          {contact.email && (
            <a
              href={`mailto:${contact.email}`}
              className="inline-block bg-zinc-950 text-white text-xs tracking-wider uppercase font-medium px-6 py-3.5 hover:bg-zinc-800 transition"
            >
              Get in touch
            </a>
          )}
        </div>
      </section>
    </div>
  );
}
