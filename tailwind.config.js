/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{vue,js,ts,jsx,tsx}",
    "./app/app.vue"
  ],
  theme: {
    extend: {
      colors: {
        "dodgeroll-gold": {
          500: "#F79F1A",
        },
        gold: "#F79F1A",
        "apple-green": "#046E1B",
        "wolf-gray": "#292727",
      },
    },
    fontFamily: {
      montserrat: ["Montserrat", "sans-serif"],
    },
    container: {
      center: true,
      padding: "2rem",
    },
  },
  plugins: [],
};
