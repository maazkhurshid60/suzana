'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react';
import type { Link as NavLink, Logo, MenuItem } from '@/content/types';

type Props = {
  menu: MenuItem[];
  button: NavLink;
  logo: Logo;
  phone?: { label: string; href: string };
};

export function Navbar({ menu, button, logo, phone }: Props) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  // A soft shadow once the page moves, so the header separates from the content beneath it.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menus on navigation, Escape and outside clicks.
  useEffect(() => {
    setMobileOpen(false);
    setOpenGroup(null);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenGroup(null);
        setMobileOpen(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenGroup(null);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onClick);
    };
  }, []);

  const isActive = (item: MenuItem) => (item.links ? item.links.some((l) => pathname === l.href) : pathname === item.href);
  const split = Math.ceil(menu.length / 2);

  // Dropdowns open towards the middle of the screen, so ones near the edges never run off it.
  const renderItem = (side: 'left' | 'right') => (item: MenuItem) =>
    item.links ? (
      <li
        key={item.label}
        className="relative"
        onMouseEnter={() => setOpenGroup(item.label)}
        onMouseLeave={() => setOpenGroup(null)}
      >
        <button
          type="button"
          aria-expanded={openGroup === item.label}
          aria-haspopup="true"
          onClick={() => setOpenGroup((g) => (g === item.label ? null : item.label))}
          className={`flex items-center gap-1 py-6 font-label text-[13px] font-medium tracking-[0.06em] transition-colors hover:text-black ${
            isActive(item) ? 'text-black' : 'text-neutral-700'
          }`}
        >
          {item.label}
          <ChevronDown className={`h-3.5 w-3.5 transition-transform ${openGroup === item.label ? 'rotate-180' : ''}`} />
        </button>
        {openGroup === item.label && (
          <ul className={`absolute top-full z-10 w-64 ${side === 'left' ? '-left-4' : '-right-4'} rounded-2xl border border-black/5 bg-white p-2 shadow-[0_24px_60px_-28px_rgba(0,0,0,0.35)]`}>
            {item.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={pathname === link.href ? 'page' : undefined}
                  className="flex items-center justify-between rounded-xl px-4 py-3 font-label text-sm text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-black aria-[current=page]:bg-neutral-100 aria-[current=page]:text-black"
                >
                  {link.label}
                  <ArrowUpRight className="h-3.5 w-3.5 text-neutral-400" />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </li>
    ) : (
      <li key={item.label}>
        <Link
          href={item.href ?? '/'}
          aria-current={isActive(item) ? 'page' : undefined}
          className="font-label text-[13px] font-medium tracking-[0.06em] text-neutral-700 transition-colors hover:text-black aria-[current=page]:text-black"
        >
          {item.label}
        </Link>
      </li>
    );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b bg-white/95 backdrop-blur-md transition-shadow duration-300 ${
        scrolled ? 'border-black/10 shadow-[0_8px_30px_-18px_rgba(0,0,0,0.35)]' : 'border-black/5'
      }`}
    >
      {/* Original layout: menu split either side of a centred logo on wide screens. The first half of
          the dashboard menu sits left of the logo, the rest on the right with the phone and button. */}
      <nav
        ref={navRef}
        className="mx-auto flex h-[78px] max-w-[1440px] items-center justify-between px-4 md:px-8 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-8 lg:px-10"
      >
        <ul className="hidden items-center gap-8 lg:flex">{menu.slice(0, split).map(renderItem('left'))}</ul>

        <Link href="/" aria-label={`${logo.alt} home`} className="flex items-center lg:justify-self-center">
          <Image src={logo.src} alt={logo.alt} width={logo.width} height={logo.height} priority className="h-11 w-auto" />
        </Link>

        <div className="hidden items-center justify-end gap-8 lg:flex">
          {split < menu.length && <ul className="flex items-center gap-8">{menu.slice(split).map(renderItem('right'))}</ul>}
          {phone && (
            <a
              href={phone.href}
              className="hidden whitespace-nowrap font-label text-[13px] font-medium tracking-[0.04em] text-neutral-700 xl:inline transition-colors hover:text-black"
            >
              {phone.label}
            </a>
          )}
          <Link
            href={button.href}
            className="group inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-black px-6 py-2.5 font-label text-[13px] font-semibold tracking-[0.04em] text-white transition-all hover:bg-neutral-800"
          >
            {button.label}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-black/20 text-black lg:hidden"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="max-h-[calc(100dvh-78px)] overflow-y-auto border-t border-black/5 bg-white lg:hidden">
          <div className="px-6 py-4">
            {menu.map((item) =>
              item.links ? (
                <div key={item.label} className="border-b border-black/5 py-4">
                  <p className="font-label text-xs uppercase tracking-[0.2em] text-neutral-400">{item.label}</p>
                  <ul className="mt-2">
                    {item.links.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href} className="flex items-center justify-between py-2.5 font-label text-base text-neutral-800">
                          {link.label}
                          <ArrowUpRight className="h-4 w-4 text-neutral-400" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href ?? '/'}
                  className="flex items-center justify-between border-b border-black/5 py-4 font-label text-base text-neutral-800"
                >
                  {item.label}
                  <ArrowUpRight className="h-4 w-4 text-neutral-400" />
                </Link>
              ),
            )}
            <div className="flex flex-col gap-3 pb-2 pt-5">
              <Link
                href={button.href}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-black px-6 py-3 font-label text-sm font-semibold text-white"
              >
                {button.label}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              {phone && (
                <a
                  href={phone.href}
                  className="inline-flex w-full items-center justify-center rounded-full border border-black/15 px-6 py-3 font-label text-sm font-semibold text-black"
                >
                  Call {phone.label}
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
