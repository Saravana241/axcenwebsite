/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        // Custom brand colors
        'axcen-blue': {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0ea5e9',
          900: '#0c4a6e',
        },
        'axcen-red': {
          500: '#ef4444',
          600: '#dc2626',
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 1s ease forwards',
        'fade-in': 'fade-in 1.5s ease-in-out forwards',
        'slide-in': 'slide-in 0.5s ease forwards',
        'rotate-360': 'rotate-360 2s linear forwards',
      },
      keyframes: {
        'fade-in-up': {
          'from': {
            opacity: '0',
            transform: 'translateY(-100%)',
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'fade-in': {
          'from': { 
            opacity: '0',
            transform: 'translateY(20px)',
          },
          'to': { 
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'slide-in': {
          'from': { transform: 'translateY(-50px)' },
          'to': { transform: 'translateY(0)' },
        },
        'rotate-360': {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: 'rotate(360deg)' },
        },
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      backdropBlur: {
        xs: '2px',
      },
      
    },
  },
  plugins: [],
}