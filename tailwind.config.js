/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f4fe',
          100: '#dde6fc',
          200: '#c3d4fa',
          300: '#9abbf6',
          400: '#6999f0',
          500: '#4375e7',
          600: '#2b58db',
          700: '#2143b4',
          800: '#1e3892',
          900: '#0f172a', // Deep corporate navy
          950: '#080d1a'
        }
      }
    },
  },
  plugins: [],
}