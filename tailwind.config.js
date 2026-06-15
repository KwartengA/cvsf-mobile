/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#1B4D3E',
          light: '#2D6A55',
          muted: '#4A7C6B',
        },
      },
    },
  },
  plugins: [],
};
