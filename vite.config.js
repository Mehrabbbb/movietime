import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Allows access from other devices
    port: 80, // Port 80 or any other port you prefer
    strictPort: true, // Ensures Vite doesn't start on a different port if 80 is in use
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // URL of your Express server
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Remove /api prefix
      },
    },
  },
});
