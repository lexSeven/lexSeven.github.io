// 为了让webstorm能够识别 alias别名目录所以将别名配置成单独文件
const path = require('path')
function resolve (dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    resolve: {
        alias: {
            '@': resolve('src'),
            'common': resolve('src/common'),
            'components': resolve('src/components'),
            'assets': resolve('src/assets'),
            'services': resolve('src/services')
        }
    }
}
