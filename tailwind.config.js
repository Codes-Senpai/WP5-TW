/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/*.{html,js,css}',
    './public/index.html',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
