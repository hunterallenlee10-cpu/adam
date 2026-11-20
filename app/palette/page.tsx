// Phase 1 palette board. Removed once the palette is signed off.
import { Photo } from "@/components/ui/Photo";

export const metadata = { title: "Palette board", robots: { index: false, follow: false } };

const swatches = [
  ["bg", "#F4F2EC", "bg-bg"],
  ["surface", "#FBFAF6", "bg-surface"],
  ["border", "#DAD6C9", "bg-border"],
  ["ink", "#131A14", "bg-ink"],
  ["muted", "#55604F", "bg-muted"],
  ["primary", "#0F3D1E", "bg-primary"],
  ["primary-hover", "#0A2E16", "bg-primary-hover"],
  ["deep", "#0B1F12", "bg-deep"],
  ["deep-muted", "#B9C2B4", "bg-deep-muted"],
  ["accent", "#FED104", "bg-accent"],
  ["accent-hover", "#E8BE00", "bg-accent-hover"],
  ["success", "#1F7A3D", "bg-success"],
  ["error", "#B3261E", "bg-error"],
] as const;

export default function Palette() {
  return (
    <div className="container-x section">
      <p className="tick">00 / Palette</p>
      <p className="mt-4 font-display text-h1 font-extrabold text-primary wide">Grade Line palette</p>
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
        {swatches.map(([name, hex, cls]) => (
          <div key={name} className="slab overflow-hidden">
            <div className={`h-20 ${cls}`} />
            <div className="p-3 text-sm">
              <div className="font-semibold">{name}</div>
              <div className="text-muted">{hex}</div>
            </div>
          </div>
        ))}
      </div>
      <hr className="joint my-12" />
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="slab p-8">
          <p className="tick">01 / Dig</p>
          <p className="mt-3 font-display text-h2 font-extrabold text-primary wide-sm">It&apos;s not a water problem. It&apos;s a grade problem.</p>
          <p className="mt-4 measure text-ink">
            French drains, swales, culverts and storm water work, by a crew that knows the Southern Maryland clay. Body text
            sits at sixteen pixels or more with a line height of 1.55 and about sixty-six characters to the line.
          </p>
          <p className="mt-3 text-muted">Muted text on concrete for captions and secondary lines.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button className="btn btn-primary">Get My Free Estimate</button>
            <button className="btn btn-outline">Call (301) 994-1010</button>
            <a className="link inline-flex items-center" href="#">or text us</a>
          </div>
        </div>
        <Photo id="p01" sizes="(min-width:1024px) 50vw, 100vw" className="aspect-[4/3]" />
      </div>
      <div className="broom on-deep mt-12 rounded-[6px] p-8">
        <p className="tick">04 / Done</p>
        <p className="mt-3 font-display text-h2 font-extrabold wide-sm">Watch a job go from dirt to done.</p>
        <p className="mt-3 text-deep-muted">Deep band with broom finish, muted text and an <span className="font-semibold text-accent">accent number 04</span>.</p>
        <div className="mt-6 flex gap-3">
          <button className="btn btn-primary">Get an estimate for a job like this</button>
          <button className="btn btn-outline">Call (301) 994-1010</button>
        </div>
      </div>
    </div>
  );
}
