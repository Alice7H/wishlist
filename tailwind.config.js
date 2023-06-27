/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'food': "url('/food.png')",
        'pet': "url('/cat_plants.png')",
        'house': "url('/house.png')",
      },
      backgroundColor: {
        'wish': '#f0f8ff',
      },
    },
  },
  plugins: [],
}
