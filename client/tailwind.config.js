/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#0B0B0F',
        secondary: '#17171D',
        accent: '#E63946',
        'text-secondary': '#A9A9B3',
        'border-custom': '#303038',
        'light-bg': '#F7F7F5',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        sora: ['Sora', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      maxWidth: {
        content: '1440px',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

