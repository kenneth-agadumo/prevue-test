// tailwind.config.js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        customBlue: {
          light: "#85d7ff",
          DEFAULT: "#1fb6ff",
          dark: "#009eeb",
        },
        primary: "#F2A20E",
        primaryshade: '#FDF0D8',
        primarylight: "#FFF5EA",
        grey: "#666665",
        dashboard_grey: "#EFF0F3",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(200px) scale(0.9)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        slideInLeft: {
          "0%": { transform: "translateX(-100%)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
        slideInRight: {
          "0%": { transform: "translateX(100%)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
      },
      animation: {
        fadeIn: "fadeIn 1.5s ease-in-out forwards",
        slideInLeft: "slideInLeft 3s ease-out forwards",
        slideInRight: "slideInRight 1s ease-out forwards",
      },
    },
  },
  plugins: [],
};
