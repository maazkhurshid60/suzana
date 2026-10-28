'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Phone } from 'lucide-react';
import type { Link as NavLink } from '@/content/types';

/** Phones only: the two things a visitor comes to do, always within thumb reach. Hidden on the contact page. */
export function MobileActionBar({ phone, button }: { phone: NavLink; button: NavLink }) {
  const pathname = usePathname();
  if (pathname === button.href) return null;
  return (
    <>
      {/* Reserves room so the bar never covers the end of the footer. */}
      <div className="h-[76px] bg-neutral-950 lg:hidden" aria-hidden="true" />
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-black/10 bg-white/95 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md lg:hidden">
        <div className="mx-auto flex max-w-md gap-3">
          <a
            href={phone.href}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-black/15 px-4 py-3 font-label text-sm font-semibold text-black"
          >
            <Phone className="h-4 w-4" />
            Call
          </a>
          <Link
            href={button.href}
            className="inline-flex flex-[1.6] items-center justify-center gap-2 rounded-full bg-black px-4 py-3 font-label text-sm font-semibold text-white"
          >
            {button.label}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </>
  );
}
