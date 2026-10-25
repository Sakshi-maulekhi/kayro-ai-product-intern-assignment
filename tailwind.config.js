/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          50:  '#f3f8f4',
          100: '#e4f0e6',
          200: '#c9e2cd',
          300: '#9ecba6',
          400: '#6db37a',
          500: '#4a9858',
          600: '#3a7d46',
          700: '#306439',
          800: '#2a5031',
          900: '#23422a',
        },
        cream: {
          50:  '#fdfaf6',
          100: '#f9f5f0',
          200: '#f2ebe0',
          300: '#e8dccb',
        },
        forest: {
          900: '#1a2e1c',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        card: '0 2px 16px 0 rgba(74,152,88,0.08), 0 1px 4px 0 rgba(0,0,0,0.06)',
        'card-hover': '0 8px 32px 0 rgba(74,152,88,0.14), 0 2px 8px 0 rgba(0,0,0,0.08)',
      },
    },
  },
  plugins: [],
}
