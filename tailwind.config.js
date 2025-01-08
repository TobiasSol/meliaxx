/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-gold': '#d0b48f',
        'custom-gold-light': '#e3cbaa',
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'evogria': ['Evogria', 'sans-serif'],
        'coterie': ['Coterie', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

