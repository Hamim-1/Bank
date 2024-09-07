/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./dist/**/*.{html,js}'],
  theme: {
    screens: {
      xs: '450px',
      sm: '600px',
      md: '768px',
      lg: '992px',
      xl: '1200px'
    },
    extend: {
      fontFamily: {
        suse: " 'SUSE', 'sans-serif'"
      },
      colors: {
        primary: '#201E43',
        secondary: '#17153B',
        third: '#134B70'
      }
    },
  },
  plugins: [],
}

