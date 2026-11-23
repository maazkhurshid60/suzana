import type { Config } from 'tailwindcss';

// The Readdy look: near-white surfaces, charcoal ink and a quiet grey accent,
// rounded cards and pill buttons. "bronze" is kept as the token name for the accent.
export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: { DEFAULT: '#F9F9FA', deep: '#EFEFF1' },
        ink: { DEFAULT: '#111113', soft: '#222226' },
        muted: '#5E5E66',
        line: 'rgb(17 17 19 / 0.08)',
        // Dark enough for small text on paper (7:1).
        bronze: { DEFAULT: '#4A4A52', light: '#B4B4BC' },
      },
      fontFamily: {
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-heading)', 'Georgia', 'serif'],
        label: ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      maxWidth: { site: '1320px' },
    },
  },
  plugins: [],
} satisfies Config;
