import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Syne", "system-ui", "sans-serif"],
        sans: ["Inter", "-apple-system", "system-ui", "sans-serif"],
      },
      colors: {
        leather: "#2C2118",
        "leather-mid": "#4A3D32",
        parchment: "#F5F1EB",
        "parchment-elevated": "#F8F5EF",
        terracotta: "#A0422A",
        "terracotta-light": "#B8533A",
        sage: "#4A5E3E",
        dust: "#C4B49A",
        "text-soft": "#6B6259",
        border: "#DDD7CC",
      },
      letterSpacing: {
        wordmark: "0.15em",
        label: "0.16em",
        nav: "0.12em",
      },
      boxShadow: {
        card: "0 4px 20px rgba(26, 23, 20, 0.06)",
      },
      borderRadius: {
        card: "18px",
        nested: "14px",
      },
    },
  },
  plugins: [],
};

export default config;
