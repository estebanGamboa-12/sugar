import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./lib/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FFF7F3",
        lavender: "#F8F1FF",
        strawberry: "#FF6FAE",
        pistachio: "#A7E6C6",
        cocoa: "#2B1B14",
      },
      boxShadow: {
        soft: "0 12px 40px rgba(43, 27, 20, 0.12)",
        "soft-lg": "0 18px 56px rgba(43, 27, 20, 0.14)",
        "soft-xl": "0 24px 70px rgba(43, 27, 20, 0.16)",
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "sans-serif"],
        display: ["var(--font-syncopate)", "sans-serif"],
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
} satisfies Config;
