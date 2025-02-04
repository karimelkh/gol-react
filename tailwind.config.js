/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  safelist: [],
  theme: {
    extend: {
      colors: {
        mint: '#17b890',
        cerulean: '#247ba0',
      },
    },
  },
  plugins: [],
};
