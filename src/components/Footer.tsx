import Image from 'next/image';
import Link from 'next/link';
import { getBusiness, getChrome } from '@/lib/content';
import { Flags } from './Flags';

export async function Footer() {
  const [business, chrome] = await Promise.all([getBusiness(), getChrome()]);
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto w-full max-w-site border-t border-paper/10 px-5 pb-10 pt-16 md:px-10 md:pt-24">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_2fr] lg:gap-24">
          {/* Name, address, phone. Only the Charter Oak address publishes. */}
          <address className="not-italic">
            <Image src={chrome.logo.src} alt={chrome.logo.alt} width={chrome.logo.width} height={chrome.logo.height} className="h-14 w-auto invert" />
            <p className="mt-8 max-w-xs font-heading text-[1.75rem] font-light leading-snug text-paper">{chrome.footerNote || business.legalName}</p>
            <div className="mt-8 space-y-5 font-mono text-[12px] uppercase leading-relaxed tracking-[0.14em] text-paper/60">
              <p>
                {business.street}
                <br />
                {business.locality}, {business.region} {business.postalCode}
              </p>
              <p>
                <a href={business.phoneHref} className="text-paper transition-colors hover:text-bronze-light">
                  {business.phone}
                </a>
                {business.email && (
                  <>
                    <br />
                    <a href={`mailto:${business.email}`} className="normal-case tracking-[0.06em] text-paper transition-colors hover:text-bronze-light">
                      {business.email}
                    </a>
                  </>
                )}
              </p>
              <p>
                {business.hours}
                <br />
                {business.weekends}
              </p>
            </div>
          </address>

          <div
            className="grid grid-cols-2 gap-10 sm:[grid-template-columns:var(--footer-cols)]"
            style={{ '--footer-cols': `repeat(${Math.max(chrome.footerColumns.length, 1)}, minmax(0, 1fr))` } as React.CSSProperties}
          >
            {chrome.footerColumns.map((column) => (
              <FooterColumn key={column.title} title={column.title} links={column.links} />
            ))}
          </div>
        </div>

        <Flags flags={chrome.flags} className="mt-10 max-w-2xl" />

        <div className="mt-20 flex flex-col gap-3 border-t border-paper/10 pt-7 font-mono text-[11px] uppercase tracking-[0.18em] text-paper/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {business.legalName}
          </p>
          <p>{business.license}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <nav aria-label={title}>
      <p className="eyebrow !text-bronze-light">{title}</p>
      <ul className="mt-6 space-y-3.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="font-heading text-xl text-paper/80 transition-colors hover:text-paper">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
