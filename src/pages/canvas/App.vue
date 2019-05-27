<template>
    <div id="app" class="wrap">
        <div class="content swiper-container">
            <div class="swiper-wrapper">
                <div
                    @click="playvideo"
                    v-for="item in videoList"
                    class="item swiper-slide"
                    :data-video="item.video"
                >
                    <img :src="item.coverImg">
                    <canvas></canvas>
                </div>
            </div>
        </div>
        <video
            src=""
            ref="videoDOM"
            preload="auto"
            playsinline="true"
            webkit-playsinline="true"
            x5-video-player-type="h5"
            x5-video-player-fullscreen="true"
            x5-video-orientation="portraint"
            class="video"
        ></video>
    </div>
</template>

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
                    video:'https://voddafz06jj.vod.126.net/voddafz06jj/fKJNEYUR_2436440063_shd.mp4',
                    coverImg:'http://voddafz06jj.nosdn.127.net/ca940095-4d96-4d76-8b85-33f6f4bbd299_1_0_0.jpg'
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
        }
    },
    methods: {
        playvideo:function(ev, option){
            var _this = this;
            var obj = option && option.obj || ev.currentTarget;
            if(!_this.playStatus){
                _this.playStatus = true;
                obj.classList.add('active');
                _this.play({
                    obj:obj
                })
            }else{
                _this.$refs.videoDOM.pause();
                obj.classList.remove('active');
                _this.playStatus = false;
            }
        },
        play:function(option){
            var _this = this;
            _this.timer = null;
            _this.$refs.videoDOM.src = option.obj.dataset.video;
            _this.$refs.videoDOM.play();
            _this.canvasDom = option.obj.querySelector('canvas');
            _this.canvasDom.width = _this.scrollwidth;
            _this.canvasDom.height = _this.scrollheight;
            _this.player = _this.canvasDom.getContext('2d');
            _this.duration = _this.$refs.videoDOM.duration;
            _this.$refs.videoDOM.addEventListener("canplay", function() {
                _this.draw()
            }, false)
        },
        draw:function(){
            var _this = this;
            if(_this.$refs.videoDOM.paused || _this.$refs.videoDOM.ended) {
                cancelAnimationFrame(_this.timer);
                return false;
            }
            _this.player.drawImage(_this.$refs.videoDOM, 0, 0, _this.scrollwidth, _this.scrollheight)
            _this.timer = requestAnimationFrame(function() {
                _this.draw()
            });
        },
        watchPlay:function(){
            var _this = page;
            _this.watch = setInterval(function(){
                console.log(_this.nowVideo.paused);
            });
        }
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
                slideChangeTransitionEnd: function(){
                    _this.nowVideo.pause();
                    _this.playStatus = false;
                    _this.playvideo({
                        obj:this.el.querySelectorAll('.swiper-slide')[this.activeIndex]
                    })
                    alert(this.activeIndex);//切换结束时，告诉我现在是第几个slide
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
        height: 100vh;
        overflow: hidden;

        .item{
            height: 100%;
            background: #333;
            position: relative;

            &:before{
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
                width: 100px;
                height: 100px;
                background:url("https://haitao.nos.netease.com/d5e12ac1-01d6-4b64-84aa-1887c30493b8.png");
                background-size: cover;
                z-index: 2;
                border-radius: 50%;
            }

            &.active{
                display: block;

                /*&:before{*/
                    /*display: none;*/
                /*}*/

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
        }
        .item:nth-child(odd){
            height: 100%;
            background: #999;
        }
    }

    .video{
        width: 100%;
        height: 100%;
        -o-object-fit: cover;
        object-fit: cover;
    }
</style>
