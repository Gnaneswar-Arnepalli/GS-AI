import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Optional: only used during local development if calling /api endpoints
      '/api': {
        target: 'http://localhost:5000', // Or your local backend port
        changeOrigin: true,
        secure: false,
      },
    },
  },
  preview: {
    // Allows Vercel/Render domains if you use `vite preview` for production preview
    allowedHosts: ['ags-backend-x8rl.onrender.com'],
  },
});
