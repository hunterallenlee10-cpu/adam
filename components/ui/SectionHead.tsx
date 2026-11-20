type Props = {
  tick: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  id?: string;
  className?: string;
  align?: "left" | "split";
};

// Surveyor tick, a wide heavy h2 and an optional short intro.
export function SectionHead({ tick, title, intro, id, className = "", align = "left" }: Props) {
  if (align === "split") {
    return (
      <div className={`grid gap-6 lg:grid-cols-12 lg:items-end ${className}`}>
        <div className="lg:col-span-7">
          <p className="tick">{tick}</p>
          <h2 id={id} className="mt-4 text-h2 text-primary">
            {title}
          </h2>
        </div>
        {intro && <div className="text-lead text-ink/85 lg:col-span-5 lg:pb-1">{intro}</div>}
      </div>
    );
  }
  return (
    <div className={className}>
      <p className="tick">{tick}</p>
      <h2 id={id} className="mt-4 max-w-[22ch] text-h2 text-primary">
        {title}
      </h2>
      {intro && <div className="mt-5 measure text-lead text-ink/85">{intro}</div>}
    </div>
  );
}
