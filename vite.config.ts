import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    'import.meta.env.VITE_SHEETBEST_API_KEY': JSON.stringify(process.env.VITE_SHEETBEST_API_KEY)
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'router-vendor': ['react-router-dom'],
          'ui-vendor': ['lucide-react', 'framer-motion'],
          'form-vendor': ['react-hook-form']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
});
