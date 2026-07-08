import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Terminal, ExternalLink } from "lucide-react";
import ConnectDB from "@/lib/db";
import LandingPage from "@/lib/models/PortfolioPage";
import { PortfolioData, PortfolioTemplate } from "@/types/portfolio";

interface Props {
  params: Promise<{ slug: string }>;
}

interface DBRecord {
  slug: string;
  template: PortfolioTemplate;
  content: PortfolioData;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  await ConnectDB();
  const pageRecord = (await LandingPage.findOne({
    slug,
  }).lean()) as unknown as DBRecord | null;

  const title =
    pageRecord?.content?.seo?.title ||
    `${slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ")} | Portfolio`;
  const description =
    pageRecord?.content?.seo?.description ||
    "View my professional qualifications and dynamic project registry assets.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "profile",
    },
  };
}

// -------------------------------------------------------------
// LAYOUT 1: PROFESSIONAL MINIMAL (ATS/Recruiter Blueprint)
// -------------------------------------------------------------
function MinimalLayout({ content }: { content: PortfolioData }) {
  return (
    <div className="max-w-3xl mx-auto py-20 px-6 space-y-12 font-sans text-zinc-400 selection:bg-cyan-500/10">
      <header className="space-y-3 border-b border-zinc-900 pb-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-white">
          {content.fullName}
        </h1>
        <p className="text-cyan-400 font-mono text-sm tracking-tight">
          {content.title}
        </p>
        <p className="text-zinc-400 leading-relaxed text-sm max-w-2xl font-normal">
          {content.summary}
        </p>

        <div className="flex gap-4 pt-3 text-zinc-500 text-xs font-mono">
          {content.github && (
            <Link
              href={content.github}
              target="_blank"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              [GitHub]
            </Link>
          )}
          {content.linkedin && (
            <Link
              href={content.linkedin}
              target="_blank"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              [LinkedIn]
            </Link>
          )}
        </div>
      </header>

      {content.skills?.categories && content.skills.categories.length > 0 && (
        <section className="space-y-4">
          <h2 className="font-mono text-[11px] uppercase tracking-widest text-zinc-500">
            Technical Capability Grid
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {content.skills.categories.map((cat, i) => (
              <div
                key={i}
                className="border border-zinc-900 bg-zinc-900/10 p-4 rounded-xl"
              >
                <h3 className="font-semibold text-zinc-200 mb-2 text-xs">
                  {cat.name}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {cat.items?.map((item, idx) => (
                    <span
                      key={idx}
                      className="bg-zinc-950 border border-zinc-800 px-2 py-0.5 rounded font-mono text-[11px] text-zinc-400"
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

      {content.experience && content.experience.length > 0 && (
        <section className="space-y-6">
          <h2 className="font-mono text-[11px] uppercase tracking-widest text-zinc-500">
            Selected Experience History
          </h2>
          <div className="space-y-6 border-l border-zinc-900 pl-4 ml-1">
            {content.experience.map((exp) => (
              <div key={exp.id} className="relative space-y-1">
                <div className="absolute -left-[21px] top-1 size-2 rounded-full bg-cyan-400 border-2 border-zinc-950" />
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-zinc-300 gap-1">
                  <span className="font-bold text-zinc-100 text-sm">
                    {exp.role}
                  </span>
                  <span className="font-mono text-[11px] text-zinc-500">
                    {exp.period}
                  </span>
                </div>
                <div className="text-xs text-zinc-500">{exp.company}</div>
                <p className="text-zinc-400 leading-relaxed text-xs pt-1">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {content.projects && content.projects.length > 0 && (
        <section className="space-y-4">
          <h2 className="font-mono text-[11px] uppercase tracking-widest text-zinc-500">
            Verified System Nodes
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {content.projects.map((proj) => (
              <div
                key={proj.id}
                className="border border-zinc-900 rounded-xl p-5 bg-zinc-900/10 flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <h4 className="font-bold text-zinc-200 text-sm">
                      {proj.title}
                    </h4>
                    {proj.link && (
                      <Link href={proj.link} target="_blank">
                        <ExternalLink className="size-3.5 text-zinc-500 hover:text-white" />
                      </Link>
                    )}
                  </div>
                  <p className="text-zinc-400 text-xs leading-relaxed font-light">
                    {proj.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1">
                  {proj.technologies?.map((tech) => (
                    <span
                      key={tech}
                      className="bg-zinc-950 border border-zinc-900 px-2 py-0.5 rounded text-[10px] font-mono text-zinc-500"
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
    </div>
  );
}

// -------------------------------------------------------------
// LAYOUT 2: CREATIVE DEVELOPER (Terminal/Ecosystem Aesthetic)
// -------------------------------------------------------------
function DeveloperLayout({ content }: { content: PortfolioData }) {
  return (
    <div className="max-w-4xl mx-auto py-16 px-6 space-y-12 font-mono text-xs text-zinc-400 selection:bg-purple-500/20">
      <header className="space-y-3">
        <div className="text-purple-400">
          Portfolio Infrastructure Framework
        </div>
        <h1 className="text-3xl font-black text-white uppercase">
          {content.fullName}
        </h1>
        <div className="text-zinc-300 font-bold">&gt; {content.title}</div>
        <p className="font-sans text-zinc-400 text-sm max-w-xl leading-relaxed font-normal">
          {content.summary}
        </p>
      </header>

      {content.projects && content.projects.length > 0 && (
        <section className="space-y-4">
          <div className="text-zinc-500 border-b border-zinc-900 pb-1">
            <Terminal className="size-3.5 inline mr-1 text-purple-400" /> #
            EXECUTABLE_PROJECTS
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {content.projects.map((proj) => (
              <div
                key={proj.id}
                className="border border-zinc-900 bg-zinc-950 p-4 rounded-lg space-y-2 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-200 font-bold">
                      {proj.title}
                    </span>
                    {proj.link && (
                      <Link href={proj.link} target="_blank">
                        <ExternalLink className="size-3.5 text-zinc-600 hover:text-purple-400" />
                      </Link>
                    )}
                  </div>
                  <p className="font-sans text-zinc-400 text-xs mt-1">
                    {proj.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {proj.technologies?.map((tech) => (
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
    </div>
  );
}

// -------------------------------------------------------------
// LAYOUT 3: EXECUTIVE PERSONAL BRAND (Editorial Luxury)
// -------------------------------------------------------------
function ExecutiveLayout({ content }: { content: PortfolioData }) {
  return (
    <div className="max-w-3xl mx-auto py-20 px-6 space-y-16 font-serif text-zinc-400 selection:bg-amber-500/10">
      <header className="text-center space-y-4 max-w-xl mx-auto">
        <h1 className="text-4xl font-light text-zinc-100 italic">
          {content.fullName}
        </h1>
        <p className="font-sans text-amber-500 font-mono tracking-widest text-xs uppercase">
          {content.title}
        </p>
        <p className="font-sans text-zinc-400 text-sm font-light leading-relaxed">
          {content.summary}
        </p>
      </header>

      {content.experience && content.experience.length > 0 && (
        <section className="space-y-6 font-sans max-w-xl mx-auto">
          <h2 className="font-serif italic text-xs text-zinc-500 text-center tracking-widest uppercase">
            Chronology Architecture
          </h2>
          {content.experience.map((exp) => (
            <div
              key={exp.id}
              className="grid grid-cols-1 sm:grid-cols-4 gap-2 border-t border-zinc-900 pt-4"
            >
              <div className="text-xs font-mono text-amber-500/80 uppercase">
                {exp.period}
              </div>
              <div className="sm:col-span-3 space-y-1">
                <h3 className="text-zinc-200 font-medium text-sm">
                  {exp.role}
                </h3>
                <div className="text-xs text-zinc-500">{exp.company}</div>
                <p className="text-zinc-400 text-xs leading-relaxed font-light pt-1">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}

// -------------------------------------------------------------
// MAIN DYNAMIC DISTRIBUTOR CONTROLLER
// -------------------------------------------------------------
export default async function PublicPortfolioPage({ params }: Props) {
  const { slug } = await params;
  await ConnectDB();
  const pageRecord = (await LandingPage.findOne({
    slug,
  }).lean()) as unknown as DBRecord | null;

  if (!pageRecord || !pageRecord.content) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-center p-6">
        <div className="max-w-sm border border-zinc-900 bg-zinc-900/20 p-6 rounded-xl font-mono text-xs text-zinc-500">
          <p className="text-rose-400 font-bold mb-1">
            [404] Profile Not Distributed
          </p>
          <p>
            The directory pointer for &quot;{slug}&quot; is offline or has not
            been compiled yet.
          </p>
        </div>
      </div>
    );
  }

  const { content, template } = pageRecord;

  return (
    <div className="min-h-screen bg-zinc-950 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#27272a05_1px,transparent_1px),linear-gradient(to_bottom,#27272a05_1px,transparent_1px)] bg-[size:2rem_2rem]" />
      <main>
        {template === "minimal" && <MinimalLayout content={content} />}
        {template === "developer" && <DeveloperLayout content={content} />}
        {template === "executive" && <ExecutiveLayout content={content} />}
      </main>
      <footer className="py-12 border-t border-zinc-900/60 text-center text-[10px] font-mono text-zinc-600">
        Powered by FreelanceAI Identity Engines // Secure Entry Node
      </footer>
    </div>
  );
}
