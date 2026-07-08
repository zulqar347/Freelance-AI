type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="space-y-3">
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="max-w-3xl text-2xl font-semibold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}
