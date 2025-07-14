// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'duo-green': '#58cc02',
        'duo-green-dark': '#48a801',
        'duo-gray-light': '#f7f7f7',
        'duo-gray-medium': '#e5e5e5',
        'duo-gray-dark': '#afafaf',
        'duo-blue': '#1cb0f6',
        'duo-blue-dark': '#1899d6',
        'duo-red': '#ff4b4b',
        'duo-red-dark': '#e54242',
        'duo-yellow': '#ffc800',
        'duo-text': '#4b4b4b',
      },
      fontFamily: {
        sans: ['Nunito', 'sans-serif'],
      },
      boxShadow: {
        'duo-button': '0 4px 0 0 #00000026', // A subtle 3D effect for buttons
      },
      animation: {
        'bounce-short': 'bounce 0.7s 1',
      }
    },
  },
  plugins: [],
}