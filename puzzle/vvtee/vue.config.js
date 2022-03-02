const { name } = require('./package.json')
const path = require('path')

module.exports = {
    devServer: {
        port: 9527,
        // allowedHosts: 'all',
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    },
    configureWebpack: {
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src'),
            },
        },
        output: {
            library: `${name}-[name]`,
            libraryTarget: 'umd',
        },
    },
}
