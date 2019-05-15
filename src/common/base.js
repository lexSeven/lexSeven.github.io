import Vue from 'vue'
import ajax from './ajax'
import './console'
import 'assets/style/base.scss'
Vue.prototype.$http = ajax

export default function init (config, root = '#app') {
    /*eslint-disable*/
    new Vue({
        el: root,
        ...config
    })
}
