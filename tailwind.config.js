import withMT from "@material-tailwind/react/utils/withMT";


export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",],
  theme: {
    colors: {
      blue: {
        100: "#000dff",
        200: "#000ced",
        300: "#000bdb",
        400: "#0009c9",
        500: "#0008b8",
        600: "#0007a6",
        700: "#000696",
        800: "#000585",
        900: "#000475"
      },
      "light-blue": {
        100: "#f0f0ff",
        200: "#eae9ff",
        300: "#e4e2ff",
        400: "#dedbff",
        500: "#d8d5ff",
        600: "#d3ceff",
        700: "#cec7ff",
        800: "#c9bfff",
        900: "#c4b8ff",
      }
    },
    screens: {
      sm: "228px",
      md: "768px",
      lg: "1024px",
      xl: "1100px"
    },
    fontFamily: {
      sans: ['Montserrat', "sans-serif"],
    },
    extend: {
      backgroundImage: {
        'naqis1': "url('./src/images/logo/naqis1.svg')",
        'naqis2': "url('./src/images/logo/naqis2.svg')",
        'naqis': "url('./naqis2.svg')",
      }
    },
  },
  plugins: [],
});