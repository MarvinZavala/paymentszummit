/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand navy, used for page tops, ink and the footer.
        navy: {
          950: '#08132F',
          900: '#0E2152',
          800: '#16306F',
          700: '#1E3A8A',
          600: '#2C4FA8',
          300: '#A9B8DD',
          200: '#CFD8EE',
        },
        // Brand gold: buttons and the "fees" highlighter only.
        gold: {
          500: '#F2AE0A',
          400: '#FBBF24',
          200: '#FDE6A3',
        },
        ink: '#0E1A3A',
        muted: '#4B5876',
        paper: '#F4F6FA',
        line: '#DDE2EC',
      },
      fontFamily: {
        sans: ['var(--font-archivo)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-plex-mono)', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        prose: '64ch',
      },
    },
  },
  plugins: [],
}
