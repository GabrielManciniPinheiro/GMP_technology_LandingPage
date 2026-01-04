/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./public/index.html", "./public/**/*.js", "./*.html"],
  theme: {
    extend: {
      colors: {
        // Cores personalizadas que seu HTML pede
        "dark-background": "#0f172a", // Um azul marinho bem escuro (Slate 900)
        "dark-background-secondary": "#1e293b", // Um tom mais claro para cartões (Slate 800)
        primary: "#3b82f6", // Azul vibrante (Blue 500)
        secondary: "#8b5cf6", // Roxo (Violet 500)
        accent: "#06b6d4", // Ciano (Cyan 500)
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      animation: {
        morph: "morph 8s ease-in-out infinite",
      },
      keyframes: {
        morph: {
          "0%": { borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" },
          "50%": { borderRadius: "30% 60% 70% 40% / 50% 60% 30% 60%" },
          "100%": { borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" },
        },
      },
    },
  },
  plugins: [],
};
