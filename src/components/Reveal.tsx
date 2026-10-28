'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

/**
 * Fades content up as it scrolls into view. Content renders visible on the server and only
 * hides after hydration if it is still below the fold, so nothing is lost without JavaScript.
 * Skipped entirely for visitors who prefer reduced motion.
 */
export function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<'static' | 'hidden' | 'shown'>('static');

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    setState('hidden');
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState('shown');
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const motion = state === 'static' ? '' : state === 'hidden' ? 'reveal' : 'reveal is-visible';
  return (
    <div ref={ref} className={`${motion} ${className}`}>
      {children}
    </div>
  );
}
