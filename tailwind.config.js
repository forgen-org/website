/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{md,mdx,ts,tsx}",
    "./theme.config.tsx",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
