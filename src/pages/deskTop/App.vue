<template>
    <div id="app" class="wrap">
        <div class="deskTop">
            <div class="item myComputer">
                <span class="name">此电脑</span>
            </div>
            <div class="item webStorm">
                <span class="name">Webstorm</span>
            </div>
            <div class="item qqMusic">
                <span class="name">QQ音乐</span>
            </div>
            <div class="item browser">
                <span class="name">浏览器</span>
            </div>
            <div class="item hBuilder">
                <span class="name">Hbuilder</span>
            </div>
            <div class="item sublime">
                <span class="name">sublime</span>
            </div>
            <div class="item recycle">
                <span class="name">回收站</span>
            </div>
            <div class="item file">
                <span class="name">文件</span>
            </div>
            <div class="item qq">
                <span class="name">QQ</span>
            </div>
        </div>
        <BottomLine></BottomLine>
        <qqMusic></qqMusic>
    </div>
</template>

<script>
import BottomLine from './components/BottomLine'
import qqMusic from './components/qqMusic'
export default {
    name: 'App',
    data () {
        return {
            cityName: '北京',
        }
    },
    methods: {},
    computed: {},
    updated () {},
    mounted () {},
    components: {
        BottomLine,qqMusic
    }
}
</script>

<style lang="scss" scoped>
@import "~assets/style/comment.css";
@import "~assets/style/style.css";
</style>
