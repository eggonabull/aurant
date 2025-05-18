import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        jazz: {
          50: '#fff3e8',
          100: '#ffe8d6',
          200: '#ffd3b6',
          300: '#ffbe91',
          400: '#ff9f70',
          500: '#ff804f',
          600: '#ff6633',
          700: '#ff4c1a',
          800: '#ff3300',
          900: '#cc2600',
        },
      },
    },
  },
  plugins: [],
}

export default config
