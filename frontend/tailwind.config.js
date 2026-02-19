// // /** @type {import('tailwindcss').Config} */
// // export default {
// //   content: [
// //     "./index.html",
// //     "./src/**/*.{js,ts,jsx,tsx}",
// //   ],
// //   theme: {
// //     extend: {
// //       colors: {
// //         dark: {
// //           900: '#0a0a0f', // Deepest background
// //           800: '#13131a', // Cards
// //           700: '#1f1f2e', // Borders
// //         },
// //         neon: {
// //           red: '#ff2a2a',   // Suspicious
// //           cyan: '#00f0ff',  // Safe/Tech
// //           green: '#39ff14', // Success
// //         }
// //       },
// //       fontFamily: {
// //         mono: ['"Fira Code"', 'monospace'], // Hacker vibe
// //         sans: ['Inter', 'sans-serif'],
// //       }
// //     },
// //   },
// //   plugins: [],
// // }

// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         obsidian: '#05050A',
//         glass: 'rgba(255, 255, 255, 0.03)',
//         glassBorder: 'rgba(255, 255, 255, 0.08)',
//         crimson: '#FF2A4D',
//         emerald: '#00FFA3',
//       },
//       animation: {
//         'float': 'float 6s ease-in-out infinite',
//         'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
//         'spin-slow': 'spin 12s linear infinite',
//       },
//       keyframes: {
//         float: {
//           '0%, 100%': { transform: 'translateY(0)' },
//           '50%': { transform: 'translateY(-20px)' },
//         }
//       },
//       backdropBlur: {
//         'md': '12px',
//         'lg': '24px',
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
        azure: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#007fff', // Pure Azure Blue
          700: '#0284c7',
          800: '#0369a1',
          900: '#0c4a6e',
        },
        danger: '#ff2a4d',
        success: '#10b981',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        }
      },
      fontFamily: {
        mono: ['"Fira Code"', 'monospace'],
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}