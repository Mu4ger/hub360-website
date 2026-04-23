import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        content: "min(1280px, calc(100vw - 2.5rem))",
      },
      colors: {
        hub: {
          ink: "#2E4A70",
          accent: "#73C7E3",
          cream: "#FFF9F0",
          mist: "#F0F2F2",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 0 0 1px rgba(46, 74, 112, 0.06), 0 18px 40px -28px rgba(46, 74, 112, 0.18)",
        glow: "0 12px 40px -16px rgba(115, 199, 227, 0.45)",
      },
    },
  },
  plugins: [],
};

export default config;
