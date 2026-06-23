/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5b0e14', // indigo-600
        secondary: '#ec4899', // pink-500
        background: '#f8fafc', // slate-50
      },
    },
  },
  plugins: [],
}
