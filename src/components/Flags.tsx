import type { Flag } from '@/content/types';
import { REVIEW_MODE } from '@/lib/review';

const labels: Record<Flag['kind'], string> = {
  input: 'Client input needed',
  draft: 'Draft for approval',
  decision: 'Decision needed',
  hold: 'Hold recommended',
};

const styles: Record<Flag['kind'], string> = {
  input: 'border-amber-400/70 bg-amber-50 text-amber-950',
  draft: 'border-sky-400/70 bg-sky-50 text-sky-950',
  decision: 'border-violet-400/70 bg-violet-50 text-violet-950',
  hold: 'border-rose-400/70 bg-rose-50 text-rose-950',
};

export function Flags({ flags, className = '' }: { flags?: Flag[]; className?: string }) {
  if (!REVIEW_MODE || !flags?.length) return null;
  return (
    <div className={`space-y-2 ${className}`}>
      {flags.map((flag) => (
        <aside
          key={flag.text}
          className={`rounded-xl border border-dashed px-4 py-3 font-label text-[13px] leading-relaxed ${styles[flag.kind]}`}
        >
          <span className="mr-2 font-semibold uppercase tracking-[0.12em] text-[11px]">{labels[flag.kind]}</span>
          {flag.text}
        </aside>
      ))}
    </div>
  );
}

export function DraftChip() {
  if (!REVIEW_MODE) return null;
  return (
    <span className="ml-2 inline-block rounded-full border border-dashed border-sky-400/70 bg-sky-50 px-2 py-0.5 align-middle font-label text-[10px] font-semibold uppercase tracking-[0.12em] text-sky-900">
      Draft
    </span>
  );
}

export function ReviewBanner() {
  if (!REVIEW_MODE) return null;
  return (
    <div className="fixed bottom-24 right-4 z-[60] max-w-[calc(100vw-2rem)] rounded-full border border-amber-400 bg-amber-50/95 px-4 py-2 font-label text-xs text-amber-950 shadow-lg backdrop-blur lg:bottom-4">
      <span className="font-semibold">Review mode.</span>
      <span className="hidden sm:inline"> Copy-document flags are visible. Set NEXT_PUBLIC_SITE_MODE=preview for a clean version.</span>
    </div>
  );
}
