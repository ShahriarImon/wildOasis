import type { Config } from "tailwindcss";
import colors from "./app/colors.json";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ...colors?.[0]?.colors,
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },

  plugins: [],
};
export default config;
