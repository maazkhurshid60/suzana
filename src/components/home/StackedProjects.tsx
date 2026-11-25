'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

export type StackCard = { id: string; name: string; meta: string; text?: string; src: string; alt: string; href?: string };

/** Readdy's signature projects: full-width cards that stack as you scroll, each one easing back as the next covers it. */
export function StackedProjects({ cards }: { cards: StackCard[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState<number[]>(cards.map(() => 0));

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const els = Array.from(track.querySelectorAll<HTMLElement>('[data-stack-card]'));
      setProgress(
        els.map((el, i) => {
          const next = els[i + 1];
          if (!next) return 0;
          // How far the following card has slid over this one.
          const covered = 1 - (next.getBoundingClientRect().top - 96) / (window.innerHeight * 0.75);
          return Math.max(0, Math.min(1, covered));
        }),
      );
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={trackRef} className="relative flex flex-col gap-6">
      {cards.map((card, i) => {
        const body = (
          <>
            <div className="absolute inset-0">
              <Image src={card.src} alt={card.alt} fill sizes="(min-width: 1280px) 1216px, 100vw" className="object-cover transition-transform duration-[1600ms] group-hover:scale-105" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
              <div className="max-w-xl">
                <p className="font-label text-xs uppercase tracking-[0.22em] text-white/70">{card.meta}</p>
                <h3 className="mt-3 font-heading text-3xl text-white md:text-4xl">{card.name}</h3>
                {card.text && <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/85 md:text-base">{card.text}</p>}
                {card.href && (
                  <span className="mt-5 inline-flex items-center gap-2 font-label text-sm font-semibold uppercase tracking-wide text-white">
                    View the project
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                )}
              </div>
            </div>
          </>
        );
        const style = {
          top: `${96 + i * 8}px`,
          transform: `scale(${1 - progress[i] * 0.06})`,
          opacity: 1 - progress[i] * 0.5,
          zIndex: i,
        };
        const cls = 'group sticky block h-[360px] origin-top overflow-hidden rounded-[28px] bg-ink md:h-[520px]';
        return card.href ? (
          <Link key={card.id} href={card.href} data-stack-card className={cls} style={style}>
            {body}
          </Link>
        ) : (
          <article key={card.id} data-stack-card className={cls} style={style}>
            {body}
          </article>
        );
      })}
    </div>
  );
}
