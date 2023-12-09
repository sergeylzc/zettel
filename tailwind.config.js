/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{html,css,js}"
    ],
    theme: {
      extend: {
        fontSize: {
          base: '1rem',
        },
        colors: {
        },
        transitionProperty: {
            'height': 'height',
            'spacing': 'margin, padding',
        },
      },
    },
    plugins: [],
}