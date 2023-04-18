/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/App.tsx',
    './src/components/**/*.tsx',
    './src/screens/**/*.tsx',
  ],
  theme: {
    extend: {
      colors: {
        'primary-color': '#377dab',
        'error-color': '#d64646',
      },
    },
  },
  plugins: [],
};
