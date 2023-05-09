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
      dark: "#333333",
      white: "#F9F9F9",
      transparent: "transparent",
    },
    fontFamily: {
      sans: ["Iconsolata", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    screens: {
      sm: { min: "360px", max: "640px" },
      // => @media (min-width: 640px and max-width: 767px) { ... }

      md: { min: "641px", max: "767px" },
      // => @media (min-width: 768px and max-width: 1023px) { ... }

      lg: { min: "768px", max: "1024px" },
      // => @media (min-width: 1024px and max-width: 1279px) { ... }

      xl: { min: "1025px", max: "1535px" },
      // => @media (min-width: 1280px and max-width: 1535px) { ... }

      "2xl": { min: "1536px" },
      // => @media (min-width: 1536px) { ... }
    },
    extend: {},
  },
  plugins: [],
};

