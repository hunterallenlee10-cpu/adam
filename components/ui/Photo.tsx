import Image from "next/image";
import { photos, type PhotoId } from "@/lib/photos";

type Props = {
  id: PhotoId;
  sizes: string;
  className?: string;
  imgClassName?: string;
  preload?: boolean;
  pos?: string;
  alt?: string;
  decorative?: boolean;
};

// Every image gets a sizes value, a width and a height, and alt text from the photo map.
// It fills its frame with object-fit: cover and never upscales past the source width.
export function Photo({ id, sizes, className = "", imgClassName = "", preload = false, pos, alt, decorative = false }: Props) {
  const p = photos[id];
  return (
    <div className={`photo-frame ${className}`}>
      <Image
        src={p.src}
        width={p.width}
        height={p.height}
        alt={decorative ? "" : (alt ?? p.alt)}
        aria-hidden={decorative || undefined}
        sizes={sizes}
        preload={preload}
        loading={preload ? "eager" : "lazy"}
        fetchPriority={preload ? "high" : undefined}
        className={`h-full w-full object-cover ${imgClassName}`}
        style={{ objectPosition: pos ?? p.pos ?? "50% 50%" }}
      />
    </div>
  );
}
