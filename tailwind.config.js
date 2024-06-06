/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradiant-color": "linear-gradient(180deg, #FB8B24 0%, #E95793 100%)",
      },
      colors: {
        "gradient-transparent": "rgba(217, 217, 217, 0.49)",
      },
    },
  },
  plugins: [],
};
