/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: 'rgba(31, 140, 208, 1)',
        secondary: 'rgba(217, 217, 217, 0.4)',
      }
    },
  },
  plugins: [],
}

