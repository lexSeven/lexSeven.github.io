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


        _this.controlPlay.onclick = function(){
            _this.playMusic();
        };
        _this.setPro();
        _this.setHeight(690);
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
    setHeight:function(height){
        var _this = this;
        _this.parent = $s('.qqMusicPlay');
        _this.leftMenu = $s('.qqMleftMenu');
        _this.leftScrollBox = $s('.leftScrollBox');
        _this.content = $s('.qqMContent .scrollBox');

        _this.parent.style.height = height+'px';
        _this.leftMenu.style.height = height - 70 + 'px';
        _this.content.style.height = height - 70 - 104 + 'px';
        _this.leftScrollBox.style.height = height - 70 - 147 + 'px';
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
        console.log(_this.musicObject.currentTime);
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