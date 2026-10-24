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
          ivory: '#FCFAFD',
          teal: '#2E1065',
          gold: '#C026D3',
          sage: '#DCE5DC',
          blush: '#FAF5FF',
          charcoal: '#20211F',
          muted: '#686760',
        },
        sindoor: {
          DEFAULT: '#D9232D',
          50: '#FDF2F2',
          100: '#FCE4E4',
          200: '#F9CECE',
          500: '#D9232D',
          600: '#C01A24',
          700: '#9B131B',
        },
        ochre: {
          DEFAULT: '#C46D86',
          50: '#FDF8F0',
          100: '#FBF0DE',
          200: '#F6E1BD',
          500: '#C46D86',
          600: '#B85372',
          700: '#9B6C2E',
        },
        charcoal: {
          DEFAULT: '#3B302D',
          dark: '#141312',
          light: '#524F4B',
          muted: '#6E6663',
        },
        silk: {
          DEFAULT: '#F7F2E9',
          warm: '#F6E8EE',
          linen: '#F2DCE5',
        },
        forest: {
          DEFAULT: '#3B0764',
          light: '#F5F3FF',
          dark: '#2E1065',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Cinzel"', '"Playfair Display"', 'serif'],
        devanagari: ['"Rozha One"', '"Noto Serif Devanagari"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
