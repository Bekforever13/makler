import withMT from '@material-tailwind/react/utils/withMT'

export default withMT({
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}',
    './node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      
      blue: {
        100: '#EBF8FF',
        200: '#BEE3F8',
        300: '#90CDF4',
        400: '#63B3ED',
        500: '#4299E1',
        600: '#3182CE',
        700: '#2B6CB0',
        800: '#2C5282',
        900: '#2A4365',
      },
      'light-blue': {
        100: '#f0f0ff',
        200: '#eae9ff',
        300: '#e4e2ff',
        400: '#dedbff',
        500: '#d8d5ff',
        600: '#d3ceff',
        700: '#cec7ff',
        800: '#c9bfff',
        900: '#c4b8ff',
      },
    },
    screens: {
      sm: '228px',
      md: '768px',
      lg: '1024px',
      xl: '1100px',
    },
    fontFamily: {
      sans: ['Montserrat', 'sans-serif'],
    },
    extend: {
      keyframes: {
        fadeUp: {
          '0%': { opacity: 0, transform: 'translate3d(0, 100%, 0)' },
          '100%': { opacity: 1, transform: 'translate3d(0, 0, 0)' },
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease-in',
      },
    },
  },
  plugins: [],
})
