'use client';

import { useLayoutEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Every new page opens at the top. Links to a section (#recent-work) still land on that section.
 * The instant jump also beats the site's smooth scrolling, so a new page never animates down from
 * wherever the previous page was left.
 */
export function ScrollToTop() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}
