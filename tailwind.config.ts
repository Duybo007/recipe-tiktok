import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "searchBg": "url('/assets/fork.jpg')",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "primary": "#F9881E",
        "light-gray": "#282828",
        "text": "#B0B3B7",
        "dark": "#171D2B",
        "gray": "#F1F1F1",
        "light-primary": "#FFD0A5"
      }
    },
  },
  plugins: [],
};
export default config;
