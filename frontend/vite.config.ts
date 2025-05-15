import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// Determine the base API URL based on the environment
const apiUrl = process.env.VITE_API_URL || 'http://localhost:500';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: apiUrl,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  preview: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://gs-ai-backend.onrender.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
