import type { ReactNode } from 'react';

const tones = {
  light: 'bg-neutral-50',
  muted: 'bg-neutral-100',
};

export type Tone = keyof typeof tones;

export function Section({ id, tone, children }: { id?: string; tone: Tone; children: ReactNode }) {
  return (
    <section id={id} className={`relative ${tones[tone]} py-20 md:py-28`}>
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">{children}</div>
    </section>
  );
}

export function SectionHeading({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <h2 className={`text-4xl leading-[1.06] text-neutral-950 md:text-5xl lg:text-[54px] ${className}`}>{children}</h2>;
}
