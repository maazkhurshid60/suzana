import Image from 'next/image';
import Link from 'next/link';
import { getBusiness, getChrome } from '@/lib/content';
import { Flags } from './Flags';

export async function Footer() {
  const [business, chrome] = await Promise.all([getBusiness(), getChrome()]);
  return (
    <footer className="bg-neutral-950 text-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-14 md:px-6 md:py-20 lg:px-8">
        <div className="grid gap-12 md:grid-cols-[1.3fr_3fr]">
          {/* Name, address, phone. Only the Charter Oak address publishes. */}
          <address className="not-italic">
            <Image src={chrome.logo.src} alt={chrome.logo.alt} width={chrome.logo.width} height={chrome.logo.height} className="h-12 w-auto invert" />
            <p className="mt-6 font-heading text-xl text-white">{business.legalName}</p>
            <p className="mt-3 text-sm leading-relaxed text-neutral-400">
              {business.street}
              <br />
              {business.locality}, {business.region} {business.postalCode}
            </p>
            <p className="mt-3 text-sm">
              <a href={business.phoneHref} className="text-neutral-300 transition-colors hover:text-white">
                {business.phone}
              </a>
            </p>
            {business.email && (
              <p className="mt-1 text-sm">
                <a href={`mailto:${business.email}`} className="text-neutral-300 transition-colors hover:text-white">
                  {business.email}
                </a>
              </p>
            )}
            <p className="mt-3 text-sm leading-relaxed text-neutral-400">
              {business.hours}.
              <br />
              {business.weekends}.
            </p>
            <p className="mt-3 text-sm text-neutral-400">{business.license}</p>
          </address>

          <div
            className="grid grid-cols-2 gap-8 sm:[grid-template-columns:var(--footer-cols)]"
            style={{ '--footer-cols': `repeat(${Math.max(chrome.footerColumns.length, 1)}, minmax(0, 1fr))` } as React.CSSProperties}
          >
            {chrome.footerColumns.map((column) => (
              <FooterColumn key={column.title} title={column.title} links={column.links} />
            ))}
          </div>
        </div>

        <Flags flags={chrome.flags} className="mt-10 max-w-2xl" />

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-neutral-500">
            © {new Date().getFullYear()} {business.legalName} All rights reserved.
          </p>
          {chrome.footerNote && <p className="text-xs text-neutral-500">{chrome.footerNote}</p>}
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <nav aria-label={title}>
      <p className="font-label text-xs uppercase tracking-[0.2em] text-neutral-500">{title}</p>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-sm text-neutral-400 transition-colors hover:text-white">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
