/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./_site/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}
