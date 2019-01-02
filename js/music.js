var musicD = {
    init:function(){
        var _this = musicD;
        _this.resBox = document.querySelector('.searchResaultList');
        _this.parent = document.querySelector('.qqMusicPlay');
        _this.position = {};
        _this.bindFunc();//为整个播放器界面添加事件
        music.init(data);//初始化音乐播放器
        dragAndDrop( $s('.qqMusicPlay') );//为播放器添加拖拽事件(工具库里面的方法)
        _this.initHeight(690);//初始化高度
        _this.initScroll();//初始化滚动条（betterScroll库）;
        bottomLine.addIcons({
            obj:'qqMusic',
            callback:_this.clickArea.maximize
        })
    },
    bindFunc:function(){
        var _this = musicD;
        _this.parent.onmousedown=function(ev){
            _this.event(ev,_this.clickArea);
        }
    },
    event:function(ev,eventArea){
        var _this = musicD;
        var ev = ev || event;
        var target = ev.target || ev.srcElement;
        var dataset = target.dataset || $(target).data();
        var parent = target.parentNode;
        var num = 0;

        for( a in dataset){
            num ++ ;
        }

        if(num<1){
            popup(parent);
            num = 0;
        }else{
            for(b in dataset){
                if(eventArea[b]){
                    eventArea[b]({obj:target,ev:ev,target:dataset[b]});
                }
            }
        }

        function popup(obj){
            if(obj == _this.parent){ return false;}
            dataset = obj.dataset || $(obj).data();

            for( a in dataset){
                num ++ ;
            }
            if(num<1){
                parent = obj.parentNode;
                if(parent == _this.parent){ return false;}
                popup(parent);
                num = 0;
            }else{
                for(b in dataset){
                    if(eventArea[b]){
                        eventArea[b]({obj:parent,ev:ev,target:dataset[b]});
                    }
                }
            }
        }
    },
    clickArea:{
        playmusic:function(option){//点击播放音乐
            audiopay(option.obj.dataset.hash);
        },
        searchfocus:function(option){//搜索音乐
            var _this = musicD;
            option.obj.onkeydown = function(ev){
                if(ev.keyCode == 13){
                    search(this.value,function(res){
                        var str = '';
                        res.data.info.forEach(function(item){
                            str += '<li data-playmusic="javascript" data-hash="'+ item.hash +'" >\
                        <span class="songName">'+ item.songname +'</span>\
                        <span class="singer">'+ item.singername +'</span>\
                        <span class="album">'+ item.album_name +'</span>\
                        <span class="duration">03:00</span>\
                    </li>'
                        });
                        _this.resBox.innerHTML = str;
                    });
                }
            };
        },
        minimize:function(){
            var _this = musicD;
            _this.position.top = _this.parent.getBoundingClientRect().top;
            mTween({
                el:_this.parent,
                attrs:{
                    width:0,
                    height:0,
                    top:document.documentElement.clientHeight
                }
            });
        },
        maximize:function(){
            var _this = musicD;
            mTween({
                el:_this.parent,
                attrs:{
                    width:1010,
                    height:690,
                    top:_this.position.top
                }
            });
        }
    },
    initScroll:function(){
        var wrapper = $s('.scrollBox');
        let scroll = new BScroll(wrapper,{
            scrollY:true,
            mouseWheel: {
                speed: 20,
                invert: false,
                easeTime: 300
            },
            scrollbar: {
                fade: true,
                interactive: false // 1.8.0 新增
            }
        });

        var leftWrapper = $s('.leftScrollBox');
        let leftScroll = new BScroll(leftWrapper,{
            scrollY:true,
            mouseWheel: {
                speed: 20,
                invert: false,
                easeTime: 300
            },
            scrollbar: {
                fade: true,
                interactive: false // 1.8.0 新增
            }
        });
    },
    initHeight:function(height){
        var _this = {};
        _this.parent = $s('.qqMusicPlay');
        _this.leftMenu = $s('.qqMleftMenu');
        _this.leftScrollBox = $s('.leftScrollBox');
        _this.content = $s('.qqMContent .scrollBox');

        _this.parent.style.height = height+'px';
        _this.leftMenu.style.height = height - 70 + 'px';
        _this.content.style.height = height - 70 - 104 + 'px';
        _this.leftScrollBox.style.height = height - 70 - 147 + 'px';
    }
};
function audiopay(songid) {/*酷狗播放音乐*/
    $.ajax({
        url: 'http://www.kugou.com/yy/index.php?r=play/getdata&hash='+songid,
        type: 'get',
        dataType: 'jsonp',
        success: function (res) {
            var obj = {
                playSrc:res.data.play_url,
                img:res.data.img,
                time:res.data.timelength/1000,
                songName:res.data.audio_name
            };
            music.resetMusic(obj);
        }
    });
}
function search(keyWord,fn){/*酷狗搜索音乐*/
    $.ajax({
        url: 'http://mobilecdn.kugou.com/api/v3/search/song',
        type: 'get',
        dataType: 'jsonp',
        data: {
            format:'jsonp',
            calback:'',
            pagesize:20,
            showtype:2,
            page:1,
            keyword:keyWord
        },
        success:function(res){
            fn&&fn(res);
        }
    });
}
var music = {
    init:function(data){
        var _this = this;

        _this.data = data;
        _this.now = 0;
        _this.musicObject = document.createElement('audio');
        _this.musicObject.src = _this.data[_this.now].src;
        _this.musicObject.remove();
        document.body.appendChild(_this.musicObject);
        _this.controlPlay = $s('.qqMControl .playBtn');
        _this.proLine = $s('.qqMProgress .proMain');
        _this.proBtn = $s('.qqMProgress .proMain span');
        _this.proTime = $s('.qqMProgress .playLine .inf em');

        _this.musicTitle = $s('.playLine .inf span');
        _this.cdDesk = $s('.cdDesk');

        _this.musicTitle.innerText =_this.data[_this.now].title;
        _this.cdDesk.innerHTML = '<img src="'+ _this.data[_this.now].img +'"/>';


        // _this.controlPlay.onclick = function(){
        //     _this.playMusic();
        // };
        // _this.setPro();
    },
    resetMusic:function(data){
        var _this = music;
        _this.musicObject.remove();
        _this.musicObject.src = data.playSrc;
        document.body.appendChild(_this.musicObject);

        _this.musicTitle.innerText = data.songName;
        _this.cdDesk.innerHTML = '<img src="'+ data.img +'"/>';

        var duraMin = parseInt(data.time/60);
        duraMin = duraMin<10?'0'+duraMin:duraMin;
        var durSec = parseInt(data.time%60);
        durSec = durSec<10?'0'+durSec:durSec;
        _this.musicStatic = {
            durationMin:duraMin + ':' + durSec,
            duration:parseInt(data.time)
        };
        _this.musicObject.pause();
        _this.playMusic();
    },
    playMusic:function(){
        var _this = this;
        if(_this.musicObject.paused){
            _this.musicObject.play();
            _this.controlPlay.innerText = 'i';
            window.requestAnimationFrame(_this.renderProgress);
        }else{
            _this.musicObject.pause();
            _this.controlPlay.innerText = 'F';
            window.cancelAnimationFrame(_this.renderProgress);
        }
    },
    renderProgress:function(){
        var _this = music;
        if(!_this.musicObject.paused){
            _this.proBtn.style.width = 0;
            window.requestAnimationFrame(_this.renderProgress);
        }
        if(_this.musicObject.ended){
            window.cancelAnimationFrame(_this.renderProgress);
        }
        var currMin = parseInt(_this.musicObject.currentTime/60);
        currMin = currMin<10?'0'+currMin:currMin;
        var currSec = parseInt(_this.musicObject.currentTime%60);
        currSec = currSec<10?'0'+currSec:currSec;
        _this.proTime.style.color = '#666';
        _this.proTime.innerText = currMin + ':' + currSec + ' / ' + _this.musicStatic.durationMin;
        _this.proBtn.style.width = (_this.musicObject.currentTime/_this.musicStatic.duration)*100+'%';
        // console.log(_this.musicObject.currentTime);
    },
    setPro:function(){
        var _this = this;
        _this.proLine.onclick = function(ev){
            var width = this.getBoundingClientRect().width;
            var left = this.getBoundingClientRect().left;
            var time = (ev.clientX-left)/width * _this.musicObject.duration;
            _this.musicObject.currentTime=time;
            _this.musicObject.pause();
            _this.playMusic();
        }
    }
}
//http://www.w3school.com.cn/tags/html_ref_audio_video_dom.asp