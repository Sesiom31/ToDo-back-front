/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  dark: "class",
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors :{
        'fondo-spinner' : 'rgba(31, 41, 55, 0.6)',
      }
    },
  },
  plugins: [],
};
