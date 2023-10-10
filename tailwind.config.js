import { color } from './src/theme/variables'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ...color,
      },
    },
  },
  plugins: [],
}
