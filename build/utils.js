const path = require('path')
const fs = require('fs')

// glob是webpack安装时依赖的一个第三方模块，还模块允许你使用 *等符号,
// 例如lib/*.js就是获取lib文件夹下的所有js后缀名的文件
const glob = require('glob')

// 取得相应的页面路径，因为之前的配置，所以是src文件夹下的pages文件夹
const PAGE_PATH = path.resolve(__dirname, '../src/pages')

// 用于做相应的merge处理
const merge = require('webpack-merge')

const HtmlWebpackPlugin = require('html-webpack-plugin')

// 多入口配置
// 通过glob模块读取page文件夹下的所有对应文件夹下的js后缀文件，如果该文件存在
// 那么就作为入口处理
exports.getEntries = () => {
    let entryFiles = glob.sync(PAGE_PATH + '/*/index.js')
    let map = {}

    entryFiles.forEach(filePath => {
        const dirName = path.dirname(filePath)
        let filename = dirName.substring(filePath.lastIndexOf('/') + 1, dirName.length)
        map[filename] = filePath
    })

    return map
}

// 多页面输出配置
// 与上面的多页面入口配置相同，读取page文件夹下的对应的html后缀文件，然后放入数组中
exports.htmlPlugin = configs => {
    let entryHtml = glob.sync(PAGE_PATH + '/*/*.html')
    let arr = []

    entryHtml.forEach(filePath => {
        const dirName = path.dirname(filePath)
        let filename = dirName.substring(dirName.lastIndexOf('/') + 1)
        let conf = {
            multihtmlCache: true,
            // 模板来源
            template: filePath,
            // 文件名称
            filename: `${filename}.html`,
            // 页面模板需要加对应的js脚本，如果不加这行则每个页面都会引入所有的js脚本
            chunks: ['chunk-vendors', 'chunk-common', filename],
            inject: false
        }

        if (configs) {
            conf = merge(conf, configs)
        }

        if (process.env.NODE_ENV === 'production') {
            conf = merge(conf, {
                minify: {
                    removeComments: true, // 删除html中的注释代码
                    collapseWhitespace: true // 删除html中的空白符
                },
                chunksSortMode: 'manual'// 按manual的顺序引入
            })
        }
        arr.push(new HtmlWebpackPlugin(conf))
    })

    return arr
}

// pages 多入口配置
exports.setPages = configs => {
    let entryFiles = glob.sync(PAGE_PATH + '/*/index.js')
    let map = {}

    entryFiles.forEach(filePath => {
        const dirName = path.dirname(filePath)
        let filename = dirName.substring(dirName.lastIndexOf('/') + 1)
        let tmpPath = `${dirName}/index.html`
        tmpPath = fs.existsSync(tmpPath) ? tmpPath : path.join('..', 'public/index.html')

        let conf = {
            // page 的入口
            entry: filePath,
            // 模板来源
            template: tmpPath,
            // 在 dist/index.html 的输出
            filename: filename + '.html',
            // 页面模板需要加对应的js脚本，如果不加这行则每个页面都会引入所有的js脚本
            chunks: ['chunk-vendors', 'chunk-common', filename],
            inject: true
        }

        if (configs) {
            conf = merge(conf, configs)
        }

        if (process.env.NODE_ENV === 'production') {
            conf = merge(conf, {
                minify: {
                    removeComments: true, // 删除html中的注释代码
                    collapseWhitespace: true // 删除html中的空白符
                },
                chunksSortMode: 'manual'// 按manual的顺序引入
            })
        }

        map[filename] = conf
    })
    return map
}
