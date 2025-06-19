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
    host: '0.0.0.0',  // Explicitly bind to all interfaces
    port: 5173,       // Use standard Vite port
    strictPort: false, // Allow fallback to other ports if needed
    open: false,      // Don't auto-open browser for testing
    cors: true,       // Enable CORS
  },
});
