import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {}
  },
  server: {
    port: 5174,
    strictPort: true,
    host: true
  },
  resolve: {
    alias: {
      '@alfa': '/C:/via51-fractal/via51-alfa/src',
      '@beta': '/C:/via51-fractal/via51-beta/src',
      '@gamma': '/C:/via51-fractal/via51-gamma/src'
    }
  },
  build: {
    target: 'esnext'
  }
})