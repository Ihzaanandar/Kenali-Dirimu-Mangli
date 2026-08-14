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
          50: '#f4f0ff',
          100: '#e9e0ff',
          200: '#d5c4ff',
          300: '#b899ff',
          400: '#9966ff',
          500: '#7e3af2',
          600: '#6c2bd9',
          700: '#5b21b6',
          800: '#4c1d95',
          900: '#3c1878',
        },
        sage: {
          50: '#f2f7f4',
          100: '#e1ede6',
          200: '#c3dbcd',
          300: '#9cc2ab',
          400: '#71a384',
          500: '#528767',
          600: '#3f6c51',
          700: '#345742',
        },
        peach: {
          50: '#fff7f2',
          100: '#ffede2',
          200: '#ffd7c2',
          300: '#ffb995',
          400: '#ff9060',
          500: '#f96c34',
        },
        lavender: '#EBF3FE',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        soft: '0 10px 25px -5px rgba(0, 0, 0, 0.04), 0 8px 10px -6px rgba(0, 0, 0, 0.03)',
      },
    },
  },
  plugins: [],
}
