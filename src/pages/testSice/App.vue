<template>
    <div id="app" class="wrap">
        <div class="content swiper-container">
            <div class="swiper-wrapper">
                <div
                    @click="playvideo"
                    v-for="item in videoList"
                    :data-video="item.video"
                    class="item swiper-slide">
                    <img :src="item.coverImg">
                    <video
                        :src="item.video"
                        :width="scrollwidth"
                        :height="scrollheight"
                        id="videoDOM"
                        preload="auto"
                        x5-video-player-fullscreen="true"
                        x5-video-orientation="portraint"
                        x5-video-player-type="h5"
                        class="video"
                        style="display: none"
                    ></video>
                </div>
            </div>
        </div>
    </div>
</template>


<!--x5-video-player-type="h5"-->
<!--x5-video-player-fullscreen="true"-->
<!--x5-video-orientation="portraint"-->
<!--playsinline="true"-->
<!--webkit-playsinline="true"-->

<script>
import stepTwo from './components/stepTwo'
import Swiper from 'swiper'
export default {
    name: 'App',
    data () {
        return {
            src:'',
            autoplay:'',
            controls:'',
            loop:'',
            poster:'',
            videoList:[
                {
                    video:'https://voddafz06jj.vod.126.net/voddafz06jj/aOkmUaVj_2418171963_shd.mp4',
                    coverImg:'http://voddafz06jj.nosdn.127.net/4a6b00f8-bbb3-4285-9d7d-2bd04ab0703e_1_0_0.jpg'
                },
                {
                    video:'https://voddafz06jj.vod.126.net/voddafz06jj/99d06230-d1e7-43f6-acbb-15b1da936094.mp4',
                    coverImg:'https://voddafz06jj.nosdn.127.net/99d06230-d1e7-43f6-acbb-15b1da936094_1_0_0.jpg?klsize=720x1280&imageView&thumbnail=960x0&quality=75&type=webp'
                },
                {
                    video:'https://voddafz06jj.vod.126.net/voddafz06jj/8VAjHP1l_2415707586_shd.mp4',
                    coverImg:'http://voddafz06jj.nosdn.127.net/37fb9b9a-a12b-4b03-8a30-eff8774becde_1_0_0.jpg'
                },
                {
                    video:'https://voddafz06jj.vod.126.net/voddafz06jj/9DmpwyhP_2473198695_shd.mp4',
                    coverImg:'http://voddafz06jj.nosdn.127.net/51967b10-245b-4e73-b0f4-d045058b259f_1_0_0.jpg'
                },
                {
                    video:'https://voddafz06jj.vod.126.net/voddafz06jj/AwDAJqrx_2433929257_shd.mp4',
                    coverImg:'http://voddafz06jj.nosdn.127.net/bb58916a-a777-40d6-8957-d9519a04fed9_1_0_0.jpg'
                }
            ],
            playStatus:false,
            parentNode:document.querySelector('.swiper-wrapper'),
            now:0,
            showItem: 1,
            scrollwidth: window.innerWidth,
            scrollheight: window.innerHeight,
            nowVideo: ''
        }
    },
    methods: {
        playvideo:function(ev,option){
            var _this = this;
            var obj = option && option.obj || ev.currentTarget;
            if(!_this.playStatus){
                _this.playStatus = true;
                obj.classList.add('active');
                _this.nowVideo = obj.querySelector('video');
                _this.nowVideo.style.display = 'block'
                _this.nowVideo.currentTime = 0
                _this.nowVideo.play();
                _this.duration = _this.nowVideo.duration;
                _this.nowVideo.addEventListener("x5videoenterfullscreen", function(){
                    alert(document.children)
                })
            }else{
                _this.nowVideo.pause();
                _this.nowVideo.style.display = 'none'
                obj.classList.remove('active');
                _this.playStatus = false;
            }
        },
    },
    computed: {},
    updated () {},
    mounted () {
        var _this = this
        _this.scrollwidth = window.innerWidth;
        _this.scrollheight = window.innerHeight;
        _this.swiper = new Swiper('.content',{
            direction: 'vertical',
            on: {
                slideChangeTransitionEnd: function(ev){
                    try {
                        _this.nowVideo.pause();
                        _this.nowVideo.style.display = 'none'
                        // _this.playStatus = false;
                    }
                    catch (e) {
                        console.log(e)
                    }
                    _this.playvideo(ev, {
                        obj:this.el.querySelectorAll('.swiper-slide')[this.activeIndex]
                    })
                },
            },
        });
    },
    components: {
        stepTwo
    }
}
</script>
<style  lang="scss" scoped>
    .content{
        width: 320px;
        height: 500px;
        overflow: hidden;

        .item{
            height: 100%;
            background: #333;
            position: relative;
            overflow: hidden;

            &:before{
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
                width: 200px;
                height: 200px;
                background:url("https://haitao.nos.netease.com/d5e12ac1-01d6-4b64-84aa-1887c30493b8.png");
                background-size: cover;
                z-index: 2;
                border-radius: 50%;
            }

            &.active{
                display: block;

                &:before{
                    background: url("https://haitao.nosdn1.127.net/6ed9d2a8-180a-4cd1-bb6e-33fa6cb088f6_124_124.png?imageView&thumbnail=60x0&quality=75&type=webp");
                    background-size: cover;
                }

                img{
                    opacity: 0;
                }
            }

            img{
                width: 100%;
                height: 100%;
                object-fit: cover;
                position: absolute;
                top: 0;
                left: 0;
            }

            .video{
                width: 100%;
                height: 100%;
                -o-object-fit: cover;
                object-fit: cover;
            }
        }
        .item:nth-child(odd){
            height: 100%;
            background: #999;
        }
    }
</style>
