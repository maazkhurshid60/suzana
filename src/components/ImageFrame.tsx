import Image from 'next/image';
import { ImageIcon } from 'lucide-react';
import type { ImageSlot } from '@/content/types';
import { hasPhoto, REVIEW_MODE } from '@/lib/review';

/**
 * A photo position from the copy document. A real photo always shows. A placeholder photo shows in
 * review and preview with a "Placeholder photo" tag, and never in the public build. An empty slot
 * shows a labelled box in review mode only.
 * Image rules: no people in frame, no street numbers, no filenames naming the street or client.
 */
export function ImageFrame({ image, className = '' }: { image: ImageSlot; className?: string }) {
  if (hasPhoto(image) && image.src) {
    return (
      <div className={`relative overflow-hidden rounded-[28px] bg-neutral-200 ${className}`}>
        <Image src={image.src} alt={image.alt ?? ''} fill sizes="(min-width: 1280px) 1216px, 100vw" className="object-cover" />
        {image.placeholder && (
          <span className="absolute left-4 top-4 rounded-full bg-black/55 px-3 py-1 font-label text-[10px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm">
            Placeholder photo
          </span>
        )}
      </div>
    );
  }
  if (!REVIEW_MODE) return null;
  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 rounded-[28px] border border-dashed border-neutral-300 bg-[repeating-linear-gradient(135deg,theme(colors.neutral.100),theme(colors.neutral.100)_14px,theme(colors.neutral.50)_14px,theme(colors.neutral.50)_28px)] px-6 text-center ${className}`}
    >
      <ImageIcon className="h-7 w-7 text-neutral-400" strokeWidth={1.25} />
      <p className="max-w-md font-label text-xs uppercase tracking-[0.18em] text-neutral-500">Photo needed</p>
      <p className="max-w-md font-heading text-lg italic text-neutral-600">{image.label}</p>
    </div>
  );
}
