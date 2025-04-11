/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3AAFA9", // Light Green Peacock
        secondary: "#2B7A78", // Darker Shade
        background: "#DEF2F1", // Soft Greenish Background
        textPrimary: "#17252A", // Deep Blue for Contrast
        textSecondary: "#FEFFFF", // Light Text
      },
    },
  },
  plugins: [],
}