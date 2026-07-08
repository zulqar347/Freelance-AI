// "use client";

// import React, { useState, useMemo, useTransition, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useQueryClient } from "@tanstack/react-query";
// import {
//   Sparkles,
//   ExternalLink,
//   Copy,
//   Check,
//   Share2,
//   Terminal,
//   Layers,
//   Briefcase,
//   AlertCircle,
//   RefreshCw,
//   LayoutGrid,
// } from "lucide-react";
// import { cn } from "@/lib/utils";

// // Types & Shell Imports
// import { PortfolioData } from "@/types/portfolio";
// import { useGenerateLandingPage, useLandingPage } from "@/hooks/use-app-data";
// import { AppShell } from "../common/app-shell";

// // Sub-component Templates
// import { DeveloperPortfolio } from "./developer-portfolio";
// import { MinimalPortfolio } from "./minimal-portfolio";
// import { ExecutivePortfolio } from "./executive-portfolio";

// export type PortfolioTemplate = "developer" | "minimal" | "executive";

// interface PortfolioRendererProps {
//   template: PortfolioTemplate;
//   data: any; // Using any temporarily to bridge structural variations smoothly
// }

// // Static fallback mockup to guarantee the canvas always renders gracefully during initialization
// const MOCK_PREVIEW_DATA = {
//   hero: {
//     name: "Alex Sterling",
//     title: "Principal Systems Engineer",
//     subtitle:
//       "Architecting low-latency distributed networks and fault-tolerant infrastructure integrations.",
//   },
//   about: {
//     headline:
//       "Transforming abstract code structures into global systems architecture.",
//     description:
//       "Over a decade of experience navigating systems design, cloud platform optimization, and high-performance computation boundaries.",
//   },
//   skills: {
//     categories: [
//       {
//         name: "Languages & Frameworks",
//         items: ["TypeScript", "Rust", "Go", "Next.js", "React"],
//       },
//       {
//         name: "Cloud & Platform Infrastructure",
//         items: ["AWS", "Kubernetes", "Docker", "Terraform", "PostgreSQL"],
//       },
//     ],
//   },
//   projects: [
//     {
//       id: "p1",
//       title: "Hyperion Edge Engine",
//       description:
//         "A high-throughput streaming compilation event loop processing 100k+ operations per second safely.",
//       technologies: ["Rust", "Wasm", "gRPC"],
//       link: "#",
//     },
//   ],
//   experience: [
//     {
//       id: "e1",
//       role: "Lead Infrastructure Architect",
//       company: "Quantum Compute Core Labs",
//       period: "2024 — PRESENT",
//       description:
//         "Migrating legacy monolith instances into decoupled, highly resilient reactive nodes.",
//     },
//   ],
//   education: [
//     {
//       id: "ed1",
//       degree: "B.S. Computer Science & Systems Engineering",
//       school: "MIT Engineering Institute",
//       year: "2020",
//     },
//   ],
//   contact: {
//     email: "alex@sterling.io",
//     website: "https://sterling.io",
//     github: "https://github.com",
//     linkedin: "https://linkedin.com",
//   },
//   seo: {
//     title: "Alex Sterling | Portfolio Systems Engine",
//     description: "Professional technical portfolio workspace layout blueprint.",
//   },
// };

// const PortfolioRenderer = React.memo(
//   ({ template, data }: PortfolioRendererProps) => {
//     // Normalize the payload mapping dynamically to fix template presentation gaps safely
//     const normalizedData = useMemo(() => {
//       if (!data) return MOCK_PREVIEW_DATA;
//       return {
//         ...data,
//         experience:
//           data.experience?.map((exp: any, i: number) => ({
//             id: exp.id || `exp-${i}`,
//             company: exp.company,
//             role: exp.position || exp.role, // Safe fallback bridge
//             period: exp.duration || exp.period, // Safe fallback bridge
//             description: exp.description,
//           })) || [],
//         education:
//           data.education?.map((edu: any, i: number) => ({
//             id: edu.id || `edu-${i}`,
//             school: edu.institution || edu.school, // Safe fallback bridge
//             degree: edu.degree,
//             year: edu.duration || edu.year, // Safe fallback bridge
//             description: edu.description,
//           })) || [],
//       };
//     }, [data]);

//     switch (template) {
//       case "minimal":
//         return <MinimalPortfolio data={normalizedData as any} />;
//       case "executive":
//         return <ExecutivePortfolio data={normalizedData as any} />;
//       default:
//         return <DeveloperPortfolio data={normalizedData as any} />;
//     }
//   },
// );
// PortfolioRenderer.displayName = "PortfolioRenderer";

// const TEMPLATE_CARDS: Array<{
//   id: PortfolioTemplate;
//   title: string;
//   description: string;
//   icon: React.ComponentType<{ className?: string }>;
//   accent: string;
// }> = [
//   {
//     id: "developer",
//     title: "Developer Core",
//     description:
//       "Cyberpunk dark mode with animated grid loops & modern technology layout indicators.",
//     icon: Terminal,
//     accent: "from-cyan-500 to-blue-600",
//   },
//   {
//     id: "minimal",
//     title: "Minimal Editorial",
//     description:
//       "Premium Apple-inspired typography maximizing pristine grid whitespace ratios.",
//     icon: Layers,
//     accent: "from-neutral-200 to-neutral-400",
//   },
//   {
//     id: "executive",
//     title: "Executive Elite",
//     description:
//       "Sophisticated deep navy and warm gold corporate layout for leaders and elite operators.",
//     icon: Briefcase,
//     accent: "from-amber-500 to-orange-600",
//   },
// ];

// export function PortfolioGeneratorPage() {
//   const [selectedTemplate, setSelectedTemplate] =
//     useState<PortfolioTemplate>("developer");
//   const [copied, setCopied] = useState(false);
//   const [, startTransition] = useTransition();

//   const queryClient = useQueryClient();

//   // Fetch data
//   const {
//     data: portfolioResponse,
//     isLoading,
//     isError,
//     error,
//     refetch,
//   } = useLandingPage();

//   const generateMutation = useGenerateLandingPage();

//   // Handle data extraction safely from the incoming nested payload architecture
//   const livePortfolio = useMemo(
//     () => portfolioResponse?.data,
//     [portfolioResponse],
//   );

//   // Sync state if backend returns an existing chosen template format profile
//   useEffect(() => {
//     if (livePortfolio?.content?.template) {
//       setSelectedTemplate(livePortfolio.content.template as PortfolioTemplate);
//     }
//   }, [livePortfolio]);

//   const activeContent = useMemo(() => {
//     return livePortfolio?.content || MOCK_PREVIEW_DATA;
//   }, [livePortfolio]);

//   // Execute mutation manually using mutateAsync to handle clean async state synchronization chaining
//   const handleGenerate = async () => {
//     try {
//       if (typeof generateMutation.mutateAsync === "function") {
//         await generateMutation.mutateAsync();
//       } else {
//         generateMutation.mutate();
//       }

//       // Force cache engine invalidation immediately following backend node update completion
//       await queryClient.invalidateQueries({ queryKey: ["landing-page"] });
//       await refetch();
//     } catch (err) {
//       console.error("Pipeline resolution error:", err);
//     }
//   };

//   const handleCopy = async (url: string) => {
//     try {
//       await navigator.clipboard.writeText(window.location.origin + url);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     } catch (err) {
//       console.error("Failed to copy link", err);
//     }
//   };

//   const handleTemplateChange = (id: PortfolioTemplate) => {
//     startTransition(() => {
//       setSelectedTemplate(id);
//     });
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen w-full bg-zinc-950 p-6 lg:p-12 flex flex-col gap-8 animate-pulse">
//         <div className="h-12 w-64 bg-zinc-900 rounded-xl" />
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1">
//           <div className="space-y-6 bg-zinc-900/20 border border-zinc-800/50 rounded-2xl p-6" />
//           <div className="bg-zinc-900/10 border border-zinc-800/30 rounded-2xl h-full" />
//         </div>
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div className="min-h-screen w-full bg-zinc-950 flex items-center justify-center p-6">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           className="max-w-md w-full border border-red-500/20 bg-zinc-900/50 backdrop-blur-xl rounded-2xl p-6 text-center"
//         >
//           <div className="size-12 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
//             <AlertCircle className="size-6 text-red-400" />
//           </div>
//           <h2 className="text-lg font-semibold text-white">
//             Execution Fault Encountered
//           </h2>
//           <p className="text-sm text-zinc-400 mt-2 mb-6">
//             {error?.message ||
//               "An unresolved infrastructure error interrupted the compilation loop."}
//           </p>
//           <button
//             onClick={() => void refetch()}
//             className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-medium rounded-xl transition"
//           >
//             <RefreshCw className="size-4" /> Re-initialize Engine
//           </button>
//         </motion.div>
//       </div>
//     );
//   }

//   return (
//     <AppShell>
//       <main className="min-h-screen w-full bg-zinc-950 text-zinc-50 font-sans antialiased selection:bg-white/10 selection:text-white overflow-x-hidden">
//         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/50 via-zinc-950 to-zinc-950 pointer-events-none -z-10" />

//         <div className="max-w-[1700px] mx-auto p-4 md:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:h-[calc(100vh-4rem)]">
//           {/* LEFT PANEL CONTROLS */}
//           <section className="lg:col-span-5 flex flex-col justify-between space-y-6 overflow-y-auto pr-0 lg:pr-4 scrollbar-thin">
//             <div className="space-y-6">
//               <div>
//                 <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/40 backdrop-blur-md text-[11px] font-medium tracking-wider uppercase text-zinc-400 mb-3">
//                   <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />{" "}
//                   Production Ready Core
//                 </div>
//                 <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-400">
//                   Portfolio Generator
//                 </h1>
//                 <p className="text-sm text-zinc-400 mt-1.5">
//                   Generate and deploy a highly curated, premium portfolio
//                   architecture instantly from verified configurations.
//                 </p>
//               </div>

//               {/* Engine Blueprint Selectors */}
//               <div className="space-y-3">
//                 <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 flex items-center gap-2">
//                   <LayoutGrid className="size-3.5" /> Select Engine Blueprint
//                 </label>
//                 <div className="grid grid-cols-1 gap-3">
//                   {TEMPLATE_CARDS.map((card) => {
//                     const Icon = card.icon;
//                     const isSelected = selectedTemplate === card.id;
//                     return (
//                       <button
//                         key={card.id}
//                         onClick={() => handleTemplateChange(card.id)}
//                         className={cn(
//                           "group relative w-full text-left rounded-2xl border p-4 transition-all duration-300 backdrop-blur-md outline-none",
//                           isSelected
//                             ? "bg-zinc-900/80 border-zinc-700 shadow-[0_0_30px_-5px_rgba(255,255,255,0.05)]"
//                             : "bg-zinc-900/20 border-zinc-900 hover:border-zinc-800 hover:bg-zinc-900/40",
//                         )}
//                       >
//                         {isSelected && (
//                           <motion.div
//                             layoutId="activeGlow"
//                             className="absolute -inset-px rounded-2xl bg-gradient-to-r opacity-10 blur-sm pointer-events-none -z-10"
//                             style={{
//                               backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`,
//                             }}
//                           />
//                         )}
//                         <div className="flex items-start gap-4">
//                           <div
//                             className={cn(
//                               "p-2.5 rounded-xl border transition-colors",
//                               isSelected
//                                 ? "bg-zinc-800 border-zinc-700 text-white"
//                                 : "bg-zinc-950 border-zinc-900 text-zinc-500 group-hover:text-zinc-400",
//                             )}
//                           >
//                             <Icon className="size-5" />
//                           </div>
//                           <div className="flex-1 min-w-0">
//                             <div className="flex items-center justify-between">
//                               <h3
//                                 className={cn(
//                                   "text-sm font-medium transition-colors",
//                                   isSelected ? "text-white" : "text-zinc-300",
//                                 )}
//                               >
//                                 {card.title}
//                               </h3>
//                               {isSelected && (
//                                 <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded-md">
//                                   Current View
//                                 </span>
//                               )}
//                             </div>
//                             <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
//                               {card.description}
//                             </p>
//                           </div>
//                         </div>
//                       </button>
//                     );
//                   })}
//                 </div>
//               </div>
//             </div>

//             {/* Bottom Form Actions Control Center */}
//             <div className="pt-6 border-t border-zinc-900 bg-zinc-950/80 sticky bottom-0 backdrop-blur-xl space-y-4">
//               <button
//                 onClick={handleGenerate}
//                 disabled={generateMutation.isPending}
//                 className="w-full relative group h-12 flex items-center justify-center gap-2 bg-zinc-50 text-zinc-950 font-medium rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-200 overflow-hidden shadow-[0_4px_20px_rgba(255,255,255,0.1)]"
//               >
//                 {generateMutation.isPending ? (
//                   <RefreshCw className="size-4 animate-spin text-zinc-950" />
//                 ) : (
//                   <Sparkles className="size-4 text-zinc-950" />
//                 )}
//                 <span>
//                   {generateMutation.isPending
//                     ? "Compiling Node Graph..."
//                     : livePortfolio
//                       ? "Regenerate Portfolio Layout"
//                       : "Generate Core Portfolio"}
//                 </span>
//               </button>

//               {livePortfolio && (
//                 <div className="border border-zinc-900 bg-zinc-900/30 backdrop-blur-xl p-4 rounded-2xl space-y-3">
//                   <div className="flex items-center justify-between gap-4">
//                     <span className="text-xs font-mono text-zinc-500 truncate select-all">
//                       {livePortfolio.url}
//                     </span>
//                     <div className="flex items-center gap-1.5 shrink-0">
//                       <button
//                         onClick={() => handleCopy(livePortfolio.url)}
//                         className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white transition"
//                         title="Copy Address Location"
//                       >
//                         {copied ? (
//                           <Check className="size-3.5 text-emerald-400" />
//                         ) : (
//                           <Copy className="size-3.5" />
//                         )}
//                       </button>
//                       <button
//                         onClick={() => window.open(livePortfolio.url, "_blank")}
//                         className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white transition flex items-center gap-1.5 text-xs font-medium px-3"
//                       >
//                         <ExternalLink className="size-3.5" /> Launch Live
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </section>

//           {/* RIGHT PREVIEW WORKSPACE */}
//           <section className="lg:col-span-7 rounded-2xl border border-zinc-900 bg-zinc-900/10 backdrop-blur-sm overflow-hidden flex flex-col h-[600px] lg:h-full relative shadow-[inner_0_1px_0_rgba(255,255,255,0.05)]">
//             <div className="h-12 border-b border-zinc-900 bg-zinc-950/80 px-4 flex items-center justify-between shrink-0 backdrop-blur-md">
//               <div className="flex items-center gap-2">
//                 <div className="flex items-center gap-1.5">
//                   <span className="size-2.5 rounded-full bg-zinc-800" />
//                   <span className="size-2.5 rounded-full bg-zinc-800" />
//                   <span className="size-2.5 rounded-full bg-zinc-800" />
//                 </div>
//                 <span className="text-[11px] font-mono tracking-wider text-zinc-500 uppercase ml-2">
//                   Viewport System Preview // template: {selectedTemplate}{" "}
//                   {livePortfolio
//                     ? "(Live Node Loaded)"
//                     : "(Mock Context Preview)"}
//                 </span>
//               </div>
//               {livePortfolio && (
//                 <button
//                   onClick={() => {
//                     if (navigator.share) {
//                       navigator
//                         .share({
//                           title: activeContent.seo?.title,
//                           url: livePortfolio.url,
//                         })
//                         .catch(() => null);
//                     }
//                   }}
//                   className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white font-medium transition"
//                 >
//                   <Share2 className="size-3.5" /> Share Canvas
//                 </button>
//               )}
//             </div>

//             {/* Always populated interactive viewport frame */}
//             <div className="flex-1 overflow-y-auto bg-zinc-950/40 relative">
//               <AnimatePresence mode="wait">
//                 <motion.div
//                   key={`${selectedTemplate}-${livePortfolio?.slug || "preview-active-channel"}`}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -10 }}
//                   transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
//                   className="h-full w-full"
//                 >
//                   <PortfolioRenderer
//                     template={selectedTemplate}
//                     data={activeContent}
//                   />
//                 </motion.div>
//               </AnimatePresence>
//             </div>
//           </section>
//         </div>
//       </main>
//     </AppShell>
//   );
// }

export function PortfolioGeneratorPage() {
  return <div className="flex items-center justify-center">Coming SOON</div>;
}
