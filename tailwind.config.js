// eslint-disable-next-line @typescript-eslint/no-var-requires
const paletteOptions = require('./src/styles/theme/color');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/modules/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
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
  },
  corePlugins: {
    preflight: false,
  },
  mode: 'jit',
};