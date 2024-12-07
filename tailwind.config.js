// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customBlue: {
          light: '#85d7ff',
          DEFAULT: '#1fb6ff',
          dark: '#009eeb',
        },
        primary : '#F2A20E',
        primarylight : '#FFF5EA',
        grey : '#666665',
        dashboard_grey : '#EFF0F3'
      },
      keyframes: {
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
      },
      animation: {
        slideInLeft: 'slideInLeft 3s ease-out forwards',
        slideInRight: 'slideInRight 1s ease-out forwards',
      },
    },
  },
  plugins: [],
};
