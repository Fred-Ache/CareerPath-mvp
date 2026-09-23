import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: "#f3f8f4",
          100: "#e3efe6",
          500: "#2f6f4e",
          600: "#245a3e",
          700: "#1c4631",
          900: "#12281c",
        },
        ink: {
          700: "#243044",
          900: "#121826",
        },
      },
      fontFamily: {
        sans: ["var(--font-source-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-source-serif)", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
