
import axios from 'axios'
import qs from 'qs'

const defaultConfig = {
    timeout: 10000,
    responseType: 'json',
    withCredentials: false, // 是否允许带cookie这些
    headers: { 'Content-Type': 'application/json;charset=UTF-8' }
}

const instance = axios.create(defaultConfig)

// ajax请求拦截器
instance.interceptors.request.use((config) => {
    // 在发送请求之前做某件事
    if (config.method === 'post' && config.data) {
        var data = config.data
        if (config.headers['Content-Type'].indexOf('urlencoded') > -1) {
            config.data = qs.stringify(data)
        } else {
            config.data = data
        }
    }
    return config
}, (error) => {
    return Promise.reject(error)
})
// 请求响应拦截器
instance.interceptors.response.use((res) => {
    return res.data
}, (error) => {
    /* Message({
        message: error.message,
        type: 'error'
    }) */
    return Promise.reject(error)
})

export const get = (url, params, config = {}) => {
    return instance.get(url, {
        params
    }, { ...defaultConfig, ...config })
}

export const post = (url, params) => {
    if (!params.config) params.config = {}
    return instance.post(url, params.data, { ...defaultConfig, ...params.config })
}

export default {}
