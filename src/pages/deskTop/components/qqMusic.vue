<template>
    <div class="qqMusicPlay">
        <div class="qqMleftMenu">
            <div class="userInfo">
                <div class="userHead">
                    <img src="~assets/images/qqMusic/head.png">
                </div>
                <div class="userDesc">
                    <i class="icon icon-jewel"></i>
                    <span> 开通</span>
                </div>
                <div class="userDesc">
                    <span>QQ等级加速中</span>
                    <i class="icon icon-up"></i>
                </div>
            </div>
            <div class="leftScrollBox">
                <div class="menuBox">
                    <dl class="menuMain">
                        <dt class="menuTit">在线音乐</dt>
                        <dd class="menuItem">
                            <i class="icon icon-music_02"></i>
                            <span>音乐馆</span>
                        </dd>
                        <dd class="menuItem">
                            <i class="icon icon-playFace"></i>
                            <span>MV</span>
                        </dd>
                        <dd class="menuItem active">
                            <i class="icon icon-hot"></i>
                            <span>个性电台</span>
                        </dd>
                        <dd class="menuItem">
                            <i class="icon icon-musicList"></i>
                            <span>明日之子第二季</span>
                        </dd>
                    </dl>
                    <dl class="menuMain">
                        <dt class="menuTit">我的音乐</dt>
                        <dd class="menuItem">
                            <i class="icon icon-like"></i>
                            <span>我喜欢</span>
                        </dd>
                        <dd class="menuItem">
                            <i class="icon icon-desk"></i>
                            <span>本地和下载</span>
                        </dd>
                        <dd class="menuItem">
                            <i class="icon icon-time"></i>
                            <span>播放历史</span>
                        </dd>
                        <dd class="menuItem">
                            <i class="icon icon-musicList"></i>
                            <span>试听列表</span>
                        </dd>
                    </dl>
                    <dl class="menuMain">
                        <dt class="menuTit">
                            我创建的歌单
                            <i class="icon icon-arrowLeft"></i>
                            <i class="funcBtn">十</i>
                        </dt>
                        <dd class="menuItem">
                            <i class="icon icon-music_01"></i>
                            <span>音乐馆</span>
                        </dd>
                        <dd class="menuItem">
                            <i class="icon icon-music_01"></i>
                            <span>MV</span>
                        </dd>
                    </dl>
                </div>
            </div>
        </div>
        <div class="qqMContent">
            <div class="contHead" data-function="drag">
                <i class="icon icon-arrowLeft"></i>
                <i class="icon icon-arrowLeft"></i>
                <i class="icon icon-refresh_01"></i>
                <div class="inpBox">
                    <svg aria-hidden="true" data-prefix="fal" data-icon="search" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-search fa-w-16 fa-2x"><path fill="currentColor" d="M508.5 481.6l-129-129c-2.3-2.3-5.3-3.5-8.5-3.5h-10.3C395 312 416 262.5 416 208 416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c54.5 0 104-21 141.1-55.2V371c0 3.2 1.3 6.2 3.5 8.5l129 129c4.7 4.7 12.3 4.7 17 0l9.9-9.9c4.7-4.7 4.7-12.3 0-17zM208 384c-97.3 0-176-78.7-176-176S110.7 32 208 32s176 78.7 176 176-78.7 176-176 176z" class=""></path></svg>
                    <input type="text" placeholder="搜索音乐、MV、歌单、用户" data-searchfocus="javascript">
                </div>
                <i class="icon icon-music_02" title="听歌识曲"></i>

                <div class="right">
                    <i class="icon icon-email"></i>
                    <i class="icon icon-vip"></i>
                    <i class="icon icon-skin"></i>
                    <i class="icon icon-menu"></i>

                    <i class="icon icon-small"></i>
                    <i data-minimize="javascript" class="qqMIcon">__</i>
                    <i class="icon icon-big"></i>
                    <i class="icon icon-close"></i>
                </div>
            </div>
            <div class="musicLab">
                <div class="searchTit">
                    <div class="resList">
                        <span class="active">歌曲</span>
                        <span>专辑</span>
                        <span>歌单</span>
                        <span>MV</span>
                        <span class="active">歌词</span>
                        <span>用户</span>
                    </div>
                    <div class="response">
                        找到23首歌曲 <em>满意</em> <em>不满意</em>
                    </div>
                </div>
                <div class="scrollBox">
                    <div class="scrollMain">
                        <ul class="searchResaultList">
                            <li>
                                <span class="songName">默默（《神武3》游戏主题曲）</span>
                                <span class="singer">黄子韬</span>
                                <span class="album">卡路里</span>
                                <span class="duration">03:00</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
        <div class="qqMControl">
            <div class="prevBtn btn qqMIcon">
                <i class="icon icon-prev"></i>
            </div>
            <div class="playBtn btn qqMIcon">
                <i class="icon icon-play"></i>
            </div>
            <div class="nextBtn btn qqMIcon">
                <i class="icon icon-next"></i>
            </div>
        </div>
        <div class="qqMProgress">
            <div class="cdDesk">
                <img src="https://y.gtimg.cn/music/photo_new/T002R300x300M0000014e2ad1SGElc.jpg?max_age=2592000">
            </div>
            <div class="soundEffect">
                <div class="effBtn">
                    <span>标准</span>
                    <i class="qqMIcon">g</i>
                </div>
                <div class="effBtn">
                    <span>音效</span>
                    <i class="qqMIcon">g</i>
                </div>
            </div>
            <div class="playLine">
                <div class="inf"><span>QQ音乐，听我想听的歌</span><em>00:00/00:00</em></div>
                <div class="proMain"><span></span></div>
            </div>
            <div class="fnBtn">
                <i class="icon icon-like"></i>
                <i class="icon icon-download"></i>
                <i class="icon icon-more"></i>
            </div>
            <div class="fnBtn">
                <i class="icon icon-word"></i>
                <i class="icon icon-refresh_02"></i>
                <i class="icon icon-voice"></i>
            </div>
            <div class="fnBtn">
                <i class="icon icon-musicList"></i>
                <em> 36</em>
            </div>
        </div>
        <!--<div class="qqMenu">
            <ul class="menuTop">
                <li>
                    <i class="qqMIcon">k</i>
                    <span>传歌到设备</span>
                </li>
                <li>
                    <i class="qqMIcon">l</i>
                    <span>音频转码</span>
                </li>
                <li>
                    <i class="qqMIcon">m</i>
                    <span>铃声制作</span>
                </li>
                <li>
                    <i class="qqMIcon">n</i>
                    <span>微云音乐网盘</span>
                </li>
                <li>
                    <i class="qqMIcon">o</i>
                    <span>定时设置</span>
                </li>
                <li>
                    <i class="qqMIcon">p</i>
                    <span>反馈与修复</span>
                </li>
            </ul>
            <ul class="setList">
                <li><span>添加歌曲</span></li>
                <li><span>上传视频</span><em class="qqMIcon">f</em></li>
            </ul>
            <ul class="setList">
                <li><i class="qqMIcon">q</i><span>设置</span></li>
                <li><span>帮助</span><em class="qqMIcon">f</em></li>
                <li><span>升级</span></li>
                <li><span>切换账号</span></li>
                <li><i class="qqMIcon">r</i><span>退出QQ音乐</span></li>
            </ul>
        </div>-->
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
    @import "~assets/style/qqMusic.css";
</style>
