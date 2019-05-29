<template>
    <div class="bottomLine">
        <div class="leftIcon">
            <div class="logo item">
                <svg aria-hidden="true" data-prefix="fab" data-icon="windows" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="svg-inline--fa fa-windows fa-w-14 fa-2x"><path fill="currentColor" d="M0 93.7l183.6-25.3v177.4H0V93.7zm0 324.6l183.6 25.3V268.4H0v149.9zm203.8 28L448 480V268.4H203.8v177.9zm0-380.6v180.1H448V32L203.8 65.7z" class=""></path></svg>
            </div>
        </div>
        <div class="rightIcon">
            <div class="dateList">
                <div class="topBox">
                    <div class="time"></div>
                    <div class="date"></div>
                </div>
                <div class="listBox">

                    <div class="prevBtn"><svg viewBox="0 0 256 512"><path fill="currentColor" d="M136.5 185.1l116 117.8c4.7 4.7 4.7 12.3 0 17l-7.1 7.1c-4.7 4.7-12.3 4.7-17 0L128 224.7 27.6 326.9c-4.7 4.7-12.3 4.7-17 0l-7.1-7.1c-4.7-4.7-4.7-12.3 0-17l116-117.8c4.7-4.6 12.3-4.6 17 .1z" class=""></path></svg></div>

                    <div class="nextBtn"><svg viewBox="0 0 256 512"><path fill="currentColor" d="M119.5 326.9L3.5 209.1c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0L128 287.3l100.4-102.2c4.7-4.7 12.3-4.7 17 0l7.1 7.1c4.7 4.7 4.7 12.3 0 17L136.5 327c-4.7 4.6-12.3 4.6-17-.1z" class=""></path></svg></div>
                    <div class="listTitle"></div>
                    <div class="day">
                        <span>一</span>
                        <span>二</span>
                        <span>三</span>
                        <span>四</span>
                        <span>五</span>
                        <span>六</span>
                        <span>日</span>
                    </div>
                    <div class="main active"></div>
                    <div class="markBox"></div>
                </div>
            </div>
            <div class="time"></div>
            <div class="backDesk"></div>
        </div>
    </div>
</template>
<script>
import api from 'services/index'
import { concatUrl } from 'common/utils'
export default {
    name: 'about',
    data () {
        return {
            name: '底部菜单栏',
        }
    },
    props: {},
    watch: {},
    methods: {},
    created: function () {},
    mounted: function () {}
}
</script>
<style>
@import "~assets/style/bottomLine.css";
</style>
