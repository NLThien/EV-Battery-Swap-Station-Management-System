/** @type {import('tailwindcss').Config} */
const { VAR } = require("./constants/varriable");
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: VAR.PRIMARY_COLOR,
        background: VAR.BACKGROUND_COLOR,
        card: VAR.CARD_COLOR,
        text: VAR.TEXT_COLOR,
      },
    },
  },
  plugins: [],
};
