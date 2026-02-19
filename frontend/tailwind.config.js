// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         dark: {
//           900: '#0a0a0f', // Deepest background
//           800: '#13131a', // Cards
//           700: '#1f1f2e', // Borders
//         },
//         neon: {
//           red: '#ff2a2a',   // Suspicious
//           cyan: '#00f0ff',  // Safe/Tech
//           green: '#39ff14', // Success
//         }
//       },
//       fontFamily: {
//         mono: ['"Fira Code"', 'monospace'], // Hacker vibe
//         sans: ['Inter', 'sans-serif'],
//       }
//     },
//   },
//   plugins: [],
// }

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#05050A',
        glass: 'rgba(255, 255, 255, 0.03)',
        glassBorder: 'rgba(255, 255, 255, 0.08)',
        crimson: '#FF2A4D',
        emerald: '#00FFA3',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      },
      backdropBlur: {
        'md': '12px',
        'lg': '24px',
      }
    },
  },
  plugins: [],
}