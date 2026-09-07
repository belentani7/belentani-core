import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          DEFAULT: "#ff073a",
          glow: "#ff073a99",
          dim: "#ff073a33",
        },
      },
      fontFamily: {
        mono: ["'Courier New'", "Courier", "monospace"],
        display: ["'Arial Black'", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;