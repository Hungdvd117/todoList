// eslint-disable-next-line @typescript-eslint/no-var-requires
const paletteOptions = require('./src/styles/theme/color');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/component/**/*.{js,ts,jsx,tsx}', './src/modules/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  plugins: [require('@tailwindcss/line-clamp')],
  theme: {
    extend: {
      colors: paletteOptions,
    },
    screens: {
      xl: { max: '1367px' },
      lg: { max: '1023px' },
      md: { max: '767px' },
      sm: { max: '639px' },
    },
    animation: {
      fade: 'fadeOut 5s ease-in-out',
    },
    // that is actual animation
    keyframes: (theme) => ({
      fadeOut: {
        '0%': { color: theme('colors.red.300') },
        '100%': { color: theme('colors.transparent') },
      },
    }),
  },
  corePlugins: {
    preflight: false,
  },
  mode: 'jit',
};
