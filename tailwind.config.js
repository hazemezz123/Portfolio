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
        "retro-blue": "var(--retro-blue)",
        "retro-purple": "var(--retro-purple)",
        "retro-green": "var(--retro-green)",
        "retro-yellow": "var(--retro-yellow)",
        "retro-gray": "var(--retro-gray)",
        "retro-beige": "var(--retro-beige)",
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
  plugins: [],
  future: {
    hoverOnlyWhenSupported: true,
  },
};
