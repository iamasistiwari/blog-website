/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        'sm': '0.70rem',
        'xsm': '0.65rem',
      },
      padding: {
        'pft': '0.2rem',
      },
      fontFamily: {
        'dm-serif': ['DM Serif Text', 'serif'],
        'ubuntu': ['Ubuntu', 'sans-serif'],
        'anek': ['Anek Devanagari', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

