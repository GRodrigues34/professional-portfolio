/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        canvas: '#09090b',
        surface: '#18181b',
        'surface-elevated': '#27272a',
        brand: {
          orange: '#f97316',
          'orange-hover': '#ea580c',
          'orange-light': '#fb923c',
          'orange-glow': 'rgba(249, 115, 22, 0.15)',
        },
      },
      fontFamily: {
        display: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
