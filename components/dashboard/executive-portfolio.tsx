"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Briefcase, Menu, X, ArrowRight } from "lucide-react";
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

export function ExecutivePortfolio({ data }: { data: PortfolioData }) {
  const [mobileNav, setMobileNav] = useState(false);
  const { hero, about, skills, projects, experience, contact } = data;

  const isValidAvatar = (url?: string) =>
    url && url.startsWith("http") && !url.includes("profile/picture/0");

  const links = [
    { label: "Overview", href: "#overview" },
    ...(skills?.categories ? [{ label: "Expertise", href: "#expertise" }] : []),
    ...(projects ? [{ label: "Projects", href: "#cases" }] : []),
    ...(experience ? [{ label: "Leadership History", href: "#history" }] : []),
  ];

  return (
    <div className="bg-zinc-950 text-zinc-400 font-serif min-h-screen selection:bg-amber-500/10 antialiased">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full bg-zinc-950/90 backdrop-blur-md border-b border-zinc-900 z-50 px-6 lg:px-16 h-20 flex items-center justify-between">
        <Link
          href="#"
          className="text-zinc-100 tracking-wider font-light text-base uppercase"
        >
          {hero.name}
        </Link>
        <div className="hidden md:flex items-center gap-10 font-sans text-xs tracking-widest uppercase text-zinc-400">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-amber-500 transition-colors"
            >
              {link.label}
            </a>
          ))}
          {contact.email && (
            <a
              href={`mailto:${contact.email}`}
              className="border border-amber-500/40 text-amber-500 px-4 py-2 hover:bg-amber-500 hover:text-zinc-950 transition"
            >
              Contact
            </a>
          )}
        </div>
        <button
          onClick={() => setMobileNav(!mobileNav)}
          className="md:hidden text-zinc-400"
        >
          {mobileNav ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {mobileNav && (
        <div className="fixed inset-0 top-20 bg-zinc-950 z-40 p-6 flex flex-col gap-4 border-t border-zinc-900 md:hidden font-sans">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileNav(false)}
              className="text-sm tracking-wide py-2 border-b border-zinc-900 text-zinc-300"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

      {/* HERO BLOCK */}
      <header className="max-w-4xl mx-auto pt-44 pb-24 px-6 text-center space-y-6">
        <div className="font-sans text-amber-500 tracking-widest text-xs uppercase font-medium">
          Executive Dossier
        </div>
        <h1 className="text-4xl md:text-6xl font-light text-zinc-100 italic leading-tight">
          {hero.name}
        </h1>
        <p className="font-sans text-zinc-400 text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed">
          {hero.title} — <span className="text-zinc-500">{hero.subtitle}</span>
        </p>
        <div className="pt-4 font-sans">
          {contact.email && (
            <a
              href={`mailto:${contact.email}`}
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-medium text-xs tracking-wider uppercase px-6 py-3.5 transition rounded-sm"
            >
              Get in touch <ArrowRight className="size-3.5" />
            </a>
          )}
        </div>
      </header>

      {/* OVERVIEW */}
      <section
        id="overview"
        className="max-w-4xl mx-auto py-20 px-6 border-t border-zinc-900 scroll-mt-20"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <h2 className="font-sans text-xs uppercase tracking-widest text-zinc-600 font-bold">
              Overview
            </h2>
            {isValidAvatar(hero.image) && (
              <img
                src={hero.image}
                alt={hero.name}
                className="mt-4 size-24 rounded-lg object-cover grayscale border border-zinc-800"
              />
            )}
          </div>
          <div className="md:col-span-3 space-y-4">
            <h3 className="text-xl md:text-2xl text-zinc-200 font-light italic">
              {about.headline}
            </h3>
            <p className="font-sans text-zinc-400 text-sm font-light leading-relaxed">
              {about.description}
            </p>
          </div>
        </div>
      </section>

      {/* EXPERTISE NODES */}
      {skills?.categories && skills.categories.length > 0 && (
        <section
          id="expertise"
          className="max-w-4xl mx-auto py-20 px-6 border-t border-zinc-900 scroll-mt-20"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <h2 className="font-sans text-xs uppercase tracking-widest text-zinc-600 font-bold">
              Expertise Matrix
            </h2>
            <div className="md:col-span-3 grid gap-6 sm:grid-cols-2">
              {skills.categories.map((cat, i) => (
                <div
                  key={i}
                  className="border border-zinc-900 p-5 rounded-lg bg-zinc-900/10 space-y-2"
                >
                  <h4 className="font-sans text-xs font-semibold uppercase text-amber-500/90 tracking-wide">
                    {cat.name}
                  </h4>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {cat.items.map((item, idx) => (
                      <span
                        key={idx}
                        className="font-sans text-xs text-zinc-400 bg-zinc-900 border border-zinc-800/60 px-2 py-0.5 rounded"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CASE STUDIES */}
      {projects && projects.length > 0 && (
        <section
          id="cases"
          className="max-w-4xl mx-auto py-20 px-6 border-t border-zinc-900 scroll-mt-20"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <h2 className="font-sans text-xs uppercase tracking-widest text-zinc-600 font-bold">
              Case Projects
            </h2>
            <div className="md:col-span-3 space-y-6">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="border border-zinc-900 bg-zinc-900/20 p-6 rounded-xl flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-base font-light text-zinc-100">
                        {proj.title}
                      </h4>
                      {proj.link && (
                        <Link
                          href={proj.link}
                          target="_blank"
                          className="font-sans text-xs text-amber-500 hover:underline flex items-center gap-1"
                        >
                          Review Node <ArrowRight className="size-3" />
                        </Link>
                      )}
                    </div>
                    <p className="font-sans text-zinc-400 text-xs font-light leading-relaxed">
                      {proj.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 font-sans text-[10px] uppercase text-zinc-500 tracking-wider">
                    {proj.technologies.join("  •  ")}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* LEADERSHIP HISTORY */}
      {experience && experience.length > 0 && (
        <section
          id="history"
          className="max-w-4xl mx-auto py-20 px-6 border-t border-zinc-900 mb-12 scroll-mt-20"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <h2 className="font-sans text-xs uppercase tracking-widest text-zinc-600 font-bold">
              Chronology
            </h2>
            <div className="md:col-span-3 space-y-8">
              {experience.map((exp) => (
                <div
                  key={exp.id}
                  className="grid grid-cols-1 sm:grid-cols-4 gap-2 font-sans border-b border-zinc-900 pb-6"
                >
                  <div className="text-xs font-mono text-amber-500/80 uppercase">
                    {exp.period}
                  </div>
                  <div className="sm:col-span-3 space-y-1">
                    <h3 className="text-zinc-200 font-medium text-sm flex items-center gap-1.5">
                      <Briefcase className="size-3.5 text-zinc-600" />{" "}
                      {exp.role}
                    </h3>
                    <div className="text-xs text-zinc-500">{exp.company}</div>
                    <p className="text-zinc-400 text-xs leading-relaxed font-light pt-2">
                      {exp.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* DISPATCH FOOTER SOCIAL ARGS */}
      <footer className="max-w-4xl mx-auto py-12 px-6 border-t border-zinc-900 flex flex-col sm:flex-row gap-4 justify-between items-center font-sans text-xs text-zinc-600">
        <div>System Output // Verified Credentials</div>
        <div className="flex items-center gap-4">
          {contact.github && (
            <Link
              href={contact.github}
              target="_blank"
              className="hover:text-amber-500 transition"
            >
              <GithubIcon className="size-4" />
            </Link>
          )}
          {contact.linkedin && (
            <Link
              href={contact.linkedin}
              target="_blank"
              className="hover:text-amber-500 transition"
            >
              <LinkedinIcon className="size-4" />
            </Link>
          )}
        </div>
      </footer>
    </div>
  );
}
