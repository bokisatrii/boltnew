import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'ui-vendor': ['lucide-react', 'framer-motion']
        }
      }
    },
    // Dodatne optimizacije
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Uklanja console.log u produkciji
        drop_debugger: true
      }
    },
    reportCompressedSize: false, // Brži build
    chunkSizeWarningLimit: 1000 // Povećava limit za upozorenja
  },
  // Optimizacija za preview/production
  preview: {
    port: 4173,
    strictPort: true
  },
  server: {
    port: 5173,
    strictPort: true
  }
});