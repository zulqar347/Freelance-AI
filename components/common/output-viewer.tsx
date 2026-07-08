"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Generation } from "@/types/frontend";
import { Check, Clipboard, Download, RefreshCcw } from "lucide-react";
import { useMemo, useState } from "react";

function stringifyContent(content: unknown, indent = 0): string {
  if (content == null) return "";

  if (typeof content === "string") {
    return content;
  }

  if (typeof content === "number" || typeof content === "boolean") {
    return String(content);
  }

  if (Array.isArray(content)) {
    return content
      .map((item) => {
        if (typeof item === "object") {
          return stringifyContent(item, indent + 2);
        }

        return `• ${item}`;
      })
      .join("\n");
  }

  if (typeof content === "object") {
    return Object.entries(content)
      .map(([key, value]) => {
        const label = key
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (c) => c.toUpperCase());

        return `${" ".repeat(indent)}${label}\n${stringifyContent(
          value,
          indent + 2,
        )}`;
      })
      .join("\n\n");
  }

  return "";
}

export function OutputViewer({
  generation,
  title = "Generated output",
  onRegenerate,
  regenerating,
}: {
  generation?: Generation | null;
  title?: string;
  onRegenerate?: () => void;
  regenerating?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const text = useMemo(
    () => stringifyContent(generation?.content),
    [generation],
  );

  async function copy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <Card className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-white">{title}</p>
          <p className="text-xs text-zinc-500">Editable preview workspace</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            className="h-10 px-3"
            onClick={copy}
            disabled={!text}
          >
            {copied ? (
              <Check className="size-4" />
            ) : (
              <Clipboard className="size-4" />
            )}
          </Button>
          <Button variant="secondary" className="h-10 px-3" disabled>
            <Download className="size-4" />
          </Button>
          {onRegenerate ? (
            <Button
              variant="secondary"
              className="h-10 px-3"
              onClick={onRegenerate}
              disabled={regenerating}
            >
              <RefreshCcw className="size-4" />
            </Button>
          ) : null}
        </div>
      </div>
      <textarea
        value={text || "Your generated copy will appear here."}
        readOnly={!text}
        className="min-h-72 w-full resize-none rounded-xl border border-white/10 bg-black/35 p-4 text-sm leading-7 text-zinc-200 outline-none focus:border-cyan-300/50"
      />
    </Card>
  );
}
