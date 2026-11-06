import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Link as NavLink } from '@/content/types';
import { Section, type Tone } from './blocks/Section';
import { Reveal } from './Reveal';

/** The other pages in the same menu dropdown, as a ruled index, so a visitor reading one service can move to the next. */
export function KeepExploring({ label, links, tone }: { label: string; links: NavLink[]; tone: Tone }) {
  return (
    <Section tone={tone}>
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
        <Reveal>
          <p className="eyebrow">Keep exploring</p>
          <h2 className="mt-7 text-[2.25rem] font-light leading-tight text-ink md:text-[2.75rem]">{label}</h2>
        </Reveal>
        <Reveal className="border-t border-line">
          {links.map((link, i) => (
            <Link key={link.href} href={link.href} className="group flex items-center justify-between gap-6 border-b border-line py-6">
              <span className="flex items-baseline gap-6">
                <span className="font-mono text-[11px] tracking-[0.2em] text-bronze">{String(i + 1).padStart(2, '0')}</span>
                <span className="font-heading text-[1.75rem] leading-tight text-ink transition-colors group-hover:text-bronze md:text-[2rem]">
                  {link.label}
                </span>
              </span>
              <ArrowRight className="h-4 w-4 shrink-0 text-ink transition-transform duration-300 group-hover:translate-x-1.5" strokeWidth={1.5} />
            </Link>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}
