import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './hooks/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        noir: '#070707',
        cream: '#f4e9d8',
        ruby: '#a1143b',
        steel: '#9ca6bd'
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Inter"', 'sans-serif']
      },
      boxShadow: {
        glow: '0 0 20px rgba(161,20,59,0.5)'
      }
    }
  },
  plugins: []
};

export default config;
