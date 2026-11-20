import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "./JsonLd";

type Crumb = { name: string; path: string };

// Visible breadcrumbs plus BreadcrumbList structured data, server-rendered.
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all = [{ name: "Home", path: "/" }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb" className="text-sm">
        <ol className="flex flex-wrap items-center gap-1 text-muted">
          {all.map((c, i) => (
            <li key={c.path} className="flex items-center gap-1">
              {i > 0 && <ChevronRight size={14} aria-hidden="true" />}
              {i < all.length - 1 ? (
                <Link href={c.path} className="inline-flex min-h-11 items-center hover:text-primary hover:underline">
                  {c.name}
                </Link>
              ) : (
                <span aria-current="page" className="font-semibold text-ink">
                  {c.name}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd data={breadcrumbJsonLd(all)} />
    </>
  );
}
