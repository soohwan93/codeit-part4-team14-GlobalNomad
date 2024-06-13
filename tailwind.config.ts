import type { Config } from "tailwindcss";
const flowbite = require("flowbite-react/tailwind");
const config: Config = {
  content: [
    flowbite.content(),
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ["var(--font-pretendard)"],
      },
      colors: {
        black: "#1B1B1B",
        "nomad-black": "#121",
        "gray-80": "#4B4B4B",
        "gray-70": "#79747E",
        "gray-60": "#A4A1AA",
        "gray-50": "#ADAEB8",
        "gray-40": "#CBC9CF",
        "gray-30": "#DDDDDD",
        "gray-20": "#EEEEEE",
        "gray-10": "#FAFAFA",
        "green-20": "#0B3B2D",
        "green-10": "#F1EFFD",
        "red-20": "#FF472E",
        "red-10": "#FFE4E0",
        "orange-20": "#FF7C1D",
        "orange-10": "#FFF4E8",
        yellow: "#FFC23D",
        "blue-30": "#0085FF",
        "blue-20": "#2EB4FF",
        "blue-10": "#E5F3FF",
      },
    },
  },
  plugins: [],
};
export default config;
