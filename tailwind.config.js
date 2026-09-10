/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        canvas: '#F5F6F2',
        surface: '#FFFFFF',
        elevated: '#FBFBF8',
        ink: {
          DEFAULT: '#18231F',
          secondary: '#6B7A75',
          tertiary: '#9AA5A0',
          inverse: '#F6F8F4',
        },
        forest: {
          DEFAULT: '#2E5E52',
          dark: '#22463D',
          light: '#3E7D6E',
        },
        brand: {
          DEFAULT: '#2E5E52',
          tint: '#EDF3EF',
        },
        primary: {
          DEFAULT: '#2E5E52',
          dark: '#22463D',
          soft: '#DCE8E1',
          tint: '#EDF3EF',
        },
        sage: '#A9C4B5',
        mist: '#E7EFE9',
        lavender: '#E2DEEF',
        sky: '#D8E6EC',
        sand: '#EFE7DC',
        blush: '#EFE0DE',
        line: '#E6E9E2',
        danger: {
          DEFAULT: '#A9524A',
          soft: '#F5E7E5',
        },
      },
      borderRadius: {
        card: '20px',
        xl2: '26px',
        xl3: '36px',
      },
    },
  },
  plugins: [],
};
