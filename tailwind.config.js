/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        woodland: {
          '50': '#f6f5ef',
          '100': '#ebe9dc',
          '200': '#dad6bc',
          '300': '#c2bc94',
          '400': '#aaa471',
          '500': '#8e8854',
          '600': '#706c40',
          '700': '#504e30',
          '800': '#47452d',
          '900': '#3e3e29',
          '950': '#202013',
        }
      }
    }
  },
  plugins: [],
}
