/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'steppa-bg': '#0a0a0f',
        'steppa-surface': '#12121a',
        'steppa-elevated': '#1a1a26',
        'steppa-border': '#2a2a3d',
        'steppa-green': '#00ff88',
        'steppa-red': '#ff3b5c',
        'steppa-yellow': '#ffb800',
        'steppa-blue': '#4d9eff',
        'steppa-text': '#f0f0f8',
        'steppa-muted': '#7a7a9a',
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
        stat: ['Oswald', 'sans-serif'],
      },
      animation: {
        'pulse-red': 'pulse-red 2s infinite',
        'pulse-green': 'pulse-green 2s infinite',
        'ticker': 'ticker 20s linear infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.5s ease forwards',
        'spin-slow': 'spin 3s linear infinite',
      },
    },
  },
  plugins: [],
};
