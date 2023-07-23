import path from 'path'
import { defineConfig, PluginOption } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import usePluginImport from 'vite-plugin-importer'
import viteCompression from 'vite-plugin-compression'

const pathResolve = (pathUrl: string) => path.join(__dirname, pathUrl)

export default defineConfig({
  // optimizeDeps: {
  //   include: ['echarts'],
  // },
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
  plugins: [
    react(),
    // eslint-disable-next-line react-hooks/rules-of-hooks
    // usePluginImport({
    //   libraryName: 'antd',
    //   libraryDirectory: 'es',
    //   style: 'css',
    // }),

    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
    }) as PluginOption,

    viteCompression({
      // gzip压缩
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz',
    }),
  ],
  build: {
    // minify: false, // 是否进行压缩,boolean | 'terser' | 'esbuild',默认使用terser
    // manifest: false, // 是否产出maifest.json
    // sourcemap: false, // 是否产出soucemap.json
    minify: 'terser',
    // minify: 'esbuild',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // chunkSizeWarningLimit: 1500, // 大文件报警阈值设置,不建议使用,

    // FIXME: 这个分包会导致循环引用报错
    // rollupOptions: {
    //   output: {
    //     // 静态资源分类打包
    //     chunkFileNames: 'static/js/[name]-[hash].js',
    //     entryFileNames: 'static/js/[name]-[hash].js',
    //     assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
    //     manualChunks(id) {
    //       // 静态资源分拆打包
    //       if (id.includes('node_modules')) {
    //         return id
    //           .toString()
    //           .split('node_modules/')[1]
    //           .split('/')[0]
    //           .toString()
    //       }
    //     },
    //   },
    // },

    // commonjsOptions: {
    //   esmExternals: true,
    // },
  },
  server: {
    port: 3000,
    hmr: true,
    open: true,
    proxy: {
      '/api': 'http://localhost:9000',
    },
  },
})
