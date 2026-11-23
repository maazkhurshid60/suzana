import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

type Variant = 'light' | 'dark' | 'outline-light' | 'outline-dark';

// Rounded pill buttons, as in the Readdy design.
const variants: Record<Variant, string> = {
  light: 'bg-white text-ink hover:bg-white/90',
  dark: 'bg-ink text-white hover:bg-ink-soft',
  'outline-light': 'border border-white/40 text-white backdrop-blur-sm hover:border-white hover:bg-white/10',
  'outline-dark': 'border border-ink/25 text-ink hover:border-ink',
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
      className={`group inline-flex items-center gap-3 whitespace-nowrap rounded-full px-8 py-4 font-label text-sm font-semibold tracking-wide transition-colors duration-300 ${variants[variant]}`}
    >
      {children}
      <Icon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
    </Link>
  );
}

export const CONVERSATION_HREF = '/contact/';
