/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    spacing: {
      sm: "0.5rem",
      md: "1rem",
      lg: "1.5rem",
      xl: "2rem",
    },
    colors: {
      primary: "#319CE9",
      secondary: "#F9F9F9",
      tertiary: "#ff7849",
      light: "#E3F2FC",
      gray: "#E0E0E0",
      graylight: "#F9F9F9",
      dark: "#333333",
      white: "#FFFFFF",
      transparent: "transparent",
    },
    fontFamily: {
      sans: ["Iconsolata", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    screens: {
      sm: { min: "340px", max: "540px" },
      md: { min: "541px", max: "767px" },
      lg: { min: "768px", max: "1024px" },
      xl: { min: "1025px" },
    },
    extend: {},
  },
  plugins: [],
};
