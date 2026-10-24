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
          ivory: '#F8F5EF',
          teal: '#10332F',
          gold: '#C6A46A',
          sage: '#DCE5DC',
          blush: '#F2E6E0',
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
          DEFAULT: '#C7A46A',
          50: '#FDF8F0',
          100: '#FBF0DE',
          200: '#F6E1BD',
          500: '#C7A46A',
          600: '#B58542',
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
          warm: '#F2ECE1',
          linen: '#EBE3D3',
        },
        forest: {
          DEFAULT: '#174F4A',
          light: '#E3E9E2',
          dark: '#0F3834',
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
