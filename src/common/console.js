export default () => {
    // 如果是非线上环境，不加载 VConsole
    if (process.env.NODE_ENV !== 'production') {
        var VConsole = require('vconsole/dist/vconsole.min.js')
        /* eslint-disable*/
        new VConsole()
    }

}
