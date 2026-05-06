/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        premium: '#E8B86D',
        general: '#4A90E2',
        terrace: '#6DB878',
        corporate: '#C96DD8',
      },
    },
  },
  plugins: [],
};
