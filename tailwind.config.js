/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF5A4F',
          hover: '#E84A40',
          light: '#FFEBE9',
          dark: '#FF6B61',
        },
        break: {
          DEFAULT: '#4F7CFF',
          light: '#E8F0FF',
        },
        bg: {
          light: '#F7F8FA',
          dark: '#111318',
          card: '#FFFFFF',
          'card-dark': '#1C1F26',
        },
      },
      fontSize: {
        timer: ['72px', {
          lineHeight: '1',
          fontWeight: '700',
          fontFeatureSettings: '"tnum"',
        }],
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '20px',
        '3xl': '24px',
      },
      boxShadow: {
        'card': '0 4px 12px rgba(0, 0, 0, 0.06)',
        'card-dark': '0 4px 12px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
}
