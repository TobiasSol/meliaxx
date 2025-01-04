/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-gold': '#d0b48f',
        'custom-gold-light': '#e3cbaa',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}