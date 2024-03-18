/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./**/*.{html,css,js,liquid}"
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