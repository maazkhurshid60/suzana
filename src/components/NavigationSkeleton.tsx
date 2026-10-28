'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { PageSkeleton } from './PageSkeleton';

/**
 * Next.js keeps the old page on screen while a page that was not prefetched loads, which feels
 * like a dead click. This shows the page skeleton as soon as an internal link is clicked, if the
 * new page takes longer than a moment, and hides it the instant the new page arrives.
 */
const DELAY_MS = 150;

export function NavigationSkeleton() {
  const pathname = usePathname();
  const [pending, setPending] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    window.clearTimeout(timer.current);
    setPending(false);
  }, [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest('a');
      if (!link || link.target === '_blank' || link.hasAttribute('download')) return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setPending(true), DELAY_MS);
    };
    // Capture phase: Next.js Link calls preventDefault() on the click before it bubbles to document.
    document.addEventListener('click', onClick, true);
    return () => {
      document.removeEventListener('click', onClick, true);
      window.clearTimeout(timer.current);
    };
  }, []);

  if (!pending) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 top-0 z-40 overflow-hidden bg-neutral-50">
      <PageSkeleton />
    </div>
  );
}
