const CracoLessPlugin = require('craco-less')
const path = require('path')

const pathResolve = (pathUrl) => path.join(__dirname, pathUrl)

module.exports = {
  webpack: {
    alias: {
      '@': pathResolve('./src'),
      '@page': pathResolve('./src/page'),
      '@image': pathResolve('./src/static/image'),
    },
  },
  plugins: [
    {
      // 配置 craco-less 插件，以支持 less 使用
      plugin: CracoLessPlugin,
    },
  ],
  devServer: {
    // 跨域代理配置
    proxy: {
      '/api': {
        target: 'http://localhost:9000/',
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
}
