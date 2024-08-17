/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        // Define your custom font size
        'sm': '0.70rem', // This is slightly smaller than the default 'sm' size
        // You can define it to be any size you need, for example:
        'xsm': '0.65rem', // 13px in rem (16px base) which is between 'xs' and 'sm'
      },
      padding: {
        'pft': '0.2rem', // Custom padding value
      },
      fontFamily: {
        'dm-serif': ['DM Serif Text', 'serif'],  // Adding DM Serif Text
        'ubuntu': ['Ubuntu', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

