const CracoLessPlugin = require('craco-less')
const path = require('path')

const pathResolve = (pathUrl) => path.join(__dirname, pathUrl)

module.exports = {
  webpack: {
    alias: {
      '@': pathResolve('src'),
      '@page': pathResolve('src/page'),
    },
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
    },
  ],
  devServer: {
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
