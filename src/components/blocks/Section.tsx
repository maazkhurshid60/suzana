import type { ReactNode } from 'react';

// Every section sits on the same stone paper, separated by a hairline, like sheets in a drawing set.
// "muted" is a slightly deeper paper for the occasional band that should stand apart.
const tones = {
  light: 'bg-paper',
  muted: 'bg-paper',
  deep: 'bg-paper-deep',
};

export type Tone = keyof typeof tones;

export function Section({ id, tone, children, rule = true }: { id?: string; tone: Tone; children: ReactNode; rule?: boolean }) {
  return (
    <section id={id} className={`relative ${tones[tone]}`}>
      <div className={`mx-auto w-full max-w-site px-5 py-20 md:px-10 md:py-28 lg:py-32 ${rule ? 'border-t border-line' : ''}`}>{children}</div>
    </section>
  );
}

/** A section number set as a drawing note: "—— 02". */
export function SectionNumber({ n, className = '' }: { n?: number; className?: string }) {
  if (!n) return null;
  return <p className={`eyebrow ${className}`}>{String(n).padStart(2, '0')}</p>;
}

export function SectionHeading({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <h2 className={`text-[2.5rem] font-light leading-[1.05] text-ink md:text-5xl lg:text-[3.6rem] ${className}`}>{children}</h2>
  );
}
