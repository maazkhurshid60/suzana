import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Link as NavLink } from '@/content/types';
import { Section, type Tone } from './blocks/Section';
import { Reveal } from './Reveal';

/** The other pages in the same menu dropdown, so a visitor reading one service can move to the next. */
export function KeepExploring({ label, links, tone }: { label: string; links: NavLink[]; tone: Tone }) {
  return (
    <Section tone={tone}>
      <Reveal className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-label text-xs font-medium uppercase tracking-[0.28em] text-neutral-500">Keep exploring</p>
          <h2 className="mt-4 text-3xl leading-tight text-neutral-950 md:text-4xl">{label}</h2>
        </div>
      </Reveal>
      <Reveal className="mt-10 grid gap-px overflow-hidden rounded-[22px] border border-neutral-200 bg-neutral-200 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group flex items-center justify-between gap-6 bg-white px-7 py-7 transition-colors hover:bg-neutral-950"
          >
            <span className="font-heading text-2xl text-neutral-950 transition-colors group-hover:text-white">{link.label}</span>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-neutral-300 text-neutral-700 transition-all group-hover:border-white/30 group-hover:text-white">
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </Reveal>
    </Section>
  );
}
