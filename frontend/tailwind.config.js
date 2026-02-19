/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#0a0a0f', // Deepest background
          800: '#13131a', // Cards
          700: '#1f1f2e', // Borders
        },
        neon: {
          red: '#ff2a2a',   // Suspicious
          cyan: '#00f0ff',  // Safe/Tech
          green: '#39ff14', // Success
        }
      },
      fontFamily: {
        mono: ['"Fira Code"', 'monospace'], // Hacker vibe
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}