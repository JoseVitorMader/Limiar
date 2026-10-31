/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        limiar: {
          950: '#06070a',
          900: '#0c0e14',
          850: '#11141c',
          800: '#171b26',
          700: '#232938',
          600: '#343d52',
          500: '#525e7a',
          400: '#8493b0',
          300: '#b0becc',
          200: '#d5dde5',
          100: '#f0f3f6',
          red: '#dc2626',
          darkred: '#881337',
          blood: '#991b1b',
          amber: '#f59e0b',
          cyan: '#06b6d4',
          rift: '#22d3ee',
        }
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'Menlo', 'Consolas', 'monospace'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        display: ['"Rajdhani"', '"Chakra Petch"', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        'glow-red': '0 0 15px rgba(239, 68, 68, 0.35)',
        'glow-amber': '0 0 15px rgba(245, 158, 11, 0.35)',
        'glow-cyan': '0 0 15px rgba(34, 211, 238, 0.35)',
        'aferidor': 'inset 0 0 12px rgba(0,0,0,0.8), 0 0 8px rgba(245, 158, 11, 0.2)'
      }
    },
  },
  plugins: [],
}
