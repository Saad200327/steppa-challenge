/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0a0a0f',
        surface: '#12121a',
        'surface-elevated': '#1a1a26',
        border: '#2a2a3d',
        'accent-green': '#00ff88',
        'accent-red': '#ff3b5c',
        'accent-yellow': '#ffb800',
        'accent-blue': '#4d9eff',
        'text-primary': '#f0f0f8',
        'text-secondary': '#7a7a9a',
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['DM Mono', 'monospace'],
        stats: ['Oswald', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
