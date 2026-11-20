import Link from "next/link";

// Set in type, never the logo image. Never the h1.
export function Wordmark({ onDeep = false }: { onDeep?: boolean }) {
  return (
    <Link
      href="/"
      className="group inline-flex flex-col leading-none"
      aria-label="Adams Property Works, home"
    >
      <span
        className={`font-display text-[1.6rem] font-extrabold tracking-[-0.01em] ${onDeep ? "text-deep-text" : "text-primary"}`}
        style={{ fontVariationSettings: '"wdth" 125' }}
      >
        ADAMS
      </span>
      <span className="mt-[3px] block h-[2px] w-full bg-accent" aria-hidden="true" />
      <span
        className={`mt-[5px] text-[0.625rem] font-semibold tracking-[0.3em] ${onDeep ? "text-deep-muted" : "text-muted"}`}
      >
        PROPERTY WORKS
      </span>
    </Link>
  );
}
