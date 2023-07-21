/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  plugins: [require('@tailwindcss/forms')],
  theme: {
    extend: {
      colors: {
        zinc: {
          0: '#fcfcfc',
          1000: '#121212',
        },
      },
    },
  },
};
