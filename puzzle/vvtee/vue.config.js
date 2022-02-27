const APP_NAME = require('./package.json').name
const path = require('path')

module.exports = {
    devServer: {
        port: 8080,
        allowedHosts: 'all',
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
            library: APP_NAME,
            libraryTarget: 'umd',
        },
    },
}
