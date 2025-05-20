import type { Config } from 'tailwindcss';

const config: Config = {
  // Configure content paths for Tailwind to scan
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // Enable dark mode using class strategy
  darkMode: 'class',
  theme: {
    extend: {
      // Custom keyframes for animations
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      // Custom animation configurations
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out forwards',
      },
    },
  },
  plugins: [],
};

export default config; 