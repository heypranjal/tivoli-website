import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    host: true,       // Use true to auto-detect best host
    port: 5173,       // Use standard Vite port
    strictPort: false, // Allow fallback to other ports
    open: false,      // Don't auto-open browser for testing
    cors: true,       // Enable CORS
  },
});
