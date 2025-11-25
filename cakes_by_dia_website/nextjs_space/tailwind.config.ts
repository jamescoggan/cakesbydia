
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
        'brand-mauve': '#A94A58',
        'brand-taupe': '#AE8877',
        'brand-cream': '#DDC0A8',
        'brand-pink': '#F3DBDF',
      },
      fontFamily: {
        cinzel: ['var(--font-cinzel)', 'serif'],
        questrial: ['var(--font-questrial)', 'sans-serif'],
        montserrat: ['var(--font-montserrat)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
