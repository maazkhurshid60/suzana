'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react';
import type { Link as NavLink, Logo, MenuItem } from '@/content/types';
import type { MenuPreview } from '@/lib/content';

type Props = {
  menu: MenuItem[];
  button: NavLink;
  logo: Logo;
  phone?: { label: string; href: string };
  previews?: Record<string, MenuPreview>;
};

// The statement that opens each dropdown. A group added in the dashboard falls back to its own name.
const statements: Record<string, string> = { Services: 'What we build.', Areas: 'Where we build.' };

/** A full-width panel under the header: a statement, the pages with their sub-headlines, and a photo of the one in focus. */
function MegaMenu({ item, pathname, previews, button }: { item: MenuItem; pathname: string; previews: Record<string, MenuPreview>; button: NavLink }) {
  const links = item.links ?? [];
  const [focus, setFocus] = useState(links.find((l) => l.href === pathname)?.href ?? links[0]?.href);
  const focusLabel = links.find((l) => l.href === focus)?.label;
  return (
    <div className="menu-in absolute inset-x-0 top-full border-b border-line bg-paper shadow-[0_50px_80px_-50px_rgba(27,26,24,0.5)]">
      <div className="mx-auto grid max-w-site grid-cols-[0.8fr_1.5fr_1fr] gap-14 px-10 py-12 xl:gap-20">
        <div className="flex flex-col">
          <p className="eyebrow">{item.label}</p>
          <p className="mt-6 font-heading text-[2.6rem] font-light leading-[1.05] text-ink">{statements[item.label] ?? `${item.label}.`}</p>
          <Link href={button.href} className="text-link mt-auto self-start pt-8 text-ink hover:text-bronze">
            {button.label}
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        <ul className="border-t border-line">
          {links.map((link, i) => (
            <li key={link.href} className="border-b border-line">
              <Link
                href={link.href}
                aria-current={pathname === link.href ? 'page' : undefined}
                onMouseEnter={() => setFocus(link.href)}
                onFocus={() => setFocus(link.href)}
                className="group grid grid-cols-[40px_1fr_auto] items-start gap-4 py-5"
              >
                <span className="pt-2 font-mono text-[11px] tracking-[0.2em] text-bronze">{String(i + 1).padStart(2, '0')}</span>
                <span>
                  <span
                    className={`block font-heading text-[1.6rem] leading-tight transition-colors ${
                      focus === link.href || pathname === link.href ? 'text-bronze' : 'text-ink'
                    }`}
                  >
                    {link.label}
                  </span>
                  {previews[link.href]?.sub && (
                    <span className="mt-1.5 line-clamp-1 block text-[13.5px] leading-relaxed text-muted">{previews[link.href].sub}</span>
                  )}
                </span>
                <ArrowRight
                  className={`mt-2.5 h-4 w-4 text-bronze transition-all duration-300 ${focus === link.href ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0'}`}
                  strokeWidth={1.5}
                />
              </Link>
            </li>
          ))}
        </ul>

        <figure className="flex flex-col">
          {/* Every photo loads when the panel opens, so moving down the list crossfades without a gap. */}
          <div className="relative aspect-[4/3] overflow-hidden bg-paper-deep">
            {links.map((link) =>
              previews[link.href]?.image ? (
                <Image
                  key={link.href}
                  src={previews[link.href].image!}
                  alt=""
                  fill
                  sizes="380px"
                  className={`object-cover transition-opacity duration-500 ${link.href === focus ? 'opacity-100' : 'opacity-0'}`}
                />
              ) : null,
            )}
          </div>
          {focusLabel && (
            <figcaption className="mt-3 flex justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              <span>{item.label}</span>
              <span>{focusLabel}</span>
            </figcaption>
          )}
        </figure>
      </div>
    </div>
  );
}

export function Navbar({ menu, button, logo, phone, previews = {} }: Props) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
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

  // Over the homepage film the header is transparent with white type, until the page moves or a menu opens.
  const overHero = pathname === '/' && !scrolled && !mobileOpen && !openGroup;
  const isActive = (item: MenuItem) => (item.links ? item.links.some((l) => pathname === l.href) : pathname === item.href);
  const linkTone = overHero ? 'text-white/85 hover:text-white' : 'text-ink/75 hover:text-ink';
  const navText = 'font-label text-[12px] font-medium uppercase tracking-[0.16em]';

  const renderItem = (item: MenuItem) =>
    item.links ? (
      // Not positioned, so the menu panel spans the whole header rather than this item.
      <li key={item.label} onMouseEnter={() => setOpenGroup(item.label)} onMouseLeave={() => setOpenGroup(null)}>
        <button
          type="button"
          aria-expanded={openGroup === item.label}
          aria-haspopup="true"
          onClick={() => setOpenGroup((g) => (g === item.label ? null : item.label))}
          className={`flex h-[84px] items-center gap-1.5 leading-none transition-colors ${navText} ${linkTone} ${isActive(item) ? (overHero ? '!text-white' : '!text-bronze') : ''}`}
        >
          {item.label}
          <ChevronDown className={`h-3 w-3 transition-transform ${openGroup === item.label ? 'rotate-180' : ''}`} />
        </button>
        {openGroup === item.label && <MegaMenu item={item} pathname={pathname} previews={previews} button={button} />}
      </li>
    ) : (
      <li key={item.label}>
        {/* Same box as the dropdown buttons, so every item sits on one line. */}
        <Link
          href={item.href ?? '/'}
          aria-current={isActive(item) ? 'page' : undefined}
          className={`flex h-[84px] items-center leading-none transition-colors ${navText} ${linkTone} ${isActive(item) ? (overHero ? '!text-white' : '!text-bronze') : ''}`}
        >
          {item.label}
        </Link>
      </li>
    );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300 ${
        overHero ? 'border-b border-white/15 bg-transparent' : 'border-b border-line bg-paper'
      }`}
    >
      {/* Dims the page while a menu is open, so the panel reads as the one thing in focus. */}
      {openGroup && <div className="menu-fade fixed inset-x-0 bottom-0 top-[84px] -z-10 hidden bg-ink/45 lg:block" aria-hidden="true" />}
      <nav ref={navRef} className="mx-auto flex h-[84px] max-w-site items-center justify-between gap-8 px-5 md:px-10">
        <Link href="/" aria-label={`${logo.alt} home`} className="flex shrink-0 items-center">
          <Image
            src={logo.src}
            alt={logo.alt}
            width={logo.width}
            height={logo.height}
            priority
            className={`h-11 w-auto transition-[filter] duration-500 ${overHero ? 'invert' : ''}`}
          />
        </Link>

        <ul className="hidden items-center gap-10 lg:flex">{menu.map(renderItem)}</ul>

        <div className="hidden items-center gap-8 lg:flex">
          {phone && (
            <a
              href={phone.href}
              className={`hidden whitespace-nowrap border-b border-transparent pb-[0.35rem] font-mono text-[12px] tracking-[0.12em] transition-colors xl:inline ${linkTone}`}
            >
              {phone.label}
            </a>
          )}
          <Link href={button.href} className={`text-link whitespace-nowrap ${overHero ? 'text-white' : 'text-ink hover:text-bronze'}`}>
            {button.label}
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          className={`flex h-11 w-11 items-center justify-center border lg:hidden ${overHero ? 'border-white/40 text-white' : 'border-ink/25 text-ink'}`}
        >
          {mobileOpen ? <X className="h-5 w-5" strokeWidth={1.5} /> : <Menu className="h-5 w-5" strokeWidth={1.5} />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="max-h-[calc(100dvh-84px)] overflow-y-auto border-t border-line bg-paper lg:hidden">
          <div className="px-5 pb-8 pt-2">
            {menu.map((item) =>
              item.links ? (
                <div key={item.label} className="border-b border-line py-5">
                  <p className="eyebrow">{item.label}</p>
                  <ul className="mt-3">
                    {item.links.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href} className="flex items-center justify-between py-2.5 font-heading text-2xl text-ink">
                          {link.label}
                          <ArrowRight className="h-4 w-4 text-muted" strokeWidth={1.5} />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href ?? '/'}
                  className="flex items-center justify-between border-b border-line py-5 font-heading text-2xl text-ink"
                >
                  {item.label}
                  <ArrowRight className="h-4 w-4 text-muted" strokeWidth={1.5} />
                </Link>
              ),
            )}
            <div className="flex flex-col gap-3 pt-7">
              <Link
                href={button.href}
                className="inline-flex w-full items-center justify-center gap-3 bg-ink px-6 py-4 font-mono text-[12px] uppercase tracking-[0.18em] text-paper"
              >
                {button.label}
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              {phone && (
                <a
                  href={phone.href}
                  className="inline-flex w-full items-center justify-center border border-ink/25 px-6 py-4 font-mono text-[12px] uppercase tracking-[0.18em] text-ink"
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
