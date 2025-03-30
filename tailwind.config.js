/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        accent: "var(--accent)",
      },
      keyframes: {
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        shimmer: "shimmer 1.5s infinite",
      },
      boxShadow: {
        neon: "var(--neon-glow)",
        "neon-pink": "var(--neon-glow-pink)",
        "neon-blue": "var(--neon-glow-blue)",
      },
    },
  },
  plugins: [
    // tailwindcss-animate will be loaded from plugin dependencies
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
};
