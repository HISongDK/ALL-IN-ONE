const path = require('path')
const CracoLessPlugin = require('craco-less')
// const CracoAntDesignPlugin = require('craco-antd')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin')
const CircularDependencyPlugin = require('circular-dependency-plugin')
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const CracoVtkPlugin = require('craco-vtk')
const WebpackBar = require('webpackbar')
const FastRefreshCracoPlugin = require('craco-fast-refresh')

// const CompressionWebpackPlugin = require('compression-webpack-plugin')

const pathResolve = (pathUrl) => path.join(__dirname, pathUrl)

const { whenDev, whenProd } = require('@craco/craco')

module.exports = {
  webpack: {
    // 别名配置
    alias: {
      '@': pathResolve('src'),
      '@api': pathResolve('src/api'),
      '@page': pathResolve('src/page'),
      '@utils': pathResolve('src/utils'),
      '@image': pathResolve('src/static/image'),
    },
    plugins: [
      // webpack构建进度条
      new WebpackBar({
        profile: true,
      }),

      new CircularDependencyPlugin({
        exclude: /node_modules/,
        include: /src/,
        failOnError: true,
        allowAsyncCycles: false,
        cwd: process.cwd(),
      }),

      // 查看打包的进度
      // new SimpleProgressWebpackPlugin(), // 和 webpackbar 有冲突可能，两个都开启就跑不起来
      // 查看打包分析
      new BundleAnalyzerPlugin(),
      // 替换moment为dayjs
      // new AntdDayjsWebpackPlugin(),
      ...whenProd(
        () => [
          new UglifyJsPlugin({
            uglifyOptions: {
              // 删除注释
              output: {
                comments: false,
              },
              compress: {
                drop_console: true, // 删除所有调式带有console的
                drop_debugger: true,
                pure_funcs: ['console.log'], // 删除console.log
              },
            },
          }),
          // 打压缩包
          // new CompressionWebpackPlugin({
          //   algorithm: 'gzip',
          //   test: /\.js$|\.html$|\.css$/, // 匹配文件名
          //   threshold: 1024,
          //   minRatio: 0.8,
          // }),
        ],
        [],
      ),
    ],
    configure: (webpackConfig, { env, paths }) => {
      paths.appBuild = 'dist'
      webpackConfig.output = {
        ...webpackConfig.output,
        path: path.resolve(__dirname, 'dist'),
        // publicPath: "/",
      }
      return webpackConfig
    },
  },

  plugins: [
    // 热更新
    ...whenDev(
      () => [
        {
          plugin: FastRefreshCracoPlugin,
        },
        {
          plugin: CracoVtkPlugin(),
        },
        {
          plugin: new AntdDayjsWebpackPlugin(),
        },
      ],
      [],
    ),

    // { plugin: CracoAntDesignPlugin },
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            // modifyVars: { '@primary-color': '#1DA57A' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],

  devServer: {
    // 跨域代理配置
    // NOTE: 使用 w2 代理，不在项目中代理
    proxy: {
      '/api': {
        target: 'http://localhost:9000/',
        pathRewrite: {
          // '^/api': '',
        },
      },
    },
  },
}
