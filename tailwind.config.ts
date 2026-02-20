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
        'brand-primary': '#0f172a',    // slate-900 for main text/bg
        'brand-secondary': '#f8fafc',  // slate-50 for off-white backgrounds
        'brand-accent': '#2563eb',     // blue-600 for primary CTA buttons
        'brand-accent-hover': '#1d4ed8', // blue-700 for hover state
      },
      backgroundImage: {
        'subtle-gradient': 'linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
