import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/car-showroom-test/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
