const utils = require('./build/utils')
const aliasConfig = require('./alias.config')

// 用于做相应的merge处理
const merge = require('webpack-merge')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const pages = utils.setPages({})

const isPro = process.env.NODE_ENV === 'production'

let baseUrl = '/'

module.exports = {
    publicPath: baseUrl,
    outputDir: 'dist',
    productionSourceMap: true,
    pages,

    css: {
    },
    chainWebpack: config => {
        config.module
            .rule('images')
            .use('url-loader')
            .tap(options =>
                merge(options, {
                    limit: 5120
                })
            )
        // 別名配置
        const aliasMap = aliasConfig.resolve.alias
        Object.keys(aliasMap).forEach(key => {
            config.resolve.alias.set(key, aliasMap[key])
        })
    },

    configureWebpack: config => {
        if (isPro) {
            return {
                plugins: [

                    // 开启 Gzip 压缩
                    new CompressionWebpackPlugin({
                        asset: '[path].gz[query]',
                        algorithm: 'gzip',
                        test: new RegExp(
                            '\\.(js|css)$'
                        ),
                        threshold: 10240,
                        minRatio: 0.8
                    })

                    // 使用包分析工具
                    // new BundleAnalyzerPlugin()
                ]
            }
        }
    },

    devServer: {
        open: true, // 是否自动打开浏览器页面
        host: '0.0.0.0', // 指定使用一个 host。默认是 localhost
        port: 8080, // 端口地址
        https: false, // 使用https提供服务

        // string | Object 代理设置
        proxy: false,
        progress: true
    },
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'scss',
            patterns: []
        }
    }
}
