"use client";

import { AppShell } from "@/components/common/app-shell";
import { OutputViewer } from "@/components/common/output-viewer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/field";
import {
  useCoverLetters,
  useGenerateCoverLetter,
  useGenerateProposal,
  useProposals,
} from "@/hooks/use-app-data";
import type { Generation } from "@/types/frontend";
import { Clipboard, Sparkles, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";

type WriterKind = "proposal" | "cover-letter";

export function WriterPage({ kind }: { kind: WriterKind }) {
  const [jobDescription, setJobDescription] = useState("");
  const [current, setCurrent] = useState<Generation | null>(null);
  const proposalMutation = useGenerateProposal();
  const coverMutation = useGenerateCoverLetter();
  const proposals = useProposals();
  const covers = useCoverLetters();
  const isCover = kind === "cover-letter";
  const mutation = isCover ? coverMutation : proposalMutation;
  const history = useMemo(() => (isCover ? covers.data : proposals.data) ?? [], [covers.data, isCover, proposals.data]);
  const title = isCover ? "Cover letter generator" : "Proposal generator";

  async function submit() {
    const result = await mutation.mutateAsync(jobDescription);
    setCurrent(result);
  }

  return (
    <AppShell>
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-6">
          <div>
            <p className="text-sm text-cyan-300">{title}</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              Turn the brief into a premium pitch.
            </h1>
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              Paste the job description. The backend will generate copy using your saved profile context.
            </p>
          </div>
          <Card className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium text-white">Job description</p>
              <p className="text-xs text-zinc-500">{jobDescription.length} characters</p>
            </div>
            <Textarea
              value={jobDescription}
              onChange={(event) => setJobDescription(event.target.value)}
              placeholder="Paste the client brief, project scope, requirements, and any must-have details..."
              className="min-h-72"
            />
            <Button onClick={submit} disabled={jobDescription.length < 20 || mutation.isPending} className="w-full">
              <Sparkles className="size-4" />
              {mutation.isPending ? "Generating..." : `Generate ${isCover ? "cover letter" : "proposal"}`}
            </Button>
            {mutation.error ? <p className="text-sm text-red-300">{mutation.error.message}</p> : null}
          </Card>
          <Card>
            <h2 className="text-lg font-semibold text-white">History</h2>
            <div className="mt-4 space-y-3">
              {history.map((item) => (
                <div key={item._id} className="flex items-start justify-between gap-3 rounded-xl border border-white/10 bg-black/20 p-4">
                  <button onClick={() => setCurrent(item)} className="min-w-0 text-left">
                    <p className="line-clamp-2 text-sm text-zinc-300">{item.jobDescription}</p>
                    <p className="mt-2 text-xs text-zinc-600">{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "Saved"}</p>
                  </button>
                  <div className="flex shrink-0 gap-2">
                    <button aria-label="Copy history item" className="rounded-lg p-2 text-zinc-500 hover:bg-white/10 hover:text-white">
                      <Clipboard className="size-4" />
                    </button>
                    <button aria-label="Delete history item" className="rounded-lg p-2 text-zinc-500 hover:bg-red-500/10 hover:text-red-200">
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>
              ))}
              {history.length === 0 ? <p className="text-sm text-zinc-500">No saved generations yet.</p> : null}
            </div>
          </Card>
        </div>
        <OutputViewer
          generation={current}
          title={isCover ? "Cover letter viewer" : "Proposal viewer"}
          onRegenerate={jobDescription.length >= 20 ? submit : undefined}
          regenerating={mutation.isPending}
        />
      </div>
    </AppShell>
  );
}
