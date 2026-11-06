import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

type Variant = 'light' | 'dark' | 'outline-light' | 'outline-dark';

// Square, quiet buttons with small tracked capitals.
const variants: Record<Variant, string> = {
  light: 'bg-paper text-ink hover:bg-white',
  dark: 'bg-ink text-paper hover:bg-bronze',
  'outline-light': 'border border-white/45 text-white hover:border-white hover:bg-white hover:text-ink',
  'outline-dark': 'border border-ink/30 text-ink hover:border-ink hover:bg-ink hover:text-paper',
};

export function ButtonLink({
  href,
  children,
  variant = 'dark',
  icon = 'right',
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  icon?: 'right' | 'up-right';
}) {
  const Icon = icon === 'right' ? ArrowRight : ArrowUpRight;
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-4 whitespace-nowrap px-7 py-4 font-mono text-[12px] uppercase tracking-[0.18em] transition-colors duration-300 ${variants[variant]}`}
    >
      {children}
      <Icon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
    </Link>
  );
}

export const CONVERSATION_HREF = '/contact/';
