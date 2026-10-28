import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

type Variant = 'light' | 'dark' | 'outline-light' | 'outline-dark';

const variants: Record<Variant, string> = {
  light: 'bg-white text-black hover:bg-white/90',
  dark: 'bg-black text-white hover:bg-neutral-800',
  'outline-light': 'border border-white/40 text-white backdrop-blur-sm hover:border-white hover:bg-white/10',
  'outline-dark': 'border border-neutral-300 text-neutral-900 hover:border-black hover:bg-black hover:text-white',
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
      className={`group inline-flex items-center gap-3 whitespace-nowrap rounded-full px-7 py-3.5 font-label text-sm font-semibold tracking-wide transition-all ${variants[variant]}`}
    >
      {children}
      <Icon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

export const CONVERSATION_HREF = '/contact/';
