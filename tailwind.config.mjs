/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        petrol: '#123138', 'petrol-light': '#1d4750', charcoal: '#262321',
        brick: '#b6503a', sage: '#6f9a6d', gold: '#b79a5b', slate: '#6b7a80',
        paper: '#f3efe4', card: '#fffdf8',
      },
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', '-apple-system', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
};
