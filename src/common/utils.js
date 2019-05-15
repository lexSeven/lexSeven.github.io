export const getConfig = () => {
    const env = process.env
    return {
        url: {
            content: env.VUE_APP_URL_CONTENT,
            life: env.VUE_APP_URL_LIFE,
            invitation: env.VUE_APP_URL_IVATATION
        }
    }
}

/**
 * 时间戳转换时间格式
 * @param date String 时间戳，必选
 * @param fmt String  时间格式，非必选
 * @returns {String} 返回需要的时间格式
 */
export const formatTime = (timestap, fmt) => {
    if (!fmt) { fmt = 'YYYY.MM.dd hh:mm' }
    if (timestap != null) {
        let date = new Date(Number(timestap))
        var o = {
            'M+': date.getMonth() + 1, // 月份
            'd+': date.getDate(), // 日
            'h+': date.getHours(), // 小时
            'm+': date.getMinutes() // 分
        }
        if (/(Y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length)) }
        for (var k in o) {
            if (new RegExp('(' + k + ')').test(fmt)) { fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) }
        }
        return fmt
    }
}

/**
 * 拼接跳转用的完整链接
 * @param param Object 必选
 * @param param.url String 必选
 * @param param.router String 路由，非比选，例如：‘stepOne’
 * @param param.params String 参数，非必选,例如：‘pageid=1&a=1&b=2’
 * @returns String app.goPage type：url可用的完整链接
 * localhost:8080
 * m.secoo.com/invitation
 */
export const concatUrl = (param) => {
    let { url, router = '', params = '' } = param
    router = router.trim().length > 0 ? '#/' + router : ''
    params = params.trim().length > 0 ? '?' + params : ''
    return 'test' + url.trim() + '.html' + router + params
}

/**
 * 判断客户端是否支持webp
 * @returns {boolean}
 */
export const webpSupport = () => {
    return document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0
}
