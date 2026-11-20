import { DirtToDone } from "@/components/DirtToDone/DirtToDone";

export function DirtToDoneSection() {
  return (
    <section className="broom on-deep section" aria-labelledby="dtd-heading" id="dirt-to-done">
      <div className="container-x">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="tick">02 / Dirt to done</p>
            <h2 id="dtd-heading" className="mt-4 text-h2 text-deep-text">
              Watch a job go from dirt to done.
            </h2>
          </div>
          <p className="text-lead text-deep-muted lg:col-span-5 lg:pb-1">
            Three real jobs, start to finish, shot by our crew. Pick one and walk it through.
          </p>
        </div>
        <div className="mt-10 lg:mt-12">
          <DirtToDone />
        </div>
      </div>
    </section>
  );
}
