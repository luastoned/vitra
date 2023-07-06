import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import Unfonts from 'unplugin-fonts/vite';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    cssMinify: 'lightningcss',
  },
  css: {
    transformer: 'postcss', // lightningcss
    lightningcss: {
      drafts: {
        nesting: true,
      },
    },
  },
  plugins: [react(), tsconfigPaths(), Unfonts({ fontsource: { families: ['Quicksand', 'Roboto', 'Source Sans Pro'] } })],
  server: {
    host: '0.0.0.0',
    port: 47000,
    proxy: {
      '/api': {
        target: 'https://localhost:47010',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
  preview: {
    host: '0.0.0.0',
    port: 47000,
    proxy: {
      '/api': {
        target: 'https://localhost:47010',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
});
