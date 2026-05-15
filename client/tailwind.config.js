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
        body: ['DM Mono', 'monospace'],
        mono: ['DM Mono', 'monospace'],
      },
      animation: {
        'pulse-border': 'pulse-border 1.5s ease-in-out infinite',
      },
      keyframes: {
        'pulse-border': {
          '0%, 100%': { borderColor: 'rgba(255,59,92,0.4)' },
          '50%': { borderColor: 'rgba(255,59,92,1)' },
        },
      },
    },
  },
  plugins: [],
};
