/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/pages/**/*.{js,ts,tsx}", "./src/components/**/*.{js,ts,tsx}", "./src/layouts/**/*.{js,ts,tsx}", "./src/lib/**/*.{js,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-outfit)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-manrope)", "ui-serif", "Georgia", "serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
    },
  },
  plugins: ["@tailwindcss/forms", "@tailwindcss/typography"],
}

export default config
