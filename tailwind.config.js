/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['var(--font-poppins)', 'sans-serif'],
        times: ['"Times New Roman"', 'Times', 'serif'],
      },
    },
  },
  plugins: [],
}
