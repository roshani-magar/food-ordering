/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        gray:"#5A5959",
        yellow:"F37116",
        "dark-yellow":"#FCCA3F",
        orange:"#F6820C",
        

      },
    },
  },
  plugins: [],
}
