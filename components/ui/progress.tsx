"use client";

interface ProgressProps {
  value: number;
  className?: string;
}

export function Progress({ value, className = "" }: ProgressProps) {
  return (
    <div
      className={`h-2 w-full overflow-hidden rounded-full bg-zinc-800 ${className}`}
    >
      <div
        className="h-full rounded-full bg-cyan-400 transition-all duration-500 ease-in-out"
        style={{
          width: `${Math.min(Math.max(value, 0), 100)}%`,
        }}
      />
    </div>
  );
}
