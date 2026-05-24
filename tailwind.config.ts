import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#f7f8f8",
        paper: "#08090a",
        bone: "#101113",
        line: "#25272b",
        accent: "#8b5cf6",
        muted: "#8b8f98"
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "system-ui", "sans-serif"]
      },
      boxShadow: {
        lift: "0 24px 80px rgba(0, 0, 0, 0.45)"
      }
    },
  },
  plugins: [],
};

export default config;
