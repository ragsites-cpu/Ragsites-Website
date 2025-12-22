import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'cyber-black': '#0a0a0a',
        'cyber-gray': '#1a1a1a',
        'cyber-cyan': '#00f0ff',
        'cyber-purple': '#a855f7',
      },
      backgroundImage: {
        'cyber-gradient': 'linear-gradient(135deg, #00f0ff 0%, #a855f7 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
