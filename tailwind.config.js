/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./_site/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'bglight': '#f7f7f7',
        'logodark': '#444444',
        'logoblack': '#222222',
        'navgray': '#999999',
        'linkred': '#cc4533'
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}
