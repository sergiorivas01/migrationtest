import { defineConfig } from 'vite';

export default defineConfig({
  root: __dirname,
  base: '/',
  server: {
    port: 8001,
    proxy: {
      '/users': { target: 'http://localhost:8002', changeOrigin: true, secure: false },
      '/posts': { target: 'http://localhost:8002', changeOrigin: true, secure: false },
      '/todos': { target: 'http://localhost:8002', changeOrigin: true, secure: false }
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
});


