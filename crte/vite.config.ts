import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

const pathResolve = (pathUrl: string) => path.join(__dirname, pathUrl)

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
