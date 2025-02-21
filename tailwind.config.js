module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{html,ts}', './node_modules/primeng/**/*.{js,css}'],
  theme: {
    extend: {},
    fontFamily: {
      sans: ['Noto Sans', 'sans-serif']
    },
    fontSize: {
      sm: '12px',
      base: '14px',
      lg: '16px',
      xl: '20px',
      '2xl': '24px'
    }
  },
  plugins: [require('tailwindcss-primeui')]
};
