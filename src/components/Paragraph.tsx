import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Para } from '@/content/types';
import { DraftChip } from './Flags';

export function Paragraph({ para, className = '' }: { para: Para; className?: string }) {
  const { text, links, draft } = typeof para === 'string' ? { text: para, links: undefined, draft: false } : para;
  return (
    <p className={className}>
      {text}
      {draft && <DraftChip />}
      {links?.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="group ml-3 inline-flex items-center gap-1 whitespace-nowrap font-label text-[13px] font-semibold uppercase tracking-wide text-neutral-900 underline decoration-neutral-300 underline-offset-4 transition-colors hover:decoration-neutral-900"
        >
          {link.label}
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      ))}
    </p>
  );
}
