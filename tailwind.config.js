/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0c0c0c',
        'bg-elevated': '#141414',
        'bg-card': '#1a1a1a',
        accent: '#00f0ff',
        'accent-2': '#7B61FF',
      },
      fontFamily: {
        body: ['Inter', '-apple-system', 'sans-serif'],
        display: ['Syne', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
