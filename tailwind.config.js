const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  important: true,
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      sans: ['Inter var', ...defaultTheme.fontFamily.sans],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
