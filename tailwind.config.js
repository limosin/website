/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{js,ts,tsx}',
    './components/**/*.{js,ts,tsx}',
    './layouts/**/*.{js,ts,tsx}',
    './lib/**/*.{js,ts,tsx}',
  ],
  plugins: [
    '@tailwindcss/forms',
    '@tailwindcss/typography'
  ],
};
