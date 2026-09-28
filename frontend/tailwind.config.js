/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gov: {
          50: '#eff6ff', 100: '#dbeafe', 200: '#bfdbfe',
          500: '#1e3a8a', 600: '#1e40af', 700: '#1d4ed8',
          800: '#1e3a5f', 900: '#0f172a'
        },
        saffron: { 500: '#FF9933' },
        green: { 600: '#138808' }
      }
    },
  },
  plugins: [],
}
