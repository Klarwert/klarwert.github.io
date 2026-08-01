// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// No Tailwind plugin – using pure CSS custom properties
export default defineConfig({
  // No additional Vite plugins required
  site: 'https://klarwert.github.io',

  vite: {
    plugins: [tailwindcss()]
  }
});