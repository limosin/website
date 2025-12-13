/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{js,ts,tsx}',
    './components/**/*.{js,ts,tsx}',
    './layouts/**/*.{js,ts,tsx}',
    './lib/**/*.{js,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        'serif': ['var(--font-merriweather)', 'ui-serif', 'Georgia', 'serif'],
        'mono': ['var(--font-jetbrains-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
    },
  },
  plugins: [
    '@tailwindcss/forms',
    '@tailwindcss/typography'
  ],
};
