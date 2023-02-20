/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: 'rgba(255, 89, 89, 0.1)',
          200: 'rgba(255, 89, 89, 0.2)',
          300: 'rgba(255, 89, 89, 0.3)',
          400: 'rgba(255, 89, 89, 0.4)',
          500: 'rgba(255, 89, 89, 0.5)',
          600: 'rgba(255, 89, 89, 0.6)',
          700: 'rgba(255, 89, 89, 0.7)',
          800: 'rgba(255, 89, 89, 0.8)',
          900: 'rgba(255, 89, 89, 0.9)',
          1000: 'rgba(255, 89, 89, 1)',
        }
      }
    },
  },
  plugins: [],
};
