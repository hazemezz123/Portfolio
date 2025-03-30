/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "retro-black": "#000000",
        "retro-white": "#FFFFFF",
        "retro-gray": "#808080",
        "retro-blue": "#0000FF",
        "retro-green": "#00FF00",
        "retro-red": "#FF0000",
        "retro-yellow": "#FFFF00",
        "retro-purple": "#800080",
        "retro-beige": "#F5F5DC",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      boxShadow: {
        neon: "0 0 5px theme('colors.white'), 0 0 10px theme('colors.white')",
        "neon-pink":
          "0 0 5px theme('colors.pink.500'), 0 0 10px theme('colors.pink.500')",
        "neon-blue":
          "0 0 5px theme('colors.blue.500'), 0 0 10px theme('colors.blue.500')",
      },
    },
  },
  plugins: [],
  future: {
    hoverOnlyWhenSupported: true,
  },
};
