/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "brand-blue": "#002B56",
        "brand-dark": "#373737",
        "brand-grey": "#7D7D7D",
        "brand-red": "#FF3145",
        "brand-green": "#00E79F"
      }
    },
  },
  plugins: [],
}

