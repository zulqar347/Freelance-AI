import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

export function Button({
  className,
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex h-11 items-center justify-center gap-2 rounded-xl px-4 text-sm font-medium transition duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-300/70 disabled:pointer-events-none disabled:opacity-55",
        variant === "primary" &&
          "bg-white text-zinc-950 shadow-[0_18px_50px_rgba(255,255,255,0.16)] hover:bg-cyan-100",
        variant === "secondary" &&
          "border border-white/10 bg-white/6 text-white hover:bg-white/1",
        variant === "ghost" &&
          "text-zinc-300 hover:bg-white/[0.07] hover:text-white",
        variant === "danger" &&
          "border border-red-400/30 bg-red-500/10 text-red-100 hover:bg-red-500/20",
        className,
      )}
      {...props}
    />
  );
}
