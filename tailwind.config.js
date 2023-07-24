/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {},
    mode: 'jit',
  },
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
}
