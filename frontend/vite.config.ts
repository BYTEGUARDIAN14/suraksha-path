import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/suraksha-path/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3001,
    hmr: false, // Disable HMR to prevent websocket errors
    proxy: {
      // Allow overriding proxy target when running inside Docker
      '/api': process.env.VITE_PROXY_TARGET || 'http://backend:5000',
    },
    watch: {
      usePolling: true,
      interval: 300,
    },
  },
});