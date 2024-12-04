import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import unfonts from 'unplugin-fonts/vite';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    cssMinify: 'lightningcss',
  },
  css: {
    transformer: 'postcss', // lightningcss
  },
  plugins: [
    react(),
    tsconfigPaths(),
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
  server: {
    host: '0.0.0.0',
    port: 50000,
    proxy: {
      '/api': {
        target: 'https://localhost:50010',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
  preview: {
    host: '0.0.0.0',
    port: 50000,
    proxy: {
      '/api': {
        target: 'https://localhost:50010',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
});
