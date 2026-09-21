import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  // Preflight and container are off so the existing site CSS is unaffected.
  corePlugins: { preflight: false, container: false },
  theme: {
    extend: {
      colors: { navy: "#1a2a80", gold: "#f7b800" },
      fontFamily: { sans: ["Inter", "sans-serif"] },
    },
  },
  plugins: [],
};
export default config;
