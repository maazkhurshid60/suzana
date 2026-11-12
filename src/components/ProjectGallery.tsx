'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

type Photo = { src: string; alt?: string; caption?: string };

/**
 * Project gallery in a repeating run of six: one full width, a pair, then a row of three.
 * Any photo opens full screen; arrow keys and Escape work in the viewer.
 */
export function ProjectGallery({ photos }: { photos: Photo[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const step = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + photos.length) % photos.length)), [photos.length]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    document.addEventListener('keydown', onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
    };
  }, [open, close, step]);

  const current = open === null ? null : photos[open];

  return (
    <>
      <div className="grid gap-5 md:grid-cols-6 md:gap-6">
        {photos.map((photo, i) => {
          const s = i % 6;
          const span = s === 0 ? 'md:col-span-6' : s < 3 ? 'md:col-span-3' : 'md:col-span-2';
          const shape = s === 0 ? 'aspect-[4/3] md:aspect-[16/8]' : s < 3 ? 'aspect-[4/3] md:aspect-[5/4]' : 'aspect-[4/3] md:aspect-[4/5]';
          const sizes = s === 0 ? '(min-width: 1320px) 1240px, 100vw' : s < 3 ? '(min-width: 768px) 50vw, 100vw' : '(min-width: 768px) 33vw, 100vw';
          return (
            <figure key={photo.src} className={span}>
              <button
                type="button"
                onClick={() => setOpen(i)}
                className={`group relative block w-full cursor-zoom-in overflow-hidden bg-paper-deep ${shape}`}
                aria-label={`Open photo ${i + 1} of ${photos.length}`}
              >
                <Image src={photo.src} alt={photo.alt ?? ''} fill sizes={sizes} className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.02]" />
              </button>
              {photo.caption && <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">{photo.caption}</figcaption>}
            </figure>
          );
        })}
      </div>

      {current && open !== null && (
        <div role="dialog" aria-modal="true" aria-label="Photo viewer" className="menu-fade fixed inset-0 z-[100] flex flex-col bg-ink/95 text-paper">
          <div className="flex items-center justify-between px-5 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-paper/70 md:px-10">
            <span>
              {String(open + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
            </span>
            <button type="button" onClick={close} className="flex items-center gap-2 transition-colors hover:text-paper">
              Close <X className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>
          <div className="relative flex-1" onClick={close}>
            <Image src={current.src} alt={current.alt ?? ''} fill sizes="100vw" className="object-contain px-4 md:px-24" />
          </div>
          <div className="flex items-center justify-between gap-6 px-5 py-5 md:px-10">
            <button type="button" onClick={() => step(-1)} aria-label="Previous photo" className="p-2 text-paper/70 transition-colors hover:text-paper">
              <ChevronLeft className="h-6 w-6" strokeWidth={1.25} />
            </button>
            <p className="text-center font-mono text-[11px] uppercase tracking-[0.2em] text-paper/60">{current.caption ?? ''}</p>
            <button type="button" onClick={() => step(1)} aria-label="Next photo" className="p-2 text-paper/70 transition-colors hover:text-paper">
              <ChevronRight className="h-6 w-6" strokeWidth={1.25} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
