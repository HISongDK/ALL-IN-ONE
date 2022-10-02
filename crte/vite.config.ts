import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
const path = require('path')

// https://vitejs.dev/config/
const pathResolve = (pathUrl) => path.join(__dirname, pathUrl)

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': pathResolve('src'),
      '@api': pathResolve('src/api'),
      '@page': pathResolve('src/page'),
      '@utils': pathResolve('src/utils'),
      '@image': pathResolve('src/static/image'),
      '@constant': pathResolve('src/constant'),
    },
  },
  server: {
    proxy: {
      '/api': 'http://localhost:9000',
    },
  },
})
