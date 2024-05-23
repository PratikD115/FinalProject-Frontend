/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#02b875",
        secondary: "#212121",
      },
      screens: {
        sm: { max: "700px" },

        md: { max: "1100px" },

        lg: { min: "1101px" },
      },
    },
  },
  plugins: [],
};
