import type { Config } from 'tailwindcss';

// Warm stone paper, near-black ink and one bronze accent taken from timber and millwork.
// Square corners and hairline rules throughout: the site reads like a set of drawings.
export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: { DEFAULT: '#EEEBE5', deep: '#E4E0D8' },
        ink: { DEFAULT: '#1B1A18', soft: '#2A2825' },
        muted: '#635E56',
        line: 'rgb(27 26 24 / 0.14)',
        // Dark enough for small text on paper (5:1).
        bronze: { DEFAULT: '#7A5C34', light: '#B08A57' },
      },
      fontFamily: {
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-heading)', 'Georgia', 'serif'],
        label: ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'Menlo', 'monospace'],
      },
      maxWidth: { site: '1320px' },
    },
  },
  plugins: [],
} satisfies Config;
