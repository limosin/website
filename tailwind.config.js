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
      animation: {
        'fade-in': 'fadeIn 0.15s ease-out',
        'zoom-in': 'zoomIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        zoomIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [
    '@tailwindcss/forms',
    '@tailwindcss/typography'
  ],
};
