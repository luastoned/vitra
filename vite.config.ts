import react from '@vitejs/plugin-react';
import unfonts from 'unplugin-fonts/vite';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    unfonts({
      fontsource: {
        families: [
          {
            name: 'Open Sans',
            subset: 'latin',
            variable: { wght: true, ital: true }, // wdth: false, slnt: false, opsz: false
          },
          {
            name: 'Quicksand',
            subset: 'latin',
            variable: { wght: true },
          },
          {
            name: 'Roboto Flex',
            subset: 'latin',
            variable: { wght: true, opsz: true },
          },
          {
            name: 'Roboto Mono',
            subset: 'latin',
            variable: { wght: true, ital: true },
          },
        ],
      },
    }),
  ],
  resolve: {
    tsconfigPaths: true,
  },
  server: {
    // host: '0.0.0.0',
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://localhost:5170',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
  preview: {
    // host: '0.0.0.0',
    port: 5174,
    proxy: {
      '/api': {
        target: 'https://localhost:5170',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
});
