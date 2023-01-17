/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/index.html', './src/js/**/*.{html,js}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['iranyekan'],
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    require('@tailwindcss/forms')({
      strategy: 'base', // only generate global styles
      strategy: 'class', // only generate classes
    }),
  ],
};
